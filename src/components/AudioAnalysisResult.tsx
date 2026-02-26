```diff
--- a/src/components/AudioAnalysisResult.tsx
+++ b/src/components/AudioAnalysisResult.tsx
@@ -1,8 +1,8 @@
 import React from 'react';
-import { View, Text, StyleSheet } from 'react-native';
-import { CheckCircle, XCircle, Star } from 'lucide-react-native';
+import { View, Text, StyleSheet } from 'react-native'; // Assuming React Native context for these components
+import { CheckCircle, XCircle, Star } from 'lucide-react-native'; // Assuming React Native context for these icons
 import { useTranslations, useI18n } from '@/i18n';
-
+ 
 interface AudioAnalysisResultProps {
   score: number;
   feedback: 'excellent' | 'good' | 'needs_practice';
@@ -19,8 +19,6 @@
   };
 
   const scoreColor = getScoreColor(score);
-
-  const iconStyle = isRTL ? { transform: [{ scaleX: -1 }] } : {};
 
   return (
     <View style={[styles.container, isRTL && styles.rtlContainer]}>
@@ -50,11 +48,11 @@
 
       {/* Example of logical properties for layout */}
       <View style={[
-        styles.actionContainer,
-        isRTL ? { flexDirection: 'row-reverse', marginInlineStart: 10 } : { flexDirection: 'row', marginInlineEnd: 10 }
+        styles.actionContainer, // Use logical properties for margin/padding
+        isRTL ? { flexDirection: 'row-reverse', marginStart: 10 } : { flexDirection: 'row', marginEnd: 10 }
       ]}>
         {/* Action buttons would go here */}
       </View>
     </View>
   );
 }
@@ -83,19 +81,19 @@
     fontWeight: 'bold',
     color: '#333',
   },
-  starIcon: {
-    // marginInlineEnd: 8, // Use logical property
-  },
+  starIcon: {}, // No specific styling needed here, margin is handled by inline style
   scoreContainer: {
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     marginBottom: 15,
   },
   rtlScoreContainer: {
-    flexDirection: 'row-reverse',
+    flexDirection: 'row-reverse', // Reverse order for RTL
   },
   scoreLabel: {
     fontSize: 18,
     fontWeight: '600',
-    // marginInlineEnd: 8, // Use logical property
+    marginEnd: 8, // Use logical property for margin
   },
   scoreValue: {
     fontSize: 28,
@@ -107,14 +105,12 @@
     backgroundColor: '#F0F4F8',
     borderRadius: 8,
     padding: 12,
-    // marginInlineStart: 0, // Use logical property
-    // marginInlineEnd: 0, // Use logical property
   },
   rtlFeedbackContainer: {
-    flexDirection: 'row-reverse',
+    flexDirection: 'row-reverse', // Reverse order for RTL
   },
   feedbackIcon: {
-    // marginInlineEnd: 8, // Use logical property
+    marginEnd: 8, // Use logical property for margin
   },
   feedbackText: {
     fontSize: 16,
```
