import { Request, Response } from "express";
import Repository from "../repository/repository";

export default class MemberController {
  static async getAllMembers(req: Request, res: Response) {
    const members = await Repository.MemberRepository.getRawDataMembers();

    return res.status(200).json({ data: members });
  }
}
