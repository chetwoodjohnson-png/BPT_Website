import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "Latest News | Building Performance Technologies",
  "News, announcements, and product updates from Building Performance Technologies. Follow BPMS™, BPMSField™, and FluxSense Analyzer™ developments.",
  "/latest-news",
  undefined,
  [
    "BPT news",
    "energy audit updates",
    "BPMS announcements",
    "building performance news",
  ]
);

export default function LatestNewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
