```typescript
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { translations } from "./i18n/translations"; // Import the translations directly

// Define supported locales as per CLAUDE.md
const locales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Return the messages object directly from the imported translations
  return {
    messages: translations[locale as keyof typeof translations],
  };
});
```
No deviations. This file correctly sets up `next-intl` for server-side message loading, validates locales, and imports translations from the specified path.
