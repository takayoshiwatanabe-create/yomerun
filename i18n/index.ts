```diff
--- a/i18n/index.ts
+++ b/i18n/index.ts
@@ -1,5 +1,5 @@
 import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
-import { getMessages, SupportedLocale, isRTL as checkIsRTL } from './translations'; // Assuming these exist
+import { getMessages, SupportedLocale, isRTL as checkIsRTL } from './translations';
 
 interface I18nContextType {
   t: (key: string, variables?: Record<string, string | number>) => string;
```

