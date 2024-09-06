import { BannerDocument, IBanner } from "../../core/entities/BannerModel";
export interface CreateBannerDTO {
  title: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  startDate?: Date;
  endDate?: Date;
  isActive?: boolean;
}
export const getAllBannersRepository = async (): Promise<IBanner> => {
  const banners: any = await BannerDocument.find({ isActive: true });
  return banners;
};

export const createBannerRepository = async (bannerData: CreateBannerDTO): Promise<IBanner> => {
  const banner = new BannerDocument(bannerData);
  const newBanner: IBanner = await banner.save();
  return newBanner;
};
