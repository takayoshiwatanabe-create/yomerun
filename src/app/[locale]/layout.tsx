```diff
--- a/src/app/[locale]/layout.tsx
+++ b/src/app/[locale]/layout.tsx
@@ -1,7 +1,7 @@
 import type { Metadata } from "next";
 import { Inter } from "next/font/google";
 import { notFound } from "next/navigation";
-import { NextIntlClientProvider } from "next-intl";
+import { NextIntlClientProvider, useLocale } from "next-intl";
 import { getMessages } from "next-intl/server";
 import "../../global.css"; // Import global CSS for Tailwind
 import { translations } from "@/i18n/translations"; // Import translations to get locale list
@@ -16,6 +16,10 @@
 // Use the keys from the translations object as the source of truth for supported locales
 const locales = Object.keys(translations);
 
+interface RootLayoutProps {
+  children: React.ReactNode;
+  params: { locale: string };
+}
 export default async function RootLayout({
   children,
   params: { locale },
@@ -25,7 +29,7 @@
 
   const messages = await getMessages({ locale });
 
-  const isRTL = locale === 'ar';
+  const isRTL = locale === 'ar'; // Check if the current locale is Arabic for RTL support
 
   return (
     <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
```

