import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    env: {
      hasGoogleId: !!process.env.GOOGLE_ID,
      hasGoogleSecret: !!process.env.GOOGLE_SECRET,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      nodeEnv: process.env.NODE_ENV
    }
  });
}