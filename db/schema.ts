import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 256 }).notNull().unique(),
  name: varchar("name", { length: 256 }).notNull(),
  category: varchar("category", { length: 32 }).notNull(), // shoes | eyewear
  subcategory: varchar("subcategory", { length: 32 }).notNull(), // sneakers | boots | heels | sunglasses | optical
  gender: varchar("gender", { length: 16 }).notNull(), // women | men | unisex
  priceCents: integer("price_cents").notNull(),
  compareAtCents: integer("compare_at_cents"),
  description: text("description").notNull().default(""),
  images: text("images").array().notNull().default([]),
  colors: text("colors").array().notNull().default([]),
  sizes: text("sizes").array().notNull().default([]),
  stock: integer("stock").notNull().default(0),
  isNew: boolean("is_new").notNull().default(false),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 256 }).notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  customerName: varchar("customer_name", { length: 256 }).notNull(),
  customerEmail: varchar("customer_email", { length: 256 }),
  customerPhone: varchar("customer_phone", { length: 64 }).notNull(),
  address: text("address").notNull(),
  country: varchar("country", { length: 32 }).notNull(), // kosovo | albania
  notes: text("notes"),
  status: varchar("status", { length: 32 }).notNull().default("pending"), // pending (awaiting delivery + cash) | paid (cash collected) | cancelled
  totalCents: integer("total_cents").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  name: varchar("name", { length: 256 }).notNull(),
  size: varchar("size", { length: 32 }),
  color: varchar("color", { length: 32 }),
  quantity: integer("quantity").notNull().default(1),
  priceCents: integer("price_cents").notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type User = typeof users.$inferSelect;
