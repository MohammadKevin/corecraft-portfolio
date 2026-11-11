import type { Metadata } from "next";
import WorkArchive from "@/components/WorkArchive";

export const metadata: Metadata = {
  title: "Selected Work — All 07 Systems",
  description:
    "Explore all production fullstack, backend API, POS, and digital archive platforms engineered by Mohammad Kevin Arif Rudianto.",
  alternates: { canonical: "/work" },
};

export default function WorkIndexPage() {
  return <WorkArchive />;
}

