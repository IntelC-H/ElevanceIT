import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { trpc } from "~/utils/trpc";
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
import { useJobStore } from "~/store/useJobStore";

const createJobSchema = object({
    title: string().min(1, "Title is required"),
    company: string().min(1, "Company is required"),
    location: string().min(1, "Location is required"),
    jobType: string().min(1, "Job type is required"),
    description: string().min(1, "Description is required"),
    responsibilities: string().min(1, "Responsibilities are required"),
    requirements: string().min(1, "Requirements are required"),
});

type CreateJobInput = TypeOf<typeof createJobSchema>;

type FormFieldProps = {
    label: string;
    name: keyof CreateJobInput;
    type?: "text" | "textarea";
    register: any;
    errors: any;
};

const FormField: FC<FormFieldProps> = ({ label, name, type = "text", register, errors }) => (
    <div className="flex flex-col">
        <Label className="mt-2 mb-1">{label}</Label>
        {type === "text" ? (
            <Input {...register(name)} className="mb-2" placeholder={label} />
        ) : (
            <Textarea {...register(name)} className="mb-2" placeholder={`Enter ${label.toLowerCase()}...`} />
        )}
        {errors[name] && (
            <p className="text-red-500 text-xs italic">{errors[name]?.message as string}</p>
        )}
    </div>
);

const CreateJob: FC<{ setOpenJobModal: (open: boolean) => void }> = ({ setOpenJobModal }) => {
    const queryClient = useQueryClient();
    const { isLoading, mutate: createJob } = trpc.admin.createJob.useMutation({
        onSuccess() {
            queryClient.invalidateQueries([["getJobs"], { limit: 10, page: 1 }]);
            setOpenJobModal(false);
            toast.success("Job posted successfully");
        },
        onError(error: any) {
            setOpenJobModal(false);
            toast.error("error.message");
        },
    });

    const methods = useForm<CreateJobInput>({
        resolver: zodResolver(createJobSchema),
    });

    const { register, handleSubmit, formState: { errors } } = methods;

    const onSubmitHandler: SubmitHandler<CreateJobInput> = async (data) => {
        createJob(data);
    };

    return (
        <Dialog open onOpenChange={setOpenJobModal}>
            <DialogHeader>
                <DialogTitle>Post a Job</DialogTitle>
                <DialogDescription>Fill out the form below to post a job.</DialogDescription>
            </DialogHeader>

            <FormField label="Job Title" name="title" register={register} errors={errors} />
            <FormField label="Company" name="company" register={register} errors={errors} />
            <FormField label="Location" name="location" register={register} errors={errors} />
            <FormField label="Job Type" name="jobType" register={register} errors={errors} />
            <FormField label="Job Description" name="description" type="textarea" register={register} errors={errors} />
            <FormField label="Responsibilities" name="responsibilities" type="textarea" register={register} errors={errors} />
            <FormField label="Requirements" name="requirements" type="textarea" register={register} errors={errors} />

            <DialogFooter>
                <Button variant="green" onClick={handleSubmit(onSubmitHandler)} disabled={isLoading}>Submit</Button>
                <Button variant="red" onClick={() => setOpenJobModal(false)}>Cancel</Button>
            </DialogFooter>
        </Dialog>
    );
};

export default CreateJob;
