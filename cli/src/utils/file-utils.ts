import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";

export function ensureDir(dirPath: string): void {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath, { recursive: true });
  }
}

export function writeFile(filePath: string, content: string): void {
  const dir = path.dirname(filePath);
  ensureDir(dir);
  writeFileSync(filePath, content);
}
