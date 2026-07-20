/**
 * Auth API Route (NextAuth.js v5)
 *
 * Uncomment and install next-auth to enable:
 * npm install next-auth@beta @auth/core
 */

/*
export { GET, POST } from "@/lib/auth";
*/

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Auth not configured. See src/lib/auth.ts for setup instructions." },
    { status: 501 }
  );
}

export async function POST() {
  return NextResponse.json(
    { message: "Auth not configured. See src/lib/auth.ts for setup instructions." },
    { status: 501 }
  );
}
