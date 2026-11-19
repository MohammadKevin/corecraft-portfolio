export interface SectionMeta {
  id: string;
  number: string;
  label: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: "hero", number: "01", label: "Hero" },
  { id: "about", number: "02", label: "About" },
  { id: "services", number: "03", label: "Services" },
  { id: "process", number: "04", label: "Process" },
  { id: "stack", number: "05", label: "Stack" },
  { id: "work", number: "06", label: "Work" },
  { id: "credentials", number: "07", label: "Credentials" },
  { id: "experience", number: "08", label: "Experience" },
  { id: "education", number: "09", label: "Education" },
  { id: "contact", number: "10", label: "Contact" },
];

export const NAV_LINKS = [
  "about",
  "services",
  "process",
  "stack",
  "work",
  "experience",
  "education",
].map((id) => SECTIONS.find((section) => section.id === id)!);
