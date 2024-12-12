import { FC } from "react";
import { Skeleton } from "./skeleton";

const SkeletonTable: FC = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-2 flex justify-between">
        <Skeleton className="h-4 w-1/4 bg-white/10"></Skeleton>
        <Skeleton className="h-4 w-1/4 bg-white/10"></Skeleton>
        <Skeleton className="h-4 w-1/4 bg-white/10"></Skeleton>
        <Skeleton className="h-4 w-1/4 bg-white/10"></Skeleton>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex justify-between mb-2">
          <Skeleton className="h-10 w-1/4 bg-white/10"></Skeleton>
          <Skeleton className="h-10 w-1/4 bg-white/10"></Skeleton>
          <Skeleton className="h-10 w-1/4 bg-white/10"></Skeleton>
          <Skeleton className="h-10 w-1/4 bg-white/10 "></Skeleton>
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
