import axiosInstance from "../api/axiosInstance";
import type {
  CreateProductRequest,
  CreateProductResponse,
  Product,
} from "../../types/product.types";

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>("/products");
  return data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data } = await axiosInstance.get<Product>(`/products/${id}`);
  return data;
};

export const createProduct = async (
  payload: CreateProductRequest,
): Promise<Product> => {
  const { data } = await axiosInstance.post<CreateProductResponse>(
    "/products",
    payload,
  );
  return { ...payload, id: data.id };
};
