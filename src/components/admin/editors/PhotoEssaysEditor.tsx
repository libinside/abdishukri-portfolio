"use client";

import type { EssayBlock, ImageAsset, PhotoEssay } from "@/content/types";
import { CollectionEditor } from "../CollectionEditor";
import { ImageInput } from "../ImageInput";
import { Button, Field, TextInput, TextArea } from "../ui";
import { slugify } from "../slug";

function emptyImage(): ImageAsset {
  return { src: "", alt: "", caption: "", orientation: "landscape" };
}

function emptyEssay(): PhotoEssay {
  return {
    slug: "",
    title: "",
    subtitle: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    location: "",
    readingTime: "5 min read",
    description: "",
    heroImage: emptyImage(),
    blocks: [{ type: "paragraph", text: "" }],
  };
}

function newBlock(type: EssayBlock["type"]): EssayBlock {
  if (type === "image") return { type: "image", image: emptyImage() };
  if (type === "pullquote") return { type: "pullquote", text: "" };
  return { type: "paragraph", text: "" };
}

function BlockList({
  blocks,
  onChange,
}: {
  blocks: EssayBlock[];
  onChange: (next: EssayBlock[]) => void;
}) {
  function update(i: number, b: EssayBlock) {
    const copy = [...blocks];
    copy[i] = b;
    onChange(copy);
  }
  function remove(i: number) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const t = i + dir;
    if (t < 0 || t >= blocks.length) return;
    const copy = [...blocks];
    [copy[i], copy[t]] = [copy[t], copy[i]];
    onChange(copy);
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <div key={i} className="rounded-md border border-neutral-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {block.type} block
            </span>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => move(i, 1)}
                disabled={i === blocks.length - 1}
              >
                ↓
              </Button>
              <Button type="button" variant="danger" onClick={() => remove(i)}>
                ✕
              </Button>
            </div>
          </div>

          {block.type === "paragraph" ? (
            <TextArea
              rows={3}
              value={block.text}
              placeholder="Paragraph text..."
              onChange={(e) => update(i, { type: "paragraph", text: e.target.value })}
            />
          ) : null}

          {block.type === "pullquote" ? (
            <TextArea
              rows={2}
              value={block.text}
              placeholder="A short, emphasized quote..."
              onChange={(e) => update(i, { type: "pullquote", text: e.target.value })}
            />
          ) : null}

          {block.type === "image" ? (
            <ImageInput
              value={block.image}
              onChange={(image) => update(i, { type: "image", image })}
            />
          ) : null}
        </div>
      ))}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-neutral-500">Add block:</span>
        <Button type="button" variant="secondary" onClick={() => onChange([...blocks, newBlock("paragraph")])}>
          Paragraph
        </Button>
        <Button type="button" variant="secondary" onClick={() => onChange([...blocks, newBlock("image")])}>
          Image
        </Button>
        <Button type="button" variant="secondary" onClick={() => onChange([...blocks, newBlock("pullquote")])}>
          Pullquote
        </Button>
      </div>
    </div>
  );
}

export function PhotoEssaysEditor() {
  return (
    <CollectionEditor<PhotoEssay>
      typeKey="photo-essays"
      itemNoun="essay"
      newItem={emptyEssay}
      itemTitle={(e) => e.title}
      renderForm={(essay, onChange) => (
        <>
          <Field label="Title">
            <TextInput
              value={essay.title}
              onChange={(e) => {
                const title = e.target.value;
                const autoSlug = !essay.slug || essay.slug === slugify(essay.title);
                onChange({ ...essay, title, slug: autoSlug ? slugify(title) : essay.slug });
              }}
            />
          </Field>
          <Field label="Slug" hint="Used in the URL: /photo-essays/your-slug">
            <TextInput value={essay.slug} onChange={(e) => onChange({ ...essay, slug: slugify(e.target.value) })} />
          </Field>
          <Field label="Subtitle">
            <TextArea rows={2} value={essay.subtitle} onChange={(e) => onChange({ ...essay, subtitle: e.target.value })} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field label="Date">
              <TextInput value={essay.date} onChange={(e) => onChange({ ...essay, date: e.target.value })} />
            </Field>
            <Field label="Location">
              <TextInput value={essay.location} onChange={(e) => onChange({ ...essay, location: e.target.value })} />
            </Field>
            <Field label="Reading time">
              <TextInput value={essay.readingTime} onChange={(e) => onChange({ ...essay, readingTime: e.target.value })} />
            </Field>
          </div>
          <Field label="Description" hint="Short summary for the essays list.">
            <TextArea rows={2} value={essay.description} onChange={(e) => onChange({ ...essay, description: e.target.value })} />
          </Field>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Hero image</p>
            <ImageInput value={essay.heroImage} onChange={(heroImage) => onChange({ ...essay, heroImage })} />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Essay blocks</p>
            <BlockList blocks={essay.blocks} onChange={(blocks) => onChange({ ...essay, blocks })} />
          </div>
        </>
      )}
    />
  );
}
