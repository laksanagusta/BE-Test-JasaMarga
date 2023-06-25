import { PgDataSource } from "../config/ormconfig";
import { Ruas } from "../entities/Ruas";
import { DeleteResult, Repository } from "typeorm";

export default class RuasRepository {
  ruasDataSource: Repository<Ruas>;
  constructor() {
    this.ruasDataSource = PgDataSource.getRepository(Ruas);
  }

  public async save(ruas: Ruas): Promise<Ruas | null> {
    return await this.ruasDataSource.save(ruas);
  }

  public async findById(ruasId: number): Promise<Ruas | null> {
    return await this.ruasDataSource.findOne({
      relations: {
        ruasCoordinates: true,
      },
      where: {
        id: ruasId,
      },
    });
  }

  public async findAll(): Promise<Ruas[] | null> {
    return await this.ruasDataSource.find({
      relations: {
        ruasCoordinates: true,
      },
    });
  }

  public async remove(ruasId: number): Promise<DeleteResult> {
    return await this.ruasDataSource.delete(ruasId);
  }
}
