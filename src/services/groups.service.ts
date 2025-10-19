import GroupFilters from "../interfaces/filters/groupFilters.interface.js";
import { GroupDocument } from "../interfaces/group.interface.js";
import groupModel from "../models/group.model.js";
import { groupsPopulate } from "../populate/groups.populate.js";
import { paginateOptions } from "../utils/paginateOptions.js";
import { buildQuery } from "../utils/queryBuilder.js";

const GROUP_FILTER_CONFIG = {
  name: { type: "regex" as const },
  leader: { type: "regex" as const },
  isCertified: { type: "boolean" as const },
  ranking: { type: "exact" as const },
};

export async function findAllGroups(page: number, filters?: GroupFilters) {
  const options = {
    ...paginateOptions,
    page,
    populate: groupsPopulate,
    limit: 5,
  };

  const query = buildQuery<GroupDocument>(filters || {}, GROUP_FILTER_CONFIG);

  if (filters?.city) {
    query["groupLocation.city"] = { $regex: filters.city, $options: "i" };
  }
  if (filters?.department) {
    query["groupLocation.department"] = {
      $regex: filters.department,
      $options: "i",
    };
  }

  if (filters?.formationDate) {
    query.formationDate = {};
    query.formationDate.$gte = new Date(
      `${filters.formationDate}-01-01T00:00:00.000Z`
    );
    query.formationDate.$lte = new Date(
      `${filters.formationDate}-12-31T23:59:59.999Z`
    );
  }

  const foundGroups = await groupModel.paginate(query, options);

  return foundGroups;
}

export async function findAllGroupsLight(page: number, filters?: GroupFilters) {
  const options = { ...paginateOptions, page };

  const query = buildQuery<GroupDocument>(filters || {}, GROUP_FILTER_CONFIG);

  if (filters?.city) {
    query["groupLocation.city"] = { $regex: filters.city, $options: "i" };
  }
  if (filters?.department) {
    query["groupLocation.department"] = {
      $regex: filters.department,
      $options: "i",
    };
  }

  if (filters?.formationDate) {
    query.formationDate = {};
    query.formationDate.$gte = new Date(
      `${filters.formationDate}-01-01T00:00:00.000Z`
    );
    query.formationDate.$lte = new Date(
      `${filters.formationDate}-12-31T23:59:59.999Z`
    );
  }

  const foundGroups = await groupModel.paginate(query, options);

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
