import { NextFunction, Request, Response } from "express";
import { findAllMembers } from "../services/members.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";

export async function getAllMembers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const members = await findAllMembers();

    if (!members || members.length === 0)
      throw new NotFoundError("No members found");

    res.status(200).json(members);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
