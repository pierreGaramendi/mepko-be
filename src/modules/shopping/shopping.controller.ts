import { Request, Response } from "express";
import crypto from "crypto";
import { getProductUseCase } from "../products/productsUsecase";
import { IProduct } from "../../core/entities/ProductModel";
const sessions: { [key: string]: any } = {};
interface SessionData {
  sessionId: string;
  productId: string;
  quantity: number;
  step: number;
  createdAt: string;
}
export const shoppingStarterController = (req: Request, res: Response) => {
  const COOKIE_LIFETIME = 24 * 60 * 60 * 1000;
  const { productId, quantity, step } = req.body;
  const sessionId = crypto.randomBytes(16).toString("hex");
  const sessionData: SessionData = {
    sessionId,
    productId,
    quantity,
    step,
    createdAt: new Date().toISOString(),
  };
  sessions[sessionId] = sessionData;

  //const cookieConfigForProfuction = process.env.NODE_ENV === "production" ? { secure: true, sameSite: "none" } : {};

  res.cookie("purchaseSession", sessionId, {
    httpOnly: true,
    maxAge: COOKIE_LIFETIME,
    signed: true,
  });
  res.status(200).json({ message: "Session started", sessionId });
};

export const shoppingQueryController = async (req: Request, res: Response) => {
  const signedCookies = req.signedCookies;
  console.log(signedCookies);
  const sessionId = signedCookies["purchaseSession"];
  console.log("sessionId:   ", sessionId);
  console.log("req.params.sessionId:    ", req.params.sessionId);
  if (!sessionId || sessionId !== req.params.sessionId) {
    return res.status(401).json({ message: "Invalid or missing session" });
  }
  const sessionData: SessionData = sessions[sessionId];
  if (!sessionData) {
    return res.status(404).json({ message: "Session not found" });
  }
  const queriedProduct: IProduct | null = await getProductUseCase(sessionData.productId);
  if (queriedProduct) {
  }
  let newSessionData = {};
  if (queriedProduct !== null) {
    const { thumbnail, name, price } = queriedProduct;
    newSessionData = { ...sessionData, price, thumbnail, name };
  } else {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.status(200).json({ ...newSessionData });
};
