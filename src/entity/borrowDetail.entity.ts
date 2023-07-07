import mongoose, { Schema } from "mongoose";

export interface BorrowDetail {
  memberId: string;
  bookId: string;
  borrowDeadline: Date;
}

const BorrowDetailSchema = new Schema<BorrowDetail>({
  memberId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  borrowDeadline: {
    type: Schema.Types.Date,
    required: true,
  },
});

const Blog = mongoose.model("BorrowDetail", BorrowDetailSchema);

export default Blog;
