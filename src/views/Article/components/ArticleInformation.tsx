import dayjs from "dayjs";
import { ArticleType } from "../../../types/ArticleTypes";
import { AvatarIcon } from "@radix-ui/react-icons";

const ArticleInformation = ({ data }: { data: ArticleType | undefined }) => {
  return (
    <div>
      <h1 className="font-medium text-3xl mb-2">{data?.title}</h1>
      <p className="my-3 text-slate-500 text-sm">{data?.description}</p>
      <div className="flex items-center gap-3 text-xs">
        <div className="text-slate-500 flex items-center gap-1 flex-wrap">
          <AvatarIcon />
          <span>{data?.user?.username}</span>
          <span>•</span>
          <span>{dayjs(data?.createdAt).format("DD MMMM YYYY")}</span>
        </div>
        <div className="text-primary">{data?.category?.name}</div>
      </div>
    </div>
  );
};

export default ArticleInformation;
