import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";
import multer from "multer";
import uploadConfig from "@/configs/upload";

const uploadsRoutes = Router();
const uploadsController = new UploadsController();

const upload = multer(uploadConfig.MULTER);

uploadsRoutes.use(verifyUserAuthorization(["employee"]));

uploadsRoutes.post("/", upload.single("file"), (req, res, next) =>
  uploadsController.create(req, res, next),
);

export { uploadsRoutes };
