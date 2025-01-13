import { Button } from "../../../components/ui";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { CommentType } from "../../../types/ArticleTypes";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const LatestComment = ({
  data,
  loading,
}: {
  data: CommentType[];
  loading: boolean;
}) => {
  const navigate = useNavigate();
  const handleClickLink = (data: CommentType) => {
    if (data?.article?.documentId)
      navigate(`/article/${data.article?.documentId}`);
  };
  return (
    <div>
      <h3 className="border-b pb-3 font-semibold px-4 mt-8 md:mt-0">
        Latest comments:
      </h3>
      <div className="flex flex-col text-xs gap-4">
        <div className="overflow-x-auto relative">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-gray-50">
              <tr>
                <th>Comment</th>
                <th>Article</th>
                <th>Created on</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loading && data.length === 0 && (
                <tr>
                  <td colSpan={100}>
                    <div className="text-center py-10">No comments yet</div>
                  </td>
                </tr>
              )}
              {data?.map((item) => (
                <tr key={item?.id}>
                  <td>{item?.content}</td>
                  <td>{item?.article?.title}</td>
                  <td>
                    {item?.createdAt
                      ? dayjs(item?.createdAt).format("DD MMMM YYYY HH:mm")
                      : "-"}
                  </td>
                  <td>
                    <Button
                      onClick={() => handleClickLink(item)}
                      classname="text-xs bg-transparent !h-3 !w-3 !p-4 hover:!bg-slate-300 !bg-slate-200 flex items-center justify-center"
                    >
                      <div>
                        <ChevronRightIcon
                          className="text-slate-800"
                          width={16}
                          height={16}
                        />
                      </div>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LatestComment;
