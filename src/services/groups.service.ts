import groupModel from "../models/group.model.js";
import { groupsPopulate } from "../populate/groups.populate.js";

export async function findAllGroups() {
  const foundGroups = await groupModel
    .find()
    .populate(groupsPopulate)
    .select("-_id")
    .lean();

  return foundGroups;
}
