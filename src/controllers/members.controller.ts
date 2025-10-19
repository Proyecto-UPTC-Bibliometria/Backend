import { NextFunction, Request, Response } from "express";
import { findAllMembers, findMemberById } from "../services/members.service.js";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";

export async function getAllMembers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { name, state, page } = req.query;
    const pageNumber = parseInt(page as string) || 1;

    const filters = {
      name: name as string,
      state: state as string,
    };

    const members = await findAllMembers(pageNumber, filters);

    if (!members || members.length === 0)
      throw new NotFoundError("No members found");

    res.status(200).json(members);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getMemberById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const member = await findMemberById(parseInt(id));

    if (!member) throw new NotFoundError("No member found");

    res.status(200).json(member);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
