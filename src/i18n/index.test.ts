import { renderHook, act } from '@testing-library/react-hooks';
import { I18nProvider, useTranslations, useI18n, useDeviceLocale } from './index';
import { SupportedLocale, translations, locales } from './translations';
import { I18nManager } from 'react-native';
import * as Localization from 'expo-localization';

// Mock I18nManager for React Native environment
jest.mock('react-native', () => ({
  I18nManager: {
    isRTL: false,
    forceRTL: jest.fn(),
    allowRTL: jest.fn(),
    getConstants: () => ({
      isRTL: false,
    }),
  },
}));

// Mock expo-localization
jest.mock('expo-localization', () => ({
  getLocales: jest.fn(),
}));

describe('i18n hooks and provider', () => {
  beforeEach(() => {
    // Reset I18nManager mocks
    (I18nManager.forceRTL as jest.Mock).mockClear();
    (I18nManager.allowRTL as jest.Mock).mockClear();
    // Reset Localization mock
    (Localization.getLocales as jest.Mock).mockClear();
  });

  describe('I18nProvider and useTranslations', () => {
    it('provides translations for the initial locale', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="en">{children}</I18nProvider>
      );
      const { result } = renderHook(() => useTranslations('common'), { wrapper });
      expect(result.current('appName')).toBe(translations.en['common.appName']);
    });

    it('updates translations when locale changes', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="en">{children}</I18nProvider>
      );
      const { result, rerender } = renderHook(() => useTranslations('common'), { wrapper });

      expect(result.current('appName')).toBe(translations.en['common.appName']);

      rerender({ locale: 'ja' });
      expect(result.current('appName')).toBe(translations.ja['common.appName']);
    });

    it('handles missing keys gracefully by returning the key itself', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="en">{children}</I18nProvider>
      );
      const { result } = renderHook(() => useTranslations('common'), { wrapper });
      expect(result.current('nonExistentKey')).toBe('common.nonExistentKey');
    });

    it('replaces variables in translations', () => {
      const customTranslations = {
        en: {
          'greeting.hello': 'Hello, {{name}}!',
        },
      };
      // Temporarily override translations for this test
      const originalTranslations = { ...translations };
      Object.assign(translations, customTranslations);

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="en">{children}</I18nProvider>
      );
      const { result } = renderHook(() => useTranslations('greeting'), { wrapper });
      expect(result.current('hello', { name: 'World' })).toBe('Hello, World!');

      // Restore original translations
      Object.assign(translations, originalTranslations);
    });
  });

  describe('useI18n', () => {
    it('returns the current locale and isRTL status', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="en">{children}</I18nProvider>
      );
      const { result } = renderHook(() => useI18n(), { wrapper });
      expect(result.current.locale).toBe('en');
      expect(result.current.isRTL).toBe(false);
    });

    it('updates locale and isRTL when setLocale is called', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="en">{children}</I18nProvider>
      );
      const { result } = renderHook(() => useI18n(), { wrapper });

      act(() => {
        result.current.setLocale('ar');
      });

      expect(result.current.locale).toBe('ar');
      expect(result.current.isRTL).toBe(true);
    });

    it('calls I18nManager.forceRTL and allowRTL when locale changes to RTL', () => {
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="en">{children}</I18nProvider>
      );
      const { result } = renderHook(() => useI18n(), { wrapper });

      act(() => {
        result.current.setLocale('ar');
      });

      expect(I18nManager.forceRTL).toHaveBeenCalledWith(true);
      expect(I18nManager.allowRTL).toHaveBeenCalledWith(true);
    });

    it('calls I18nManager.forceRTL and allowRTL when locale changes from RTL to LTR', () => {
      // Initialize with RTL locale
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <I18nProvider locale="ar">{children}</I18nProvider>
      );
      const { result } = renderHook(() => useI18n(), { wrapper });

      // Change to LTR locale
      act(() => {
        result.current.setLocale('en');
      });

      expect(I18nManager.forceRTL).toHaveBeenCalledWith(false);
      expect(I18nManager.allowRTL).toHaveBeenCalledWith(false);
    });
  });

  describe('useDeviceLocale', () => {
    it('returns the device locale if supported', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([{ languageCode: 'es' }]);
      expect(useDeviceLocale()).toBe('es');
    });

    it('returns "ja" if device locale is not supported', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([{ languageCode: 'unsupported' }]);
      expect(useDeviceLocale()).toBe('ja');
    });

    it('returns "ja" if no device locale is found', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([]);
      expect(useDeviceLocale()).toBe('ja');
    });

    it('returns "ja" if device locale is undefined', () => {
      (Localization.getLocales as jest.Mock).mockReturnValue([{ languageCode: undefined }]);
      expect(useDeviceLocale()).toBe('ja');
    });
  });
});
