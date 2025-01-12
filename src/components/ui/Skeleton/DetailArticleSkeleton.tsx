import { memo } from "react";

const DetailArticleSkeleton = () => {
  return (
    <div className="w-full mx-auto">
      <div className="animate-pulse flex flex-col md:flex-row space-x-4">
        <div className="rounded-md bg-slate-300 h-72 w-full md:w-4/12"></div>
        <div className="flex-1 space-y-6 py-4">
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailArticleSkeleton);
