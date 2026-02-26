import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OCRScreen from './ocr';
import { useTranslations, useLocale } from 'next-intl';

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useLocale: jest.fn(() => 'en'),
}));

// Mock next/image for web environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('OCRScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `ocr.${key}`);
    (useLocale as jest.Mock).mockReturnValue('en');

    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'blob:http://localhost/mock-image-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  it('renders the OCR title and initial prompt', () => {
    render(<OCRScreen />);
    expect(screen.getByText('ocr.title')).toBeInTheDocument();
    expect(screen.getByText('ocr.selectImagePrompt')).toBeInTheDocument();
    expect(screen.getByLabelText('ocr.selectImage')).toBeInTheDocument();
  });

  it('allows selecting an image and shows "Image selected" prompt', async () => {
    render(<OCRScreen />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('ocr.selectImage').closest('label')?.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    } else {
      throw new Error('File input not found');
    }

    await waitFor(() => {
      expect(screen.getByText('ocr.imageSelected')).toBeInTheDocument();
      expect(screen.getByLabelText('ocr.startOcr')).toBeInTheDocument();
      expect(screen.getByAltText('ocr.selectedImageAlt')).toHaveAttribute('src', 'blob:http://localhost/mock-image-url');
    });
  });

  it('starts OCR process and shows loading states', async () => {
    render(<OCRScreen />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('ocr.selectImage').closest('label')?.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    } else {
      throw new Error('File input not found');
    }

    await waitFor(() => {
      expect(screen.getByText('ocr.imageSelected')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('ocr.startOcr'));

    expect(screen.getByText('ocr.uploadingImage')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('ocr.processingImage')).toBeInTheDocument();
    }, { timeout: 2500 }); // Wait for upload simulation

    await waitFor(() => {
      expect(screen.getByText('ocr.ocrSuccess')).toBeInTheDocument();
      expect(screen.getByText('ocr.sampleOcrResult')).toBeInTheDocument();
    }, { timeout: 3500 }); // Wait for processing simulation
  });

  it('handles OCR error state', async () => {
    // Mock Math.random to force an error
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.1; // Force error
    global.Math = mockMath;

    render(<OCRScreen />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('ocr.selectImage').closest('label')?.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    } else {
      throw new Error('File input not found');
    }

    await waitFor(() => {
      expect(screen.getByText('ocr.imageSelected')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('ocr.startOcr'));

    await waitFor(() => {
      expect(screen.getByText('ocr.ocrFailed')).toBeInTheDocument();
      expect(screen.getByLabelText('ocr.tryAgain')).toBeInTheDocument();
    }, { timeout: 6000 }); // Sufficient time for both upload and process simulation
  });

  it('resets state when "Try Again" is clicked after success or error', async () => {
    render(<OCRScreen />);

    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    const input = screen.getByLabelText('ocr.selectImage').closest('label')?.querySelector('input[type="file"]');

    if (input) {
      fireEvent.change(input, { target: { files: [file] } });
    } else {
      throw new Error('File input not found');
    }

    await waitFor(() => {
      expect(screen.getByText('ocr.imageSelected')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('ocr.startOcr'));

    await waitFor(() => {
      expect(screen.getByText('ocr.ocrSuccess')).toBeInTheDocument();
    }, { timeout: 6000 });

    fireEvent.click(screen.getByLabelText('ocr.tryAgain'));

    await waitFor(() => {
      expect(screen.getByText('ocr.selectImagePrompt')).toBeInTheDocument();
      expect(screen.queryByText('ocr.ocrSuccess')).not.toBeInTheDocument();
      expect(screen.queryByText('ocr.sampleOcrResult')).not.toBeInTheDocument();
      expect(screen.queryByAltText('ocr.selectedImageAlt')).not.toBeInTheDocument();
    });
  });

  it('displays error if start OCR is clicked without image', async () => {
    render(<OCRScreen />);
    fireEvent.click(screen.getByLabelText('ocr.startOcr')); // Button should be disabled until image is selected, but testing direct click if enabled
    await waitFor(() => {
      expect(screen.getByText('ocr.noImageSelected')).toBeInTheDocument();
    });
  });

  it('applies RTL styling for Arabic locale', () => {
    (useLocale as jest.Mock).mockReturnValue('ar');
    render(<OCRScreen />);
    // Check for classes that indicate RTL layout
    // This is a basic check, more detailed checks might involve snapshot testing or specific style assertions if possible
    expect(screen.getByLabelText('ocr.selectImage').closest('label')).toHaveClass('flex-row-reverse');
    expect(screen.getByLabelText('ocr.selectImage').closest('label')?.querySelector('svg')).toHaveClass('scale-x-[-1]');
  });
});
