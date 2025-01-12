import { memo } from "react";
import { NoDataSvg } from "../../assets/svg";

const EmptyData = () => {
  return (
    <div className="flex flex-col justify-center items-center flex-1 min-h-[300px]">
      <NoDataSvg />
      <div className="flex flex-col gap-1 items-center mt-[21px]">
        <p className="text-main-100 text-lg font-bold">No Data Available</p>
        <p className="text-slate-400">There is no data to show right now</p>
      </div>
    </div>
  );
};

export default memo(EmptyData);
