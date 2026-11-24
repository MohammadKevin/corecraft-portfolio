export interface SceneMeta {
  id: string;
  number: string;
  label: string;
  /** Short label used in the navbar. */
  navLabel: string;
}

/**
 * The ten scenes, in scroll order. This is the single source of truth for the
 * stage timeline, the navbar, the progress indicator and the transition cards.
 */
export const SCENES: SceneMeta[] = [
  { id: "hero", number: "01", label: "Hero", navLabel: "Hero" },
  { id: "about", number: "02", label: "About", navLabel: "About" },
  { id: "services", number: "03", label: "Services", navLabel: "Services" },
  { id: "process", number: "04", label: "Process", navLabel: "Process" },
  { id: "stack", number: "05", label: "Stack", navLabel: "Stack" },
  { id: "work", number: "06", label: "Work", navLabel: "Work" },
  { id: "credentials", number: "07", label: "Credentials", navLabel: "Credentials" },
  { id: "experience", number: "08", label: "Experience", navLabel: "Experience" },
  { id: "education", number: "09", label: "Education", navLabel: "Education" },
  { id: "contact", number: "10", label: "Contact", navLabel: "Contact" },
];

export const NAV_SCENES = SCENES.filter((scene) =>
  ["about", "services", "process", "stack", "work", "experience", "education"].includes(
    scene.id,
  ),
);

export const TOTAL_SCENES = SCENES.length;

export function sceneIndex(id: string): number {
  return SCENES.findIndex((scene) => scene.id === id);
}
