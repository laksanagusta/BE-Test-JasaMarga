import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { __jwt_secret } from "../config/credentials";
import { ResponseError } from "../error/response-error";

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}
const isAuth = async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new ResponseError(400, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  const secretKey = __jwt_secret ?? "";
  const decoded = jwt.verify(token, secretKey);
  (req as CustomRequest).user = decoded;

  next();
};

export { isAuth };
