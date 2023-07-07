import EntityProvider from "../entity/entity";

export default class MemberRepository {
  //  utils
  private static Entity = new EntityProvider();

  //   raw data
  static async getRawDataMembers() {
    return await this.Entity.member.find();
  }

  static async getRawDataMemberById(memberId: string) {
    return await this.Entity.member.findById(memberId);
  }
}
