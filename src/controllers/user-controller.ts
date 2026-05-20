import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import z from "zod";

class UsersController {
  async create(req: Request, res: Response, next: NextFunction) {
    const bodySchema = z.object({
      name: z.string().trim().min(2, { message: "nome é obrigatório" }),
      email: z.string().trim().email({ message: "e-mail inválido" }),
      password: z
        .string()
        .min(6, { message: "A Senha deve ter pelo menos 6 digitos!" }),
      role: z.enum(["employee", "manager"]).default("employee"),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (userWithSameEmail) {
      return next(new AppError("Já existe um usuário com esse e-mail"));
    }

    const hashedPassword = await hash(password, 8);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    return res.status(201).json();
  }
}

export { UsersController };
