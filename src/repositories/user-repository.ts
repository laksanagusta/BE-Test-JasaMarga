import { PgDataSource } from "../config/ormconfig";
import { User } from "../entities/User";
import { DeleteResult, Repository } from "typeorm";

export default class UserRepository {
  userDataSource: Repository<User>;
  constructor() {
    this.userDataSource = PgDataSource.getRepository(User);
  }

  public async save(user: User): Promise<User> {
    return await this.userDataSource.save(user);
  }

  public async findById(userId: number): Promise<User | null> {
    return await this.userDataSource.findOne({
      where: {
        id: userId,
      },
    });
  }

  public async findByUsername(username: string): Promise<User | null> {
    return await this.userDataSource.findOne({
      where: {
        username: username,
      },
    });
  }

  public async findAll(): Promise<User[] | null> {
    return await this.userDataSource.find();
  }

  public async remove(userId: number): Promise<DeleteResult> {
    return await this.userDataSource.delete(userId);
  }

  public async insert(users: User[]): Promise<User[]> {
    const { raw } = await this.userDataSource.insert(users);
    return raw;
  }
}
