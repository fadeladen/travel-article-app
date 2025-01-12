import { CellProps, Column } from "react-table";
import { ActionColumn, DataTable } from "../../../components/ui";
import { MetaTypes } from "../../../types/MetaTypes";
import { CategoryParams, CategoryType } from "../../../types/CategoryTypes";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import ModalDelete from "../../../components/ui/ModalDelete";
import ModalAddCategory from "./ModalAddCategory";
import toast from "react-hot-toast";
import { apiDeleteCategory } from "../../../services/CategoryService";
import { Config } from "./config";
import DatatableSkeleton from "../../../components/ui/Skeleton/DatatableSkeleton";

interface TableProps {
  data: CategoryType[];
  meta: MetaTypes;
  loading: boolean;
  params: CategoryParams;
  getData: (params: CategoryParams) => void;
  firstLoad: boolean;
}

type ExtendedColumn<T extends object> = Column<T> & {
  sortable?: boolean;
};

const Table = (props: TableProps) => {
  const { data, meta, loading, params, getData, firstLoad } = props;
  const [row, setRow] = useState<CategoryType | undefined>(undefined);
  const [openDialogDelete, setOpenDialogDelete] = useState<boolean>(false);
  const [openDialogEdit, setOpenDialogEdit] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const cols: ExtendedColumn<CategoryType>[] = useMemo(() => {
    const _cols: ExtendedColumn<CategoryType>[] = [];
    Config.columns.forEach((el) => {
      if (el.key === "createdAt") {
        _cols.push({
          Header: el.label,
          accessor: el.key,
          sortable: el.sortable,
          Cell: (props: CellProps<CategoryType>) => {
            const row = props.row.original;
            return row?.createdAt
              ? dayjs(row?.createdAt).format("DD/MM/YYYY HH:mm")
              : "-";
          },
        });
      } else {
        _cols.push({
          Header: el.label,
          accessor: el.key,
          sortable: el.sortable,
        });
      }
    });
    _cols.push({
      Header: "Action",
      id: "action",
      accessor: (row) => row,
      sortable: false,
      Cell: (props: CellProps<CategoryType>) => {
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
      await apiDeleteCategory(row?.documentId as string);
      toast.success("Category deleted");
      getData({ ...params, page: 1 });
      onCloseDialogDelete();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error?.message || "Error deleting data category"
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
        <ModalAddCategory
          data={row}
          isOpen={openDialogEdit}
          onClose={onCloseDialogEdit}
          cb={afterEdit}
        />
      )}
    </div>
  );
};

export default Table;
