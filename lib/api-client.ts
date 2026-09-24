/**
 * Minimal fetch helper for the existing /api/* routes.
 *
 * Rules this helper enforces for every caller:
 * - Never swallow a failure and return stale/mock data. A non-ok response,
 *   a network error, or a malformed body all become a thrown ApiError.
 * - Every existing API route replies with either `{ success: true, ... }`
 *   or `{ error: string }`. This helper understands both shapes so pages
 *   don't have to re-implement that check themselves.
 */

export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function apiGet<T>(url: string, init?: RequestInit): Promise<T> {
  let res: Response;

  try {
    res = await fetch(url, { cache: 'no-store', ...init });
  } catch {
    throw new ApiError('Unable to reach the server. Check your connection and try again.');
  }

  let body: any = null;
  try {
    body = await res.json();
  } catch {
    // Response wasn't valid JSON - fall through, handled below.
  }

  if (!res.ok) {
    const message = (body && typeof body.error === 'string' && body.error) || `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  if (!body || body.success !== true) {
    const message = (body && typeof body.error === 'string' && body.error) || 'Unexpected response from server.';
    throw new ApiError(message, res.status);
  }

  return body as T;
}
