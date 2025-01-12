import { memo } from "react";

const ArticleSkeleton = () => {
  return (
    <div className="w-full mx-auto grid grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="animate-pulse flex flex-col"
        >
          <div className="rounded-md bg-slate-300 h-72 w-full"></div>
          <div
            key={item}
            className="flex-1 space-y-6 py-4"
          >
            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ArticleSkeleton);
