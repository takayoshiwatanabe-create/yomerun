import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import "../global.css"; // Import global CSS for Tailwind

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yomerun", // Default title, will be overridden by page-specific titles
  description: "Fostering children's expressive power through reading aloud.",
};

const locales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  if (!locales.includes(locale as any)) notFound();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const messages = useMessages();

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
