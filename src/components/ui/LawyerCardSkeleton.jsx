import { Card, Skeleton } from "@heroui/react";

const LawyerCardSkeleton = () => {
  return (
    <Card className="p-5">
      <Skeleton className="rounded-full w-16 h-16" />

      <div className="mt-4 space-y-3">
        <Skeleton className="h-5 rounded-lg w-3/4" />
        <Skeleton className="h-4 rounded-lg w-1/2" />
        <Skeleton className="h-4 rounded-lg w-1/3" />
      </div>
    </Card>
  );
};

export default LawyerCardSkeleton;