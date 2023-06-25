import { Request } from "express";
import { User } from "../entities/User";
import { ResponseError } from "../error/response-error";
import {
  loginUserValidation,
  registerUserValidation,
} from "../validation/user-validation";
import { validate } from "../validation/validation";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import xlsx from "xlsx";
import UserRepository from "../repositories/user-repository";
import { __jwt_secret } from "../config/credentials";
const fs = require("fs");

const WRONG_PASSWORD_OR_USERNAME_MESSAGE = "Username or password wrong";
const USERNAME_ALREADY_EXIST_MESSAGE = "Username already exist";

const userRepository = new UserRepository();
const isUserExist = async (username: string) => {
  return await userRepository.findByUsername(username);
};

const buildUserAct = (user: User): User => {
  user.created_by = user.updated_by = user.username;
  return user;
};

const register = async (request: Request): Promise<User> => {
  const user = validate(registerUserValidation, request.body);

  const checkUserExist = await isUserExist(user.username);
  if (checkUserExist) {
    throw new ResponseError(400, USERNAME_ALREADY_EXIST_MESSAGE);
  }

  user.password = await argon2.hash(user.password);

  return await userRepository.save(buildUserAct(user));
};

const login = async (request: Request): Promise<any> => {
  const loginRequest = validate(loginUserValidation, request.body);

  const user = await userRepository.findByUsername(loginRequest.username);

  if (!user) {
    throw new ResponseError(400, WRONG_PASSWORD_OR_USERNAME_MESSAGE);
  }

  const passwordMatch = await argon2.verify(
    user.password,
    loginRequest.password
  );

  if (!passwordMatch) {
    throw new ResponseError(401, WRONG_PASSWORD_OR_USERNAME_MESSAGE);
  }

  user.last_login = new Date(Date.now());

  user.token_jwt = jwt.sign(
    { id: user.id, username: user.username },
    __jwt_secret ?? ""
  );

  return await userRepository.save(user);
};

interface importUser {
  Username: string;
  Password: string;
  Nama: string;
}

const importExcel = async (filename: string): Promise<User[]> => {
  const filedir = "temp/import/" + filename;
  const workbook = xlsx.readFile(filedir);

  let workbook_sheet = workbook.SheetNames;
  let workbookDatas: importUser[] = xlsx.utils.sheet_to_json(
    workbook.Sheets[workbook_sheet[0]]
  );

  const users: User[] = [];
  for (const workbookData of workbookDatas) {
    const password = await argon2.hash(workbookData.Password.toString());

    const user = new User();
    user.username = workbookData.Username;
    user.fullname = workbookData.Nama;
    user.password = password;

    validate(registerUserValidation, user);

    users.push(buildUserAct(user));
  }

  const raw = await userRepository.insert(users);
  fs.unlinkSync(filedir);

  return raw;
};

export default { register, login, importExcel };
