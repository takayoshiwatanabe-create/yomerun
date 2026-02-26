import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsScreen from './settings';
import { useTranslations, useLocale } from 'next-intl';

// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useTranslations: jest.fn((namespace: string) => (key: string) => `${namespace}.${key}`),
  useLocale: jest.fn(() => 'en'),
}));

describe('SettingsScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useTranslations as jest.Mock).mockReturnValue((key: string) => `settings.${key}`);
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  it('renders the settings title and description', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('settings.title')).toBeInTheDocument();
    expect(screen.getByText('settings.description')).toBeInTheDocument();
  });

  it('renders account settings options', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('settings.accountSettingsTitle')).toBeInTheDocument();
    expect(screen.getByLabelText('settings.changePasswordTitle')).toBeInTheDocument();
    expect(screen.getByLabelText('settings.manageProfileTitle')).toBeInTheDocument();
  });

  it('renders privacy & security options', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('settings.privacySecurityTitle')).toBeInTheDocument();
    expect(screen.getByLabelText('settings.dataSharingConsent')).toBeInTheDocument();
    expect(screen.getByLabelText('settings.parentInfoTitle')).toBeInTheDocument();
  });

  it('toggles data sharing consent switch', async () => {
    render(<SettingsScreen />);
    const dataSharingSwitch = screen.getByLabelText('settings.dataSharingConsent');
    expect(dataSharingSwitch).not.toBeChecked();

    fireEvent.click(dataSharingSwitch);
    await waitFor(() => {
      expect(dataSharingSwitch).toBeChecked();
    });

    fireEvent.click(dataSharingSwitch);
    await waitFor(() => {
      expect(dataSharingSwitch).not.toBeChecked();
    });
  });

  it('renders general settings options', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('settings.generalSettingsTitle')).toBeInTheDocument();
    expect(screen.getByLabelText('settings.notifications')).toBeInTheDocument();
  });

  it('toggles notifications switch', async () => {
    render(<SettingsScreen />);
    const notificationsSwitch = screen.getByLabelText('settings.notifications');
    expect(notificationsSwitch).toBeChecked();

    fireEvent.click(notificationsSwitch);
    await waitFor(() => {
      expect(notificationsSwitch).not.toBeChecked();
    });

    fireEvent.click(notificationsSwitch);
    await waitFor(() => {
      expect(notificationsSwitch).toBeChecked();
    });
  });

  it('renders about section and version', () => {
    render(<SettingsScreen />);
    expect(screen.getByText('settings.aboutTitle')).toBeInTheDocument();
    expect(screen.getByLabelText('settings.privacyPolicyTitle')).toBeInTheDocument();
    expect(screen.getByLabelText('settings.termsOfServiceTitle')).toBeInTheDocument();
    expect(screen.getByText('settings.version 1.0.0')).toBeInTheDocument();
  });

  it('renders logout button and logs message on click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<SettingsScreen />);
    const logoutButton = screen.getByLabelText('settings.logoutButton');
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(consoleSpy).toHaveBeenCalledWith('Logging out...');
    consoleSpy.mockRestore();
  });

  it('applies RTL styling for Arabic locale', () => {
    (useLocale as jest.Mock).mockReturnValue('ar');
    render(<SettingsScreen />);

    // Check for specific elements that should have RTL classes
    // Example: Account Settings title should have ml-2 mr-0 on its icon
    const accountSettingsTitle = screen.getByText('settings.accountSettingsTitle');
    const userIcon = accountSettingsTitle.previousElementSibling; // Assuming icon is sibling
    expect(userIcon).toHaveClass('ml-2');
    expect(userIcon).toHaveClass('mr-0');
    expect(userIcon).toHaveClass('scale-x-[-1]');

    // Check button layout for RTL
    const changePasswordButton = screen.getByLabelText('settings.changePasswordTitle');
    expect(changePasswordButton).toHaveClass('flex-row-reverse');
    expect(changePasswordButton.querySelector('svg')).toHaveClass('rotate-180'); // Chevron should be flipped
  });
});
