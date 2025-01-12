import { useSelector } from "react-redux";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { apiGetCategories } from "../services/CategoryService";
import { onGetCategoryList } from "../store/category/categorySlice";
import { CategoryParams } from "../types/CategoryTypes";

const useCategory = () => {
  const { metaCategory, dataCategory } = useSelector(
    (state: RootState) => state.category
  );
  const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(true);
  const dispatch = useDispatch();

  const getCategory = async (params: CategoryParams) => {
    setIsLoadingCategory(true);
    try {
      const resp = await apiGetCategories(params);
      const { data, meta } = resp;
      dispatch(onGetCategoryList({ data, meta }));
      return { data, meta };
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          "Error fetching data categories"
      );
    } finally {
      setIsLoadingCategory(false);
    }
  };

  return { dataCategory, metaCategory, getCategory, isLoadingCategory };
};

export default useCategory;
