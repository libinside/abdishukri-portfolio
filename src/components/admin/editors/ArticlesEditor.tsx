"use client";

import type { Article } from "@/content/types";
import { CollectionEditor } from "../CollectionEditor";
import { ImageInput } from "../ImageInput";
import { StringList } from "../StringList";
import { Field, TextInput, TextArea } from "../ui";
import { slugify } from "../slug";

function todayLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function emptyArticle(): Article {
  return {
    slug: "",
    title: "",
    date: todayLabel(),
    category: "",
    excerpt: "",
    heroImage: { src: "", alt: "", caption: "", orientation: "landscape" },
    body: [""],
  };
}

export function ArticlesEditor() {
  return (
    <CollectionEditor<Article>
      typeKey="articles"
      itemNoun="article"
      newItem={emptyArticle}
      itemTitle={(a) => a.title}
      renderForm={(a, onChange) => (
        <>
          <Field label="Title">
            <TextInput
              value={a.title}
              onChange={(e) => {
                const title = e.target.value;
                const autoSlug = !a.slug || a.slug === slugify(a.title);
                onChange({ ...a, title, slug: autoSlug ? slugify(title) : a.slug });
              }}
            />
          </Field>
          <Field label="Slug" hint="Used in the URL: /articles/your-slug">
            <TextInput value={a.slug} onChange={(e) => onChange({ ...a, slug: slugify(e.target.value) })} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Category" hint="e.g. Process, Editorial">
              <TextInput value={a.category} onChange={(e) => onChange({ ...a, category: e.target.value })} />
            </Field>
            <Field label="Date" hint="Free text, shown as-is.">
              <TextInput value={a.date} onChange={(e) => onChange({ ...a, date: e.target.value })} />
            </Field>
          </div>
          <Field label="Excerpt" hint="Short summary shown on the articles list.">
            <TextArea rows={2} value={a.excerpt} onChange={(e) => onChange({ ...a, excerpt: e.target.value })} />
          </Field>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Hero image</p>
            <ImageInput value={a.heroImage} onChange={(heroImage) => onChange({ ...a, heroImage })} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Body</p>
            <p className="mb-2 text-xs text-neutral-400">Each entry is a paragraph.</p>
            <StringList
              value={a.body}
              onChange={(body) => onChange({ ...a, body })}
              multiline
              placeholder="Write a paragraph..."
              addLabel="+ Add paragraph"
            />
          </div>
        </>
      )}
    />
  );
}
