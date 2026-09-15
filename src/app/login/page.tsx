// File: src/app/login/page.tsx

"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Login failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        
        <section className="relative hidden min-h-screen overflow-hidden bg-zinc-950 lg:block">
          {/* Architectural image */}
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85"
            alt="Modern property interior"
            width="1800"
            height="1200"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/45 to-black/80" />

          {/* Content */}
          <div className="relative z-10 flex min-h-screen flex-col justify-between p-8 text-white xl:p-12">
            {/* Brand */}
            <Link
              href="/"
              className="group inline-flex w-fit items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                <Building2 className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight">
                  Property Management
                </p>

                <p className="text-xs text-white/55">
                  Rental operations platform
                </p>
              </div>
            </Link>

            {/* Main message */}
            <div className="max-w-xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-white/55">
                Welcome back
              </p>

              <h1 className="max-w-lg text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl">
                Manage properties with clarity.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/65 sm:text-base">
                Keep maintenance requests, amenities, bookings, and property
                operations organized in one professional workspace.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-white/70">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/10">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <span>Secure access to your management workspace</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xs text-white/40">
              <span>Property Management Platform</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------
            RIGHT — LOGIN FORM
        ------------------------------------------------ */}
        <section className="flex min-h-screen items-center justify-center px-5 py-8 sm:px-8 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-10 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white">
                  <Building2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Property Management
                  </p>

                  <p className="text-xs text-zinc-500">
                    Rental operations platform
                  </p>
                </div>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Secure workspace
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Sign in
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500 sm:text-base">
                Access your property management dashboard and stay on top of
                daily operations.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-900"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-900"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    className="h-12 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 pr-12 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-950 focus:bg-white focus:ring-4 focus:ring-zinc-950/5 disabled:cursor-not-allowed disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={loading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 disabled:pointer-events-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Home link */}
            <div className="mt-5 grid md:grid-cols-2 gap-5 border-t border-zinc-100 pt-6 text-center">
              <Link
                href="/register"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Register if not a member
              </Link>
              <Link
                href="/"
                className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800 focus:outline-none focus:ring-4 focus:ring-zinc-950/10 disabled:cursor-not-allowed disabled:opacity-60"
              >
                ← Back to homepage
              </Link>
            </div>

            {/* Security note */}
            <p className="mt-8 text-center text-xs leading-5 text-zinc-400">
              Your session is protected with secure authentication and
              encrypted credentials.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}