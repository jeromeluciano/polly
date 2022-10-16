import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getUrl } from "../../../utils/url";
import { authedProcedure, t } from "../trpc";

export const pollRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        question: z.string(),
        options: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input: { question, options } }) => {
      return await ctx.prisma.$transaction(async (tx) => {
        const poll = await tx.poll.create({
          data: { question: question, creatorId: ctx.session.user.id },
        });

        await tx.option.createMany({
          data: options.map((option) => ({
            name: option,
            pollId: poll.id,
          })),
        });

        return {
          url: `${getUrl()}/question/${poll.id}`,
          poll,
        };
      });
    }),
  get: t.procedure
    .input(z.object({ pollId: z.string() }))
    .query(async ({ ctx, input: { pollId } }) => {
      return await ctx.prisma.poll.findUnique({
        where: {
          id: pollId,
        },
        include: {
          options: true,
        },
      });
    }),
  vote: authedProcedure
    .input(
      z.object({
        pollId: z.string(),
        optionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userAlreadyVotedToThisPoll = await ctx.prisma.vote.findFirst({
        where: {
          voterId: ctx.session.user.id,
          pollId: input.pollId,
        },
      });

      if (userAlreadyVotedToThisPoll) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "User already voted to this poll.",
        });
      }

      return await ctx.prisma.vote.create({
        data: {
          optionId: input.optionId,
          pollId: input.pollId,
          voterId: ctx.session.user.id,
        },
      });
    }),
  alreadyVoted: authedProcedure
    .input(
      z.object({
        pollId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const voted = await ctx.prisma.vote.findFirst({
        where: {
          pollId: input.pollId,
          voterId: ctx.session.user.id,
        },
      });
      return voted ? true : false;
    }),
});
