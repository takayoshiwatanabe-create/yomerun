```diff
--- a/src/app/[locale]/page.tsx
+++ b/src/app/[locale]/page.tsx
@@ -1,5 +1,5 @@
 "use client"; // Add "use client" directive
-
+import React from 'react'; // Explicitly import React
 import { useTranslations } from "next-intl";
 
 export default function HomeScreen() {
```
