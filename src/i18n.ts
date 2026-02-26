import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Define supported locales as per CLAUDE.md
const locales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
