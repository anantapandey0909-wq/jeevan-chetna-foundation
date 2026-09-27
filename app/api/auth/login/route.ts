import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken, SESSION_COOKIE_NAME } from '@/lib/auth';
import { loginSchema } from '@/lib/validations';

function classifyAuthError(error: unknown): string {
  const msg = String((error as Error)?.message ?? error ?? '').toLowerCase();
  const name = String((error as Error)?.name ?? '');

  if (msg.includes('query engine') || msg.includes('libquery_engine') || msg.includes('rhel-openssl')) {
    return 'ENGINE_NOT_FOUND';
  }
  if (msg.includes("can't reach database") || msg.includes('p1001') || msg.includes('connect econnrefused')) {
    return 'DB_UNREACHABLE';
  }
  if (msg.includes('p1013') || msg.includes('invalid') && msg.includes('url') || msg.includes('the url must start')) {
    return 'BAD_DATABASE_URL';
  }
  if (msg.includes('jwt_secret') || name.includes('JWT')) {
    return 'JWT_SECRET';
  }
  if (msg.includes('does not exist') && msg.includes('table')) {
    return 'TABLE_MISSING';
  }
  if (name.includes('PrismaClientInitializationError')) {
    return 'PRISMA_INIT';
  }
  return 'UNKNOWN';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;

    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const token = await signToken({
      userId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    const err = error as Error & { code?: string; clientVersion?: string };
    const diag = classifyAuthError(error);
    console.error('Login error:', {
      diag,
      name: err?.name,
      message: err?.message,
      code: err?.code,
      clientVersion: err?.clientVersion,
      hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
      hasJwtSecret: Boolean(process.env.JWT_SECRET && process.env.JWT_SECRET.length >= 16),
    });
    // diag helps identify infrastructure issues without leaking secrets
    return NextResponse.json(
      {
        error: 'Internal server error occurred during authentication.',
        diag,
      },
      { status: 500 }
    );
  }
}
