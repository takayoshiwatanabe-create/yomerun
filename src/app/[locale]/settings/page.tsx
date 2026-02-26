```diff
--- a/src/app/[locale]/settings/page.tsx
+++ b/src/app/[locale]/settings/page.tsx
@@ -1,5 +1,5 @@
-import SettingsScreen from "../settings";
-
+import SettingsScreen from "@/app/[locale]/settings.tsx"; // Correct path to the client component
+
 export default function SettingsPage() {
   return <SettingsScreen />;
 }
```
