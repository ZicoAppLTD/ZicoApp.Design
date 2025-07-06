import {
  buttonTemplate,
  buttonMetadata,
} from "../templates/components/button.js";

export interface ComponentData {
  name: string;
  code: string;
  dependencies?: string[];
  description?: string;
}

// Registry of all available components
const componentRegistry: Record<string, ComponentData> = {
  button: {
    name: buttonMetadata.name,
    code: buttonTemplate,
    dependencies: buttonMetadata.dependencies,
    description: buttonMetadata.description,
  },
  // Add more components here as you create them
};

export async function getComponentFromRegistry(
  name: string
): Promise<ComponentData | null> {
  const component = componentRegistry[name];

  if (!component) {
    return null;
  }

  return component;
}

export async function getAvailableComponents(): Promise<string[]> {
  return Object.keys(componentRegistry);
}
