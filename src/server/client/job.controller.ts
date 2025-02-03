
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

import { TRPCError } from "@trpc/server";
import {
  CreateJobInput,
  ParamsInput,
  UpdateJobInput,
} from "./job.schema";

const prisma = new PrismaClient();

export const createJobController = async ({
  input,
}: {
  input: CreateJobInput;
}) => {
  try {
    const jobdetail = await prisma.jobDetail.create({
      data: {
        title: input.title,
        company: input.company,
        location: input.location,
        jobType: input.jobType,
        description: Array.isArray(input.description) ? input.description : [input.description],
        responsibilities: Array.isArray(input.responsibilities) ? input.responsibilities : [input.responsibilities],
        requirements: Array.isArray(input.requirements) ? input.requirements : [input.requirements],
      },
    });

    return {
      status: "success",
      jobdetail,
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      const prismaError = error as PrismaClientKnownRequestError;
      if (prismaError.code === "P2025") {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Job with that title already exists",
        });
      }
    }
    throw error;
  }
};

export const updateJobController = async ({
  paramsInput,
  input,
  ctx,
}: {
  paramsInput: { jobId: string };
  input: UpdateJobInput["body"];
  ctx: { auth: any };
}) => {
  console.log("🔍 Checking Authentication:", ctx);

  if (!ctx?.auth?.userId) {
    console.error("❌ No userId found in ctx.auth:", ctx.auth);
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: ctx.auth.userId },
    });

    if (!admin) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You are not authorized to update jobs" });
    }

    const job = await prisma.jobDetail.findUnique({
      where: { id: paramsInput.jobId },
    });

    if (!job) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Job not found" });
    }

    const updatedJob = await prisma.jobDetail.update({
      where: { id: paramsInput.jobId },
      data: {
        title: input.title,
        company: input.company,
        location: input.location,
        jobType: input.jobType,
        description: Array.isArray(input.description)
          ? input.description.filter(Boolean)
          : [input.description].filter(Boolean),
        responsibilities: Array.isArray(input.responsibilities)
          ? input.responsibilities.filter(Boolean)
          : [input.responsibilities].filter(Boolean),
        requirements: Array.isArray(input.requirements)
          ? input.requirements.filter(Boolean)
          : [input.requirements].filter(Boolean),
      },
    });

    console.log("✅ Job updated successfully:", updatedJob);
    return { success: true, job: updatedJob };
  } catch (error) {
    console.error("Error updating job:", error);
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update job" });
  }
};

export const deleteJobController = async ({
  paramsInput,
  ctx,
}: {
  paramsInput: { jobId: string };
  ctx: { auth: any };
}) => {
  try {
    if (!ctx.auth.userId) {
      throw new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" });
    }

    const admin = await prisma.admin.findUnique({
      where: { id: ctx.auth.userId },
    });

    if (!admin) {
      throw new TRPCError({ code: "FORBIDDEN", message: "You are not authorized to delete jobs" });
    }

    await prisma.jobDetail.delete({
      where: { id: paramsInput.jobId },
    });

    return {
      status: "success",
      message: "Job deleted successfully",
    };
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Job with that ID not found",
        });
      }
    }
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete job" });
  }
};

export const findJobController = async ({
  paramsInput,
}: {
  paramsInput: ParamsInput;
}) => {
  try {
    const jobdetail = await prisma.jobDetail.findFirst({
      where: { id: paramsInput.jobId },
    });

    if (!jobdetail) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Job with that ID not found",
      });
    }

    return {
      status: "success",
      jobdetail,
    };
  } catch (error) {
    throw error;
  }
};

export const findAllJobsController = async ({ filterQuery }: { filterQuery: any }) => {
  const { limit = 10, page = 1, query, location } = filterQuery;

  const filters: any = {};
  if (query) {
    filters.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { hasSome: [query] } },
      { responsibilities: { hasSome: [query] } }, 
    ];
  }

  if (location) {
    filters.location = { contains: location, mode: "insensitive" };
  }

  const jobs = await prisma.jobDetail.findMany({
    where: filters,
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalJobs = await prisma.jobDetail.count({ where: filters });

  return { jobs, totalJobs };
};
