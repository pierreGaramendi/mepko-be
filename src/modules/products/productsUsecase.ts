import { IProduct } from "../../core/entities/ProductModel";
import { getProductRepository, getPopularProductsRepository } from "./productsRepository";

export const getProductUseCase = async (productId: string): Promise<IProduct | null> => {
  const product: IProduct | null = await getProductRepository(productId);
  return product;
};

export const getPopularProductsUseCase = async () => {
  const product = await getPopularProductsRepository();
  return product;
};
