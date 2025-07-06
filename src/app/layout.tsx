import type { Metadata } from "next";
import "@/styles/globals.css";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { SquircleNoScript } from "@squircle-js/react";
import { cn } from "@/lib/utils";
import NextTopLoader from 'nextjs-toploader';
import { primaryColor } from "@/config/values";
import { LangDir, LangFont } from "@/lib/fonts";
import { PHProvider } from "@/components/providers/PostHogProvider";


/* 
    -- dynamic metadata based on locales --
*/
export async function generateMetadata(): Promise<Metadata> {
  const tGeneral = getTranslations("general")

  return {
    title: {
      default: (await tGeneral)("app_name"),
      template: `%s - ${(await tGeneral)("app_name")}`,
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  const font = LangFont(locale);
  const dir = LangDir(locale);

  return (
    <html lang={locale} dir={dir}>
      <PHProvider>
        <body
          className={cn(
            font,
            "antialiased"
          )}>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}>
            <main
              className="w-full min-h-screen">
              <NextTopLoader
                color={primaryColor}
                showSpinner={false}
                shadow="none" />
              <SquircleNoScript />
              {children}
            </main>
          </NextIntlClientProvider>
        </body>
      </PHProvider>
    </html>
  );
}
