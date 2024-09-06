import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// Definir el esquema de validación
const RegisterSchema = z.object({
  name: z.string({
    invalid_type_error: "El campo name debe ser una cadena de texto",
    required_error: "El campo Nombre es requerido",
  }),
  last_name: z.string({
    invalid_type_error: "El campo last_name debe ser una cadena de texto",
    required_error: "El campo Apellido es requerido",
  }),
  email: z.string().email(),
  password: z.string().min(8),
});

// Middleware de validación
export const validateRegisterPayload = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = RegisterSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({ errors: validationResult.error.errors });
  }

  // Si la validación es exitosa, los datos se pueden usar en el controlador
  req.body = validationResult.data;
  next();
};
