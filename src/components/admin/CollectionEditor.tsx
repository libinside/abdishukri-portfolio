"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "./ui";

export function CollectionEditor<T extends object>({
  typeKey,
  itemNoun,
  newItem,
  itemTitle,
  renderForm,
}: {
  typeKey: string;
  itemNoun: string;
  newItem: () => T;
  itemTitle: (item: T) => string;
  renderForm: (item: T, onChange: (next: T) => void) => React.ReactNode;
}) {
  const [items, setItems] = useState<T[] | null>(null);
  const [sha, setSha] = useState<string | null>(null);
  const [selected, setSelected] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setMessage("");
    const res = await fetch(`/api/admin/content/${typeKey}`, { cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setStatus("error");
      setMessage(data.error || "Failed to load content.");
      setItems([]);
      return;
    }
    setItems(Array.isArray(data.data) ? data.data : []);
    setSha(data.sha ?? null);
  }, [typeKey]);

  useEffect(() => {
    load();
  }, [load]);

  function updateItem(index: number, next: T) {
    setItems((prev) => {
      if (!prev) return prev;
      const copy = [...prev];
      copy[index] = next;
      return copy;
    });
  }

  function addItem() {
    setItems((prev) => {
      const next = [...(prev ?? []), newItem()];
      setSelected(next.length - 1);
      return next;
    });
  }

  function deleteItem(index: number) {
    setItems((prev) => {
      if (!prev) return prev;
      const copy = prev.filter((_, i) => i !== index);
      setSelected((s) => Math.max(0, Math.min(s, copy.length - 1)));
      return copy;
    });
  }

  function moveItem(index: number, dir: -1 | 1) {
    setItems((prev) => {
      if (!prev) return prev;
      const t = index + dir;
      if (t < 0 || t >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[t]] = [copy[t], copy[index]];
      setSelected(t);
      return copy;
    });
  }

  async function save() {
    if (!items) return;
    setStatus("saving");
    setMessage("");
    try {
      const res = await fetch(`/api/admin/content/${typeKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: items, sha }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Save failed.");
        return;
      }
      setStatus("saved");
      setMessage("Saved. Your site is rebuilding and will be live shortly.");
      // Refresh sha for the next save.
      load();
    } catch {
      setStatus("error");
      setMessage("Network error while saving.");
    }
  }

  if (items === null) {
    return <p className="text-sm text-neutral-500">Loading {itemNoun}s...</p>;
  }

  const current = items[selected];

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-700">All {itemNoun}s</h2>
          <Button type="button" variant="secondary" onClick={addItem}>
            + New
          </Button>
        </div>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i}>
              <button
                onClick={() => setSelected(i)}
                className={`w-full truncate rounded-md px-3 py-2 text-left text-sm transition ${
                  i === selected
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                {itemTitle(item) || `Untitled ${itemNoun}`}
              </button>
            </li>
          ))}
          {items.length === 0 ? (
            <li className="px-3 py-2 text-sm text-neutral-400">No {itemNoun}s yet.</li>
          ) : null}
        </ul>
      </aside>

      <section>
        {current ? (
          <div className="rounded-lg border border-neutral-200 bg-white p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => moveItem(selected, -1)}
                  disabled={selected === 0}
                >
                  Move up
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => moveItem(selected, 1)}
                  disabled={selected === items.length - 1}
                >
                  Move down
                </Button>
              </div>
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  if (confirm(`Delete this ${itemNoun}? This cannot be undone after saving.`)) {
                    deleteItem(selected);
                  }
                }}
              >
                Delete {itemNoun}
              </Button>
            </div>
            <div className="space-y-5">
              {renderForm(current, (next) => updateItem(selected, next))}
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500">
            No {itemNoun} selected. Create one with &ldquo;+ New&rdquo;.
          </div>
        )}

        <div className="mt-6 flex items-center gap-4">
          <Button type="button" onClick={save} disabled={status === "saving"}>
            {status === "saving" ? "Saving..." : "Save changes"}
          </Button>
          {message ? (
            <p
              className={`text-sm ${
                status === "error" ? "text-red-600" : "text-green-700"
              }`}
            >
              {message}
            </p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
