import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import response from "../helpers/response";
import { __jwt_secret } from "../config/credentials";

export interface CustomRequest extends Request {
  user: string | JwtPayload;
}
const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    response.unauthorizedResponse(res);
    return;
  }

  const token = authHeader.split(" ")[1];

  const secretKey = __jwt_secret ?? "";
  const decoded = jwt.verify(token, secretKey);
  (req as CustomRequest).user = decoded;

  next();
};

export { isAuth };
