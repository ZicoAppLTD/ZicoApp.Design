export type Locale = typeof locales[number];

export const locales = ["en", "fa"] as const;
export const defaultLocale: Locale = "fa";
