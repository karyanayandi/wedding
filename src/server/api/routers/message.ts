import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { messageTable } from "@/server/db/schema"

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        content: z.string().min(1),
        willAttend: z.string().min(1),
        voiceNote: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messageTable).values({
        name: input.name,
        content: input.content,
        willAttend: input.willAttend,
        ...(input.voiceNote ? { voiceNote: input.voiceNote } : {}),
      })
    }),

  getLatest: publicProcedure
    .input(
      z.object({
        limit: z.number().optional().default(50),
        cursor: z.date().optional().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.query.messageTable.findMany({
        where: (messages, { lt }) =>
          input.cursor
            ? lt(messages.updatedAt, new Date(input.cursor))
            : undefined,
        limit: input.limit + 1,
        orderBy: (messages, { desc }) => [desc(messages.updatedAt)],
      })

      let nextCursor: Date | undefined = undefined

      if (data.length > input.limit) {
        const nextItem = data.pop()
        if (nextItem?.updatedAt) {
          nextCursor = nextItem.updatedAt
        }
      }

      return {
        messages: data,
        nextCursor,
      }
    }),

  count: publicProcedure.query(async ({ ctx }) => {
    const total = await ctx.db.$count(messageTable)
    return total ?? null
  }),
})
