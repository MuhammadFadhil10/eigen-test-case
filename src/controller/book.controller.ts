import { Request, Response } from "express";
import Repository from "../repository/repository";
import Dto from "../dto/dto";

export default class BookController {
  static async getAllBooks(req: Request, res: Response) {
    try {
      const books = await Repository.BookRepository.getAvailableBooks();

      return Dto.Response.successResponse({
        res,
        data: books,
      });
    } catch (error) {
      return Dto.Response.errorResponse(
        {
          res,
          status: 500,
          message: error.message,
        },
        "Get Books"
      );
    }
  }

  static async borrowBooks(req: Request, res: Response) {
    try {
      const { memberId, bookId } = req.body;

      await Repository.BookRepository.borrowBook(memberId, bookId);

      return Dto.Response.successResponse({
        res,
        message: "Succes borrow book!",
      });
    } catch (error) {
      return Dto.Response.errorResponse(
        {
          res,
          status: 500,
          message: error.message,
        },
        "Borrow Books"
      );
    }
  }

  static async returnBook(req: Request, res: Response) {
    try {
      const { memberId, bookId } = req.body;

      await Repository.BookRepository.returnBook(memberId, bookId);

      return Dto.Response.successResponse({
        res,
        message: "Succes returning book!",
      });
    } catch (error) {
      return Dto.Response.errorResponse(
        {
          res,
          status: 500,
          message: error.message,
        },
        "Return Book"
      );
    }
  }
}
