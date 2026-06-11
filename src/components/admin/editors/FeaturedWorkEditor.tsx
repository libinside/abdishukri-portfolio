"use client";

import type { FeaturedWork } from "@/content/types";
import { CollectionEditor } from "../CollectionEditor";
import { ImageInput } from "../ImageInput";
import { Field, TextInput, TextArea } from "../ui";

function emptyFeatured(): FeaturedWork {
  return {
    title: "",
    platform: "",
    date: new Date().getFullYear().toString(),
    description: "",
    url: "",
    image: { src: "", alt: "", caption: "", orientation: "landscape" },
  };
}

export function FeaturedWorkEditor() {
  return (
    <CollectionEditor<FeaturedWork>
      typeKey="featured-work"
      itemNoun="feature"
      newItem={emptyFeatured}
      itemTitle={(f) => f.title}
      renderForm={(f, onChange) => (
        <>
          <Field label="Title">
            <TextInput value={f.title} onChange={(e) => onChange({ ...f, title: e.target.value })} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Platform / publication">
              <TextInput value={f.platform} onChange={(e) => onChange({ ...f, platform: e.target.value })} />
            </Field>
            <Field label="Date">
              <TextInput value={f.date} onChange={(e) => onChange({ ...f, date: e.target.value })} />
            </Field>
          </div>
          <Field label="Link URL" hint="Where this feature lives online.">
            <TextInput
              value={f.url}
              placeholder="https://..."
              onChange={(e) => onChange({ ...f, url: e.target.value })}
            />
          </Field>
          <Field label="Description">
            <TextArea rows={3} value={f.description} onChange={(e) => onChange({ ...f, description: e.target.value })} />
          </Field>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Thumbnail image</p>
            <ImageInput value={f.image} onChange={(image) => onChange({ ...f, image })} />
          </div>
        </>
      )}
    />
  );
}
