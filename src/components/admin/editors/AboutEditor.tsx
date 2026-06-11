"use client";

import { useEffect, useState } from "react";
import type { AboutInfo, SocialLink } from "@/content/types";
import { ImageInput } from "../ImageInput";
import { StringList } from "../StringList";
import { Button, Field, Select, TextInput, TextArea } from "../ui";

const SOCIAL_LABELS: SocialLink["label"][] = ["Instagram", "Facebook", "X", "LinkedIn"];

function emptyAbout(): AboutInfo {
  return {
    name: "",
    logoText: "",
    tagline: "",
    portrait: { src: "", alt: "", caption: "", orientation: "portrait" },
    bio: [""],
    approach: "",
    clients: [],
    publications: [],
    location: "",
    contact: { email: "", socials: [] },
  };
}

export function AboutEditor() {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  async function load() {
    const res = await fetch("/api/admin/content/about", { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage(data.error || "Failed to load.");
      setStatus("error");
      setAbout(emptyAbout());
      return;
    }
    const loaded = data.data && typeof data.data === "object" ? data.data : emptyAbout();
    setAbout({ ...emptyAbout(), ...loaded, contact: { ...emptyAbout().contact, ...(loaded.contact || {}) } });
    setSha(data.sha ?? null);
  }

  useEffect(() => {
    load();
  }, []);

  function patch(part: Partial<AboutInfo>) {
    setAbout((prev) => (prev ? { ...prev, ...part } : prev));
  }

  function patchContact(part: Partial<AboutInfo["contact"]>) {
    setAbout((prev) => (prev ? { ...prev, contact: { ...prev.contact, ...part } } : prev));
  }

  function updateSocial(i: number, next: SocialLink) {
    setAbout((prev) => {
      if (!prev) return prev;
      const socials = [...prev.contact.socials];
      socials[i] = next;
      return { ...prev, contact: { ...prev.contact, socials } };
    });
  }

  function addSocial() {
    setAbout((prev) =>
      prev
        ? {
            ...prev,
            contact: {
              ...prev.contact,
              socials: [
                ...prev.contact.socials,
                { label: "Instagram", url: "", ariaLabel: "" },
              ],
            },
          }
        : prev
    );
  }

  function removeSocial(i: number) {
    setAbout((prev) =>
      prev
        ? {
            ...prev,
            contact: { ...prev.contact, socials: prev.contact.socials.filter((_, idx) => idx !== i) },
          }
        : prev
    );
  }

  async function save() {
    if (!about) return;
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch("/api/admin/content/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: about, sha }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Save failed.");
        return;
      }
      setStatus("saved");
      setMessage("Saved. Your site is rebuilding and will be live shortly.");
      load();
    } catch {
      setStatus("error");
      setMessage("Network error while saving.");
    }
  }

  if (!about) return <p className="text-sm text-neutral-500">Loading...</p>;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="rounded-lg border border-neutral-200 bg-white p-6 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name">
            <TextInput value={about.name} onChange={(e) => patch({ name: e.target.value })} />
          </Field>
          <Field label="Logo text" hint="The wordmark in the header/footer.">
            <TextInput value={about.logoText} onChange={(e) => patch({ logoText: e.target.value })} />
          </Field>
        </div>
        <Field label="Tagline">
          <TextInput value={about.tagline} onChange={(e) => patch({ tagline: e.target.value })} />
        </Field>

        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-700">Portrait</p>
          <ImageInput value={about.portrait} onChange={(portrait) => patch({ portrait })} />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-700">Bio</p>
          <p className="mb-2 text-xs text-neutral-400">Each entry is a paragraph.</p>
          <StringList value={about.bio} onChange={(bio) => patch({ bio })} multiline addLabel="+ Add paragraph" />
        </div>

        <Field label="Approach">
          <TextArea rows={3} value={about.approach} onChange={(e) => patch({ approach: e.target.value })} />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Clients</p>
            <StringList value={about.clients} onChange={(clients) => patch({ clients })} addLabel="+ Add client" />
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-neutral-700">Publications</p>
            <StringList
              value={about.publications}
              onChange={(publications) => patch({ publications })}
              addLabel="+ Add publication"
            />
          </div>
        </div>

        <Field label="Location">
          <TextInput value={about.location} onChange={(e) => patch({ location: e.target.value })} />
        </Field>
      </div>

      <div className="rounded-lg border border-neutral-200 bg-white p-6 space-y-5">
        <h2 className="text-sm font-semibold text-neutral-700">Contact</h2>
        <Field label="Email">
          <TextInput value={about.contact.email} onChange={(e) => patchContact({ email: e.target.value })} />
        </Field>

        <div>
          <p className="mb-2 text-sm font-semibold text-neutral-700">Social links</p>
          <div className="space-y-4">
            {about.contact.socials.map((s, i) => (
              <div key={i} className="rounded-md border border-neutral-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-neutral-500">Link {i + 1}</span>
                  <Button type="button" variant="danger" onClick={() => removeSocial(i)}>
                    Remove
                  </Button>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="Platform">
                    <Select
                      value={s.label}
                      onChange={(e) => updateSocial(i, { ...s, label: e.target.value as SocialLink["label"] })}
                    >
                      {SOCIAL_LABELS.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </Select>
                  </Field>
                  <Field label="URL">
                    <TextInput value={s.url} onChange={(e) => updateSocial(i, { ...s, url: e.target.value })} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field label="Accessible label" hint="Screen-reader text, e.g. 'Visit on Instagram'.">
                      <TextInput
                        value={s.ariaLabel}
                        onChange={(e) => updateSocial(i, { ...s, ariaLabel: e.target.value })}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="secondary" onClick={addSocial}>
              + Add social link
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : "Save changes"}
        </Button>
        {message ? (
          <p className={`text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`}>{message}</p>
        ) : null}
      </div>
    </div>
  );
}
