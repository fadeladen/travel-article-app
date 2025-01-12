import { memo } from "react";

const CommentsSkeleton = () => {
  return (
    <div className="w-full py-4">
      <div className="animate-pulse">
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-y-4">
            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="h-2 bg-slate-300 rounded"></div>
            <div className="h-2 bg-slate-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(CommentsSkeleton);
