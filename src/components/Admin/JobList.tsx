import React, { useEffect } from "react";
import JobTable from "./JobTable";
import Pagination from "./Pagination";
import EditJobModal from "./Editmodal";
import EditJob from "./EditJob";
import { useJobStore } from "~/store/useJobStore";
import { useSearchStore } from "~/store/useSearchStore";
import { trpc } from "~/utils/trpc";
import { toast } from "react-toastify";
import JobModal from "../jobs/CreateModal";
import CreateJob from "../jobs/CreateJob";

const AdminPanel: React.FC = () => {
  const {
    currentPage,
    setSelectedJob,
    isEditing,
    setIsEditing,
    jobs,
    setJobs,
    deleteJob,
  } = useJobStore();

  const { openJobModal, setOpenJobModal } = useJobStore();
  const { query, location } = useSearchStore();
  const { data, refetch, isError, isLoading } = trpc.client.getJobs.useQuery(
    { limit: 10, page: currentPage, query, location },
    {
      staleTime: 0,
      keepPreviousData: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      onSuccess: (data) => setJobs(data.jobs),
    }
  );

  useEffect(() => {
    refetch();
  }, [query, location, currentPage, refetch]);

  const totalPages = data?.totalJobs ? Math.ceil(data.totalJobs / 10) : 1;
  const { mutate: deleteJobMutation } = trpc.admin.deleteJob.useMutation({
    onSuccess: () => {
      toast.success("Job deleted successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to delete job.");
    },
  });
  
  const handleDelete = async (jobId: string) => {
    deleteJobMutation({ jobId });
    deleteJob(jobId);
  };

  const handleEdit = (job: any) => {
    setSelectedJob(job);
    setIsEditing(true);
  };

  return (
    <div className="w-full">
      
      <JobTable jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} />

      <JobModal openJobModal={openJobModal} setOpenJobModal={setOpenJobModal}>
        <CreateJob setOpenJobModal={setOpenJobModal} />
      </JobModal>

      <EditJobModal openEditJobModal={isEditing} setOpenEditJobModal={setIsEditing}>
        <EditJob setOpenEditModal={setIsEditing} />
      </EditJobModal>
      <div className="mt-12"></div>
      
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default AdminPanel;
