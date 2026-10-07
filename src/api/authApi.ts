import { axiosClient } from "./axiosClient";

export interface LoginRequest {
  username: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const response = await axiosClient.post("/Auth/login", data);
  return response.data;
};
