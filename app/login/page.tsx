'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, Trees } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error || 'Unable to sign in. Please check your credentials.');
        return;
      }

      // Preserve the destination requested before authentication.
      const params = new URLSearchParams(window.location.search);
      const requestedPath = params.get('from');

      // Only allow internal paths. Never redirect to an external URL.
      const destination =
        requestedPath && requestedPath.startsWith('/')
          ? requestedPath
          : '/dashboard';

      router.push(destination);
      router.refresh();
    } catch {
      setError('Something went wrong while signing in. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-7">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-700 text-white shadow-sm">
            <Trees className="h-7 w-7" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Jeevan Chetna Foundation
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Community Activity Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-subtle">
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <LockKeyhole className="h-5 w-5 text-forest-700" />

              <h2 className="text-xl font-bold text-slate-900">
                Admin Login
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-slate-500">
              Sign in to access the administration dashboard and manage
              community activity records.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="admin@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-forest-600 focus:ring-2 focus:ring-forest-100"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900 outline-none transition focus:border-forest-600 focus:ring-2 focus:ring-forest-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-forest-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Security note */}
          <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest-700" />

            <p className="text-[11px] leading-relaxed text-slate-500">
              This area is restricted to authorized Foundation
              administrators. Please do not share your login credentials.
            </p>
          </div>
        </div>

        {/* Back to website */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-forest-700 transition hover:text-forest-900"
          >
            ← Back to Foundation website
          </Link>
        </div>
      </div>
    </main>
  );
}