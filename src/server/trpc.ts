import { initTRPC } from "@trpc/server";
import { type Context } from "./context"; 
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth || !ctx.auth.userId) {
    throw new Error("Unauthorized");
  }
  return next({
    ctx: {
      ...ctx,
      userId: ctx.auth.userId, 
    },
  });
});
