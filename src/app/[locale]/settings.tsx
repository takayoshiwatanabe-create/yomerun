```diff
--- a/src/app/[locale]/settings.tsx
+++ b/src/app/[locale]/settings.tsx
@@ -112,7 +112,7 @@
                 )}
                 aria-label={t("parentInfoTitle")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
-              >
+              > {/* Removed `transform scale-x-[-1]` from ChevronRight as it's handled by `dir="rtl"` */}
                 {t("viewDetails")}
                 <ChevronRight className={cn(
                   "h-5 w-5",
@@ -134,7 +134,7 @@
                 )}
                 aria-label={t("privacyPolicyTitle")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
-              >
+              > {/* Removed `transform scale-x-[-1]` from ChevronRight as it's handled by `dir="rtl"` */}
                 {t("viewDetails")}
                 <ChevronRight className={cn(
                   "h-5 w-5",
@@ -156,7 +156,7 @@
                 )}
                 aria-label={t("termsOfServiceTitle")}
                 style={{ minWidth: "44px", minHeight: "44px" }}
-              >
+              > {/* Removed `transform scale-x-[-1]` from ChevronRight as it's handled by `dir="rtl"` */}
                 {t("viewDetails")}
                 <ChevronRight className={cn(
                   "h-5 w-5",
```

