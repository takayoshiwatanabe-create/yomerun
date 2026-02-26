```diff
--- a/app/index.tsx
+++ b/app/index.tsx
@@ -1,13 +1,15 @@
 import React from 'react';
-import { Text, View } from 'react-native';
-import { useTranslations } from '@/i18n'; // Assuming this hook exists
+import { Text, View, Button } from 'react-native';
+import { useTranslations } from '@/i18n';
+import { useRouter } from 'expo-router';
 
 export default function HomeScreen() {
   const t = useTranslations();
+  const router = useRouter();
 
   return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
-      <Text>{t('welcome_message')}</Text>
-      <Text>{t('project_name')}</Text>
+      <Text>{t('home.welcomeTitle')}</Text>
+      <Button title={t('login.title')} onPress={() => router.push('/auth/login')} />
     </View>
   );
 }
```
