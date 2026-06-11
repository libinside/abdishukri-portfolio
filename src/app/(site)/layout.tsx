import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}
