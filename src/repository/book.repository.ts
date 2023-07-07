import { ObjectId } from "mongoose";
import EntityProvider from "../entity/entity";
import MemberRepository from "./member.repository";

export default class BookRepository {
  //  utils
  private static Entity = new EntityProvider();

  static async getRawDataBooks() {
    return await this.Entity.book.find();
  }

  static async getAvailableBooks(memberId: string) {
    const member = await MemberRepository.getRawDataMemberById(memberId);

    return await this.Entity.book.find({ _id: { $nin: member.borrowedBooks } });
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

  public static async borrowBook(memberId: string, bookId: ObjectId) {
    try {
      const promises = await Promise.all([
        this.checkTotalBorrowedBooks(memberId),
        MemberRepository.getRawDataMemberById(memberId),
      ]);

      const [totalBorrowedBooks, member] = promises;

      if (totalBorrowedBooks === 2)
        throw Error("Maximum books to borrow is 2!");

      member.borrowedBooks.push(bookId);

      return await member.save();
    } catch (error) {
      throw Error(error.message);
    }
  }
}
