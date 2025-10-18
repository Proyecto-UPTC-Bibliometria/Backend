import { NextFunction, Request, Response } from "express";
import { findAllGroups, findGroupById } from "../services/groups.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";

export async function getAllGroups(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const groups = await findAllGroups(page);

    if (!groups || groups.length === 0)
      throw new NotFoundError("No groups found");

    res.status(200).json(groups);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getGroupById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const group = await findGroupById(parseInt(id));

    if (!group) throw new NotFoundError("No group found");

    res.status(200).json(group);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
