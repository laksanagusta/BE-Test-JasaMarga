import { NextFunction, Response } from "express";
import userService from "../services/user-service";

const importExcel = async (req: any, res: Response, next: NextFunction) => {
  try {
    const importUser = await userService.importExcel(req.file.filename);
    res.status(200).json({
      data: importUser,
    });
  } catch (e) {
    next(e);
  }
};

export default { importExcel };
