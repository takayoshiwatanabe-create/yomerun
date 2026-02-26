import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import TabBar from './TabBar';
import { usePathname, useRouter } from 'expo-router';
import { useTranslations, useI18n } from '@/i18n/index';

// Mock expo-router hooks
jest.mock('expo-router', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock the i18n module
jest.mock('@/i18n/index', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useI18n: jest.fn(() => ({ locale: 'en', isRTL: false })),
}));

describe('TabBar', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    (usePathname as jest.Mock).mockReturnValue('/en/');
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `common.${key}`);
    (useI18n as jest.Mock).mockReturnValue({ locale: 'en', isRTL: false });
    mockPush.mockClear();
  });

  it('renders all tab items', () => {
    render(<TabBar />);
    expect(screen.getByLabelText('common.home')).toBeVisible();
    expect(screen.getByLabelText('common.ocr')).toBeVisible();
    expect(screen.getByLabelText('common.settings')).toBeVisible();
  });

  it('highlights the active tab based on pathname', () => {
    (usePathname as jest.Mock).mockReturnValue('/en/ocr');
    render(<TabBar />);

    expect(screen.getByLabelText('common.home')).not.toHaveAccessibilityState({ selected: true });
    expect(screen.getByLabelText('common.ocr')).toHaveAccessibilityState({ selected: true });
    expect(screen.getByLabelText('common.settings')).not.toHaveAccessibilityState({ selected: true });

    // Check for active label style
    expect(screen.getByText('common.ocr')).toHaveStyle({ fontWeight: 'bold', color: '#6200EE' });
    expect(screen.getByText('common.home')).not.toHaveStyle({ fontWeight: 'bold' });
  });

  it('navigates to the correct path when a tab is pressed', () => {
    render(<TabBar />);
    fireEvent.press(screen.getByLabelText('common.ocr'));
    expect(mockPush).toHaveBeenCalledWith('/en/ocr');

    fireEvent.press(screen.getByLabelText('common.settings'));
    expect(mockPush).toHaveBeenCalledWith('/en/settings');

    fireEvent.press(screen.getByLabelText('common.home'));
    expect(mockPush).toHaveBeenCalledWith('/en/');
  });

  it('applies RTL styles when isRTL is true', () => {
    (useI18n as jest.Mock).mockReturnValue({ locale: 'ar', isRTL: true });
    render(<TabBar />);

    // Check for RTL specific styles on the main container
    expect(screen.getByLabelText('common.home').parent?.parent).toHaveStyle({ flexDirection: 'row-reverse' });
  });

  it('ensures tab items have minimum tap target size', () => {
    render(<TabBar />);
    const homeTab = screen.getByLabelText('common.home');
    // Check if the style includes minWidth and minHeight
    expect(homeTab).toHaveStyle({ minWidth: 44, minHeight: 44 });
  });
});
