import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useJobStore } from "~/store/useJobStore";

const JobDetails: React.FC = () => {
  const { selectedJob, setSelectedJob, isMobile } = useJobStore();

  if (!selectedJob) return <p className="text-gray-500 p-4">Select a job to view details</p>;

  return (
    <div
      className={`w-full md:w-2/3 mx-8 h-[80vh] md:-ml-8 bg-white border rounded-lg shadow-lg p-4 ${
        isMobile ? "relative" : "sticky top-10 overflow-y-auto"
      }`}
      style={{
        maxHeight: `calc(100vh - 80px)`,
      }}
    >
      {isMobile && (
        <button className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => setSelectedJob(null)}>
          ← Back to Jobs
        </button>
      )}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">{selectedJob.title}</h2>
          <p className="text-gray-600">{selectedJob.company}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">{selectedJob.location}</p>
          <p className="text-gray-700">{selectedJob.jobType}</p>
          <h2 className="text-gray-700 text-lg font-semibold mt-4">Job Description :</h2>
          <p className="text-gray-700 mt-2">{selectedJob.description}</p>
          <h2 className="text-gray-700 text-lg font-semibold mt-4">Responsibilities :</h2>
          <p className="text-gray-700 mt-4">{selectedJob.responsibilities}</p>
          <h2 className="text-gray-700 text-lg font-semibold mt-4">Requirements :</h2>
          <p className="text-gray-700 mt-4">{selectedJob.requirements}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
