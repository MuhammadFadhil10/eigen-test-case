import Controller from "../controller/controller";
import express from "express";

const router = express.Router();

const { BookController } = Controller;

router.get("/books/", BookController.getAllBooks);
router.post("/book/borrow", BookController.borrowBooks);
router.post("/book/borrow", BookController.borrowBooks);
router.post("/book/return", BookController.returnBook);

export default router;
