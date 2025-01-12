import { memo, useEffect, useState } from "react";
import {
  Button,
  CommentsSkeleton,
  Input,
  ModalDelete,
} from "../../../components/ui";
import useComment from "../../../hooks/useComment";
import { ArticleType, CommentType } from "../../../types/ArticleTypes";
import { AvatarIcon } from "@radix-ui/react-icons";
import useAuth from "../../../hooks/useAuth";
import dayjs from "dayjs";
import {
  apiDeleteComment,
  apiPostComment,
} from "../../../services/CommentService";
import toast from "react-hot-toast";
import classNames from "classnames";

interface Props {
  article: ArticleType | undefined;
  commentsContainerClass?: string;
}

const Comment = ({
  item,
  allowedAction,
  onClickDelete,
}: {
  item: CommentType;
  allowedAction: boolean;
  onClickDelete: (id: string) => void;
}) => {
  return (
    <div
      className="flex gap-4 border-b pb-3"
      key={item?.id}
    >
      <div className="flex items-center justify-center">
        <AvatarIcon
          height={24}
          width={24}
          className="text-slate-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="font-medium text-sm">{item?.user?.username}</h5>
        <p className="text-slate-500 text-xs md:text-sm">{item?.content}</p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{item?.createdAt && dayjs(item?.createdAt).fromNow()}</span>
          {allowedAction && (
            <>
              <span>•</span>
              <span
                onClick={() => onClickDelete(item?.documentId)}
                className="cursor-pointer text-red-600 hover:text-red-700"
              >
                Delete
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ArticleComments = (props: Props) => {
  const { article, commentsContainerClass } = props;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const [commentText, setCommentText] = useState<string>("");
  const { getComments, dataComments, metaComment, isLoadingComment } =
    useComment();
  const { user } = useAuth();

  const handleLoadMore = () => {
    if (
      article &&
      metaComment.pagination.page < metaComment.pagination.pageCount
    ) {
      getComments({
        page: metaComment.pagination.page + 1,
        pageSize: 5,
        articleId: article?.documentId,
      });
    }
  };

  const onSubmitComment = async () => {
    if (article?.id) {
      setIsSubmitting(true);
      try {
        await apiPostComment({ content: commentText, article: article?.id });
        await getComments({
          page: 1,
          pageSize: 5,
          articleId: article?.documentId,
        });
        setCommentText("");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.error?.message || "Error saving data comments"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const onClickDelete = (id: string) => {
    setSelectedId(id);
    setOpenDialogDelete(true);
  };

  const onCloseDialogDelete = () => {
    setSelectedId(undefined);
    setOpenDialogDelete(false);
  };

  const handleDelete = async () => {
    if (selectedId) {
      setIsSubmitting(true);
      try {
        await apiDeleteComment(selectedId);
        await getComments({
          page: 1,
          pageSize: 5,
          articleId: article?.documentId,
        });
        onCloseDialogDelete();
        toast.success("Comment deleted");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.error?.message ||
            "Error deleting data comments"
        );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (article) {
      getComments({
        page: 1,
        pageSize: 5,
        articleId: article?.documentId,
      }).finally(() => setFirstLoad(false));
    }
  }, [article]);

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs md:text-sm">
        Comments{" "}
        <span>({firstLoad ? 0 : metaComment?.pagination?.total || 0})</span>
      </h3>
      <div className="flex gap-5 items-center">
        <Input
          placeholder="Add a comment..."
          classname="flex-1 w-full"
          type="text"
          value={commentText}
          onChange={(val) => setCommentText(val)}
        />
        <Button
          onClick={onSubmitComment}
          disabled={!commentText || isSubmitting}
          classname="w-[80px] !h-10 text-sm"
        >
          Post
        </Button>
      </div>
      {!isLoadingComment && !dataComments.length ? (
        <p className="text-center text-xs md:text-sm text-slate-500 my-5">
          No comments yet
        </p>
      ) : (
        <>
          {firstLoad && isLoadingComment ? (
            <CommentsSkeleton />
          ) : (
            <div
              className={classNames(
                "flex flex-col gap-3 mt-4",
                commentsContainerClass
              )}
            >
              {dataComments?.map((item: CommentType) => (
                <Comment
                  key={item?.id}
                  onClickDelete={onClickDelete}
                  item={item}
                  allowedAction={user?.id === item?.user?.id}
                />
              ))}
              {metaComment.pagination.page <
                metaComment.pagination.pageCount && (
                <div className="flex w-full justify-center">
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoadingComment}
                    classname="bg-transparent !text-primary w-[200px] !h-10 text-sm"
                  >
                    Load more comments
                  </Button>
                </div>
              )}
            </div>
          )}
        </>
      )}
      <ModalDelete
        onConfirm={handleDelete}
        onClose={onCloseDialogDelete}
        isOpen={openDialogDelete}
        loading={isSubmitting}
      />
    </div>
  );
};

export default memo(ArticleComments);
