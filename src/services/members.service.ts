import memberModel from "../models/member.model.js";

export async function findAllMembers() {
  const foundMembers = await memberModel
    .find()
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  return foundMembers;
}

export async function findMemberById(id: number) {
  const foundMember = await memberModel.findOne({ id }).select("-_id").lean();

  return foundMember;
}
