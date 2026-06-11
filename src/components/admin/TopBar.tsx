"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function TopBar({ title }: { title?: string }) {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-sm font-semibold tracking-tight">
            Studio dashboard
          </Link>
          {title ? (
            <>
              <span className="text-neutral-300">/</span>
              <span className="text-sm text-neutral-600">{title}</span>
            </>
          ) : null}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-500 transition hover:text-neutral-900"
          >
            View site
          </a>
          <button
            onClick={logout}
            className="rounded-md border border-neutral-300 px-3 py-1 text-neutral-700 transition hover:bg-neutral-100"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
