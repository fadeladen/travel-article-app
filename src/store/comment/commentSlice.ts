import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaTypes } from "../../types/MetaTypes";
import { CommentType } from "../../types/ArticleTypes";

type CommentState = {
  dataComments: Array<CommentType>;
  metaComment: MetaTypes;
};

const initialState: CommentState = {
  dataComments: [],
  metaComment: {
    pagination: {
      page: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    onGetCommentList: (
      state,
      action: PayloadAction<{ data: Array<CommentType>; meta: MetaTypes }>
    ) => {
      state.dataComments = action.payload.data;
      state.metaComment = action.payload.meta;
    },
  },
});

export const { onGetCommentList } = commentSlice.actions;

export default commentSlice.reducer;
