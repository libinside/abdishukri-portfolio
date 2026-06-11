import { notFound, redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/guard";
import { getContentType } from "@/lib/admin-content";
import { TopBar } from "@/components/admin/TopBar";
import { GalleriesEditor } from "@/components/admin/editors/GalleriesEditor";
import { PhotoEssaysEditor } from "@/components/admin/editors/PhotoEssaysEditor";
import { ArticlesEditor } from "@/components/admin/editors/ArticlesEditor";
import { FeaturedWorkEditor } from "@/components/admin/editors/FeaturedWorkEditor";
import { AboutEditor } from "@/components/admin/editors/AboutEditor";

export default async function AdminTypePage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }

  const { type } = await params;
  const config = getContentType(type);
  if (!config) notFound();

  return (
    <>
      <TopBar title={config.label} />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <h1 className="font-serif text-3xl text-neutral-900">{config.label}</h1>
          <p className="mt-1 text-sm text-neutral-500">{config.description}</p>
        </div>
        {type === "galleries" ? <GalleriesEditor /> : null}
        {type === "photo-essays" ? <PhotoEssaysEditor /> : null}
        {type === "articles" ? <ArticlesEditor /> : null}
        {type === "featured-work" ? <FeaturedWorkEditor /> : null}
        {type === "about" ? <AboutEditor /> : null}
      </main>
    </>
  );
}
