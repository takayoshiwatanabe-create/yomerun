import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AudioAnalysisResult from './AudioAnalysisResult';
import { useTranslations, useI18n } from '@/i18n/index';

// Mock the i18n module
jest.mock('@/i18n/index', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useI18n: jest.fn(() => ({ locale: 'en', isRTL: false })),
}));

describe('AudioAnalysisResult', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `analysis.${key}`);
    (useI18n as jest.Mock).mockReturnValue({ locale: 'en', isRTL: false });
  });

  it('renders correctly with excellent feedback', () => {
    render(<AudioAnalysisResult score={95} feedback="excellent" text="This is a test text." />);

    expect(screen.getByText('analysis.resultTitle')).toBeVisible();
    expect(screen.getByText('analysis.scoreLabel:')).toBeVisible();
    expect(screen.getByText('95%')).toBeVisible();
    expect(screen.getByText('analysis.feedback.excellent')).toBeVisible();
    expect(screen.getByText('This is a test text.')).toBeVisible();
    expect(screen.queryByTestId('check-circle-icon')).toBeNull(); // Lucide icons don't have test IDs by default
  });

  it('renders correctly with good feedback', () => {
    render(<AudioAnalysisResult score={75} feedback="good" text="Another test text." />);

    expect(screen.getByText('analysis.resultTitle')).toBeVisible();
    expect(screen.getByText('analysis.scoreLabel:')).toBeVisible();
    expect(screen.getByText('75%')).toBeVisible();
    expect(screen.getByText('analysis.feedback.good')).toBeVisible();
    expect(screen.getByText('Another test text.')).toBeVisible();
  });

  it('renders correctly with needs_practice feedback', () => {
    render(<AudioAnalysisResult score={40} feedback="needs_practice" text="Practice makes perfect." />);

    expect(screen.getByText('analysis.resultTitle')).toBeVisible();
    expect(screen.getByText('analysis.scoreLabel:')).toBeVisible();
    expect(screen.getByText('40%')).toBeVisible();
    expect(screen.getByText('analysis.feedback.needs_practice')).toBeVisible();
    expect(screen.getByText('Practice makes perfect.')).toBeVisible();
  });

  it('applies correct score color based on score value', () => {
    const { rerender } = render(<AudioAnalysisResult score={95} feedback="excellent" text="Text" />);
    expect(screen.getByText('95%')).toHaveStyle({ color: '#28a745' }); // Green

    rerender(<AudioAnalysisResult score={75} feedback="good" text="Text" />);
    expect(screen.getByText('75%')).toHaveStyle({ color: '#ffc107' }); // Yellow

    rerender(<AudioAnalysisResult score={40} feedback="needs_practice" text="Text" />);
    expect(screen.getByText('40%')).toHaveStyle({ color: '#dc3545' }); // Red
  });

  it('applies RTL styles when isRTL is true', () => {
    (useI18n as jest.Mock).mockReturnValue({ locale: 'ar', isRTL: true });
    render(<AudioAnalysisResult score={95} feedback="excellent" text="This is a test text." />);

    // Check for RTL specific styles
    // Note: React Native's StyleSheet.create merges styles, so we check for the presence of the RTL style object.
    expect(screen.getByText('analysis.resultTitle').parent).toHaveStyle({ direction: 'rtl', textAlign: 'right' });
    expect(screen.getByText('analysis.scoreLabel:').parent).toHaveStyle({ flexDirection: 'row-reverse' });
    expect(screen.getByText('analysis.feedback.excellent').parent).toHaveStyle({ flexDirection: 'row-reverse' });
    expect(screen.getByText('This is a test text.')).toHaveStyle({ textAlign: 'right' });
  });
});
