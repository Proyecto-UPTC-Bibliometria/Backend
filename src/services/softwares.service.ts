import softwareModel from "../models/software.model.js";

export async function findAllSoftwares() {
  const foundSoftwares = await softwareModel
    .find()
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  return foundSoftwares;
}

export async function findSoftwareById(id: number) {
  const foundSoftware = await softwareModel
    .findOne({ id })
    .select("-_id")
    .lean();

  return foundSoftware;
}
