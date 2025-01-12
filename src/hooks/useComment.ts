import { useSelector } from "react-redux";
import { RootState } from "../store";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  onGetCommentList,
} from "../store/comment/commentSlice";
import { CommentParams } from "../types/ArticleTypes";
import { apiGetComments } from "../services/CommentService";

const useComment = () => {
  const { metaComment, dataComments } = useSelector(
    (state: RootState) => state.comment
  );
  const [isLoadingComment, setIsLoadingComment] = useState<boolean>(true);
  const dispatch = useDispatch();

  const getComments = async (params: CommentParams) => {
    setIsLoadingComment(true);
    try {
      const { page = 1 } = params;
      const resp = await apiGetComments(params);
      const { data, meta } = resp;
      let _data = data;
      if (page > 1) {
        _data = [...dataComments, ...data];
      }
      dispatch(onGetCommentList({ data: _data, meta }));
      return { data, meta };
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error fetching data comments"
      );
    } finally {
      setIsLoadingComment(false);
    }
  };

  return {
    dataComments,
    metaComment,
    getComments,
    isLoadingComment,
  };
};

export default useComment;
