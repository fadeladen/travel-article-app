import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import { debounce } from "lodash";
import { memo } from "react";

type Props = {
  label?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  getData: (params: any) => void;
  params: any;
};

const SearchInput = (props: Props) => {
  const {
    placeholder = "Type here...",
    className = "",
    onChange,
    getData,
    params,
    ...rest
  } = props;

  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(q: string) {
    getData({ ...params, page: 1, q });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    debounceFn(e.target.value);

  return (
    <div className="relative">
      <input
        placeholder={placeholder}
        className={classNames(
          "text-xs bg-slate-100 active:outline-none focus:outline-none w-[300px] rounded-lg p-3 pr-10 flex-1 h-10",
          className
        )}
        onChange={handleChange}
        {...rest}
      />
      <div className="absolute right-3 top-3">
        <MagnifyingGlassIcon height={18} width={18} className="text-slate-400" />
      </div>
    </div>
  );
};

export default memo(SearchInput);
