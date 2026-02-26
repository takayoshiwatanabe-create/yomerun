```diff
--- a/app/_layout.tsx
+++ b/app/_layout.tsx
@@ -1,10 +1,10 @@
 import React from 'react';
 import { Stack } from 'expo-router';
 import { I18nProvider } from '@/i18n';
-import { useDeviceLocale } from '@/i18n/translations'; // Assuming this hook exists
+import { useDeviceLocale } from '@/i18n/translations';
 import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 
 const queryClient = new QueryClient();
 
 export default function RootLayout() {
   const locale = useDeviceLocale(); // Get device locale for initial load
@@ -13,7 +13,8 @@
     <I18nProvider locale={locale}>
       <QueryClientProvider client={queryClient}>
         <Stack>
-          <Stack.Screen name="index" options={{ headerShown: false }} />
+          <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Home screen */}
+          <Stack.Screen name="auth/login" options={{ headerShown: false }} /> {/* Login screen */}
           {/* Add other screens here as needed */}
         </Stack>
       </QueryClientProvider>
```

