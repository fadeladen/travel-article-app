import { useCallback, useEffect, useState } from "react";
import { Button, SearchInput } from "../../../components/ui";
import toast from "react-hot-toast";
import Table from "./Table";
import { CategoryParams } from "../../../types/CategoryTypes";
import useCategory from "../../../hooks/useCategory";
import ModalAddCategory from "./ModalAddCategory";
import { Config } from "./config";

const initParams: CategoryParams = {
  page: 1,
  pageSize: 10,
  order_by: "createdAt",
  sort_by: "desc",
  q: "",
};

const CategoryPage = () => {
  const [openDialogAddCategory, setIsOpenDialogCategory] =
    useState<boolean>(false);
  const [localParams, setLocalParams] = useState<CategoryParams>(initParams);
  const { dataCategory, metaCategory, getCategory, isLoadingCategory } =
    useCategory();
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const getData = useCallback(
    async (params: CategoryParams) => {
      try {
        setLocalParams(params);
        getCategory(params).finally(() => firstLoad && setFirstLoad(false));
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
      getData(localParams);
    }
  }, [firstLoad]);

  const onCloseDialogCategory = () => {
    setIsOpenDialogCategory(false);
  };

  const afterSubmitCategory = () => {
    onCloseDialogCategory();
    getData({ ...localParams, page: 1 });
  };

  return (
    <div className="flex flex-col flex-1 gap-3">
      <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-5 md:gap-0 pb-2 border-b">
        <h2 className="text-lg font-bold">{Config.pageTitle}</h2>
        <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-3">
          <SearchInput
            params={localParams}
            getData={getData}
            className="bg-white border"
            placeholder="Search name..."
          />
          <Button
            classname="w-[130px]"
            onClick={() => setIsOpenDialogCategory(true)}
          >
            Add category
          </Button>
        </div>
      </div>
      <Table
        firstLoad={firstLoad}
        getData={getData}
        data={dataCategory}
        meta={metaCategory}
        loading={isLoadingCategory}
        params={localParams}
      />
      {openDialogAddCategory && (
        <ModalAddCategory
          data={undefined}
          isOpen={openDialogAddCategory}
          onClose={onCloseDialogCategory}
          cb={afterSubmitCategory}
        />
      )}
    </div>
  );
};

export default CategoryPage;
