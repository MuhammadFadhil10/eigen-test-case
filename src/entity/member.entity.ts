import mongoose, { Schema } from "mongoose";

export interface IMember {
  code: string;
  name: string;
  borrowedBooks: unknown;
}

const memberSchema = new Schema<IMember>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  borrowedBooks: {
    type: {
      type: [Schema.Types.ObjectId],
      ref: "Book",
      default: [],
    },
  },
});

const Member = mongoose.model("Member", memberSchema, "member");

export default Member;
