import { memo } from "react";

type Props = {
  type: string;
  value?: string;
  label?: string;
  name?: string;
  classname?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  autoComplete?: string;
  error?: string | undefined;
  disabled?: boolean;
  textArea?: boolean;
  accept?: string;
};

const Input = (props: Props) => {
  const {
    type,
    placeholder = "Type here...",
    classname = "",
    onChange,
    name,
    label,
    autoComplete = "on",
    value = "",
    error = "",
    disabled = false,
    textArea = false,
    accept,
    ...rest
  } = props;
  const defaultClass = `text-xs bg-slate-100 active:outline-none focus:outline-none rounded-lg p-3 flex-1 h-[50px]  ${
    disabled ? "opacity-50" : ""
  }`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange && onChange(e.target.value);

  return (
    <div className="w-full flex-1">
      <div className="flex flex-col gap-2">
        {label && <label className="inline-block text-xs">{label}</label>}
        {textArea ? (
          <textarea
            autoComplete={autoComplete}
            name={name}
            placeholder={placeholder}
            className={`${defaultClass} ${classname}`}
            value={value || ""}
            disabled={disabled}
            onChange={(e) => onChange && onChange(e.target.value)}
            {...rest}
          />
        ) : (
          <input
            accept={accept || undefined}
            autoComplete={autoComplete}
            type={type}
            name={name}
            placeholder={placeholder}
            className={`${defaultClass} ${classname}`}
            value={value || ""}
            disabled={disabled}
            onChange={handleChange}
            {...rest}
          />
        )}
      </div>
      {error && <p className={`text-xs text-red-600 mt-1`}>{error}</p>}
    </div>
  );
};

export default memo(Input);
