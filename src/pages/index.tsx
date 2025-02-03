import type { NextPage } from "next";
import { toast } from "react-toastify";
import Header from "~/components/Header";
import SearchBar from "~/components/Search";
import ResponsiveLayout from "../components/jobs/JobBoard";
import { trpc } from "~/utils/trpc";
import { useJobStore } from "~/store/useJobStore";
import { useSearchStore } from "~/store/useSearchStore";

import { useEffect } from "react";
const Home: NextPage = () => {
  const { currentPage } = useJobStore();
  const { query, location } = useSearchStore();
  const { data: jobData, isLoading, isError, refetch } = trpc.admin.getJobs.useQuery(
    { limit: 10, page: currentPage, query, location },
    {
      staleTime: 0,
      keepPreviousData: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      select: (data) => data,
      onError(err) {
        toast(err.message, { type: "error", position: "top-right" });
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [query, location, currentPage, refetch]);
  
  const totalPages = jobData?.totalJobs ? Math.ceil(jobData.totalJobs / 10) : 1;

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center my-4">
        <SearchBar />
      </div>

      {isLoading && <p className="text-center text-gray-600">Loading jobs...</p>}

      {isError && <p className="text-center text-red-500">Failed to fetch jobs.</p>}

      <ResponsiveLayout jobs={jobData?.jobs ?? []} totalPages={totalPages} />
    </div>
  );
};

export default Home;