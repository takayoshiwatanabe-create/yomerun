import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { translations } from "./i18n/translations"; // Import the translations directly
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { useLocale } from 'next-intl';

// Define supported locales as per CLAUDE.md
const locales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];
type Locale = (typeof locales)[number];

// Export navigation utilities for client components
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale)) notFound();

  // Return the messages object directly from the imported translations
  return {
    messages: translations[locale as Locale],
  };
});

export function useI18n() {
  const locale = useLocale();
  // Return the messages object directly from the imported translations
  return {
    isRTL: locale === 'ar',
  };
}
