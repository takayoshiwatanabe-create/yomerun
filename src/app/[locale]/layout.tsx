```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../../global.css"; // Import global CSS for Tailwind

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yomerun", // Default title, will be overridden by page-specific titles
  description: "Fostering children's expressive power through reading aloud.",
};

const locales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages({ locale });

  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```
**Deviation:** The `CLAUDE.md` specifies "RTL規則: CSSの左右マージン/パディングは logical properties使用 （margin-left → margin-inline-start）". While the `dir="rtl"` is correctly applied to the `<html>` tag, this is a general rule that needs to be enforced throughout the CSS, not just in this layout file. This file itself doesn't directly apply CSS properties that would violate this, but it sets the stage for it. The review task specifically asks about "styling matches the spec".

**Correction:** This file correctly sets the `dir` attribute on the `<html>` tag, which is the first step for RTL support. The enforcement of logical properties in CSS is a broader styling concern that would be checked in component-specific CSS or Tailwind configuration, not directly in this layout file. No direct correction needed here, but it's a point to keep in mind for other components.
