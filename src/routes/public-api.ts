import express from "express";
import authController from "../controllers/auth-controller";

const publicRouter = express.Router();
publicRouter.use("/api/v1", publicRouter);
publicRouter.post("/register", authController.register);
publicRouter.post("/login", authController.login);

export { publicRouter };
