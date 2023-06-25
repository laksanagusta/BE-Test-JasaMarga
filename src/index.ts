import express from "express";
import { PgDataSource } from "./config/ormconfig";
import { publicRouter } from "./routes/public-api";
import { errorMiddleware } from "./middleware/error-middleware";
import { apiRouter } from "./routes/api";
import bodyParser from "body-parser";
import { __port } from "./config/credentials";

const main = async () => {
  await PgDataSource.initialize();
  await PgDataSource.runMigrations();

  const app = express();

  app.use(express.json());

  app.use(bodyParser.json());

  app.use(publicRouter);
  app.use(apiRouter);
  app.use(errorMiddleware);

  app.listen(__port, () => {
    console.log("server is running in PORT ", __port);
  });
};

main().catch((err) => {
  console.error(err);
});
