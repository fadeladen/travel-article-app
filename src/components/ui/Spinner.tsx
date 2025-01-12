import { memo } from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center">
      <div
        className="w-8 h-8 border-4 border-primary
                             border-t-transparent rounded-full 
                             animate-spin"
      />
    </div>
  );
};

export default memo(Spinner);
