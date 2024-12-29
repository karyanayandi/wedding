import { sql } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const messageTable = pgTable(
  "messages",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 256 }).notNull(),
    content: varchar("content", { length: 1024 }).notNull(),
    voiceNote: varchar("voice_note", { length: 256 }),
    willAttend: varchar("will_attend", { length: 256 })
      .notNull()
      .default("hadir"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
)
