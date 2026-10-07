import { axiosClient } from "./axiosClient";

export const getProducts = async () => {
  const response = await axiosClient.get("/Product");
  return response.data;
};

export const searchProducts = async (search: string) => {
  const response = await axiosClient.get("/Product/search", {
    params: {
      search,
    },
  });

  return response.data;
};

export const createProduct = async (data: {
  productCode: string;
  name: string;
  price: number;
  stockQuantity: number;
  criticalStockLevel: number;
}) => {
  const response = await axiosClient.post("/Product", data);
  return response.data;
};

export const updateProduct = async (
  id: string,
  data: {
    productCode: string;
    name: string;
    price: number;
    stockQuantity: number;
    criticalStockLevel: number;
    isActive: boolean;
  },
) => {
  const response = await axiosClient.put(`/Product/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string) => {
  const response = await axiosClient.delete(`/Product/${id}`);
  return response.data;
};
