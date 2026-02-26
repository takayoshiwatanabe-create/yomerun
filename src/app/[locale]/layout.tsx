import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl"; // useLocale is not needed in layout.tsx as locale is from params
import { getMessages } from "next-intl/server";
import "../../global.css"; // Import global CSS for Tailwind
import { translations } from "@/i18n/translations"; // Import translations to get locale list
import React from "react"; // Explicitly import React

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yomerun",
  description: "Yomerun - The reading assistant for children",
};

// Define supported locales as per CLAUDE.md
const locales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Determine text direction for HTML
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
