import memberModel from "../models/member.model.js";
import { redisClient } from "../server.js";

export async function findAllMembers() {
  const cacheMembers = await redisClient.get("members");

  if (cacheMembers) return JSON.parse(cacheMembers);

  const foundMembers = await memberModel
    .find()
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  await redisClient.set("members", JSON.stringify(foundMembers));

  return foundMembers;
}

export async function findMemberById(id: number) {
  const cacheMember = await redisClient.get(`member:${id}`);

  if (cacheMember) return JSON.parse(cacheMember);

  const foundMember = await memberModel.findOne({ id }).select("-_id").lean();

  await redisClient.set(`member:${id}`, JSON.stringify(foundMember));

  return foundMember;
}
