import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from 'react'; // Explicitly import React
import "../global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yomerun",
  description: "Yomerun - The reading assistant for children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja"> {/* Default to Japanese, locale will be set by [locale] layout */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}



