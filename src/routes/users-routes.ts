import { Router } from "express";
import { UsersController } from "@/controllers/user-controller";

const usersRoutes = Router();
const usersController = new UsersController();

usersRoutes.post("/", (req, res, next) =>
  usersController.create(req, res, next),
);

export { usersRoutes };
