import { Request } from "express";
import { PgDataSource } from "../config/ormconfig";
import { Ruas } from "../entities/Ruas";
import { RuasCoordinates } from "../entities/RuasCoordinates";
import { ResponseError } from "../error/response-error";
import {
  createRuasValidation,
  updateRuasValidation,
} from "../validation/ruas-validation";
import { validate } from "../validation/validation";
import { DeleteResult } from "typeorm";
import RuasRepository from "../repositories/ruas-repository";

const ruasRepository = new RuasRepository();

const create = async (request: any): Promise<RuasCoordinates> => {
  const ruas = validate(createRuasValidation, request.body);

  const buildRuasCoordinatesData = await _bulkRuteCoordinates(
    ruas.ruasCoordinates,
    request.user.username
  );

  const ruasRepository = PgDataSource.getRepository(Ruas);
  ruas.ruasCoordinates = buildRuasCoordinatesData;
  ruas.created_by = ruas.updated_by = request.user.username;

  return await ruasRepository.save(ruas);
};

const update = async (
  request: Request,
  ruasId: number
): Promise<Ruas | null> => {
  const ruas = validate(updateRuasValidation, request);

  const checkDataRuasMustExist = await isExistRuas(ruasId);
  if (!checkDataRuasMustExist) {
    throw new ResponseError(400, "ruas data not found");
  }

  ruas.id = ruasId;

  return await ruasRepository.save(ruas);
};

const findAll = async (): Promise<Ruas[] | null> => {
  const ruas = await ruasRepository.findAll();
  if (ruas?.length == 0) {
    throw new ResponseError(400, "ruas data not found");
  }

  return await ruasRepository.findAll();
};

const findById = async (ruasId: number): Promise<Ruas> => {
  const ruas = await ruasRepository.findById(ruasId);
  if (!ruas) {
    throw new ResponseError(400, "Ruas data not found");
  }

  return ruas;
};

const remove = async (ruasId: number): Promise<DeleteResult> => {
  const checkDataRuasMustExist = await isExistRuas(ruasId);
  if (!checkDataRuasMustExist) {
    throw new ResponseError(400, "ruas data not found");
  }

  return await ruasRepository.remove(ruasId);
};

const _bulkRuteCoordinates = async (
  data: string[],
  user: string
): Promise<RuasCoordinates[]> => {
  const collectRuteCoordinates: RuasCoordinates[] = [];
  data.forEach(async (value) => {
    const ruasCoordinates = new RuasCoordinates();
    ruasCoordinates.created_by = ruasCoordinates.updated_by = user;
    ruasCoordinates.coordinates = value;

    collectRuteCoordinates.push(ruasCoordinates);
  });

  return collectRuteCoordinates;
};

const isExistRuas = async (ruasId: number): Promise<Ruas | null> => {
  return await ruasRepository.findById(ruasId);
};

export default {
  create,
  update,
  findAll,
  remove,
  findById,
};
