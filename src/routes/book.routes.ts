import Book from "../entity/book.entity";
import express from "express";

const router = express.Router();

router.get("/books", async (_req, res) => {
  const books = await Book.find();

  return res.status(200).json({ data: books });
});

export default router;
