import { NextFunction, Request, Response } from "express";
import userService from "../services/user-service";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.register(req);
    res.status(200).json({
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.login(req);
    res.status(200).json({
      data: user,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
};
