import mongoose, { Schema } from "mongoose";

export interface IBook {
  code: string;
  title: string;
  author: string;
  stock: number;
}

const bookSchema = new Schema<IBook>({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  stock: { type: Number, required: true },
});

const Book = mongoose.model("Book", bookSchema, "book");

export default Book;
