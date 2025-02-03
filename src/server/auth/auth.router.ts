import { router, publicProcedure, protectedProcedure } from "../trpc";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import * as jwt from "jsonwebtoken"
const prisma = new PrismaClient();

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      const user = await prisma.admin.findUnique({
        where: { username: input.username },
        select: { id: true, password: true, clerkId: true, role: true },
      });

      if (!user || user.role !== "admin") {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(input.password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "7d" });
      console.log('token', token, user)

      return {  userId: user.id, token };
    }),
});
