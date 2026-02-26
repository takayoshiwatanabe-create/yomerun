import React from 'react';
import { Stack } from 'expo-router';
import { I18nProvider, useI18n } from '@/i18n';
import { useDeviceLocale } from '@/i18n/translations'; // Correct import path for useDeviceLocale
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { View } from 'react-native'; // Import View for layout direction

const queryClient = new QueryClient();

function RootLayoutContent() {
  const { isRTL } = useI18n();

  return (
    <View style={{ flex: 1, direction: isRTL ? 'rtl' : 'ltr' }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        {/* Add other screens here */}
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  const locale = useDeviceLocale();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider locale={locale}>
        <RootLayoutContent />
      </I18nProvider>
    </QueryClientProvider>
  );
}
