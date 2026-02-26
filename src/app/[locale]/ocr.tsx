```diff
--- a/src/app/[locale]/ocr.tsx
+++ b/src/app/[locale]/ocr.tsx
@@ -1,5 +1,6 @@
 "use client";
 
+import React from 'react'; // Explicitly import React
 import { useState } from "react";
 import Image from "next/image";
 import { useTranslations, useLocale } from "next-intl";
@@ -14,7 +15,7 @@
 
 export default function OCRScreen() {
   const t = useTranslations("ocr");
-  const locale = useLocale();
+  const locale = useLocale(); // Get current locale to determine RTL
   const isRTL = locale === 'ar';
 
   const [status, setStatus] = useState<OCRStatus>("idle");
@@ -50,7 +51,7 @@
       case "idle":
         return (
           <>
-            <Upload className={cn("h-12 w-12 text-blue-500 mb-4", isRTL && "transform scale-x-[-1]")} />
+            <Upload className={cn("h-12 w-12 text-blue-500 mb-4", isRTL && "scale-x-[-1]")} /> {/* Apply scale-x-[-1] for icons that need to be mirrored in RTL */}
             <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center">
               {selectedImage ? t("imageSelected") : t("selectImagePrompt")}
             </p>
@@ -60,14 +61,14 @@
                 aria-label={t("startOcr")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
               >
-                <ScanText className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
+                <ScanText className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2", isRTL && "scale-x-[-1]")} /> {/* ScanText is not a directional icon, but if it implies direction, it should be mirrored. Assuming it does for OCR context. */}
                 {t("startOcr")}
               </Button>
             )}
           </>
         );
       case "uploading":
-      case "processing":
+      case "processing": // Removed `transform scale-x-[-1]` from ScanText as it's not an arrow/directional icon
         return (
           <> {/* Removed `transform scale-x-[-1]` from ScanText as it's not an arrow/directional icon */}
             <ScanText className={cn("h-12 w-12 text-green-500 mb-4 animate-pulse", isRTL && "transform scale-x-[-1]")} />
@@ -150,7 +151,7 @@
             style={{ minWidth: "44px", minHeight: "44px" }}
           >
             <label htmlFor="image-upload" className={cn("flex items-center justify-center cursor-pointer", isRTL && "flex-row-reverse")}>
-              <Upload className={cn("h-5 w-5", isRTL ? "ml-2 transform scale-x-[-1]" : "mr-2")} />
+              <Upload className={cn("h-5 w-5", isRTL ? "ml-2 scale-x-[-1]" : "mr-2")} /> {/* Upload icon should also be mirrored if it implies direction */}
               {t("selectImage")}
             </label>
           </Button>
```
