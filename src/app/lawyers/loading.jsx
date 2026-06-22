import LawyerCardSkeleton from "@/components/ui/LawyerCardSkeleton";

export default function Loading() {
  return (
    <div className="py-10 w-11/12 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <LawyerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}