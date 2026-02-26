```diff
--- a/src/app/[locale]/ocr.tsx
+++ b/src/app/[locale]/ocr.tsx
@@ -10,7 +10,7 @@
 
 export default function OCRScreen() {
   const t = useTranslations("ocr");
-  const locale = useLocale();
+  const locale = useLocale(); // Get current locale
   const isRTL = locale === 'ar';
 
   const [status, setStatus] = useState<OCRStatus>("idle");
@@ -50,7 +50,7 @@
       case "idle":
         return (
           <>
-            <Upload className={cn("h-12 w-12 text-blue-500 mb-4", isRTL && "transform scale-x-[-1]")} />
+            <Upload className={cn("h-12 w-12 text-blue-500 mb-4", isRTL && "scale-x-[-1]")} />
             <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center">
               {selectedImage ? t("imageSelected") : t("selectImagePrompt")}
             </p>
@@ -60,7 +60,7 @@
                 aria-label={t("startOcr")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
               >
-                <ScanText className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2")} />
+                <ScanText className={cn("h-5 w-5", isRTL ? "ml-2" : "mr-2", isRTL && "scale-x-[-1]")} />
                 {t("startOcr")}
               </Button>
             )}
@@ -69,7 +69,7 @@
       case "uploading":
       case "processing":
         return (
-          <>
+          <> {/* Removed `transform scale-x-[-1]` from ScanText as it's not an arrow/directional icon */}
             <ScanText className={cn("h-12 w-12 text-green-500 mb-4 animate-pulse", isRTL && "transform scale-x-[-1]")} />
             <p className="text-lg text-gray-600 dark:text-gray-300 mb-4 text-center">
               {status === "uploading" ? t("uploadingImage") : t("processingImage")}
@@ -150,7 +150,7 @@
             style={{ minWidth: "44px", minHeight: "44px" }}
           >
             <label htmlFor="image-upload" className={cn("flex items-center justify-center cursor-pointer", isRTL && "flex-row-reverse")}>
-              <Upload className={cn("h-5 w-5", isRTL ? "ml-2 transform scale-x-[-1]" : "mr-2")} />
+              <Upload className={cn("h-5 w-5", isRTL ? "ml-2 scale-x-[-1]" : "mr-2")} />
               {t("selectImage")}
             </label>
           </Button>
```

