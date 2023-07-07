import { NextFunction, Request, Response } from "express";

export const controllerWrapper = (
  req: Request,
  res: Response,
  _next: NextFunction,
  controllerCallback: (req: Request, res: Response) => void
) => {
  return controllerCallback(req, res);
};
