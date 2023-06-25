import { NextFunction, Response } from "express";
import response from "../helpers/response";
import userService from "../services/user-service";

const importExcel = async (req: any, res: Response, next: NextFunction) => {
  try {
    const importUser = await userService.importExcel(req.file.filename);
    response.successResponse(res, importUser, "succes import user");
  } catch (e) {
    next(e);
  }
};

export default { importExcel };
