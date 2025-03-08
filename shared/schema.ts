import { pgTable, text, serial, integer, json, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const vocabularyProgress = pgTable("vocabulary_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  wordId: text("word_id").notNull(),
  learned: boolean("learned").notNull().default(false),
  lastReviewed: timestamp("last_reviewed"),
});

export const grammarProgress = pgTable("grammar_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  lessonId: text("lesson_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  score: integer("score"),
});

export const speakingProgress = pgTable("speaking_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  exerciseId: text("exercise_id").notNull(),
  completed: boolean("completed").notNull().default(false),
  recording: text("recording_url"),
});

export const writingProgress = pgTable("writing_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  promptId: text("prompt_id").notNull(),
  submission: text("submission"),
  feedback: text("feedback"),
});

export const insertUserSchema = createInsertSchema(users);
export const insertVocabProgressSchema = createInsertSchema(vocabularyProgress);
export const insertGrammarProgressSchema = createInsertSchema(grammarProgress);
export const insertSpeakingProgressSchema = createInsertSchema(speakingProgress);
export const insertWritingProgressSchema = createInsertSchema(writingProgress);

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type VocabularyProgress = typeof vocabularyProgress.$inferSelect;
export type GrammarProgress = typeof grammarProgress.$inferSelect;
export type SpeakingProgress = typeof speakingProgress.$inferSelect;
export type WritingProgress = typeof writingProgress.$inferSelect;