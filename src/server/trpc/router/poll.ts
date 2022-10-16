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
      return ctx.prisma.poll.findUnique({
        where: {
          id: pollId,
        },
        include: {
          options: true,
        },
      });
    }),
});
