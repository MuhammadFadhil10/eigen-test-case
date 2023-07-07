import { Request, Response } from "express";
import Repository from "../repository/repository";
import Dto from "../dto/dto";

export default class MemberController {
  static async getAllMembers(_req: Request, res: Response) {
    try {
      const members = await Repository.MemberRepository.getRawDataMembers();

      const data = members.map((member) => Dto.Member.membersResponse(member));

      return Dto.Response.successResponse({ res, data });
    } catch (error) {
      return Dto.Response.errorResponse(
        {
          res,
          status: 500,
          message: error.message,
        },
        "Get all members"
      );
    }
  }
}
