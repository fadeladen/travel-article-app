import { memo } from "react";

const DatatableSkeleton = () => {
  return (
    <div className="w-full pt-1">
      <div className="animate-pulse">
        <div className="flex-1 flex flex-col gap-5">
          <div className="grid grid-cols-4 gap-x-4">
            {Array.from(Array(4).keys()).map((i) => (
              <div
                key={i}
                className="h-8 bg-slate-300 rounded"
              />
            ))}
          </div>
          {Array.from(Array(10).keys()).map((idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 gap-x-4"
            >
              {Array.from(Array(4).keys()).map((i) => (
                <div
                  key={i}
                  className="h-2 bg-slate-300 rounded"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(DatatableSkeleton);
