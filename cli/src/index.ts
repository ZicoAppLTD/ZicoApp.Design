#!/usr/bin/env node

import { Command } from "commander";
import { addCommand } from "./commands/add.js";
import { initCommand } from "./commands/init.js";
import { listCommand } from "./commands/list.js";

const program = new Command();

program
  .name("ZicoUI - ZicoApp / Design - CLI")
  .description("CLI for managing custom UI components")
  .version("1.0.0");

program.addCommand(addCommand);
program.addCommand(initCommand);
program.addCommand(listCommand);

program.parse();
