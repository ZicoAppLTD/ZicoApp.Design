import localFont from "next/font/local";

export const englishManropeDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/en/Manrope-Regular.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/en/Manrope-Medium.ttf",
      weight: "500",
    },
    {
      path: "../assets/fonts/en/Manrope-SemiBold.ttf",
      weight: "600",
    },
  ],
  variable: "--font-heading",
});

export const persianEstedad = localFont({
  src: [
    {
      path: "../assets/fonts/fa/Estedad-FD-Regular.woff2",
      weight: "400",
    },
    {
      path: "../assets/fonts/fa/Estedad-FD-Medium.woff2",
      weight: "500",
    },
    {
      path: "../assets/fonts/fa/Estedad-FD-SemiBold.woff2",
      weight: "600",
    },
  ],
  variable: "--font-heading",
});

export function LangFont(locale: string): string {
  switch (locale) {
    case "en":
      return englishManropeDisplay.className;
    case "fa":
      return persianEstedad.className;
    default:
      return englishManropeDisplay.className;
  }
}

export function LangDir(locale: string): string {
  switch (locale) {
    case "en":
      return "ltr";
    case "fa":
      return "rtl";
    default:
      return "ltr";
  }
}
