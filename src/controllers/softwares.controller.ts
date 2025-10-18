import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../utils/errors/custom/client.errors.js";
import {
  findAllSoftwares,
  findSoftwareById,
} from "../services/softwares.service.js";

export async function getAllSoftwares(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const page = parseInt(req.query.page as string) || 1;

    const softwares = await findAllSoftwares(page);

    if (!softwares || softwares.length === 0)
      throw new NotFoundError("No softwares found");

    res.status(200).json(softwares);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}

export async function getSoftwareById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;

    const software = await findSoftwareById(parseInt(id));

    if (!software) throw new NotFoundError("No software found");

    res.status(200).json(software);
  } catch (error) {
    const typedError = error as Error;

    console.error(typedError);
    next(typedError);
  }
}
