"use client";

import type { GalleryProject } from "@/content/types";
import { CollectionEditor } from "../CollectionEditor";
import { ImageInput, MultiImageInput } from "../ImageInput";
import { StringList } from "../StringList";
import { Field, TextInput, TextArea } from "../ui";
import { slugify } from "../slug";

function emptyGallery(): GalleryProject {
  return {
    slug: "",
    title: "",
    location: "",
    year: new Date().getFullYear().toString(),
    description: "",
    cover: { src: "", alt: "", caption: "", orientation: "landscape" },
    images: [],
    tags: [],
  };
}

export function GalleriesEditor() {
  return (
    <CollectionEditor<GalleryProject>
      typeKey="galleries"
      itemNoun="gallery"
      newItem={emptyGallery}
      itemTitle={(g) => g.title}
      renderForm={(g, onChange) => (
        <>
          <Field label="Title">
            <TextInput
              value={g.title}
              onChange={(e) => {
                const title = e.target.value;
                const autoSlug = !g.slug || g.slug === slugify(g.title);
                onChange({ ...g, title, slug: autoSlug ? slugify(title) : g.slug });
              }}
            />
          </Field>
          <Field label="Slug" hint="Used in the URL: /work/your-slug">
            <TextInput value={g.slug} onChange={(e) => onChange({ ...g, slug: slugify(e.target.value) })} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Location">
              <TextInput value={g.location} onChange={(e) => onChange({ ...g, location: e.target.value })} />
            </Field>
            <Field label="Year">
              <TextInput value={g.year} onChange={(e) => onChange({ ...g, year: e.target.value })} />
            </Field>
          </div>
          <Field label="Description">
            <TextArea rows={3} value={g.description} onChange={(e) => onChange({ ...g, description: e.target.value })} />
          </Field>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Cover image</p>
            <ImageInput value={g.cover} onChange={(cover) => onChange({ ...g, cover })} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Gallery images</p>
            <MultiImageInput value={g.images} onChange={(images) => onChange({ ...g, images })} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Tags</p>
            <StringList
              value={g.tags}
              onChange={(tags) => onChange({ ...g, tags })}
              placeholder="e.g. Documentary"
              addLabel="+ Add tag"
            />
          </div>
        </>
      )}
    />
  );
}
