import { Command } from "commander";
import prompts from "prompts";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { getConfig } from "../utils/config.js";
import { getComponentFromRegistry } from "../utils/registry.js";
import { logger } from "../utils/logger.js";
import ora from "ora";

export const addCommand = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[components...]", "components to add")
  .option("-y, --yes", "skip confirmation prompt")
  .action(async (components: string[], options) => {
    const config = await getConfig();

    if (!config) {
      logger.error("Configuration not found. Run `zui init` first.");
      process.exit(1);
    }

    let selectedComponents = components;

    if (!selectedComponents?.length) {
      const availableComponents = await getAvailableComponents();

      const { components: selected } = await prompts({
        type: "multiselect",
        name: "components",
        message: "Which components would you like to add?",
        choices: availableComponents.map((component) => ({
          title: component,
          value: component,
        })),
      });

      selectedComponents = selected;
    }

    if (!selectedComponents?.length) {
      logger.info("No components selected.");
      return;
    }

    const spinner = ora("Adding components...").start();

    try {
      for (const componentName of selectedComponents) {
        await addComponent(componentName, config);
        spinner.text = `Added ${componentName}`;
      }

      spinner.succeed("Components added successfully!");
    } catch (error) {
      spinner.fail("Failed to add components");
      logger.error(error instanceof Error ? error.message : "Unknown error");
    }
  });

async function addComponent(componentName: string, config: any) {
  const component = await getComponentFromRegistry(componentName);

  if (!component) {
    throw new Error(`Component "${componentName}" not found`);
  }

  const componentPath = path.join(
    process.cwd(),
    config.componentsDir,
    `${componentName}.${config.typescript ? "tsx" : "jsx"}`
  );

  // Create directory if it doesn't exist
  const componentDir = path.dirname(componentPath);
  if (!existsSync(componentDir)) {
    mkdirSync(componentDir, { recursive: true });
  }

  // Write component file
  writeFileSync(componentPath, component.code);

  logger.info(`Added ${componentName} to ${config.componentsDir}`);
}

async function getAvailableComponents(): Promise<string[]> {
  // This would typically fetch from a registry or read from local files
  return ["button", "card", "input"]; // Example components
}
