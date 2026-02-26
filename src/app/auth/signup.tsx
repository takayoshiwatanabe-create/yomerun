```diff
--- a/src/app/auth/signup.tsx
+++ b/src/app/auth/signup.tsx
@@ -1,6 +1,7 @@
 "use client";
 
 import React, { useState } from "react";
+import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
@@ -25,6 +26,7 @@
 export default function SignUpPage() {
   const t = useTranslations("signup");
   const locale = useLocale();
+  const router = useRouter();
   const isRTL = locale === 'ar';
 
   const [email, setEmail] = useState("");
@@ -42,8 +44,7 @@
     try {
       signupSchema.parse({ email, password, confirmPassword, parentConsent });
       // Simulate API call for signup
-      await new Promise((resolve) => setTimeout(resolve, 2000));
-      console.log("Sign up successful:", { email });
+      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay
       // Redirect to email verification or home
       // router.push(`/${locale}/verify-email`);
     } catch (e) {
```

