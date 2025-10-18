import projectModel from "../models/project.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";

export async function findAllProjects(page: number) {
  const options = { ...paginateOptions, page };

  const foundProjects = await projectModel.paginate({}, options);

  return foundProjects;
}

export async function findProjectById(id: number) {
  const foundProject = await projectModel.findOne({ id }).select("-_id").lean();

  return foundProject;
}
