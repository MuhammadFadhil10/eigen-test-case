import { ObjectId } from "mongoose";

export interface IBorrowBookRequest {
  memberId: ObjectId;
  bookId: ObjectId;
}

export default class BookDto {
  // request
  static borrowBookRequest(data: IBorrowBookRequest) {
    return data;
  }

  // response
}
