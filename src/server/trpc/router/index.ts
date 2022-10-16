// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { pollRouter } from "./poll";

export const appRouter = t.router({
  auth: authRouter,
  poll: pollRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
