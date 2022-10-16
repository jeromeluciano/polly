import { z } from "zod";
import { t } from "../trpc";

export const optionRouter = t.router({
  statistics: t.procedure
    .input(
      z.object({
        optionId: z.string(),
        pollId: z.string(),
      })
    )
    .query(async ({ ctx, input: { optionId, pollId } }) => {
      // get total voter count
      //  needs to return totalPollVoterCount, optionVoteCount,
      const stats = await ctx.prisma.$transaction(async (tx) => {
        const optionVoteCount = await tx.vote.count({
          where: {
            optionId,
            pollId,
          },
        });

        const totalPollVoterCount = await tx.vote.count({
          where: {
            pollId,
          },
        });

        return {
          totalPollVoterCount,
          optionVoteCount,
        };
      });

      return stats;
    }),
});
