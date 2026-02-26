import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getMessages, SupportedLocale, isRTL as checkIsRTL, useDeviceLocale as getDeviceLocaleFromTranslations } from './translations';
import { I18nManager } from 'react-native';

interface I18nContextType {
  t: (key: string, variables?: Record<string, string | number>) => string;
  locale: SupportedLocale;
  setLocale: (newLocale: SupportedLocale) => void;
  isRTL: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  locale: SupportedLocale;
}

export function I18nProvider({ children, locale: initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<SupportedLocale>(initialLocale);
  const [messages, setMessages] = useState<Record<string, string>>(getMessages(initialLocale));
  const [isRTL, setIsRTL] = useState<boolean>(checkIsRTL(initialLocale));

  useEffect(() => {
    const newMessages = getMessages(locale);
    setMessages(newMessages);
    const newIsRTL = checkIsRTL(locale);
    setIsRTL(newIsRTL);
    // Apply RTL changes to I18nManager for React Native layout
    if (I18nManager.isRTL !== newIsRTL) {
      I18nManager.forceRTL(newIsRTL);
      I18nManager.allowRTL(newIsRTL);
      // On web, this is handled by the `dir` attribute on the `<html>` tag in `src/app/[locale]/layout.tsx`
      // For React Native, a reload might be needed for full effect, but forceRTL helps with immediate layout.
    }
  }, [locale]);

  const t = (key: string, variables?: Record<string, string | number>): string => {
    let message = messages[key] || key;
    if (variables) {
      for (const [varKey, value] of Object.entries(variables)) {
        message = message.replace(`{{${varKey}}}`, String(value));
      }
    }
    return message;
  };

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
  };

  return (
    <I18nContext.Provider value={{ t, locale, setLocale, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslations(namespace?: string) {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslations must be used within an I18nProvider');
  }

  const { t: globalT } = context;

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return globalT(fullKey, variables);
  };

  return t;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return {
    locale: context.locale,
    setLocale: context.setLocale,
    isRTL: context.isRTL,
  };
}

export const useDeviceLocale = getDeviceLocaleFromTranslations;
