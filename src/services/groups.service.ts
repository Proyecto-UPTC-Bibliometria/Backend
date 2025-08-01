import groupModel from "../models/group.model.js";
import { groupsPopulate } from "../populate/groups.populate.js";

export async function findAllGroups() {
  const foundGroups = await groupModel
    .find()
    .populate(groupsPopulate)
    .select("-_id")
    .sort({ id: 1 })
    .lean();

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
