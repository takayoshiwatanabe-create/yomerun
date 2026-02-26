```diff
--- a/src/app/[locale]/ocr/page.tsx
+++ b/src/app/[locale]/ocr/page.tsx
@@ -1,5 +1,5 @@
-import OCRScreen from "../ocr";
-
+import OCRScreen from "@/app/[locale]/ocr.tsx"; // Correct path to the client component
+ 
 export default function OCRPage() {
   return <OCRScreen />;
 }
```
