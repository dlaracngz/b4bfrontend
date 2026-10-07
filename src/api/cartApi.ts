import { axiosClient } from "./axiosClient";

export interface AddCartItemRequest {
  productId: string;
  quantity: number;
}

export const getCart = async () => {
  const response = await axiosClient.get("/Cart");
  return response.data;
};

export const addToCart = async (data: AddCartItemRequest) => {
  const response = await axiosClient.post("/Cart", data);
  return response.data;
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  const response = await axiosClient.put(`/Cart/${cartItemId}`, null, {
    params: {
      quantity,
    },
  });

  return response.data;
};

export const removeCartItem = async (cartItemId: string) => {
  const response = await axiosClient.delete(`/Cart/${cartItemId}`);
  return response.data;
};
