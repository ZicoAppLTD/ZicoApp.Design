import { Command } from "commander";
import { getAvailableComponents } from "../utils/registry.js";
import { logger } from "../utils/logger.js";

export const listCommand = new Command()
  .name("list")
  .description("List all available components")
  .action(async () => {
    logger.info("Available components:");

    const components = await getAvailableComponents();

    components.forEach((component) => {
      console.log(`  ${component}`);
    });
  });
