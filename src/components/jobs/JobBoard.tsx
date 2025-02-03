import React from "react";
import JobList from "./JobList";
import JobDetails from "./JobDetails";
import { useJobStore } from "~/store/useJobStore";
import { useEffect } from "react";

interface ResponsiveLayoutProps {
  jobs: any[];
  totalPages: number;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ jobs, totalPages }) => {
  const { selectedJob, isMobile, setIsMobile } = useJobStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile]);

  return (
    <div className="2xl:max-w-[80rem] max-w-[70rem] mx-auto flex gap-8">
      {(!isMobile || !selectedJob) && <JobList jobs={jobs} totalPages={totalPages} />}

      {(!isMobile || selectedJob) && <JobDetails />}
    </div>
  );
};

export default ResponsiveLayout;