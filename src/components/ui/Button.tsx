import { ReactNode } from "react";

type Props = {
  classname?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

const Button = (props: Props) => {
  const {
    disabled = false,
    classname = "",
    onClick,
    type = "button",
    children,
  } = props;
  const defaultClass =
    "flex justify-center text-sm items-center text-white h-[42px] rounded-lg p-3 bg-primary hover:contrast-125";
  return (
    <div>
      <button
        disabled={disabled}
        type={type}
        className={`${defaultClass} ${
          disabled ? "opacity-45 cursor-not-allowed" : ""
        } ${classname}`}
        onClick={() => onClick && onClick()}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
