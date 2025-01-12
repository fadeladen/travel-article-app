import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaTypes } from "../../types/MetaTypes";
import { ArticleType } from "../../types/ArticleTypes";

type ArticleState = {
  dataArticle: Array<ArticleType>;
  metaArticle: MetaTypes;
  detailArticle: ArticleType | undefined;
};

const initialState: ArticleState = {
  dataArticle: [],
  metaArticle: {
    pagination: {
      page: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
  detailArticle: undefined,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    onGetArticleList: (
      state,
      action: PayloadAction<{ data: Array<ArticleType>; meta: MetaTypes }>
    ) => {
      state.dataArticle = action.payload.data;
      state.metaArticle = action.payload.meta;
    },
    onGetArticleDetail: (
      state,
      action: PayloadAction<{ data: ArticleType }>
    ) => {
      state.detailArticle = action.payload.data;
    },
  },
});

export const { onGetArticleList, onGetArticleDetail } = articleSlice.actions;

export default articleSlice.reducer;
