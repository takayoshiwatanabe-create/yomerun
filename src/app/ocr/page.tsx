// This file is intentionally left blank or removed as per Expo Router's src/app/[locale]/ layout.
// The OCR screen should be accessible via the locale-prefixed route, e.g., /en/ocr.
// If this file exists, it might create a conflicting route /ocr which is not locale-aware.
// For Expo Router with src/app/[locale]/ structure, all route files should be under [locale].
// If a non-locale-prefixed route is desired, it should be explicitly handled or placed outside [locale].
// Given the current setup, the OCRScreen component is already defined under `src/app/[locale]/ocr.tsx`.
// To make it a page, it needs to be `src/app/[locale]/ocr/page.tsx`.
// This file `src/app/ocr.tsx` is not a page file and should not exist as a route.
// It's likely a leftover or misplacement.
// The content of the original `src/app/ocr.tsx` has been moved to `src/app/[locale]/ocr.tsx`
// and then imported into `src/app/[locale]/ocr/page.tsx` to create the actual route.
// Therefore, this file should be effectively removed or ignored for routing purposes.
// For a clean fix, I'm replacing its content with a comment indicating its removal/repurposing.
// If it were intended to be a component, it should be in `src/components`.
// If it were intended to be a root-level page, it would conflict with the `[locale]` structure.
// The most consistent approach with `[locale]` routing is to have `src/app/[locale]/ocr/page.tsx`.
// This file is effectively removed from the routing structure.
export default function RemovedOCRScreen() {
  return null;
}

