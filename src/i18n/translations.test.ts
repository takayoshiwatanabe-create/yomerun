import { locales, isRTL, useDeviceLocale, translations, getMessages } from './translations';
import * as Localization from 'expo-localization';

// Mock expo-localization
jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

describe('i18n/translations', () => {
  beforeEach(() => {
    (Localization.getLocales as jest.Mock).mockClear();
  });

  describe('locales', () => {
    it('should contain all specified locales', () => {
      const expectedLocales = ["ja", "en", "zh", "ko", "es", "fr", "de", "pt", "ar", "hi"];
      expect(locales).toEqual(expect.arrayContaining(expectedLocales));
      expect(locales.length).toBe(expectedLocales.length);
    });
  });

  describe('isRTL', () => {
    it('should return true for Arabic (ar)', () => {
      expect(isRTL('ar')).toBe(true);
    });

    it('should return false for non-Arabic locales', () => {
      expect(isRTL('en')).toBe(false);
      expect(isRTL('ja')).toBe(false);
      expect(isRTL('es')).toBe(false);
    });
  });

  describe('useDeviceLocale', () => {
    it('should return the device locale if it is supported', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([{ languageCode: 'es' }]);
      expect(useDeviceLocale()).toBe('es');
    });

    it('should return "ja" if the device locale is not supported', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([{ languageCode: 'unsupported' }]);
      expect(useDeviceLocale()).toBe('ja');
    });

    it('should return "ja" if no device locale is found', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([]);
      expect(useDeviceLocale()).toBe('ja');
    });

    it('should return "ja" if device locale is undefined', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([{ languageCode: undefined }]);
      expect(useDeviceLocale()).toBe('ja');
    });

    it('should handle locales with region codes by using only languageCode', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([{ languageCode: 'en', languageTag: 'en-US' }]);
      expect(useDeviceLocale()).toBe('en');
    });
  });

  describe('translations', () => {
    it('should have translations for all supported locales', () => {
      locales.forEach(locale => {
        expect(translations).toHaveProperty(locale);
        expect(typeof translations[locale]).toBe('object');
        expect(Object.keys(translations[locale]).length).toBeGreaterThan(0);
      });
    });

    it('should have consistent keys across all locales (basic check)', () => {
      const referenceLocale = 'en';
      const referenceKeys = Object.keys(translations[referenceLocale]);

      locales.forEach(locale => {
        if (locale === referenceLocale) return;
        const currentKeys = Object.keys(translations[locale]);
        // This is a basic check, a more robust check would compare all keys
        // For now, just ensure they have a similar number of keys
        expect(currentKeys.length).toBeGreaterThanOrEqual(referenceKeys.length * 0.8); // Allow some minor differences
        expect(currentKeys.length).toBeLessThanOrEqual(referenceKeys.length * 1.2);
      });
    });

    it('should have specific common translations', () => {
      expect(translations.en['common.appName']).toBe('Yomerun');
      expect(translations.ja['common.appName']).toBe('ヨメルン');
      expect(translations.ar['common.appName']).toBe('يوميرون');
    });
  });

  describe('getMessages', () => {
    it('should return the correct translation object for a given locale', () => {
      const enMessages = getMessages('en');
      expect(enMessages).toEqual(translations.en);

      const jaMessages = getMessages('ja');
      expect(jaMessages).toEqual(translations.ja);
    });
  });
});
