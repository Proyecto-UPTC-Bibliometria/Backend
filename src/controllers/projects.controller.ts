import { NextFunction, Request, Response } from "express";
import { findAllMembers, findMemberById } from "../services/members.service.js";
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
    const projects = await findAllProjects();

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
