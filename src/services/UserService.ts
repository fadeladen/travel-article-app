import { BaseService } from "./AxiosService";

export async function getUserProfile() {
  return BaseService({
    url: "/users/me",
    method: "get",
  });
}
