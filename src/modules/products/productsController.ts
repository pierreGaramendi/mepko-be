import { Request, Response } from "express";
import { getPopularProductsUseCase, getProductUseCase } from "./productsUsecase";
import { sanatizeID } from "../../infrastructure/utils/sanatizeID";
import { isValidObjectId } from "../../infrastructure/utils/isValidId";

export const getProductController = async (req: Request, res: Response) => {
  try {
    let { product } = req.query;
    product = product!.toString();
    if (!product) {
      return res.status(400).send("Faltan parámetros de consulta.");
    }
    if (!isValidObjectId(product)) {
      return res.status(400).send("No es un Id valido.");
    }
    const sanitizedId: string = sanatizeID(product);
    const queriedProduct = await getProductUseCase(sanitizedId);
    return res.json(queriedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

export const getPopularProductsController = async (req: Request, res: Response) => {
    try {
      const queriedProduct = await getPopularProductsUseCase();
      return res.json(queriedProduct);
    } catch (error) {
      res.status(500).json({ message: "Error", error });
    }
  };
  