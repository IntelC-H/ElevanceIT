import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { adminRouter } from "./admin/admin.router";
import { clientRouter } from "./client/client.router";
import { authRouter } from "./auth/auth.router";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  client: clientRouter, 
  admin: adminRouter, 
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
