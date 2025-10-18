import memberModel from "../models/member.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";

export async function findAllMembers(page: number) {
  const options = { ...paginateOptions, page };

  const foundMembers = await memberModel.paginate({}, options);

  return foundMembers;
}

export async function findMemberById(id: number) {
  const foundMember = await memberModel.findOne({ id }).select("-_id").lean();

  return foundMember;
}
