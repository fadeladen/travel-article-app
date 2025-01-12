import dayjs from "dayjs";
import { memo } from "react";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full">
      <div className="h-8 border-t flex-1 w-full flex justify-center items-center text-center bg-slate-100">
        <p className="text-xs text-slate-800">© {dayjs().format("YYYY")} Travel Article</p>
      </div>
    </div>
  );
};

export default memo(Footer);
