import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useArticle from "../../hooks/useArticle";
import dayjs from "dayjs";
import { DetailArticleSkeleton } from "../../components/ui";
import relativeTime from "dayjs/plugin/relativeTime";
import ArticleInformation from "./components/ArticleInformation";
import ArticleComments from "./components/ArticleComments";
dayjs.extend(relativeTime);

const ArticleDetailPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams();
  const { detailArticle, getDetailArticle } = useArticle();

  const prepData = async () => {
    if (id) {
      await getDetailArticle(id);
      setLoading(false);
    }
  };

  useEffect(() => {
    prepData();
  }, [id]);

  return (
    <>
      {loading ? (
        <DetailArticleSkeleton />
      ) : (
        <div className="flex flex-col sm:flex-row gap-8 mt-5 pb-8">
          <div className="w-full sm:w-4/12">
            <img
              className="w-full h-auto object-cover rounded-md cursor-pointer"
              src={
                detailArticle?.cover_image_url || "https://placehold.co/600x400"
              }
            />
          </div>
          <div className="w-full sm:w-8/12">
            <ArticleInformation data={detailArticle} />
            {detailArticle && (
              <div className="mt-8">
                <ArticleComments article={detailArticle} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleDetailPage;
