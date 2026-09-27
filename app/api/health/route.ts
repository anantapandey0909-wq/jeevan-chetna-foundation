import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Lightweight readiness probe for production debugging.
 * Does not return secrets or row data.
 */
export async function GET() {
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);
  const hasJwtSecret = Boolean(
    process.env.JWT_SECRET && process.env.JWT_SECRET.trim().length >= 16
  );

  let db: 'ok' | 'error' = 'error';
  let dbDiag = 'UNKNOWN';

  try {
    await prisma.$queryRaw`SELECT 1`;
    db = 'ok';
    dbDiag = 'CONNECTED';
  } catch (error) {
    const msg = String((error as Error)?.message ?? error ?? '').toLowerCase();
    if (msg.includes('query engine') || msg.includes('libquery_engine') || msg.includes('rhel-openssl')) {
      dbDiag = 'ENGINE_NOT_FOUND';
    } else if (msg.includes("can't reach database") || msg.includes('p1001')) {
      dbDiag = 'DB_UNREACHABLE';
    } else if (msg.includes('url') || msg.includes('p1013')) {
      dbDiag = 'BAD_DATABASE_URL';
    } else if ((error as Error)?.name?.includes('PrismaClientInitializationError')) {
      dbDiag = 'PRISMA_INIT';
    }
    console.error('Health DB check failed:', {
      dbDiag,
      name: (error as Error)?.name,
      message: (error as Error)?.message,
    });
  }

  const status = db === 'ok' && hasDatabaseUrl && hasJwtSecret ? 200 : 503;

  return NextResponse.json(
    {
      ok: status === 200,
      db,
      dbDiag,
      hasDatabaseUrl,
      hasJwtSecret,
    },
    { status }
  );
}
