import { Request, Response } from "express";
import { createBannerUsecase, getAllBannersUsecase } from "../../core/use_cases/bannerUsecase";
import { IBanner } from "../../core/entities/BannerModel";

export const getBannersController = async (req: Request, res: Response) => {
  try {
    const banners = await getAllBannersUsecase();
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los banners", error });
  }
};

export const createBannerController = async (req: Request, res: Response) => {
  try {
    const bannerData = req.body;
    const banner: IBanner = await createBannerUsecase(bannerData);
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el banner", error });
  }
};
