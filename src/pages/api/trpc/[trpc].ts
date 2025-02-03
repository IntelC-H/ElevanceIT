import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "~/server/app.router";
import { createContext } from "~/server/context";

export default createNextApiHandler({
  router: appRouter,
  createContext,
});
