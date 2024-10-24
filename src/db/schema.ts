import { InferSelectModel } from "drizzle-orm"
import {
  AnyPgColumn,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core"

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  username: text("username").notNull(),
  googleId: text("google_id").notNull().unique(),
  picture: text("picture").notNull(),
})

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
})

export const notesTable = pgTable("notes", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  title: text("title"),
  directoryId: uuid("directory_id").references(() => notesDirectoryTable.id),
  s3_key: text("s3_path"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
})

export const notesDirectoryTable = pgTable("notes_directory", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  parentdirectoryId: uuid("parent_directory_id").references(
    // https://github.com/drizzle-team/drizzle-orm/issues/1607
    (): AnyPgColumn => notesDirectoryTable.id,
  ),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export type User = InferSelectModel<typeof userTable>
export type Session = InferSelectModel<typeof sessionTable>
