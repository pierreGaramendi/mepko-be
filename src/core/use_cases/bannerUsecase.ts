import { CreateBannerDTO, createBannerRepository, getAllBannersRepository } from "../../infrastructure/persistence/bannerRepository";
import { IBanner } from "../entities/BannerModel";

export const getAllBannersUsecase = async (): Promise<IBanner> => {
  const banners: IBanner = await getAllBannersRepository();
  return banners;
};

export const createBannerUsecase = async (bannerData: CreateBannerDTO): Promise<IBanner> => {
  const banner: IBanner = await createBannerRepository(bannerData);
  return banner;
};
