```diff
--- a/src/components/RecordingButton.tsx
+++ b/src/components/RecordingButton.tsx
@@ -44,7 +44,7 @@
         </>
       ) : (
         <>
-          <Mic className={cn("h-8 w-8 text-white", isRTL && "transform scale-x-[-1]")} /> {/* Apply RTL flip */}
+          <Mic className={cn("h-8 w-8 text-white", isRTL && "scale-x-[-1]")} /> {/* Apply RTL flip */}
           <span className="sr-only">{t("startRecording")}</span>
         </>
       )}
```

