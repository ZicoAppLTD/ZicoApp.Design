import { existsSync, readFileSync } from "fs";
import path from "path";

export interface Config {
  componentsDir: string;
  utilsDir: string;
  typescript: boolean;
  tailwind: boolean;
  aliases: {
    components: string;
    utils: string;
  };
}

export async function getConfig(): Promise<Config | null> {
  const configPath = path.join(process.cwd(), "zicoui.json");

  if (!existsSync(configPath)) {
    return null;
  }

  try {
    const configContent = readFileSync(configPath, "utf-8");
    return JSON.parse(configContent);
  } catch (error) {
    return null;
  }
}
