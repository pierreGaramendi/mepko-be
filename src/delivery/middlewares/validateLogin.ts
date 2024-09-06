import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

// Definir el esquema de validación
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// Middleware de validación
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = LoginSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  // Si la validación es exitosa, los datos se pueden usar en el controlador
  req.body = validationResult.data;
  next();
};
