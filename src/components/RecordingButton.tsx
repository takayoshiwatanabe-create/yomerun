```diff
--- a/src/components/RecordingButton.tsx
+++ b/src/components/RecordingButton.tsx
@@ -1,6 +1,6 @@
 import React from 'react';
-import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
-import { Mic, StopCircle } from 'lucide-react-native';
+import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'; // Assuming React Native context for these components
+import { Mic, StopCircle } from 'lucide-react-native'; // Assuming React Native context for these icons
 import { useI18n } from '@/i18n';
 
 interface RecordingButtonProps {
@@ -11,8 +11,6 @@
 
 export default function RecordingButton({ isRecording, onPress, disabled = false }: RecordingButtonProps) {
   const { isRTL } = useI18n();
-
-  const iconStyle = isRTL ? { transform: [{ scaleX: -1 }] } : {};
 
   return (
     <TouchableOpacity
@@ -22,7 +20,7 @@
       accessibilityLabel={isRecording ? 'Stop recording' : 'Start recording'}
     >
       <View style={styles.iconContainer}>
-        {isRecording ? (
+        {isRecording ? ( // StopCircle is not a directional icon, no need to mirror
           <StopCircle size={32} color="#FFFFFF" style={iconStyle} />
         ) : (
           <Mic size={32} color="#FFFFFF" style={iconStyle} />
@@ -50,6 +48,9 @@
   iconContainer: {
     // No specific styling needed here, just a wrapper for the icon
   },
+  rtlIconContainer: {
+    transform: [{ scaleX: -1 }], // Mirror the icon for RTL
+  },
   buttonText: {
     color: '#FFFFFF',
     fontSize: 16,
```
