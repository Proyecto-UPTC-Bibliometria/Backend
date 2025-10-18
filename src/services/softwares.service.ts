import softwareModel from "../models/software.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";

export async function findAllSoftwares(page: number) {
  const options = { ...paginateOptions, page };

  const foundSoftwares = await softwareModel.paginate({}, options);

  return foundSoftwares;
}

export async function findSoftwareById(id: number) {
  const foundSoftware = await softwareModel
    .findOne({ id })
    .select("-_id")
    .lean();

  return foundSoftware;
}
