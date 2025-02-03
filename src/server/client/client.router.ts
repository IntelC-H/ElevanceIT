import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import {
  createJobController,
  deleteJobController,
  findAllJobsController,
  findJobController,
} from "./job.controller";
import {
  createJobSchema,
  filterQuery,
  params,
  updateJobSchema,
} from "./job.schema";

const t = initTRPC.create({
  transformer: superjson,
});

export const clientRouter = t.router({
  createJob: t.procedure
    .input(createJobSchema)
    .mutation(({ input }) => createJobController({ input })),
  getJob: t.procedure
    .input(params)
    .query(({ input }) => findJobController({ paramsInput: input })),
  getJobs: t.procedure
    .input(filterQuery)
    .query(({ input }) => findAllJobsController({ filterQuery: input })),
});

export type ClientRouter = typeof clientRouter;
