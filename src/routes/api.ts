import express from "express";
import ruasController from "../controllers/ruas-controller";
import { isAuth } from "../middleware/authjwt-middleware";
import userController from "../controllers/user-controller";
const path = require("path");
const multer = require("multer");

const apiRouter = express.Router();

apiRouter.use(isAuth);
apiRouter.post("/api/v1/ruas", ruasController.create);
apiRouter.put("/api/v1/ruas/:id", ruasController.update);
apiRouter.get("/api/v1/ruas", ruasController.findAll);
apiRouter.get("/api/v1/ruas/:id", ruasController.findById);
apiRouter.delete("/api/v1/ruas/:id", ruasController.remove);

const diskStorage = multer.diskStorage({
  destination: "temp/import",
  filename: function (_req: any, file: any, cb: any) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

apiRouter.post(
  "/api/v1/user/import-bulk",
  multer({ storage: diskStorage }).single("import_file"),
  userController.importExcel
);

export { apiRouter };
