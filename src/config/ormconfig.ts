import { DataSource } from "typeorm";
import {
  __db_database,
  __db_host,
  __db_password,
  __db_port,
  __db_user,
  __prod__,
} from "./credentials";

export const PgDataSource = new DataSource({
  migrationsTableName: "migrations",
  type: "postgres",
  host: __db_host,
  port: Number(__db_port),
  username: __db_user,
  password: __db_password,
  database: __db_database,
  logging: !__prod__,
  synchronize: false,
  name: "default",
  subscribers: ["dist/subscribers/*.js"],
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
});
