import { IProduct, ProductModel } from "../../core/entities/ProductModel";

export const getProductRepository = async (_id: string): Promise<IProduct | null> => {
  const product: IProduct | null = await ProductModel.findOne({ _id });
  return product;
};

export const getPopularProductsRepository = async () => {
  const products = await ProductModel.find();
  return products;
};
