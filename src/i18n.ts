import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { translations, locales as supportedLocalesArray, SupportedLocale } from "./i18n/translations";
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { useLocale } from 'next-intl';

const locales = supportedLocalesArray;
type Locale = SupportedLocale;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

export default getRequestConfig(async ({ locale }) => {
  if (!(locales as readonly string[]).includes(locale)) notFound();

  return {
    messages: translations[locale as Locale],
  };
});

export function useI18n() {
  const locale = useLocale();
  return {
    locale: locale as SupportedLocale,
    isRTL: locale === 'ar',
  };
}



