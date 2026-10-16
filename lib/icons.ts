import React from "react";
import {
  Terminal,
  Server,
  Code,
  Database,
  Layers,
  Globe,
  Cpu,
  ShieldCheck,
  FileCode,
  Workflow,
  Boxes,
  GitBranch,
  Cloud,
  Layout,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal,
  Server,
  Code,
  Database,
  Layers,
  Globe,
  Cpu,
  ShieldCheck,
  FileCode,
  Workflow,
  Boxes,
  GitBranch,
  Cloud,
  Layout,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  Lock,
};

export function getIcon(name?: string): React.ComponentType<{ className?: string }> {
  if (!name) return Terminal;
  return ICON_MAP[name] || Terminal;
}
