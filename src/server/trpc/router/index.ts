// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { pollRouter } from "./poll";
import { optionRouter } from "./option";

export const appRouter = t.router({
  auth: authRouter,
  poll: pollRouter,
  option: optionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
