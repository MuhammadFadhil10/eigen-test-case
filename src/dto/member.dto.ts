import { IMember } from "entity/member.entity";

export interface IMemberResponse {
  name: string;
  code: string;
  totalBooksBorrowed: number;
}

export default class MemberDto {
  static membersResponse(member: IMember): IMemberResponse {
    const { name, code, borrowedBooks } = member;

    return {
      code,
      name,
      totalBooksBorrowed: borrowedBooks.length,
    };
  }
}
