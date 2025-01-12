import { ChangeEvent, memo } from "react";
import { OptionType } from "../../types/MetaTypes";

interface Props {
  value?: string;
  label?: string;
  name?: string;
  classname?: string;
  placeholder?: string;
  onChange?: (option: ChangeEvent<HTMLSelectElement>) => void;
  autoComplete?: string;
  error?: string | undefined;
  disabled?: boolean;
  options: Array<OptionType>;
}

const Select = (props: Props) => {
  const {
    placeholder = "Select",
    classname = "",
    onChange,
    name,
    label,
    value = "",
    error = "",
    disabled = false,
    options,
    ...rest
  } = props;
  const defaultClass = `text-xs w-full bg-slate-400/[.06] active:outline-none focus:outline-none rounded-lg p-3 flex-1 ${
    disabled ? "opacity-50" : ""
  }`;
  return (
    <div>
      <div className={"flex flex-col gap-2"}>
        {label && (
          <label className="inline-block text-xs w-3/12">{label}</label>
        )}
        <select
          name={name}
          className={`${defaultClass} ${classname}`}
          value={value || undefined}
          disabled={disabled}
          onChange={(option) => onChange && onChange(option)}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options?.map?.((item) => (
            <option
              value={item?.value}
              key={"key_select_" + item?.key}
            >
              {item?.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={`text-xs text-red-600 mt-1`}>{error}</p>}
    </div>
  );
};

export default memo(Select);
