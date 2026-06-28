import { generatePageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generatePageMetadata(
  "BPT News and Product Updates | BPMS, BPMSField, FluxSense",
  "Read the latest BPT announcements, release updates, and building performance insights across BPMS software, BPMSField, and FluxSense.",
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
