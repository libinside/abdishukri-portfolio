import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Returns true when the current request carries a valid admin session cookie.
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  try {
    return verifySessionToken(token);
  } catch {
    return false;
  }
}
