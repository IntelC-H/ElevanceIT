import { Button } from "../ui/button";
import { useJobStore } from "~/store/useJobStore";

interface PaginationProps {
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const { currentPage, setCurrentPage } = useJobStore();

  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-md"
      >
        Previous
      </Button>
      <span className="text-gray-700 font-medium">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-md"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
