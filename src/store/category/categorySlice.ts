import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaTypes } from "../../types/MetaTypes";
import { CategoryType } from "../../types/CategoryTypes";

type CategoryState = {
  dataCategory: Array<CategoryType>;
  metaCategory: MetaTypes;
};

const initialState: CategoryState = {
  dataCategory: [],
  metaCategory: {
    pagination: {
      page: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    onGetCategoryList: (
      state,
      action: PayloadAction<{ data: Array<CategoryType>; meta: MetaTypes }>
    ) => {
      state.dataCategory = action.payload.data;
      state.metaCategory = action.payload.meta;
    },
  },
});

export const { onGetCategoryList } = categorySlice.actions;

export default categorySlice.reducer;
