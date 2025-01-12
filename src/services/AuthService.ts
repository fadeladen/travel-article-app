import { LoginFormType } from "../views/Auth/Login/LoginForm";
import { RegisterFormType } from "../views/Auth/Register/RegisterForm";
import { BaseService } from "./AxiosService";

export async function apiSignIn(data: LoginFormType) {
  return BaseService({
    url: "/auth/local",
    method: "post",
    data,
  });
}

export async function apiRegister(data: RegisterFormType) {
    return BaseService({
      url: "/auth/local/register",
      method: "post",
      data,
    });
  }