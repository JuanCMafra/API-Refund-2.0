import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

const refundsRoutes = Router();
const refundsController = new RefundsController();

refundsRoutes.post("/", verifyUserAuthorization(["employee"]), (req, res, next) =>
  refundsController.create(req, res, next),
);

refundsRoutes.get("/", verifyUserAuthorization(["manager"]), (req, res, next) =>
  refundsController.index(req, res, next),
);

refundsRoutes.get("/:id", verifyUserAuthorization(["manager", "employee"]), (req, res, next) =>
  refundsController.show(req, res, next),
);

export { refundsRoutes };
