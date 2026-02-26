import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Define supported locales as per CLAUDE.md
const locales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  return {
    // The `messages` object should be directly imported from the `messages` directory.
    // The `app.json` specifies `locales` pointing to `messages/*.json`.
    // Next.js `next-intl` expects these files to be directly accessible.
    // The `import` statement should reflect the actual path.
    // Given the `app.json` structure, the `messages` directory is at the root.
    // So, the path should be `../../messages/${locale}.json`.
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

