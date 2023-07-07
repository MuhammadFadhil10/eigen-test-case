import { Response } from "express";

export interface ISuccessResponseDto {
  res: Response;
  data?: unknown;
  message?: string;
}

export interface IErrorResponseDto {
  res: Response;
  message: string;
  status: number;
}

export default class ResponseDto {
  static successResponse({
    res,
    data = {},
    message = "",
  }: ISuccessResponseDto) {
    return res.status(200).json({ data, message });
  }

  static errorResponse(
    { res, status, message }: IErrorResponseDto,
    errorContext: string
  ) {
    console.log(`error ${errorContext}: `, message);

    return res.status(status).json({ message });
  }
}
