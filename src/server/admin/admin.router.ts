import { protectedProcedure, router } from "../trpc";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod"
import {
  createJobController,
  deleteJobController,
  findAllJobsController,
  findJobController,
  updateJobController,
} from "../client/job.controller";
import {
  createJobSchema,
  filterQuery,
  params,
  updateJobSchema,
} from "../client/job.schema";

const t = initTRPC.create({
  transformer: superjson,
});


export const adminRouter = t.router({
  createJob: t.procedure
    .input(createJobSchema)
    .mutation(({ input }) => createJobController({ input })),

  updateJob: t.procedure
    .input(updateJobSchema)
    .mutation(async ({ ctx, input }) =>
      updateJobController({
        paramsInput: input.params, input: input.body, ctx: { ...ctx, auth: (ctx as { auth: any }).auth }
      })
    ),

  deleteJob: t.procedure
    .input(z.object({ jobId: z.string() }))
    .mutation(({ ctx, input }) => deleteJobController({ paramsInput: input, ctx: { ...ctx, auth: (ctx as { auth: any }).auth } })),

  getJob: t.procedure
    .input(params)
    .query(({ input }) => findJobController({ paramsInput: input })),

  getJobs: t.procedure
    .input(filterQuery)
    .query(({ input }) => findAllJobsController({ filterQuery: input })),
});

export type AdminRouter = typeof adminRouter;
