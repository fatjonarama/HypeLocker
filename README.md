# HypeLocker

Streetwear shoes + eyewear shop. Next.js 15 (App Router, TypeScript, Tailwind v4),
Drizzle ORM on Neon Postgres (serverless HTTP driver), Stripe Checkout, deployed
on Vercel.

## Stack

- **Framework:** Next.js 15, App Router, TypeScript
- **Styling:** Tailwind CSS v4, Google Fonts (Anton, Space Grotesk, Space Mono)
- **Database:** Neon Postgres via `@neondatabase/serverless` + Drizzle ORM
- **Payments:** Stripe Checkout (redirect flow) + webhook
- **Admin:** password-gated `/admin` (env var + httpOnly cookie, no full auth system)

## Local setup

1. Copy `.env.example` to `.env` and fill in the values (see the go-live guide
   for where to get each one).
2. Install dependencies: `npm install`
3. Push the schema to your database: `npm run db:push`
4. Seed products from a CSV: `npm run seed -- ./products.sample.csv`
   (use your own CSV once you have real products — see `products.sample.csv`
   for the column format)
5. Run the dev server: `npm run dev`

## Scripts

- `npm run dev` — start the dev server
- `npm run build` / `npm run start` — production build/run
- `npm run db:generate` — generate a SQL migration from `db/schema.ts`
- `npm run db:push` — push the schema directly to your database (fastest for
  getting started)
- `npm run db:migrate` — apply generated migrations
- `npm run db:studio` — open Drizzle Studio to browse your data
- `npm run seed -- path/to/products.csv` — bulk import products from CSV
  (upserts by `slug`)

## Project structure

- `app/` — routes (homepage, `/shop`, `/product/[slug]`, `/cart`,
  `/checkout/success`, `/checkout/cancel`, `/admin`, API routes)
- `db/` — Drizzle schema + client
- `lib/` — queries, Stripe client, formatting helpers
- `context/` — client-side cart & wishlist state (localStorage-backed)
- `components/` — shared UI (header, footer, marquee, product card, filters)
- `scripts/seed.ts` — CSV importer

## Admin

Visit `/admin/login` and enter the value of `ADMIN_PASSWORD`. This sets an
httpOnly cookie checked by `middleware.ts` — it's intentionally simple (no
user accounts), matching the "no full auth system" requirement.
