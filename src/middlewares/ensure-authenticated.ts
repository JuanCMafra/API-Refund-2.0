import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayLoad {
  role: string;
  sub: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError("JWT token not found", 401));
    }

    const [, token] = authHeader.split(" ");

    const { role, sub: user_id } = jwt.verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayLoad;

    req.user = {
      id: user_id,
      role,
    };

    return next()
  } catch (error) {
    return next(new AppError("Invalid JWT token", 401))
  }
}

export { ensureAuthenticated };
