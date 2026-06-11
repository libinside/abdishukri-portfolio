"use client";

import { Button, TextArea, TextInput } from "./ui";

// Editor for an array of strings. `multiline` renders each entry as a textarea
// (used for body paragraphs); otherwise a single-line input (tags, clients).
export function StringList({
  value,
  onChange,
  multiline = false,
  placeholder,
  addLabel = "+ Add",
}: {
  value: string[];
  onChange: (next: string[]) => void;
  multiline?: boolean;
  placeholder?: string;
  addLabel?: string;
}) {
  function update(i: number, text: string) {
    const copy = [...value];
    copy[i] = text;
    onChange(copy);
  }
  function remove(i: number) {
    onChange(value.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const t = i + dir;
    if (t < 0 || t >= value.length) return;
    const copy = [...value];
    [copy[i], copy[t]] = [copy[t], copy[i]];
    onChange(copy);
  }

  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <div className="flex-1">
            {multiline ? (
              <TextArea
                rows={3}
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            ) : (
              <TextInput
                value={item}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
              />
            )}
          </div>
          <div className="flex shrink-0 flex-col gap-1 pt-1">
            <div className="flex gap-1">
              <Button type="button" variant="ghost" onClick={() => move(i, -1)} disabled={i === 0}>
                ↑
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => move(i, 1)}
                disabled={i === value.length - 1}
              >
                ↓
              </Button>
              <Button type="button" variant="danger" onClick={() => remove(i)}>
                ✕
              </Button>
            </div>
          </div>
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={() => onChange([...value, ""])}>
        {addLabel}
      </Button>
    </div>
  );
}
