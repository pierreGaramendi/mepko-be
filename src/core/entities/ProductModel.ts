// src/core/entities/Product.ts
import mongoose, { Document, Schema } from "mongoose";
import { faker } from "@faker-js/faker";
import { featuresDemoHtmlMinify } from "../../infrastructure/persistence/constants/mock";
// Define la interfaz para el documento de producto
export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[]; // Array de URLs de imágenes
  variants?: {
    size?: string;
    color?: string;
    [key: string]: string | undefined;
  }[];
  tags?: string[]; // Array de etiquetas
  createdAt: Date;
  updatedAt: Date;
  thumbnail: string;
  features: string;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    thumbnail: { type: String },
    features: { type: String },
    stock: { type: Number, required: true, min: 0 },
    images: { type: [String], required: true },
    variants: [
      {
        size: String,
        color: String,
      },
    ],
    tags: [String],
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);

export const insertRandomProduct = async () => {
  try {
    const randomProduct: Partial<IProduct> = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      brand: faker.commerce.productAdjective(),
      category: faker.commerce.department(),
      features: featuresDemoHtmlMinify,
      stock: faker.number.int({ min: 1, max: 20 }),
      thumbnail: faker.image.url({ width: 320, height: 320 }),
      images: [
        faker.image.url({ width: 851, height: 929 }),
        faker.image.url({ width: 851, height: 929 }),
        faker.image.url({ width: 851, height: 929 }),
      ],
    };
    const product = new ProductModel(randomProduct);
    return await product.save();
  } catch (error) {
    console.error("Error al insertar el producto:", error);
  } finally {
    mongoose.connection.close();
  }
};
