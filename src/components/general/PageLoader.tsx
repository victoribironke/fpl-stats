import { PageLoaderProps } from "@/types/general";
import { classNames } from "@/utils/helpers";

const PageLoader = ({ type }: PageLoaderProps) => {
  return (
    <div
      className={classNames(
        "flex w-full items-center justify-center",
        type === "full" ? "h-screen" : "h-auto p-4"
      )}
    >
      <div className="w-12 h-12 z-10 rounded-full border-4 border-t-purple border-l-purple border-r-purple animate-spin" />
    </div>
  );
};

export default PageLoader;
