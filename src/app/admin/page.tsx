import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/guard";
import { CONTENT_TYPES } from "@/lib/admin-content";
import { TopBar } from "@/components/admin/TopBar";

export default async function AdminHome() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="font-serif text-3xl text-neutral-900">Manage your site</h1>
        <p className="mt-2 max-w-2xl text-sm text-neutral-500">
          Edit any section below. Saving commits the change to your repository and
          your site rebuilds automatically. Changes are usually live within a minute.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {CONTENT_TYPES.map((type) => (
            <Link
              key={type.key}
              href={`/admin/${type.key}`}
              className="group rounded-lg border border-neutral-200 bg-white p-5 transition hover:border-neutral-900"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-neutral-900">{type.label}</h2>
                <span className="text-neutral-300 transition group-hover:text-neutral-900">
                  &rarr;
                </span>
              </div>
              <p className="mt-2 text-sm text-neutral-500">{type.description}</p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
