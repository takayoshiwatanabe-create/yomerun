```diff
--- a/src/app/ocr/page.tsx
+++ b/src/app/ocr/page.tsx
@@ -1,5 +1,6 @@
 // This file is intentionally left empty or removed as per the directory constraint.
 // The actual OCR page component is at src/app/[locale]/ocr/page.tsx
 // and the client component at src/app/[locale]/ocr.tsx
+import { redirect } from 'next/navigation';
+redirect('/ja/ocr'); // Redirect to a default locale if accessed directly
```
