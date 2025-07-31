import { NextFunction, Request, Response } from "express";
import { findAllGroups } from "../services/groups.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";

export async function getAllGroups(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const groups = await findAllGroups();

    if (!groups || groups.length === 0)
      throw new NotFoundError("No groups found");

    res.status(200).json(groups);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
