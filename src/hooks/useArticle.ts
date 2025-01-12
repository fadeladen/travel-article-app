import { useSelector } from "react-redux";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { apiGetArticle, apiShowArticle } from "../services/ArticleService";
import { ArticleParams } from "../types/ArticleTypes";
import { useDispatch } from "react-redux";
import {
  onGetArticleDetail,
  onGetArticleList,
} from "../store/article/articleSlice";
import { useState } from "react";

const useArticle = () => {
  const { metaArticle, dataArticle, detailArticle } = useSelector(
    (state: RootState) => state.article
  );
  const [isLoadingArticle, setIsLoadingArticle] = useState<boolean>(true);
  const dispatch = useDispatch();

  const getArticle = async (params: ArticleParams) => {
    setIsLoadingArticle(true);
    try {
      const resp = await apiGetArticle(params);
      const { loadMore = false, page } = params;
      const { data, meta } = resp;
      let _data = data;
      if (loadMore && page > 1) {
        _data = [...dataArticle, ...data];
      }
      dispatch(onGetArticleList({ data: _data, meta }));
      return { _data, meta };
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error fetching data articles"
      );
    } finally {
      setIsLoadingArticle(false);
    }
  };

  const getDetailArticle = async (id: string) => {
    try {
      const resp = await apiShowArticle(id);
      dispatch(onGetArticleDetail(resp));
      return resp?.data;
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error fetching data article"
      );
    }
  };

  return {
    dataArticle,
    metaArticle,
    getArticle,
    isLoadingArticle,
    detailArticle,
    getDetailArticle,
  };
};

export default useArticle;
