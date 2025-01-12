import { memo, ReactNode } from "react";
import Spinner from "./Spinner";

interface Props {
  loading: boolean;
  children: ReactNode;
}

const LoadingCover = (props: Props) => {
  const { children, loading } = props;
  return (
    <div className="relative w-full h-full min-h-[calc(100vh-400px)]">
      {children}
      {loading && (
        <div className="w-full h-full bg-slate-200 bg-opacity-30 absolute inset-0" />
      )}
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default memo(LoadingCover);
