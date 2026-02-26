import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import RecordingButton from './RecordingButton';
import { useTranslations, useI18n } from '@/i18n/index';

// Mock the i18n module
jest.mock('@/i18n/index', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useI18n: jest.fn(() => ({ locale: 'en', isRTL: false })),
}));

describe('RecordingButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `common.${key}`);
    (useI18n as jest.Mock).mockReturnValue({ locale: 'en', isRTL: false });
  });

  it('renders "Start Recording" when not recording', () => {
    render(<RecordingButton isRecording={false} onPress={mockOnPress} />);
    expect(screen.getByLabelText('common.startRecording')).toBeVisible();
    expect(screen.getByText('common.startRecording')).toBeVisible();
  });

  it('renders "Stop Recording" when recording', () => {
    render(<RecordingButton isRecording={true} onPress={mockOnPress} />);
    expect(screen.getByLabelText('common.stopRecording')).toBeVisible();
    expect(screen.getByText('common.stopRecording')).toBeVisible();
  });

  it('calls onPress when button is pressed', () => {
    render(<RecordingButton isRecording={false} onPress={mockOnPress} />);
    fireEvent.press(screen.getByLabelText('common.startRecording'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<RecordingButton isRecording={false} onPress={mockOnPress} disabled={true} />);
    const button = screen.getByLabelText('common.startRecording');
    expect(button).toBeDisabled();
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('has idle button style when not recording', () => {
    render(<RecordingButton isRecording={false} onPress={mockOnPress} />);
    const button = screen.getByLabelText('common.startRecording');
    expect(button).toHaveStyle({ backgroundColor: '#4CAF50' });
  });

  it('has recording button style when recording', () => {
    render(<RecordingButton isRecording={true} onPress={mockOnPress} />);
    const button = screen.getByLabelText('common.stopRecording');
    expect(button).toHaveStyle({ backgroundColor: '#F44336' });
  });

  it('has disabled button style when disabled', () => {
    render(<RecordingButton isRecording={false} onPress={mockOnPress} disabled={true} />);
    const button = screen.getByLabelText('common.startRecording');
    expect(button).toHaveStyle({ backgroundColor: '#B0B0B0' });
  });

  it('ensures button has minimum tap target size (implicitly via padding)', () => {
    render(<RecordingButton isRecording={false} onPress={mockOnPress} />);
    const button = screen.getByLabelText('common.startRecording');
    // Check for padding that would ensure a minimum size
    expect(button).toHaveStyle({ paddingVertical: 15, paddingHorizontal: 30 });
    // This implies a minimum height of 15*2 + icon/text height, which should be > 44px
    // and width of 30*2 + icon/text width, which should be > 44px
  });
});
