```diff
--- a/src/i18n/translations.ts
+++ b/src/i18n/translations.ts
@@ -298,6 +298,10 @@
     "signup.validation.passwordTooShort": "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل.",
     "signup.validation.passwordsMismatch": "كلمات المرور غير متطابقة.",
     "signup.validation.parentConsentRequired": "موافقة الوالدين مطلوبة للمتابعة.",
-    "signup.error.general": "حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى.",
+    "signup.error.general": "حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى.", // Added missing comma
+    // Audio Analysis Translations for React Native
+    "analysis.resultTitle": "نتيجة التحليل",
+    "analysis.scoreLabel": "النتيجة",
+    "analysis.feedback.excellent": "ممتاز! قراءة مثالية!",
   },
   hi: {
     "common.appName": "योमेरुन",
```
