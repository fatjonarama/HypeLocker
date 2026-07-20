import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  name: z.string().trim().min(1).max(256),
  email: z.string().trim().email().max(256),
  password: z.string().min(8).max(256),
  website: z.string().max(0).optional(), // honeypot: real users leave this empty
});

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = rateLimit(`register:${ip}`, 5, 15 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  const parsed = bodySchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and a password of at least 8 characters" },
      { status: 400 }
    );
  }
  if (parsed.data.website) {
    // Honeypot tripped — pretend it's a normal validation error.
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const db = getDb();
  const email = parsed.data.email.toLowerCase();

  const existingRows = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existingRows.length > 0) {
    return NextResponse.json(
      { error: "An account with that email already exists" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const [user] = await db
    .insert(users)
    .values({ name: parsed.data.name, email, passwordHash })
    .returning();

  const token = await createSessionToken({
    userId: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });

  const res = NextResponse.json({ ok: true, isAdmin: user.isAdmin });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
