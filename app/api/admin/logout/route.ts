import { NextResponse } from "next/server";

const COOKIE_NAME = "hl_admin_pw";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
