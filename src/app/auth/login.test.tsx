import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './login';
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

describe('LoginPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `login.${key}`);
    (useLocale as jest.Mock).mockReturnValue('en');
    mockPush.mockClear();
  });

  it('renders the login form with email and password fields', () => {
    render(<LoginPage />);
    expect(screen.getByText('login.title')).toBeInTheDocument();
    expect(screen.getByLabelText('login.emailLabel')).toBeInTheDocument();
    expect(screen.getByLabelText('login.passwordLabel')).toBeInTheDocument();
    expect(screen.getByLabelText('login.loginButton')).toBeInTheDocument();
    expect(screen.getByText('login.noAccountPrompt')).toBeInTheDocument();
    expect(screen.getByLabelText('login.signUpLink')).toBeInTheDocument();
  });

  it('shows error message for empty fields on submit', async () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByLabelText('login.loginButton'));
    await waitFor(() => {
      expect(screen.getByText('login.validation.emptyFields')).toBeInTheDocument();
    });
  });

  it('shows error message for invalid credentials', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('login.emailLabel'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText('login.passwordLabel'), {
      target: { value: 'wrongpassword' },
    });
    fireEvent.click(screen.getByLabelText('login.loginButton'));

    await waitFor(() => {
      expect(screen.getByText('login.error.invalidCredentials')).toBeInTheDocument();
    });
  });

  it('successfully logs in and redirects to home page', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('login.emailLabel'), {
      target: { value: 'parent@example.com' },
    });
    fireEvent.change(screen.getByLabelText('login.passwordLabel'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText('login.loginButton'));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login successful');
      expect(mockPush).toHaveBeenCalledWith('/en/');
    });
    consoleSpy.mockRestore();
  });

  it('navigates to signup page when "Sign Up" link is clicked', () => {
    render(<LoginPage />);
    fireEvent.click(screen.getByLabelText('login.signUpLink'));
    expect(mockPush).toHaveBeenCalledWith('/en/auth/signup');
  });

  it('displays loading state when submitting', async () => {
    render(<LoginPage />);
    fireEvent.change(screen.getByLabelText('login.emailLabel'), {
      target: { value: 'parent@example.com' },
    });
    fireEvent.change(screen.getByLabelText('login.passwordLabel'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByLabelText('login.loginButton'));

    expect(screen.getByLabelText('login.loginButton')).toHaveTextContent('login.loading');
    await waitFor(() => {
      expect(screen.getByLabelText('login.loginButton')).not.toHaveTextContent('login.loading');
    });
  });

  it('applies RTL styling for Arabic locale', () => {
    (useLocale as jest.Mock).mockReturnValue('ar');
    render(<LoginPage />);

    // Check label alignment
    expect(screen.getByLabelText('login.emailLabel')).toHaveClass('text-right');
    expect(screen.getByLabelText('login.passwordLabel')).toHaveClass('text-right');

    // Check prompt layout
    const noAccountPrompt = screen.getByText('login.noAccountPrompt').closest('p');
    expect(noAccountPrompt).toHaveClass('flex-row-reverse');
  });
});
