import { useSearchStore } from "~/store/useSearchStore";
import { useJobStore } from "~/store/useJobStore";
import { trpc } from "~/utils/trpc";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const SearchBar: React.FC = () => {
  const { query, setQuery, location, setLocation } = useSearchStore();
  const { setCurrentPage } = useJobStore();
  const { refetch } = trpc.client.getJobs.useQuery(
    { limit: 10, page: 1, query, location },
    { enabled: false }
  );

  const handleSearch = () => {
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="flex flex-col md:flex-row items-center border rounded-lg shadow-md w-full md:w-[1000px] p-2 bg-white space-y-2 md:space-y-0 mx-8">
      <div className="flex items-center w-full">
        <FaSearch className="text-gray-500" />
        <Input
          type="text"
          placeholder="Job title or keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="border-none focus:ring-0 focus:outline-none px-2 shadow-none rounded-lg w-full"
        />
      </div>

      <div className="hidden md:block h-7 w-px bg-gray-300 mx-2"></div>

      <div className="flex items-center w-full">
        <FaMapMarkerAlt className="text-gray-500" />
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border-none focus:ring-0 focus:outline-none px-2 shadow-none rounded-lg w-full"
        />
      </div>

      <Button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
