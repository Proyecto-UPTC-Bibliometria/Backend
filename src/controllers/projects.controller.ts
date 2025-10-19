import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import {
  findAllProjects,
  findProjectById,
} from "../services/projects.service.js";

export async function getAllProjects(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { page, validated, name, status } = req.query;
    const pageNumber = parseInt(page as string) || 1;

    const filters = {
      isValidated: validated as any,
      name: name as string,
      status: status as string,
    };

    const projects = await findAllProjects(pageNumber, filters);

    if (!projects || projects.length === 0)
      throw new NotFoundError("No projects found");

    res.status(200).json(projects);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getProjectById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const project = await findProjectById(parseInt(id));

    if (!project) throw new NotFoundError("No project found");

    res.status(200).json(project);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
