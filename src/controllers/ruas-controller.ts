import { NextFunction, Request, Response } from "express";
import ruasService from "../services/ruas-service";
import response from "../helpers/response";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ruas = await ruasService.create(req);

    response.successResponse(res, ruas, "success create ruas");
  } catch (e) {
    next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const request = req.body;
    const ruasId = parseInt(req.params.id);
    const ruas = await ruasService.update(request, ruasId);

    response.successResponse(res, ruas, "success update ruas");
  } catch (e) {
    next(e);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ruasId = parseInt(req.params.id);
    const ruas = await ruasService.findById(ruasId);

    response.successResponse(res, ruas);
  } catch (e) {
    next(e);
  }
};

const findAll = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const ruas = await ruasService.findAll();

    response.successResponse(res, ruas);
  } catch (e) {
    next(e);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ruasId = parseInt(req.params.id);
    await ruasService.remove(ruasId);

    response.successResponse(res, null, "success delete ruas");
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
