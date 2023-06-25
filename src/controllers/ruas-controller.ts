import { NextFunction, Request, Response } from "express";
import ruasService from "../services/ruas-service";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ruas = await ruasService.create(req);

    res.status(200).json({
      data: ruas,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.body;
    const ruasId = parseInt(req.params.id);
    const ruas = await ruasService.update(request, ruasId);

    res.status(200).json({
      data: ruas,
    });
  } catch (e) {
    next(e);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ruasId = parseInt(req.params.id);
    const ruas = await ruasService.findById(ruasId);

    res.status(200).json({
      data: ruas,
    });
  } catch (e) {
    next(e);
  }
};

const findAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const ruas = await ruasService.findAll();

    res.status(200).json({
      data: ruas,
    });
  } catch (e) {
    next(e);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ruasId = parseInt(req.params.id);
    const ruas = await ruasService.remove(ruasId);

    res.status(200).json({
      data: ruas,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  update,
  create,
  findAll,
  remove,
  findById,
};
