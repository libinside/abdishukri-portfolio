import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/guard";
import { LoginForm } from "@/components/admin/LoginForm";

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          abdishukri
        </p>
        <h1 className="mt-2 font-serif text-3xl text-neutral-900">Studio dashboard</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Enter the studio password to manage galleries, essays, articles and more.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
