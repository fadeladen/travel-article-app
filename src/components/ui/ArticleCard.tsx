import { memo } from "react";
import { ArticleType } from "../../types/ArticleTypes";
import dayjs from "dayjs";
import {
  AvatarIcon,
  ChatBubbleIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface Props {
  data: ArticleType;
  onOpenModalComments?: (article: ArticleType) => void;
}

const ArticleCard = ({ data, onOpenModalComments }: Props) => {
  const navigate = useNavigate();

  const handleClickLink = () => {
    if (data?.documentId) navigate(`/article/${data.documentId}`);
  };

  return (
    <div
      key={data?.id}
      className="flex flex-col gap-2"
    >
      <div>
        <img
          onClick={handleClickLink}
          className="w-full h-72 object-cover rounded-md cursor-pointer"
          src={data?.cover_image_url || "https://placehold.co/600x400"}
        />
      </div>
      <div className="flex-1 text-xs">
        <div className="text-slate-500 flex items-center gap-1 flex-wrap">
          <AvatarIcon />
          <span>{data?.user?.username}</span>
          <span>•</span>
          <span>{dayjs(data?.createdAt).format("DD MMMM YYYY")}</span>
        </div>
        <h3
          onClick={handleClickLink}
          className="text-lg font-medium mt-3 line-clamp-2 text-slate-800 cursor-pointer hover:underline"
        >
          {data.title}
        </h3>
        <p className="line-clamp-2 text-slate-500 mt-1">{data.description}</p>
      </div>
      <div className="flex items-center gap-4 justify-between w-full">
        <div className="text-xs w-full flex items-center gap-2">
          {data?.category?.name && (
            <>
              <span className="text-primary font-medium capitalize">
                {data?.category?.name}
              </span>
              <span>•</span>
            </>
          )}
          <div
            className="cursor-pointer flex items-center"
            onClick={() => onOpenModalComments?.(data)}
          >
            <ChatBubbleIcon
              className="mr-2"
              width={16}
              height={16}
            />
            <span>{data?.comments?.length}</span>
          </div>
        </div>
        <div>
          <Button
            onClick={handleClickLink}
            classname="text-xs bg-transparent hover:!bg-slate-300 !h-3 !w-3 !p-4 !bg-slate-200 flex items-center justify-center"
          >
            <div>
              <ChevronRightIcon
                className="text-slate-800"
                width={16}
                height={16}
              />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ArticleCard);
