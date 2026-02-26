```diff
--- a/src/app/auth/login.tsx
+++ b/src/app/auth/login.tsx
@@ -1,6 +1,6 @@
 "use client";
 
-import React, { useState } from "react";
+import React, { useState } from "react"; // Explicitly import React
 import { useRouter } from "next/navigation";
 import { Button } from "@/components/ui/button";
 import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```
