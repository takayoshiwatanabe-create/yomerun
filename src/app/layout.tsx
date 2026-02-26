```typescript
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../global.css"; // Import global CSS for Tailwind

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Yomerun", // Default title, will be overridden by page-specific titles
  description: "Fostering children's expressive power through reading aloud.",
};

// This `src/app/layout.tsx` is for the root layout, which should not have `params: { locale }`.
// The `[locale]/layout.tsx` handles the locale-specific layout.
// The root layout should wrap the `[locale]` segment.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" dir="ltr"> {/* Default language for the root HTML tag */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```
No deviations. This root layout correctly wraps the locale-specific layout and sets a default `lang` and `dir` for the root HTML tag, as expected in a Next.js App Router setup with `next-intl`.
