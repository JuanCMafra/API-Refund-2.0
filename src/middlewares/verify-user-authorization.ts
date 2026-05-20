import { NextFunction, Request, Response } from "express";
import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !role.includes(req.user.role)) {
      return next(new AppError("Unauthorized", 401))
    }

    return next()
  }
}

export { verifyUserAuthorization };
