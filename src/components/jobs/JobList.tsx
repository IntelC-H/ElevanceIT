import React from "react";
import JobItem from "./JobItem";
import JobModal from "./CreateModal";
import CreateJob from "./CreateJob";
import { useJobStore } from "~/store/useJobStore";
import { useSearchStore } from "~/store/useSearchStore";
import { Button } from "../ui/button";

interface JobListProps {
  jobs: any[];
  totalPages: number;
}

const JobList: React.FC<JobListProps> = ({ jobs, totalPages }) => {
  const { currentPage, setCurrentPage, setSelectedJob, openJobModal, setOpenJobModal } = useJobStore();
  const { query } = useSearchStore(); 
  return (
    <div className="w-full md:w-1/3 space-y-4 mx-8">
      
      {query && (
        <p className="text-gray-700 font-medium text-center">
          Showing {jobs.length} results for "{query}"
        </p>
      )}

      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobItem key={job.id} JD={job} onSelectJob={setSelectedJob} />
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">No jobs found.</p>
      )}

      <JobModal openJobModal={openJobModal} setOpenJobModal={setOpenJobModal}>
        <CreateJob setOpenJobModal={setOpenJobModal} />
      </JobModal>

      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => {
            if (currentPage > 1) setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-md"
        >
          Previous
        </Button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => {
            if (currentPage < totalPages) {
              console.log("Moving to next page:", currentPage + 1);
              setCurrentPage(currentPage + 1);
            }
          }}
          disabled={currentPage >= totalPages}
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 px-4 py-2 rounded-md"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default JobList;
