import groupModel from "../models/group.model.js";
import { groupsPopulate } from "../populate/groups.populate.js";
import { redisClient } from "../server.js";

export async function findAllGroups() {
  const cacheGroups = await redisClient.get("groups");

  if (cacheGroups) return JSON.parse(cacheGroups);

  const foundGroups = await groupModel
    .find()
    .populate(groupsPopulate)
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  await redisClient.set("groups", JSON.stringify(foundGroups));

  return foundGroups;
}

export async function findGroupById(id: number) {
  const cacheGroup = await redisClient.get(`group:${id}`);

  if (cacheGroup) return JSON.parse(cacheGroup);

  const foundGroup = await groupModel
    .findOne({ id })
    .populate(groupsPopulate)
    .select("-_id")
    .lean();

  await redisClient.set(`group:${id}`, JSON.stringify(foundGroup));

  return foundGroup;
}
