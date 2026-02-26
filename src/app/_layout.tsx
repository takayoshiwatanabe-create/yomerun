import React from 'react';
import { Stack } from 'expo-router';
import { I18nProvider, useDeviceLocale, SupportedLocale } from '@/i18n/index';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import { usePathname } from 'expo-router'; // Changed from 'next/navigation' to 'expo-router'
import { View, StyleSheet } from 'react-native';

export default function RootLayout() {
  const deviceLocale = useDeviceLocale();
  const pathname = usePathname();

  // Determine if the current route is an authentication route
  // This assumes auth routes are under /auth or /auth/login, /auth/signup
  const isAuthRoute = pathname.includes('/auth');

  return (
    <I18nProvider locale={deviceLocale as SupportedLocale}>
      <View style={styles.container}>
        {!isAuthRoute && <Header />}
        <Stack screenOptions={{ headerShown: false }}>
          {/* The root path for Expo Router is typically just the folder name, e.g., `(app)` or `index` */}
          {/* For a locale-prefixed structure, the entry point would be `[locale]/index.tsx` or similar */}
          {/* The redirect is handled by the `[locale]/index.tsx` or `[locale]/page.tsx` */}
          <Stack.Screen name="[locale]/page" redirect={true} /> {/* This should point to the actual entry page */}
          <Stack.Screen name="[locale]/ocr/page" />
          <Stack.Screen name="[locale]/settings/page" />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signup" options={{ headerShown: false }} />
        </Stack>
        {!isAuthRoute && <TabBar />}
      </View>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
