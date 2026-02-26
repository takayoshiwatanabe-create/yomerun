```diff
--- a/app/auth/login.tsx
+++ b/app/auth/login.tsx
@@ -1,6 +1,6 @@
 import React, { useState } from 'react';
 import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
 import { useRouter } from 'expo-router';
-import { useTranslations, useI18n } from '@/i18n'; // Assuming useI18n provides isRTL
+import { useTranslations, useI18n } from '@/i18n';
 import { z } from 'zod';
 
 // Define validation schema for login form
```
