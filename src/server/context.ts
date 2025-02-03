import * as trpcNext from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import { inferAsyncReturnType } from "@trpc/server";
import jwt from "jsonwebtoken";

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const { req } = opts;

  console.log("Request Headers:", req.headers);

  const token = req.headers.authorization?.split(" ")[1];
  let userId = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret") as { userId: string };
      console.log('decoded', decoded, token)
      userId = decoded.userId;
    } catch {
      console.warn("❌ No valid session found in request headers");
      return { auth: null };
    }
  }
  return { auth: { userId } };

}

export type Context = inferAsyncReturnType<typeof createContext>;
