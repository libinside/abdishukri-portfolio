// Lightweight session auth for the admin dashboard.
// A single password (ADMIN_PASSWORD) unlocks the dashboard. On success we set
// an HMAC-signed, httpOnly cookie. No external auth library is used.

import { createHmac, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "abdishukri_admin";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) {
    throw new Error("Missing ADMIN_SECRET environment variable.");
  }
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

// Verify the submitted password against ADMIN_PASSWORD.
export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }
  if (typeof password !== "string" || password.length === 0) return false;
  return safeEqual(password, expected);
}

// Create a signed session token of the form "<expiry>.<signature>".
export function createSessionToken(): string {
  const expiry = String(Date.now() + SESSION_TTL_MS);
  return `${expiry}.${sign(expiry)}`;
}

// Validate a session token: correct signature and not expired.
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const expiry = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  if (!safeEqual(signature, sign(expiry))) return false;

  const expiryMs = Number(expiry);
  if (!Number.isFinite(expiryMs)) return false;
  return Date.now() < expiryMs;
}

export const SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000);
