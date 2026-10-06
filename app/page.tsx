"use client";

import dynamic from "next/dynamic";
import HUD from "@/components/HUD";

const AdventureScene = dynamic(
  () => import("@/components/AdventureScene"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <AdventureScene />
      <HUD />
    </>
  );
}