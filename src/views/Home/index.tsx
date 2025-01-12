import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArticleSkeleton,
  Button,
  SearchInput,
  Select,
} from "../../components/ui";
import { apiGetCategories } from "../../services/CategoryService";
import Articles from "./components/Articles";
import useArticle from "../../hooks/useArticle";
import toast from "react-hot-toast";
import DashboardChart from "../../components/ui/DashboardChart";
import { OptionType } from "../../types/MetaTypes";
import { CategoryType } from "../../types/CategoryTypes";
import { ArticleParams } from "../../types/ArticleTypes";
import Hero from "./components/Hero";
import ModalAddArticle from "../Admin/ArticlePage/ModalAddArticle";

const initArticleParams: ArticleParams = {
  page: 1,
  pageSize: 8,
  loadMore: true,
  categoryName: "",
};

const HomePage = () => {
  const [openDialogAddArticle, setIsOpenDialogArticle] =
    useState<boolean>(false);
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [categories, setCategories] = useState<Array<OptionType>>([]);
  const { dataArticle, getArticle, metaArticle, isLoadingArticle } =
    useArticle();
  const [articleParams, setArticleParams] =
    useState<ArticleParams>(initArticleParams);

  const articleContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToArticles = () => {
    if (articleContainerRef.current) {
      articleContainerRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const getDataArticles = async (params: ArticleParams) => {
    setArticleParams(params);
    getArticle(params);
  };

  const fetchCategories = async () => {
    try {
      const response = await apiGetCategories({ pageSize: 100 });
      const options = response?.data?.map((category: CategoryType) => ({
        value: category.name,
        label: category.name,
        key: category.id,
      }));
      setCategories(options);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message ||
          "Error fetching data categories"
      );
    }
  };

  const handleCategoryChange = (categoryName: string) => {
    getDataArticles({ ...articleParams, categoryName });
  };

  const handleLoadMore = () => {
    getDataArticles({
      ...articleParams,
      page: metaArticle.pagination.page + 1,
    });
  };

  const onCloseDialogArticle = () => {
    setIsOpenDialogArticle(false);
  };

  const afterSubmitArticle = () => {
    onCloseDialogArticle();
    getArticle({ ...articleParams, page: 1 });
  };

  useEffect(() => {
    if (isFirstLoad) {
      const prepareData = async () => {
        try {
          await fetchCategories();
          await getArticle(articleParams);
        } finally {
          setIsFirstLoad(false);
        }
      };
      prepareData();
    }
  }, [isFirstLoad, articleParams]);

  const categoryOptions = useMemo(() => {
    return categories?.map((item) => ({
      value: item?.key,
      label: item?.label,
      key: item?.key,
    }));
  }, [categories]);

  return (
    <div className="pb-10">
      <Hero scrollToArticles={scrollToArticles} />
      <DashboardChart />
      <div ref={articleContainerRef}>
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 md:gap-0 mt-5">
          <h2 className="text-2xl font-medium">Articles</h2>
          <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-3">
            <SearchInput
              params={articleParams}
              getData={getDataArticles}
              className="bg-white border"
              placeholder="Search title..."
            />
            <Select
              classname="w-48 bg-white border"
              options={categories}
              placeholder="Select category"
              onChange={(e) => handleCategoryChange(e.target.value)}
            />
            <Button
              classname="w-[130px]"
              onClick={() => setIsOpenDialogArticle(true)}
            >
              Add article
            </Button>
          </div>
        </div>

        {isFirstLoad && isLoadingArticle && (
          <div className="py-16">
            <ArticleSkeleton />
          </div>
        )}

        {!isFirstLoad && (
          <Articles
            isLoading={isLoadingArticle}
            meta={metaArticle}
            onLoadMore={handleLoadMore}
            data={dataArticle}
          />
        )}

        {openDialogAddArticle && (
          <ModalAddArticle
            data={undefined}
            categoryOptions={categoryOptions}
            isOpen={openDialogAddArticle}
            onClose={onCloseDialogArticle}
            cb={afterSubmitArticle}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
