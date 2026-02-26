import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpPage from './signup';
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

describe('SignUpPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `signup.${key}`);
    (useLocale as jest.Mock).mockReturnValue('en');
    mockPush.mockClear();
  });

  it('renders the signup form with all required fields', () => {
    render(<SignUpPage />);
    expect(screen.getByText('signup.title')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.emailLabel')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.passwordLabel')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.confirmPasswordLabel')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.parentConsentLabel')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.signUpButton')).toBeInTheDocument();
    expect(screen.getByText('signup.alreadyHaveAccountPrompt')).toBeInTheDocument();
    expect(screen.getByLabelText('signup.loginLink')).toBeInTheDocument();
  });

  it('shows error message for empty fields on submit', async () => {
    render(<SignUpPage />);
    fireEvent.click(screen.getByLabelText('signup.signUpButton'));
    await waitFor(() => {
      expect(screen.getByText('signup.validation.emptyFields')).toBeInTheDocument();
    });
  });

  it('shows error message for password too short', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText('signup.emailLabel'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('signup.passwordLabel'), { target: { value: 'short' } });
    fireEvent.change(screen.getByLabelText('signup.confirmPasswordLabel'), { target: { value: 'short' } });
    fireEvent.click(screen.getByLabelText('signup.parentConsentLabel')); // Check consent
    fireEvent.click(screen.getByLabelText('signup.signUpButton'));

    await waitFor(() => {
      expect(screen.getByText('signup.validation.passwordTooShort')).toBeInTheDocument();
    });
  });

  it('shows error message for passwords mismatch', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText('signup.emailLabel'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('signup.passwordLabel'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('signup.confirmPasswordLabel'), { target: { value: 'password456' } });
    fireEvent.click(screen.getByLabelText('signup.parentConsentLabel')); // Check consent
    fireEvent.click(screen.getByLabelText('signup.signUpButton'));

    await waitFor(() => {
      expect(screen.getByText('signup.validation.passwordsMismatch')).toBeInTheDocument();
    });
  });

  it('shows error message if parent consent is not given', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText('signup.emailLabel'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('signup.passwordLabel'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('signup.confirmPasswordLabel'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByLabelText('signup.signUpButton')); // Don't check consent

    await waitFor(() => {
      expect(screen.getByText('signup.validation.parentConsentRequired')).toBeInTheDocument();
    });
  });

  it('successfully signs up and redirects to login page', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText('signup.emailLabel'), { target: { value: 'newparent@example.com' } });
    fireEvent.change(screen.getByLabelText('signup.passwordLabel'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByLabelText('signup.confirmPasswordLabel'), { target: { value: 'newpassword123' } });
    fireEvent.click(screen.getByLabelText('signup.parentConsentLabel'));
    fireEvent.click(screen.getByLabelText('signup.signUpButton'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Sign up successful');
      expect(mockPush).toHaveBeenCalledWith('/en/auth/login');
    });
    consoleSpy.mockRestore();
  });

  it('navigates to login page when "Login" link is clicked', () => {
    render(<SignUpPage />);
    fireEvent.click(screen.getByLabelText('signup.loginLink'));
    expect(mockPush).toHaveBeenCalledWith('/en/auth/login');
  });

  it('displays loading state when submitting', async () => {
    render(<SignUpPage />);
    fireEvent.change(screen.getByLabelText('signup.emailLabel'), { target: { value: 'newparent@example.com' } });
    fireEvent.change(screen.getByLabelText('signup.passwordLabel'), { target: { value: 'newpassword123' } });
    fireEvent.change(screen.getByLabelText('signup.confirmPasswordLabel'), { target: { value: 'newpassword123' } });
    fireEvent.click(screen.getByLabelText('signup.parentConsentLabel'));
    fireEvent.click(screen.getByLabelText('signup.signUpButton'));

    expect(screen.getByLabelText('signup.signUpButton')).toHaveTextContent('signup.loading');
    await waitFor(() => {
      expect(screen.getByLabelText('signup.signUpButton')).not.toHaveTextContent('signup.loading');
    });
  });

  it('applies RTL styling for Arabic locale', () => {
    (useLocale as jest.Mock).mockReturnValue('ar');
    render(<SignUpPage />);

    // Check label alignment
    expect(screen.getByLabelText('signup.emailLabel')).toHaveClass('text-right');
    expect(screen.getByLabelText('signup.passwordLabel')).toHaveClass('text-right');
    expect(screen.getByLabelText('signup.confirmPasswordLabel')).toHaveClass('text-right');

    // Check checkbox and label layout
    const parentConsentContainer = screen.getByLabelText('signup.parentConsentLabel').closest('div');
    expect(parentConsentContainer).toHaveClass('flex-row-reverse');

    // Check prompt layout
    const alreadyHaveAccountPrompt = screen.getByText('signup.alreadyHaveAccountPrompt').closest('p');
    expect(alreadyHaveAccountPrompt).toHaveClass('flex-row-reverse');
  });
});
