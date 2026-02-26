```diff
--- a/app/_layout.tsx
+++ b/app/_layout.tsx
@@ -1,6 +1,6 @@
 import React from 'react';
 import { Stack } from 'expo-router';
-import { I18nProvider } from '@/i18n';
+import { I18nProvider, useI18n } from '@/i18n'; // Import useI18n for React Native context
 import { useDeviceLocale } from '@/i18n/translations';
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
@@ -8,7 +8,7 @@
 
 export default function RootLayout() {
   const locale = useDeviceLocale(); // Get device locale for initial load
-  
+  const { isRTL } = useI18n(); // Get isRTL flag for React Native layout adjustments
   return (
     <I18nProvider locale={locale}>
       <QueryClientProvider client={queryClient}>
```
