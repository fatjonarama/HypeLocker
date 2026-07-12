import "dotenv/config";
import { readFileSync, existsSync } from "fs";
import { parse } from "csv-parse/sync";
import { getDb } from "../db";
import { products } from "../db/schema";
import { sql } from "drizzle-orm";

type Row = {
  slug: string;
  name: string;
  category: string;
  subcategory: string;
  gender: string;
  price: string;
  compareAtPrice?: string;
  description?: string;
  images?: string;
  colors?: string;
  sizes?: string;
  stock?: string;
  isNew?: string;
  active?: string;
};

const CATEGORIES = ["shoes", "eyewear"];
const SUBCATEGORIES = ["sneakers", "boots", "heels", "sunglasses", "optical"];
const GENDERS = ["women", "men", "unisex"];

const truthy = (v: string | undefined) =>
  ["true", "1", "yes", "y"].includes((v ?? "").trim().toLowerCase());

const dollarsToCents = (v: string | undefined) => {
  if (!v || v.trim() === "") return null;
  return Math.round(parseFloat(v) * 100);
};

const splitList = (v: string | undefined) =>
  (v ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);

async function main() {
  const csvPath = process.argv[2] ?? "./products.csv";
  if (!existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    console.error(`Usage: npm run seed -- path/to/products.csv`);
    process.exit(1);
  }

  const raw = readFileSync(csvPath, "utf-8");
  const rows: Row[] = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  console.log(`Parsed ${rows.length} rows from ${csvPath}`);

  const db = getDb();

  let inserted = 0;
  let skipped = 0;

  for (const row of rows) {
    if (!row.slug || !row.name) {
      console.warn(`Skipping row missing slug/name:`, row);
      skipped++;
      continue;
    }
    if (!CATEGORIES.includes(row.category)) {
      console.warn(`Skipping "${row.slug}": invalid category "${row.category}"`);
      skipped++;
      continue;
    }
    if (!SUBCATEGORIES.includes(row.subcategory)) {
      console.warn(
        `Skipping "${row.slug}": invalid subcategory "${row.subcategory}"`
      );
      skipped++;
      continue;
    }
    if (!GENDERS.includes(row.gender)) {
      console.warn(`Skipping "${row.slug}": invalid gender "${row.gender}"`);
      skipped++;
      continue;
    }

    const priceCents = dollarsToCents(row.price);
    if (priceCents === null) {
      console.warn(`Skipping "${row.slug}": missing/invalid price`);
      skipped++;
      continue;
    }

    await db
      .insert(products)
      .values({
        slug: row.slug,
        name: row.name,
        category: row.category,
        subcategory: row.subcategory,
        gender: row.gender,
        priceCents,
        compareAtCents: dollarsToCents(row.compareAtPrice),
        description: row.description ?? "",
        images: splitList(row.images),
        colors: splitList(row.colors),
        sizes: splitList(row.sizes),
        stock: row.stock ? parseInt(row.stock, 10) : 0,
        isNew: truthy(row.isNew),
        active: row.active === undefined ? true : truthy(row.active),
      })
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: sql`excluded.name`,
          category: sql`excluded.category`,
          subcategory: sql`excluded.subcategory`,
          gender: sql`excluded.gender`,
          priceCents: sql`excluded.price_cents`,
          compareAtCents: sql`excluded.compare_at_cents`,
          description: sql`excluded.description`,
          images: sql`excluded.images`,
          colors: sql`excluded.colors`,
          sizes: sql`excluded.sizes`,
          stock: sql`excluded.stock`,
          isNew: sql`excluded.is_new`,
          active: sql`excluded.active`,
        },
      });

    inserted++;
  }

  console.log(`Done. Upserted ${inserted} products, skipped ${skipped}.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
