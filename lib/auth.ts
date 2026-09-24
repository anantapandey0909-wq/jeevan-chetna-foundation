import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const SESSION_COOKIE_NAME = 'jcf_admin_session';

const JWT_SECRET = process.env.JWT_SECRET || 'jcf-super-secret-jwt-signing-key-for-local-dev-2025';
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
}

export async function signToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secretKey);
}

export async function verifyToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function getAuthenticatedAdmin(req?: NextRequest): Promise<AdminSessionPayload | null> {
  let token: string | undefined;

  if (req) {
    // Check Authorization header first
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      // Check cookies from request
      token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    }
  } else {
    // Server Component context
    try {
      const cookieStore = await cookies();
      token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    } catch {
      return null;
    }
  }

  if (!token) return null;
  return verifyToken(token);
}
