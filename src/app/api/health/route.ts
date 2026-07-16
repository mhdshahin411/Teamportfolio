// Diagnostic endpoint — reports env-var visibility (booleans only) and a live
// DB connectivity probe from inside the Vercel runtime.
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  let db: { ok: boolean; count?: number; error?: string } = { ok: false };
  const started = Date.now();
  try {
    const count = await prisma.user.count();
    db = { ok: true, count };
  } catch (e) {
    db = { ok: false, error: String((e as Error)?.message ?? e).slice(0, 400) };
  }
  const dbMs = Date.now() - started;

  return Response.json({
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "unknown",
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL ?? null,
    hasDatabaseUrl: !!process.env.DATABASE_URL,
    hasDirectUrl: !!process.env.DIRECT_URL,
    // Show only the host:port of DATABASE_URL (no user/password) for debugging.
    dbHost: (process.env.DATABASE_URL ?? "").replace(/^.*@/, "").split("/")[0] || null,
    db,
    dbMs,
    node: process.version,
  });
}
