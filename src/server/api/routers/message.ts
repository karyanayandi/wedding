import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { messageTable } from "@/server/db/schema"

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        content: z.string().min(1),
        voiceNote: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messageTable).values({
        name: input.name,
        content: input.content,
        ...(input.voiceNote ? { voiceNote: input.voiceNote } : {}),
      })
    }),

  getLatest: publicProcedure
    .input(z.object({ page: z.number(), perPage: z.number() }))
    .query(async ({ ctx, input }) => {
      const messages = await ctx.db.query.messageTable.findMany({
        columns: {
          id: true,
          name: true,
          content: true,
          createdAt: true,
        },
        orderBy: (messages, { desc }) => [desc(messages.createdAt)],
        limit: input.perPage,
        offset: (input.page - 1) * input.perPage,
      })

      return messages ?? null
    }),

  count: publicProcedure.query(async ({ ctx }) => {
    const total = await ctx.db.$count(messageTable)
    return total ?? null
  }),
})
