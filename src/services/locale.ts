"use server";

import { cookies } from "next/headers";
import { Locale, defaultLocale } from "@/config/locale";

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = "NEXT_LOCALE";

export async function getUserLocale() {
  const cookieJar = await cookies();
  return cookieJar.get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookieJar = await cookies();
  cookieJar.set(COOKIE_NAME, locale);
}
