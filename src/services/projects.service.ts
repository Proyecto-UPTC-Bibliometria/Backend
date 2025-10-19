import ProjectFilters from "../interfaces/filters/projectFilters.interface.js";
import { ProjectDocument } from "../interfaces/project.interface.js";
import projectModel from "../models/project.model.js";
import { paginateOptions } from "../utils/paginateOptions.js";
import { buildQuery } from "../utils/queryBuilder.js";

const PROJECT_FILTER_CONFIG = {
  isValidated: { type: "boolean" as const },
  name: { type: "regex" as const },
  status: { type: "exact" as const },
};

export async function findAllProjects(page: number, filters?: ProjectFilters) {
  const options = { ...paginateOptions, page };

  const query = buildQuery<ProjectDocument>(
    filters || {},
    PROJECT_FILTER_CONFIG
  );

  const foundProjects = await projectModel.paginate(query, options);

  return foundProjects;
}

export async function findProjectById(id: number) {
  const foundProject = await projectModel.findOne({ id }).select("-_id").lean();

  return foundProject;
}
