// Client-side image downscaling. Vercel serverless functions cap request
// bodies at ~4.5 MB, and a web portfolio never needs full-resolution files.
// We resize the longest edge to MAX_EDGE and re-encode as WebP, which keeps
// images sharp on screen, fast to load, and small in the repository.

const MAX_EDGE = 2400;
const QUALITY = 0.85;

export async function prepareImage(file: File): Promise<File> {
  // Animated GIFs would lose their animation through a canvas; leave them be.
  if (file.type === "image/gif") return file;
  if (typeof window === "undefined" || !("createImageBitmap" in window)) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    const scale = Math.min(1, MAX_EDGE / Math.max(width, height));

    // Skip re-encoding when already small in both dimensions and bytes.
    if (scale === 1 && file.size <= 3_500_000) {
      bitmap.close();
      return file;
    }

    const targetW = Math.round(width * scale);
    const targetH = Math.round(height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.drawImage(bitmap, 0, 0, targetW, targetH);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", QUALITY)
    );
    if (!blob) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "");
    return new File([blob], `${baseName}.webp`, { type: "image/webp" });
  } catch {
    return file;
  }
}
