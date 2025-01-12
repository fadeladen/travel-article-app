import { CategoryForm } from "../views/Admin/CategoryPage/ModalAddCategory";
import { BaseService } from "./AxiosService";

export async function apiGetCategories(params: any) {
  const { q, sort_by, order_by, page, pageSize } = params;
  const apiParams: any = {
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
  };

  if (q) {
    apiParams["filters[name][$eqi]"] = q;
  }

  if (sort_by && order_by) {
    apiParams["sort[0]"] = `${order_by}:${sort_by}`;
  }

  return BaseService({
    url: "/categories",
    method: "get",
    params: apiParams,
  });
}

export async function apiPostCategory(data: CategoryForm) {
  return BaseService({
    url: "/categories",
    method: "post",
    data: { data },
  });
}
export async function apiPutCategory(id: string, data: CategoryForm) {
  return BaseService({
    url: `/categories/${id}`,
    method: "put",
    data: { data },
  });
}

export async function apiDeleteCategory(id: string) {
  return BaseService({
    url: `/categories/${id}`,
    method: "delete",
  });
}
