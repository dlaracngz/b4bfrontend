import { axiosClient } from "./axiosClient";

export const getOrders = async () => {
  const response = await axiosClient.get("/Order");
  return response.data;
};

export const getOrderById = async (id: string) => {
  const response = await axiosClient.get(`/Order/${id}`);
  return response.data;
};

export const createOrder = async () => {
  const response = await axiosClient.post("/Order");
  return response.data;
};
