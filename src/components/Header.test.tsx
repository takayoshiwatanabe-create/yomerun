import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import Header from './Header';
import { useNavigation } from 'expo-router';
import { useTranslations, useI18n } from '@/i18n/index';

// Mock expo-router's useNavigation
jest.mock('expo-router', () => ({
  useNavigation: jest.fn(),
}));

// Mock the i18n module
jest.mock('@/i18n/index', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useI18n: jest.fn(() => ({ locale: 'en', isRTL: false })),
}));

describe('Header', () => {
  const mockGoBack = jest.fn();
  const mockCanGoBack = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    mockGoBack.mockClear();
    mockCanGoBack.mockClear();
    (useNavigation as jest.Mock).mockReturnValue({
      goBack: mockGoBack,
      canGoBack: mockCanGoBack,
    });
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `common.${key}`);
    (useI18n as jest.Mock).mockReturnValue({ locale: 'en', isRTL: false });
  });

  it('renders the app name', () => {
    mockCanGoBack.mockReturnValue(false);
    render(<Header />);
    expect(screen.getByText('common.appName')).toBeVisible();
  });

  it('renders a back button when navigation can go back', () => {
    mockCanGoBack.mockReturnValue(true);
    render(<Header />);
    const backButton = screen.getByLabelText('common.back');
    expect(backButton).toBeVisible();
  });

  it('does not render a back button when navigation cannot go back', () => {
    mockCanGoBack.mockReturnValue(false);
    render(<Header />);
    expect(screen.queryByLabelText('common.back')).toBeNull();
  });

  it('calls navigation.goBack when the back button is pressed', () => {
    mockCanGoBack.mockReturnValue(true);
    render(<Header />);
    const backButton = screen.getByLabelText('common.back');
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });

  it('applies RTL styles when isRTL is true', () => {
    (useI18n as jest.Mock).mockReturnValue({ locale: 'ar', isRTL: true });
    mockCanGoBack.mockReturnValue(true);
    render(<Header />);

    // Check for RTL specific styles on the main container
    expect(screen.getByText('common.appName').parent).toHaveStyle({ flexDirection: 'row-reverse' });

    // Check back button icon for flip
    const backButton = screen.getByLabelText('common.back');
    // The icon itself is a child of the TouchableOpacity, and we apply a style directly to it.
    // We can't directly check the style of the Lucide icon component via testing-library-native easily.
    // Instead, we can check the parent container's flex direction.
    expect(backButton).toHaveStyle({ flexDirection: 'row-reverse' });
  });

  it('ensures back button has minimum tap target size', () => {
    mockCanGoBack.mockReturnValue(true);
    render(<Header />);
    const backButton = screen.getByLabelText('common.back');
    // Check if the style includes minWidth and minHeight
    expect(backButton).toHaveStyle({ minWidth: 44, minHeight: 44 });
  });
});
