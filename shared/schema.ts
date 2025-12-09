import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Categories for news articles
export const categories = [
  "Entertainment",
  "Business & Tech",
  "Sports",
  "Politics",
  "Society & People",
  "Investigations",
] as const;

export type Category = (typeof categories)[number];

// Media types for articles
export const mediaTypes = ["video", "image", "audio"] as const;
export type MediaType = (typeof mediaTypes)[number];

// Articles table
export const articles = pgTable("articles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  mediaType: text("media_type").notNull(),
  mediaUrl: text("media_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertArticleSchema = createInsertSchema(articles).omit({
  id: true,
  createdAt: true,
});

export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type Article = typeof articles.$inferSelect;

// Advertisements table
export const advertisements = pgTable("advertisements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  linkUrl: text("link_url").notNull(),
  placement: text("placement").notNull(), // "sidebar" or "inline"
});

export const insertAdvertisementSchema = createInsertSchema(advertisements).omit({
  id: true,
});

export type InsertAdvertisement = z.infer<typeof insertAdvertisementSchema>;
export type Advertisement = typeof advertisements.$inferSelect;

// Users table (keeping existing)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
