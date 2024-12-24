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

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const messages = await ctx.db.query.messageTable.findMany({
      orderBy: (messages, { desc }) => [desc(messages.createdAt)],
    })

    return messages ?? null
  }),
})
