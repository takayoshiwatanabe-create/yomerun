```diff
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -16,7 +16,7 @@
   children: React.ReactNode;
 }>) {
   return (
-    <html lang="ja" dir="ltr"> {/* Default language for the root HTML tag */}
+    <html lang="ja" dir="ltr"> {/* Default language for the root HTML tag, will be overridden by [locale]/layout.tsx */}
       <body className={inter.className}>
         {children}
       </body>
```

