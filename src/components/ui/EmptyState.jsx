import { FaSearch, FaUserSlash } from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      
      
      <div className="flex items-center gap-4 text-5xl">
        <FaUserSlash className="text-red-400" />
        <FaSearch className="text-blue-400" />
        <MdOutlineFilterAlt className="text-purple-400" />
      </div>

     
      <h3 className="text-2xl font-bold mt-6 text-gray-800">
        No Lawyers Found
      </h3>

     
      <p className="text-gray-500 mt-2 max-w-md">
        We couldn’t find any lawyers matching your search or filters. Try adjusting
        your criteria to discover more legal experts.
      </p>

      
      <div className="mt-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm">
        Tip: Try changing specialization or clearing filters
      </div>
    </div>
  );
};

export default EmptyState;