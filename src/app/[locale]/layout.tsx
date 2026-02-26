```diff
--- a/src/app/[locale]/layout.tsx
+++ b/src/app/[locale]/layout.tsx
@@ -1,7 +1,7 @@
 import type { Metadata } from "next";
 import { Inter } from "next/font/google";
 import { notFound } from "next/navigation";
-import { NextIntlClientProvider } from "next-intl";
+import { NextIntlClientProvider } from "next-intl"; // useLocale is not needed in layout.tsx as locale is from params
 import { getMessages } from "next-intl/server";
 import "../../global.css"; // Import global CSS for Tailwind
 import { translations } from "@/i18n/translations"; // Import translations to get locale list
```
