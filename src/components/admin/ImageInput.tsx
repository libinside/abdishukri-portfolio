"use client";

import { useState } from "react";
import type { ImageAsset } from "@/content/types";
import { Field, TextInput, Select, Button } from "./ui";
import { prepareImage } from "./resize";

const EMPTY: ImageAsset = { src: "", alt: "", caption: "", orientation: "landscape" };

export function ImageInput({
  label = "Image",
  value,
  onChange,
}: {
  label?: string;
  value: ImageAsset | undefined;
  onChange: (next: ImageAsset) => void;
}) {
  const image = value ?? EMPTY;
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function patch(part: Partial<ImageAsset>) {
    onChange({ ...image, ...part });
  }

  async function handleFile(file: File) {
    setError("");
    setUploading(true);
    try {
      const prepared = await prepareImage(file);
      const form = new FormData();
      form.append("file", prepared);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Upload failed.");
      } else {
        patch({ src: data.src });
      }
    } catch {
      setError("Upload failed. Check your connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
      <div className="flex items-start gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded bg-neutral-200">
          {image.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.src} alt={image.alt || "preview"} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-neutral-400">
              No image
            </div>
          )}
        </div>
        <div className="flex-1 space-y-3">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">{label}</p>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 transition hover:bg-neutral-100">
              {uploading ? "Uploading..." : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                  e.target.value = "";
                }}
              />
            </label>
            <span className="text-xs text-neutral-400">or paste a URL below</span>
          </div>
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Image URL / path">
            <TextInput
              value={image.src}
              placeholder="/photos/your-image.jpg"
              onChange={(e) => patch({ src: e.target.value })}
            />
          </Field>
        </div>
        <Field label="Alt text" hint="Describe the image for accessibility.">
          <TextInput value={image.alt} onChange={(e) => patch({ alt: e.target.value })} />
        </Field>
        <Field label="Caption (optional)">
          <TextInput
            value={image.caption ?? ""}
            onChange={(e) => patch({ caption: e.target.value })}
          />
        </Field>
        <Field label="Orientation">
          <Select
            value={image.orientation ?? "landscape"}
            onChange={(e) =>
              patch({ orientation: e.target.value as ImageAsset["orientation"] })
            }
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
            <option value="square">Square</option>
          </Select>
        </Field>
      </div>
    </div>
  );
}

export function MultiImageInput({
  value,
  onChange,
}: {
  value: ImageAsset[];
  onChange: (next: ImageAsset[]) => void;
}) {
  function update(index: number, next: ImageAsset) {
    const copy = [...value];
    copy[index] = next;
    onChange(copy);
  }
  function remove(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }
  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= value.length) return;
    const copy = [...value];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  }
  function add() {
    onChange([...value, { ...EMPTY }]);
  }

  return (
    <div className="space-y-4">
      {value.map((img, i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-500">Image {i + 1}</span>
            <div className="flex items-center gap-1">
              <Button type="button" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>
                Up
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
              >
                Down
              </Button>
              <Button type="button" variant="danger" onClick={() => remove(i)}>
                Remove
              </Button>
            </div>
          </div>
          <ImageInput label={`Image ${i + 1}`} value={img} onChange={(next) => update(i, next)} />
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={add}>
        + Add image
      </Button>
    </div>
  );
}
