import memberModel from "../models/member.model.js";

export async function findAllMembers() {
  const foundMembers = await memberModel.find().select("-_id").lean();

  return foundMembers;
}
