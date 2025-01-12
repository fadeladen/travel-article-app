import classNames from "classnames";
import { memo } from "react";

interface Props {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

const Pagination = (props: Props) => {
  const { page, pageCount, onChange } = props;

  const handleChange = (page: number) => {
    onChange(page);
  };

  const defaultClass = "py-2 px-4 border-r";
  const allowedClass = "cursor-pointer hover:bg-slate-100";
  const disableClass = "cursor-not-allowed text-slate-300";

  return (
    <ul className="flex rounded-md border text-sm">
      <li
        onClick={() => {
          if (page > 1) handleChange(page - 1);
        }}
        className={classNames(
          defaultClass,
          page > 1 ? allowedClass : disableClass
        )}
      >
        Previous
      </li>
      <li className={classNames(defaultClass)}>{page}</li>
      <li
        onClick={() => {
          if (page < pageCount) handleChange(page + 1);
        }}
        className={classNames(
          defaultClass,
          "border-none",
          page < pageCount ? allowedClass : disableClass
        )}
      >
        Next
      </li>
    </ul>
  );
};

export default memo(Pagination);
