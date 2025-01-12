import { CellProps, Column } from "react-table";
import { ActionColumn, DataTable } from "../../../components/ui";
import { MetaTypes, OptionType } from "../../../types/MetaTypes";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import ModalDelete from "../../../components/ui/ModalDelete";
import toast from "react-hot-toast";
import { Config } from "./config";
import { ArticleParams, ArticleType } from "../../../types/ArticleTypes";
import { apiDeleteArticle } from "../../../services/ArticleService";
import ModalAddArticle from "./ModalAddArticle";
import { get } from "lodash";
import DatatableSkeleton from "../../../components/ui/Skeleton/DatatableSkeleton";

interface TableProps {
  data: ArticleType[];
  meta: MetaTypes;
  loading: boolean;
  params: ArticleParams;
  getData: (params: ArticleParams) => void;
  categoryOptions: OptionType[];
  firstLoad?: boolean;
}

type ExtendedColumn<T extends object> = Column<T> & {
  sortable?: boolean;
};

const Table = (props: TableProps) => {
  const { data, meta, loading, params, getData, categoryOptions, firstLoad } =
    props;
  const [row, setRow] = useState<ArticleType | undefined>(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const cols: ExtendedColumn<ArticleType>[] = useMemo(() => {
    const _cols: ExtendedColumn<ArticleType>[] = [];
    Config.columns.forEach((el) => {
      if (el.key === "createdAt") {
        _cols.push({
          Header: el.label,
          accessor: el.key,
          sortable: el.sortable,
          Cell: (props: CellProps<ArticleType>) => {
            const row = props.row.original;
            return row?.createdAt
              ? dayjs(row?.createdAt).format("DD/MM/YYYY HH:mm")
              : "-";
          },
        });
      } else if (el.key === "cover_image_url") {
        _cols.push({
          Header: el.label,
          accessor: el.key,
          sortable: el.sortable,
          Cell: (props: CellProps<ArticleType>) => {
            const row = props.row.original;
            return (
              <img
                src={row?.cover_image_url}
                className="w-auto h-16 rounded-md object-cover"
              />
            );
          },
        });
      } else {
        _cols.push({
          Header: el.label,
          accessor: el.key,
          sortable: el.sortable,
          Cell: (props: CellProps<ArticleType>) => {
            const row = props.row.original;
            const value = get(row, el.key) || "";
            return <div>{value as string}</div>;
          },
        });
      }
    });
    _cols.push({
      Header: "Action",
      id: "action",
      accessor: (row) => row,
      sortable: false,
      Cell: (props: CellProps<ArticleType>) => {
        return (
          <ActionColumn
            row={props.row.original}
            setRow={setRow}
            setOpenDialogDelete={setOpenDialogDelete}
            setOpenDialogEdit={setOpenDialogEdit}
          />
        );
      },
    });
    return _cols;
  }, [data]);

  const handleSort = ({
    sort_by,
    order_by,
  }: {
    sort_by: string;
    order_by: string;
  }) => {
    getData({
      ...params,
      page: 1,
      sort_by,
      order_by,
    });
  };

  const handlePaginationChange = (page: number) => {
    getData({
      ...params,
      page,
    });
  };

  const onCloseDialogDelete = () => {
    setRow(undefined);
    setOpenDialogDelete(false);
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      await apiDeleteArticle(row?.documentId as string);
      toast.success("Article deleted");
      getData({ ...params, page: 1 });
      onCloseDialogDelete();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error deleting data Article"
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  const onCloseDialogEdit = () => {
    setRow(undefined);
    setOpenDialogEdit(false);
  };

  const afterEdit = () => {
    onCloseDialogEdit();
    getData({ ...params, page: 1 });
  };

  return (
    <div>
      {firstLoad ? (
        <DatatableSkeleton />
      ) : (
        <DataTable
          data={data}
          columns={cols}
          meta={meta}
          loading={loading}
          sort={{ sort_by: params.sort_by, order_by: params.order_by }}
          onSort={handleSort}
          metaPagination={meta.pagination}
          handleChangePagination={handlePaginationChange}
        />
      )}

      {openDialogDelete && (
        <ModalDelete
          isOpen={openDialogDelete}
          onClose={onCloseDialogDelete}
          onConfirm={handleDelete}
          loading={loadingDelete}
        />
      )}
      {openDialogEdit && (
        <ModalAddArticle
          data={row}
          isOpen={openDialogEdit}
          onClose={onCloseDialogEdit}
          cb={afterEdit}
          categoryOptions={categoryOptions}
        />
      )}
    </div>
  );
};

export default Table;
