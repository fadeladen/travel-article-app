import { memo, useState } from "react";
import {
  ArticleCard,
  BaseModal,
  Button,
  EmptyData,
} from "../../../components/ui";
import { ArticleType } from "../../../types/ArticleTypes";
import { MetaTypes } from "../../../types/MetaTypes";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import ArticleComments from "../../Article/components/ArticleComments";

type Props = {
  isLoading: boolean;
  data: Array<ArticleType>;
  meta: MetaTypes;
  onLoadMore: () => void;
};

const Articles = (props: Props) => {
  const { isLoading, onLoadMore, data, meta } = props;
  const [isOpenModalComments, setOpenModalComments] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<
    ArticleType | undefined
  >(undefined);

  const onCloseModalComments = () => {
    setSelectedArticle(undefined);
    setOpenModalComments(false);
  };

  const onOpenModalComments = (article: ArticleType) => {
    setSelectedArticle(article);
    setOpenModalComments(true);
  };

  return (
    <>
      {!data.length && !isLoading && <EmptyData />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 mt-5">
        {data?.map((item) => (
          <ArticleCard
            key={item.id}
            data={item}
            onOpenModalComments={onOpenModalComments}
          />
        ))}
      </div>
      {meta.pagination.page < meta.pagination.pageCount && (
        <div className="flex justify-center items-center mt-8">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            classname="text-sm"
          >
            Load more
          </Button>
        </div>
      )}
      {isOpenModalComments && selectedArticle && (
        <BaseModal
          onClose={onCloseModalComments}
          isOpen={isOpenModalComments}
          shouldCloseOnOverlayClick={false}
          width={800}
        >
          <div className="flex flex-col px-6 pb-8 pt-4 w-full">
            <div className="flex justify-between items-center">
              <h3 className="text-sm md:text-lg mb-3 font-medium">
                {selectedArticle?.title}
              </h3>
              <div
                onClick={onCloseModalComments}
                className="p-2 cursor-pointer"
              >
                <CrossCircledIcon
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <ArticleComments
              commentsContainerClass="overflow-y-auto max-h-[20rem]"
              article={selectedArticle}
            />
          </div>
        </BaseModal>
      )}
    </>
  );
};

export default memo(Articles);
