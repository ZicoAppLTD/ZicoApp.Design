import { Command } from "commander";
import prompts from "prompts";
import { existsSync, writeFileSync, mkdirSync } from "fs";
import path from "path";
import { getConfig } from "../utils/config.js";
import { getComponentFromRegistry } from "../utils/registry.js";
import { logger } from "../utils/logger.js";
import ora, { Ora } from "ora";

export const addCommand = new Command()
  .name("add")
  .description("Add a component to your project")
  .argument("[components...]", "components to add")
  .option("-y, --yes", "skip confirmation prompt")
  .option("-f, --force", "overwrite existing files")
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
    let addedComponents = 0;
    let skippedComponents = 0;

    try {
      for (const componentName of selectedComponents) {
        spinner.text = `Processing ${componentName}...`;
        const result = await addComponent(
          componentName,
          config,
          options,
          spinner
        );
        if (result === "added") {
          addedComponents++;
          spinner.text = `Added ${componentName}`;
        } else if (result === "skipped") {
          skippedComponents++;
          spinner.text = `Skipped ${componentName}`;
        }
      }

      spinner.stop();

      if (addedComponents > 0) {
        logger.success(`Successfully added ${addedComponents} component(s)`);
      }

      if (skippedComponents > 0) {
        logger.warn(`Skipped ${skippedComponents} component(s)`);
      }

      if (addedComponents === 0 && skippedComponents === 0) {
        logger.info("No components were processed");
      }
    } catch (error) {
      spinner.fail("Failed to add components");
      logger.error(error instanceof Error ? error.message : "Unknown error");
    }
  });

async function addComponent(
  componentName: string,
  config: any,
  options: any = {},
  spinner?: Ora
): Promise<"added" | "skipped"> {
  const component = await getComponentFromRegistry(componentName);

  if (!component) {
    throw new Error(`Component "${componentName}" not found`);
  }

  const componentPath = path.join(
    process.cwd(),
    config.componentsDir,
    `${componentName}.${config.typescript ? "tsx" : "jsx"}`
  );

  // Check if file already exists
  if (existsSync(componentPath)) {
    if (options.force) {
      logger.warn(`Overwriting existing file: ${componentPath}`);
    } else {
      logger.error(`Component file already exists: ${componentPath}`);

      // Stop spinner before prompting user
      if (spinner) {
        spinner.stop();
      }

      // Prompt for alternative path
      const { alternativePath } = await prompts({
        type: "text",
        name: "alternativePath",
        message: `Enter alternative path for ${componentName} (or press Enter to skip):`,
        initial: path.join(
          process.cwd(),
          config.componentsDir,
          `${componentName}-new.${config.typescript ? "tsx" : "jsx"}`
        ),
      });

      // Restart spinner after user input
      if (spinner) {
        spinner.start();
      }

      if (!alternativePath) {
        logger.info(`Skipped adding ${componentName}`);
        return "skipped";
      }

      // Use the alternative path
      const altComponentPath = path.resolve(alternativePath);
      logger.info(`Attempting to create component at: ${altComponentPath}`);

      // Check if alternative path also exists
      if (existsSync(altComponentPath)) {
        logger.error(`Alternative path also exists: ${altComponentPath}`);
        logger.info(`Skipped adding ${componentName}`);
        return "skipped";
      }

      // Create directory if it doesn't exist
      const componentDir = path.dirname(altComponentPath);
      if (!existsSync(componentDir)) {
        logger.info(`Creating directory: ${componentDir}`);
        mkdirSync(componentDir, { recursive: true });
      }

      // Write component file to alternative path
      try {
        writeFileSync(altComponentPath, component.code);
        logger.info(
          `Successfully added ${componentName} to ${altComponentPath}`
        );
        return "added";
      } catch (error) {
        logger.error(`Failed to write file to ${altComponentPath}: ${error}`);
        return "skipped";
      }
    }
  }

  // Create directory if it doesn't exist
  const componentDir = path.dirname(componentPath);
  if (!existsSync(componentDir)) {
    mkdirSync(componentDir, { recursive: true });
  }

  // Write component file
  writeFileSync(componentPath, component.code);

  logger.info(`Added ${componentName} to ${config.componentsDir}`);
  return "added";
}

async function getAvailableComponents(): Promise<string[]> {
  // This would typically fetch from a registry or read from local files
  return ["button", "card", "input"]; // Example components
}
