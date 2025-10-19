import SoftwareFilters from "../interfaces/filters/softwareFilters.interface.js";
import { SoftwareDocument } from "../interfaces/software.interface.js";
import softwareModel from "../models/software.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";
import { buildQuery } from "../utils/queryBuilder.js";

const SOFTWARE_FILTER_CONFIG = {
  isValidated: { type: "boolean" as const },
  type: { type: "exact" as const },
  name: { type: "regex" as const },
  country: { type: "exact" as const },
  tradeName: { type: "regex" as const },
  projectName: { type: "regex" as const },
  fundingInstitution: { type: "regex" as const },
};

export async function findAllSoftwares(
  page: number,
  filters?: SoftwareFilters
) {
  const options = { ...paginateOptions, page };

  const query = buildQuery<SoftwareDocument>(
    filters || {},
    SOFTWARE_FILTER_CONFIG
  );

  if (filters?.yearFrom || filters?.yearTo) {
    query.year = {};
    if (filters.yearFrom) query.year.$gte = filters.yearFrom;
    if (filters.yearTo) query.year.$lte = filters.yearTo;
  }

  const foundSoftwares = await softwareModel.paginate(query, options);

  return foundSoftwares;
}

export async function findSoftwareById(id: number) {
  const foundSoftware = await softwareModel
    .findOne({ id })
    .select("-_id")
    .lean();

  return foundSoftware;
}
