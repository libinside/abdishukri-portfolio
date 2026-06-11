import type { Metadata } from "next";
import type { ReactNode } from "react";
import { aboutInfo } from "@/content/about";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${aboutInfo.logoText} | ${aboutInfo.tagline}`,
    template: `%s | ${aboutInfo.logoText}`,
  },
  description:
    "A modern, cinematic photography portfolio for Abdishukri, featuring galleries, photo essays, articles, selected publications, and contact information.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ivory text-charcoal antialiased">{children}</body>
    </html>
  );
}
