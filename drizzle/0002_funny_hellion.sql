ALTER TABLE "orders" ALTER COLUMN "customer_email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "country" varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "notes" text;