```diff
--- a/src/app/[locale]/settings.tsx
+++ b/src/app/[locale]/settings.tsx
@@ -1,5 +1,6 @@
 "use client";
 
+import React from 'react'; // Explicitly import React
 import { useState } from "react";
 import { useTranslations, useLocale } from "next-intl";
 import {
@@ -112,7 +113,7 @@
                 )}
                 aria-label={t("parentInfoTitle")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
-              >
+              > {/* ChevronRight is a directional icon, it should be mirrored in RTL */}
                 {t("viewDetails")}
                 <ChevronRight className={cn(
                   "h-5 w-5",
@@ -127,7 +128,7 @@
                 )}
                 aria-label={t("privacyPolicyTitle")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
-              >
+              > {/* ChevronRight is a directional icon, it should be mirrored in RTL */}
                 {t("viewDetails")}
                 <ChevronRight className={cn(
                   "h-5 w-5",
@@ -142,7 +143,7 @@
                 )}
                 aria-label={t("termsOfServiceTitle")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
-              >
+              > {/* ChevronRight is a directional icon, it should be mirrored in RTL */}
                 {t("viewDetails")}
                 <ChevronRight className={cn(
                   "h-5 w-5",
```
