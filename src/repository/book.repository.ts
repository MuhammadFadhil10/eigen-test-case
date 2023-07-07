import { ObjectId, Types } from "mongoose";
import EntityProvider from "../entity/entity";
import MemberRepository from "./member.repository";

export default class BookRepository {
  //  utils
  private static Entity = new EntityProvider();

  static async getRawDataBooks() {
    return await this.Entity.book.find();
  }

  static async getRawDataBookById(bookId: ObjectId) {
    return await this.Entity.book.findById(bookId);
  }

  static async getAvailableBooks() {
    return await this.Entity.book.find({ stock: { $gt: 0 } });
  }

  private static async checkTotalBorrowedBooks(
    memberId: string
  ): Promise<number> {
    try {
      const member = await MemberRepository.getRawDataMemberById(memberId);

      return member.borrowedBooks.length;
    } catch (error) {
      console.log("check total borrowed err: ", error.message);

      process.exit();
    }
  }

  static async borrowBook(memberId: string, bookId: ObjectId) {
    try {
      const promises = await Promise.all([
        this.checkTotalBorrowedBooks(memberId),
        this.getRawDataBookById(bookId),
        MemberRepository.getRawDataMemberById(memberId),
      ]);

      const [totalBorrowedBooks, borrowedBooks, member] = promises;

      if (totalBorrowedBooks === 2)
        throw Error("Maximum books to borrow is 2!");

      member.borrowedBooks.push(bookId);
      borrowedBooks.stock = borrowedBooks.stock - 1;

      await borrowedBooks.save();

      return await member.save();
    } catch (error) {
      throw Error(error.message);
    }
  }

  static async returnBook(memberId: string, bookId: string) {
    try {
      const bookObjectId = new Types.ObjectId(bookId);
      const bookBorrowed = await this.Entity.book.findOne({ _id: bookId });
      const member = await MemberRepository.getRawDataMemberById(memberId);

      // remove bookid from member bookborrowed
      await member.updateOne({ $pull: { borrowedBooks: bookObjectId } });
      // add book returned stock
      bookBorrowed.stock = bookBorrowed.stock + 1;

      return await bookBorrowed.save();
    } catch (error) {
      throw Error(error.message);
    }
  }
}
