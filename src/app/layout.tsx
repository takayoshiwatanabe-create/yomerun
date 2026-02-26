import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../global.css"; // Import global CSS for Tailwind

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
  // Type assertion for locale to ensure it's treated as a string for includes check
  if (!locales.includes(locale)) notFound(); // Removed 'as string' as locale is already string type

  const messages = await getMessages({ locale }); // Pass locale to getMessages

  const isRTL = locale === "ar"; // Determine RTL based on locale

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
