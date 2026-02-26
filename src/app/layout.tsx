```diff
--- a/src/app/layout.tsx
+++ b/src/app/layout.tsx
@@ -1,5 +1,6 @@
 import type { Metadata } from "next";
 import { Inter } from "next/font/google";
+import React from 'react'; // Explicitly import React
 import "../global.css";
 
 const inter = Inter({ subsets: ["latin"] });
```
