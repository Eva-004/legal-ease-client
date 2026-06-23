"use client";

import { useRouter, useSearchParams } from "next/navigation";

const LawyerPagination = ({ totalPages, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page);

    router.push(`/lawyers?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-10 gap-2">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-4 py-2 border rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => changePage(i + 1)}
          className={`px-4 py-2 rounded border cursor-pointer transition-all duration-200 ${
            currentPage === i + 1
              ? "bg-[#1E3A8A] text-white border-blue-600"
              : "hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => changePage(currentPage + 1)}
        className="px-4 py-2 border rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default LawyerPagination;