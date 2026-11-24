"use client";

import { useSyncExternalStore } from "react";

type StageMode = "stage" | "flow";

let activeId = "hero";
let mode: StageMode = "flow";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setActiveScene(id: string) {
  if (id === activeId) return;
  activeId = id;
  emit();
}

export function setStageMode(next: StageMode) {
  if (next === mode) return;
  mode = next;
  emit();
}

export function useActiveScene(): string {
  return useSyncExternalStore(subscribe, () => activeId, () => "hero");
}

export function useStageModeStore(): StageMode {
  return useSyncExternalStore(subscribe, () => mode, () => "flow");
}

export function getActiveScene() {
  return activeId;
}
