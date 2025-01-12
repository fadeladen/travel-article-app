import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { store } from "../store";
import { onSignOutSuccess } from "../store/auth/authSlice";

const AxiosService = axios.create({
  baseURL: import.meta.env.VITE_APP_API_HOST  || "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api",
  timeout: 20000,
});

AxiosService.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosService.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(onSignOutSuccess())
    }
    return Promise.reject(error);
  }
);

export const BaseService = async(param: AxiosRequestConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    AxiosService(param)
      .then((response) => {
        resolve(response);
      })
      .catch((errors: AxiosError) => {
        reject(errors);
      });
  });
};

export default AxiosService;
