import fs from "node:fs";
import path from "node:path";

/** Server-only helper: only reference assets that really exist in /public. */
export function publicFileExists(publicPath?: string): boolean {
  if (!publicPath || !publicPath.startsWith("/")) return false;
  const filePath = path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
  return fs.existsSync(filePath);
}

/** Returns the asset path when present, otherwise undefined (caller renders placeholder). */
export function resolvePublicFile(publicPath?: string): string | undefined {
  return publicFileExists(publicPath) ? publicPath : undefined;
}
