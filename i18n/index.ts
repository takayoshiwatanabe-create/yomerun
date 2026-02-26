// Conditional import for expo-localization to prevent web build errors
let Localization: typeof import("expo-localization") | undefined;
try {
  // This import will only succeed in an Expo/React Native environment.
  // In a Next.js web environment, it will throw an error and Localization will remain undefined.
  Localization = require("expo-localization");
} catch (e) {
  // console.warn("expo-localization not available, likely running in web environment.");
}

export type Language = "ja" | "en" | "zh" | "ko" | "es" | "fr" | "de" | "pt" | "ar" | "hi";

import { translations as sharedTranslations } from '../src/i18n/translations'; // Import shared translations

const SUPPORTED: Language[] = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];

function getLanguage(): Language {
  try {
    if (Localization) {
      const locales = Localization.getLocales();
      const deviceLang = locales[0]?.languageCode;
      if (typeof deviceLang === 'string' && SUPPORTED.includes(deviceLang as Language)) {
        return deviceLang as Language;
      }
    }
    // Fallback for web or if expo-localization is not available
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLang = navigator.language.split('-')[0]; // 'en-US' -> 'en'
      if (SUPPORTED.includes(browserLang as Language)) {
        return browserLang as Language;
      }
    }
    return "ja"; // Default fallback
  } catch (error) {
    console.error("Error getting device language:", error);
    return "ja"; // Default fallback on error
  }
}

export const lang = getLanguage();
export const isRTL = ["ar"].includes(lang);

export function t(key: string, vars?: Record<string, string | number>): string {
  // Use sharedTranslations for consistency
  const dict = sharedTranslations[lang] ?? sharedTranslations.ja;
  let text = dict[key] ?? sharedTranslations.ja[key] ?? sharedTranslations.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(new RegExp(`{{\\s*${k}\\s*}}`, "g"), String(v));
    }
  }
  return text;
}

