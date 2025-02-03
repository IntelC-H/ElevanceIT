import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { object, string, TypeOf } from "zod";
import { trpc } from "~/utils/trpc";
import { useJobStore } from "~/store/useJobStore";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

const editJobSchema = object({
  jobId: string(),
  title: string().min(1, "Title is required"),
  company: string().min(1, "Company is required"),
  location: string().min(1, "Location is required"),
  jobType: string().min(1, "Job type is required"),
  description: string().min(1, "Description is required"),
  responsibilities: string().min(1, "Responsibilities are required"),
  requirements: string().min(1, "Requirements are required"),
});

type EditJobInput = TypeOf<typeof editJobSchema>;

const EditJob: FC<{ setOpenEditModal: (open: boolean) => void }> = ({ setOpenEditModal }) => {
  const queryClient = useQueryClient();
  const { selectedJob, setSelectedJob, setOpenJobModal, setIsEditing } = useJobStore();

  useEffect(() => {
    if (!selectedJob) {
      setOpenEditModal(false);
    }
  }, [selectedJob, setOpenEditModal]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EditJobInput>({
    resolver: zodResolver(editJobSchema),
    defaultValues: selectedJob
      ? {
        ...selectedJob,
        jobId: selectedJob.id,
        description: selectedJob.description.join(", "),
        responsibilities: selectedJob.responsibilities.join(", "),
        requirements: selectedJob.requirements.join(", "),
      }
      : {},
  });

  const { isLoading, mutate: updateJob } = trpc.admin.updateJob.useMutation({
    onSuccess() {
      queryClient.invalidateQueries([["getJobs"], { limit: 10, page: 1 }]);
      toast.success("Job updated successfully");
      setOpenJobModal(false);
      setIsEditing(false);
      setSelectedJob(null);
    },
    onError(error: any) {
      toast.error(error.message || "Failed to update job");
    },
  });

  const onSubmitHandler: SubmitHandler<EditJobInput> = async (data) => {
    if (!selectedJob?.id) {
      toast.error("Job ID is missing");
      return;
    }

    console.log("Sending Job ID:", selectedJob.id, "Updated Data:", data);

    updateJob({
      params: { jobId: selectedJob.id },
      body: data,
    });
  };

  return (
    <Dialog open onOpenChange={setOpenEditModal}>
      <DialogHeader>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogDescription>Modify job details below.</DialogDescription>
      </DialogHeader>

      <Label>Job Title</Label>
      <Input {...register("title")} className="mb-2" placeholder="Job Title" />

      <Label>Company</Label>
      <Input {...register("company")} className="mb-2" placeholder="Company Name" />

      <Label>Location</Label>
      <Input {...register("location")} className="mb-2" placeholder="Location" />

      <Label>Job Type</Label>
      <Input {...register("jobType")} className="mb-2" placeholder="Job Type" />

      <Label>Job Description</Label>
      <Textarea {...register("description")} className="mb-2" placeholder="Enter description..." />

      <Label>Responsibilities</Label>
      <Textarea {...register("responsibilities")} className="mb-2" placeholder="Enter responsibilities..." />

      <Label>Requirements</Label>
      <Textarea {...register("requirements")} className="mb-2" placeholder="Enter requirements..." />

      <DialogFooter>
        <Button variant="green" onClick={handleSubmit(onSubmitHandler)} disabled={isLoading}>
          {isLoading ? "Updating..." : "Update"}
        </Button>
        <Button variant="red" onClick={() => setOpenEditModal(false)}>Cancel</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default EditJob;
