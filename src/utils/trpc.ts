import { getFetch, httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import { AppRouter } from "~/server/app.router";

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc/";

    if (typeof window !== "undefined") {
      return {
        transformer: superjson,
        links: [
          httpBatchLink({
            url: "/api/trpc",
            async headers() {
              const token = localStorage.getItem("token");
              return token ? { Authorization: `Bearer ${token}` } : {};
            },
          }),
        ],
      };
    }

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      },
      headers() {
        const token = localStorage.getItem("token");
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
            Authorization: `Bearer ${token}`
          };
        }
        return token ? { Authorization: `Bearer ${token}` } : {};
      },
      links: [
        httpBatchLink({
          url,
          async headers() {
            const token = localStorage.getItem("token");
            return token ? { Authorization: `Bearer ${token}` } : {};
          },
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: true,
});
