import { FC } from "react";

const SkeletonTable: FC = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-2 flex justify-between">
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
      </div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex justify-between mb-2">
          <div className="h-10 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-10 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-10 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-10 w-1/4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
