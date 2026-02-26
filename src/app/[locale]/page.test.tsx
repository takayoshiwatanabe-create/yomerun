import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeScreen from './page';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useLocale: jest.fn(() => 'en'),
}));

// Mock next/navigation useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `home.${key}`);
    (useLocale as jest.Mock).mockReturnValue('en');
    mockPush.mockClear();
  });

  it('renders the welcome title and message', () => {
    render(<HomeScreen />);
    expect(screen.getByText('home.welcomeTitle')).toBeInTheDocument();
    expect(screen.getByText('home.welcomeMessage')).toBeInTheDocument();
  });

  it('renders "Get Started" and "Learn More" buttons', () => {
    render(<HomeScreen />);
    expect(screen.getByLabelText('home.startButton')).toBeInTheDocument();
    expect(screen.getByLabelText('home.learnMoreButton')).toBeInTheDocument();
  });

  it('navigates to OCR page when "Get Started" is clicked', () => {
    render(<HomeScreen />);
    fireEvent.click(screen.getByLabelText('home.startButton'));
    expect(mockPush).toHaveBeenCalledWith('/en/ocr');
  });

  it('logs "Learn More clicked" when "Learn More" is clicked', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<HomeScreen />);
    fireEvent.click(screen.getByLabelText('home.learnMoreButton'));
    expect(consoleSpy).toHaveBeenCalledWith('Learn More clicked');
    consoleSpy.mockRestore();
  });

  it('uses the correct locale in navigation', () => {
    (useLocale as jest.Mock).mockReturnValue('ja');
    render(<HomeScreen />);
    fireEvent.click(screen.getByLabelText('home.startButton'));
    expect(mockPush).toHaveBeenCalledWith('/ja/ocr');
  });
});
