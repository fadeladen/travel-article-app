import { useTable, Column, useSortBy } from "react-table";
import { MetaTypes, PaginationTypes } from "../../types/MetaTypes";
import LoadingCover from "./LoadingCover";
import {
  CaretDownIcon,
  CaretSortIcon,
  CaretUpIcon,
} from "@radix-ui/react-icons";
import Pagination from "./Pagination";
import EmptyData from "./EmptyData";
import DatatableSkeleton from "./Skeleton/DatatableSkeleton";

interface Props<T extends object = {}> {
  data: T[];
  columns: Column<T>[];
  meta?: MetaTypes;
  loading: boolean;
  onSort?: (val: { order_by: string; sort_by: string }) => void;
  sort: { order_by: string | undefined; sort_by: string | undefined };
  metaPagination: PaginationTypes;
  showPagination?: boolean;
  handleChangePagination: (page: number) => void;
}

const DataTable = <T extends object>(props: Props<T>) => {
  const {
    columns,
    data,
    loading,
    onSort,
    sort,
    metaPagination,
    showPagination = true,
    handleChangePagination,
  } = props;
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  const handleSortChange = (value: any) => {
    if (value) {
      onSort?.(value);
    } else {
      onSort?.({ sort_by: "createdAt", order_by: "desc" });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-x-auto relative">
        {metaPagination?.page < 1 && loading ? (
          <DatatableSkeleton />
        ) : (
          <LoadingCover loading={loading}>
            <table
              {...getTableProps()}
              className="min-w-full border-collapse text-left text-sm"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => {
                  const { key, ...restHeaderGroupProps } =
                    headerGroup.getHeaderGroupProps();
                  return (
                    <tr
                      key={key}
                      {...restHeaderGroupProps}
                    >
                      {headerGroup.headers.map((column: any) => {
                        const { key: columnKey, ...restColumnProps } =
                          column.getHeaderProps();
                        return (
                          <th
                            key={columnKey}
                            {...restColumnProps}
                            onClick={() =>
                              handleSortChange({
                                order_by: column.id,
                                sort_by:
                                  sort?.sort_by === "asc" ? "desc" : "asc",
                              })
                            }
                            className="border-b text-xs border-gray-200 px-4 py-2 font-medium text-gray-700"
                          >
                            <div className="flex items-center gap-2 cursor-pointer">
                              {column.render("Header")}
                              {column?.sortable && (
                                <div className="flex items-center">
                                  {sort?.order_by !== column.id ? (
                                    <CaretSortIcon />
                                  ) : (
                                    <>
                                      {sort?.sort_by === "asc" ? (
                                        <CaretDownIcon />
                                      ) : (
                                        <CaretUpIcon />
                                      )}
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  );
                })}
              </thead>
              <tbody {...getTableBodyProps()}>
                {!loading && !data.length && (
                  <tr>
                    <td colSpan={100}>
                      <EmptyData />
                    </td>
                  </tr>
                )}
                {rows.map((row) => {
                  prepareRow(row);
                  const { key, ...restRowProps } = row.getRowProps();
                  return (
                    <tr
                      key={key}
                      {...restRowProps}
                      className="hover:bg-gray-100"
                    >
                      {row.cells.map((cell) => {
                        const { key: cellKey, ...restCellProps } =
                          cell.getCellProps();
                        return (
                          <td
                            key={cellKey}
                            {...restCellProps}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </LoadingCover>
        )}
      </div>
      {showPagination && (
        <div className="flex justify-end gap-8 items-center">
          <p className="text-sm text-slate-600">
            {metaPagination.pageSize} entries per page
          </p>
          <Pagination
            page={metaPagination.page}
            pageCount={metaPagination.pageCount}
            onChange={handleChangePagination}
          />
          <p className="text-sm text-slate-600">
            {metaPagination.total} total entries
          </p>
        </div>
      )}
    </div>
  );
};

export default DataTable;
