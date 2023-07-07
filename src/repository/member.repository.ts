import EntityProvider from "../entity/entity";
import { ObjectId } from "mongoose";

export default class MemberRepository {
  //  utils
  private static Entity = new EntityProvider();

  private static async checkTotalBorrowedBooks(
    memberId: string
  ): Promise<number> {
    try {
      const member = await this.getRawDataMemberById(memberId);

      return member.borrowedBooks.length;
    } catch (error) {
      console.log("check total borrowed err: ", error.message);

      process.exit();
    }
  }

  //   raw data
  static async getRawDataMembers() {
    return await this.Entity.member.find();
  }

  private static async getRawDataMemberById(memberId: string) {
    return await this.Entity.member.findById(memberId);
  }

  public static async borrowBook(memberId: string, bookId: ObjectId) {
    try {
      const promises = await Promise.all([
        this.checkTotalBorrowedBooks(memberId),
        this.getRawDataMemberById(memberId),
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
