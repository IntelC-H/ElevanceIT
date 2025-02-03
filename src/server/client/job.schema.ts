import { z } from "zod";

export const createJobSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  company: z.string({
    required_error: "Comapny is required",
  }),
  location: z.string({
    required_error: "Location is required",
  }),
  jobType: z.string({
    required_error: "Jobtype is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  responsibilities: z.string({
    required_error: "Responsiblities is required",
  }),
  requirements: z.string({
    required_error: "Requirement is required",
  }),
});

export const params = z.object({
  jobId: z.string(),
});

export const jobFieldsSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  location: z.string().min(1),
  jobType: z.string().min(1),
  description: z.string().min(1),
  responsibilities: z.string().min(1),
  requirements: z.string().min(1),
});

export const updateJobSchema = z.object({
  params: z.object({
    jobId: z.string().cuid("Invalid Job ID format"),
  }),
  body: jobFieldsSchema.partial(),
});

export const filterQuery = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  query: z.string().optional(),
  location: z.string().optional(),
});

export type ParamsInput = z.TypeOf<typeof params>;
export type FilterQueryInput = z.TypeOf<typeof filterQuery>;
export type CreateJobInput = z.TypeOf<typeof createJobSchema>;
export type UpdateJobInput = z.TypeOf<typeof updateJobSchema>;
