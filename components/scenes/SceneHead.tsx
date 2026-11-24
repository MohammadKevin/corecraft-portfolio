import type { ReactNode } from "react";
import { SCENES } from "@/lib/scenes";

export function SceneHead({
  id,
  children,
}: {
  id: string;
  children?: ReactNode;
}) {
  const meta = SCENES.find((scene) => scene.id === id);
  if (!meta) return null;
  return (
    <header className="scene-head">
      <p className="scene-label">
        <span>{meta.number}</span>
        <span className="scene-label-sep">/</span>
        <span>10</span>
        <span className="scene-label-dot">·</span>
        <span>{meta.label}</span>
      </p>
      {children}
    </header>
  );
}
