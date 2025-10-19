import memberModel from "../models/member.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";
import MemberFilters from "../interfaces/filters/memberFilters.interface.js";
import { MemberDocument } from "../interfaces/member.interface.js";
import { buildQuery } from "../utils/queryBuilder.js";

const MEMBER_FILTER_CONFIG = {
  name: { type: "regex" as const },
  state: { type: "exact" as const },
};

export async function findAllMembers(page: number, filters?: MemberFilters) {
  const options = { ...paginateOptions, page };

  const query = buildQuery<MemberDocument>(filters || {}, MEMBER_FILTER_CONFIG);

  const foundMembers = await memberModel.paginate(query, options);

  return foundMembers;
}

export async function findMemberById(id: number) {
  const foundMember = await memberModel.findOne({ id }).select("-_id").lean();

  return foundMember;
}
