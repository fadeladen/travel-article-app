import { ArticleParams } from "../types/ArticleTypes";
import { ArticleForm } from "../views/Admin/ArticlePage/ModalAddArticle";
import { BaseService } from "./AxiosService";

export async function apiGetArticle(params: ArticleParams) {
  const { q, categoryName, sort_by, order_by, page, pageSize } = params;
  const apiParams: any = {
    "pagination[page]": page,
    "pagination[pageSize]": pageSize,
    "populate[comments][populate][user]": "*",
    "populate[user]": "*",
    "populate[category]": "*",
    "sort[0]": "createdAt:desc",
  };
  if (q) {
    apiParams["filters[title][$eqi]"] = q;
  }
  if (categoryName) {
    apiParams["filters[category][name][$eqi]"] = categoryName;
  }
  if (sort_by && order_by) {
    apiParams["sort[0]"] = `${order_by}:${sort_by}`;
  }
  return BaseService({
    url: "/articles",
    method: "get",
    params: apiParams,
  });
}

export async function apiShowArticle(id: string) {
  const params = {
    "populate[user]": "*",
    "populate[category]": "*",
    "populate[comments][populate][user]": "*",
  };
  return BaseService({
    url: `/articles/${id}`,
    method: "get",
    params,
  });
}

export async function apiPostArticle(data: ArticleForm) {
  return BaseService({
    url: "/articles",
    method: "post",
    data: { data },
  });
}

export async function apiPutArticle(id: string, data: ArticleForm) {
  return BaseService({
    url: `/articles/${id}`,
    method: "put",
    data: { data },
  });
}

export async function apiDeleteArticle(id: string) {
  return BaseService({
    url: `/articles/${id}`,
    method: "delete",
  });
}

export async function apiUpload(data: any) {
  return BaseService({
    url: "/upload",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
