import projectModel from "../models/project.model.js";

export async function findAllProjects() {
  const foundProjects = await projectModel
    .find()
    .select("-_id")
    .sort({ id: 1 })
    .lean();

  return foundProjects;
}

export async function findProjectById(id: number) {
  const foundProject = await projectModel.findOne({ id }).select("-_id").lean();

  return foundProject;
}
