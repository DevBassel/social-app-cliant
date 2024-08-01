import { axiosClient } from "./api.client";
import {
  IForgetPassword,
  ILoginUset,
  IRegisterUser,
} from "./types/auth.interface";

export async function registerNewUser(data: IRegisterUser) {
  const response = await axiosClient.post("/auth/register", data);
  console.log(response.data);
  return response.data;
}

export async function LoginUser(data: ILoginUset) {
  const response = await axiosClient.post("/auth/login", data);
  console.log(response);
  return response.data;
}

export async function ForgetUserPassword(data: IForgetPassword) {
  console.log(data);
}

export async function LoginWithGoogle() {
  try {
    const response = await axiosClient.post("/auth/google");
    console.log(response);
    window.location.href = response.data;
  } catch (error) {
    console.log(error);
  }
}
