import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, SearchInput } from "../../../components/ui";
import toast from "react-hot-toast";
import Table from "./Table";
import { Config } from "./config";
import ModalAddArticle from "./ModalAddArticle";
import { ArticleParams } from "../../../types/ArticleTypes";
import useArticle from "../../../hooks/useArticle";
import useCategory from "../../../hooks/useCategory";

const initParams: ArticleParams = {
  page: 1,
  pageSize: 10,
  order_by: "createdAt",
  sort_by: "desc",
  q: "",
};

const ArticlePage = () => {
  const [openDialogAddArticle, setIsOpenDialogArticle] =
    useState<boolean>(false);
  const [localParams, setLocalParams] = useState<ArticleParams>(initParams);
  const { dataArticle, metaArticle, getArticle, isLoadingArticle } =
    useArticle();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);
  const { dataCategory, getCategory } = useCategory();

  const getData = useCallback(
    async (params: ArticleParams) => {
      try {
        setLocalParams(params);
        getArticle(params).finally(() => firstLoad && setFirstLoad(false));
      } catch (error: any) {
        toast.error(
          error?.response?.data?.error?.message ||
            "Error fetching data categories"
        );
      }
    },
    [localParams]
  );

  useEffect(() => {
    if (firstLoad) {
      const prepareData = async () => {
        await getCategory({ pageSize: 100 });
        await getData(localParams);
      };
      prepareData();
    }
  }, [firstLoad]);

  const onCloseDialogArticle = () => {
    setIsOpenDialogArticle(false);
  };

  const afterSubmitArticle = () => {
    onCloseDialogArticle();
    getData({ ...localParams, page: 1 });
  };

  const categoryOptions = useMemo(() => {
    return dataCategory?.map((item) => ({
      value: item?.id,
      label: item?.name,
      key: item?.id,
    }));
  }, [dataCategory]);

  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-5 md:gap-0 pb-2 border-b">
        <h2 className="text-lg font-bold">{Config.pageTitle}</h2>
        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-3">
          <SearchInput
            params={localParams}
            getData={getData}
            className="bg-white border"
            placeholder="Search title..."
          />
          <Button
            classname="w-[130px]"
            onClick={() => setIsOpenDialogArticle(true)}
          >
            Add article
          </Button>
        </div>
      </div>
      <Table
        firstLoad={firstLoad}
        getData={getData}
        data={dataArticle}
        meta={metaArticle}
        loading={isLoadingArticle}
        params={localParams}
        categoryOptions={categoryOptions}
      />
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
  );
};

export default ArticlePage;
