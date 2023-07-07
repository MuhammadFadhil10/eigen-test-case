import Member from "./member.entity";
import Book from "./book.entity";

export default class EntityProvider {
  public member = Member;
  public book = Book;
}
