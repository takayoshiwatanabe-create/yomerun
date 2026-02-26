```typescript
"use client"; // Add "use client" directive

import { useTranslations } from "next-intl";

export default function HomeScreen() {
  const t = useTranslations("home");
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {t("welcomeTitle")}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
        {t("welcomeSubtitle")}
      </p>
    </div>
  );
}
```
