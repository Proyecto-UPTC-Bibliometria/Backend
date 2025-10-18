import groupModel from "../models/group.model.js";
import { groupsPopulate } from "../populate/groups.populate.js";
import { paginateOptions } from "../utils/paginateOptions.js";

export async function findAllGroups(page: number) {
  const options = { ...paginateOptions, page, populate: groupsPopulate };

  const foundGroups = await groupModel.paginate({}, options);

  return foundGroups;
}

export async function findGroupById(id: number) {
  const foundGroup = await groupModel
    .findOne({ id })
    .populate(groupsPopulate)
    .select("-_id")
    .lean();

  return foundGroup;
}
