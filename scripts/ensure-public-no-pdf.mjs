import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const publicDir = path.join(repoRoot, "public");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  }));
  return files.flat();
}

try {
  const files = await walk(publicDir);
  const pdfs = files
    .filter((filePath) => filePath.toLowerCase().endsWith(".pdf"))
    .map((filePath) => path.relative(repoRoot, filePath));

  if (pdfs.length) {
    console.error("[asset-check] PDF files are not allowed in public/. Please convert them to screenshots instead:");
    pdfs.forEach((filePath) => console.error(` - ${filePath}`));
    process.exit(1);
  }

  console.log("[asset-check] OK: public/ contains screenshots only (no PDF files).");
} catch (error) {
  console.error("[asset-check] Failed to scan public/ directory:", error);
  process.exit(1);
}