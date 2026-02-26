```diff
--- a/src/app/auth/login.tsx
+++ b/src/app/auth/login.tsx
@@ -1,6 +1,7 @@
 "use client";
 
 import React, { useState } from "react";
+import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
 import { Input } from "@/components/ui/input";
@@ -20,6 +21,7 @@
 export default function LoginPage() {
   const t = useTranslations("login");
   const locale = useLocale();
+  const router = useRouter();
   const isRTL = locale === 'ar';
 
   const [email, setEmail] = useState("");
@@ -35,8 +37,7 @@
     try {
       loginSchema.parse({ email, password });
       // Simulate API call for login
-      await new Promise((resolve) => setTimeout(resolve, 1500));
-      console.log("Login successful:", { email });
+      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
       // Redirect to home or dashboard
       // router.push(`/${locale}/dashboard`);
     } catch (e) {
```

