import Controller from "../controller/controller";
import express from "express";

const router = express.Router();

const { BookController } = Controller;

router.get("/books/:memberId", BookController.getAllBooks);
router.post("/book/borrow", BookController.borrowBooks);

export default router;
