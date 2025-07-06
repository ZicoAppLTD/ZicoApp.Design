import { Command } from "commander";
import prompts, { PromptType } from "prompts";
import { writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import chalk from "chalk";
import { logger } from "../utils/logger.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize zui in your project")
  .action(async () => {
    logger.info("Initializing zui ...");

    const questions = [
      {
        type: "text" as PromptType,
        name: "componentsDir",
        message: "Where would you like to install components?",
        initial: "./src/components/ui",
      },
      {
        type: "text" as PromptType,
        name: "utilsDir",
        message: "Where would you like to install utils?",
        initial: "./src/lib/utils",
      },
      {
        type: "confirm" as PromptType,
        name: "typescript",
        message: "Are you using TypeScript?",
        initial: true,
      },
      {
        type: "confirm" as PromptType,
        name: "tailwind",
        message: "Are you using Tailwind CSS?",
        initial: true,
      },
    ];

    const answers = await prompts(questions);

    const config = {
      componentsDir: answers.componentsDir,
      utilsDir: answers.utilsDir,
      typescript: answers.typescript,
      tailwind: answers.tailwind,
      aliases: {
        components: answers.componentsDir,
        utils: answers.utilsDir,
      },
    };

    // Create zui-components.json config file
    const configPath = path.join(process.cwd(), "zui-components.json");
    writeFileSync(configPath, JSON.stringify(config, null, 2));

    // Create directories
    const componentsPath = path.join(process.cwd(), answers.componentsDir);
    const utilsPath = path.join(process.cwd(), answers.utilsDir);

    if (!existsSync(componentsPath)) {
      mkdirSync(componentsPath, { recursive: true });
    }

    if (!existsSync(utilsPath)) {
      mkdirSync(utilsPath, { recursive: true });
    }

    // Create utils file if it doesn't exist
    const utilsFile = path.join(
      utilsPath,
      answers.typescript ? "cn.ts" : "cn.js"
    );
    if (!existsSync(utilsFile)) {
      const utilsContent = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;
      writeFileSync(utilsFile, utilsContent);
    }

    logger.success("Configuration saved to zui-components.json");
    logger.info("You can now add components with: zui add <component-name>");
  });
