import { CommentForm, CommentParams } from "../types/ArticleTypes";
import { BaseService } from "./AxiosService";

export async function apiGetComments(params: CommentParams) {
  const { articleId, page, pageSize, userId, populateArticle = false } = params;
  const apiParams: any = {
    "pagination[page]": page,
    "filters[article][documentId][$eqi]": articleId,
    "pagination[pageSize]": pageSize,
    "populate[user]": "*",
    "sort[0]": "createdAt:desc",
  };
  if (userId) {
    apiParams["filters[user][documentId][$eqi]"] = userId;
  }
  if (populateArticle) {
    apiParams["populate[article]"] = "*";
  }
  return BaseService({
    url: "/comments",
    method: "get",
    params: apiParams,
  });
}

export async function apiPostComment(data: CommentForm) {
  const params = {
    "populate[user]": "*",
  };
  return BaseService({
    url: "/comments",
    method: "post",
    data: { data },
    params,
  });
}
export async function apiPutComment(id: string, data: CommentForm) {
  return BaseService({
    url: `/comments/${id}`,
    method: "put",
    data: { data },
  });
}

export async function apiDeleteComment(id: string) {
  return BaseService({
    url: `/comments/${id}`,
    method: "delete",
  });
}
