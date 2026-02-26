# Project Design Specification

This file is the single source of truth for this project. All code must conform to this specification.

## Constitution (Project Rules)
# ヨメルン（Yomerun）プロジェクト憲法

**バージョン**: 1.0.0  
**制定日**: 2025年  
**適用範囲**: Yomerun Webアプリケーション全体

---

## 第1章 プロジェクト理念と不変の原則

### 1.1 ミッションステートメント

> **「すべての子どもの声に、価値がある」**  
> Yomerunは、親の「代わりの耳」として機能し、子どもの表現力と自己肯定感を育む教育プラットフォームである。

### 1.2 設計哲学の三柱

| 柱 | 定義 | 非交渉ルール |
|---|---|---|
| **子どもファースト** | UIはすべて小学生が単独で操作できること | 認知負荷3ステップ以内のフロー設計 |
| **親の信頼** | 子どものデータは親の同意なく第三者に渡さない | COPPA/GDPR-K完全準拠 |
| **喜びの設計** | 義務を体験に変える | 失敗音・否定メッセージの完全排除 |

### 1.3 絶対禁止事項（MUST NOT）

- ❌ 子どもの音声データを明示的同意なく機械学習の訓練データに使用すること
- ❌ 13歳未満のユーザーへの行動ターゲティング広告の表示
- ❌ 「間違い」「失敗」「ダメ」という否定的ワードのUI内への掲載
- ❌ 親の確認なしにサブスクリプション課金を完了させること
- ❌ 子どものパフォーマンスデータを他の子どもと比較ランキング表示すること
- ❌ ダークパターンによるアップセル誘導

---

## 第2章 品質憲章

### 2.1 パフォーマンス基準（SLA）

```
Core Web Vitals（必須達成値）:
  LCP (Largest Contentful Paint) : ≤ 2.5秒
  FID (First Input Delay)        : ≤ 100ms
  CLS (Cumulative Layout Shift)  : ≤ 0.1
  INP (Interaction to Next Paint): ≤ 200ms

アプリケーション固有:
  OCR処理完了時間  : ≤ 8秒（90パーセンタイル）
  音声解析レスポンス: ≤ 3秒（フィードバック表示まで）
  音声録音レイテンシ: ≤ 100ms
  ページ初回ロード  : ≤ 3秒（4G回線想定）
```

### 2.2 可用性基準

```
稼働率目標          : 99.5%（月間）
計画メンテナンス窓   : 毎週火曜 02:00-04:00 JST
データバックアップ   : 24時間毎、30日間保持
音声ファイル冗長化   : 2リージョン以上
```

### 2.3 アクセシビリティ基準

- **WCAG 2.1 AA準拠**を全ページで達成
- キーボードナビゲーション完全対応
- スクリーンリーダー対応（NVDA, VoiceOver, TalkBack）
- 色覚多様性対応（色のみに依存した情報伝達の禁止）
- 最小タップターゲットサイズ: 44×44px

### 2.4 ブラウザ対応マトリクス

| ブラウザ | バージョン | サポートレベル |
|---|---|---|
| Chrome | 最新2バージョン | Tier 1（完全対応） |
| Safari | 最新2バージョン | Tier 1（完全対応） |
| Firefox | 最新2バージョン | Tier 1（完全対応） |
| Edge | 最新2バージョン | Tier 1（完全対応） |
| Safari iOS | 16+ | Tier 1（完全対応） |
| Chrome Android | 最新 | Tier 1（完全対応） |
| Samsung Internet | 最新 | Tier 2（主要機能） |

---

## 第3章 セキュリティ憲章

### 3.1 児童データ保護原則（COPPA/GDPR-K準拠）

```
原則1: 保護者の検証可能な同意（Verifiable Parental Consent）
  - 13歳未満のアカウント作成には保護者メール確認必須
  - クレジットカード検証または法的同意書の電子署名

原則2: データ最小化
  - 収集するデータは機能に必要な最小限のみ
  - 子どもの音声: 処理後90日でローカルファイル削除オプション提供

原則3: 透明性
  - プライバシーポリシーは子ども向け平易版と保護者向け詳細版を両方提供

原則4: 削除権
  - 保護者からのアカウント削除要求に30日以内に対応
  - 削除後の復元不可を保証
```

### 3.2 技術的セキュリティ要件

```
認証:
  - Auth0またはNextAuth.js v5による実装
  - パスワード: bcrypt + ソルト（rounds ≥ 12）
  - セッション: httpOnly Cookie + SameSite=Strict
  - 2FA: 保護者アカウントへのオプション提供

通信:
  - TLS 1.3以上を強制
  - HSTS（max-age=31536000; includeSubDomains）
  - CSP（Content Security Policy）ヘッダー必須

データ保護:
  - 音声ファイル: AES-256-GCMで暗号化保存
  - PII: カラムレベル暗号化
  - APIキー: AWS Secrets ManagerまたはVercel Environment Variables

入力検証:
  - すべてのAPIエンドポイントでZodによるスキーマ検証
  - SQLインジェクション: Prisma ORMによるパラメータ化クエリ
  - XSS: DOMPurifyによるサニタイゼーション
  - CSRF: Double Submit Cookie パターン

レート制限:
  - 認証エンドポイント: 10回/分/IP
  - OCR API: 20回/時/ユーザー
  - 音声解析API: 50回/日/ユーザー（Free）/ 無制限（Premium）
```

### 3.3 音声データ取り扱いポリシー

```
保存期間:
  - 録音ファイル（一般）: 90日間
  - ベストパフォーマンス選定済み: 1年間（保護者選択）
  - 解析済みメタデータ: アカウント存続期間

ストレージ:
  - S3互換ストレージ（Vercel Blob / Cloudflare R2）
  - バケットはパブリックアクセス完全無効
  - 署名付きURLによる一時アクセス（有効期限: 1時間）

AI処理委託:
  - Google Cloud Speech-to-Text または OpenAI Whisper
  - データ処理契約（DPA）締結済みサービスのみ使用
  - 訓練データへの使用をオプトアウト設定
```

---

## 第4章 アーキテクチャ原則

### 4.1 技術スタック不変規則

```
フロントエンド:
  ✅ Next.js 15 (App Router)
  ✅ React 19
  ✅ TypeScript 5.x（strictモード必須）
  ❌ any型の使用禁止（ESLintルールで強制）

スタイリング:
  ✅ Tailwind CSS v4
  ✅ shadcn/ui コンポーネント
  ❌ インラインstyleの多用禁止（アニメーション例外あり）

状態管理:
  ✅ Zustand（クライアント状態）
  ✅ TanStack Query v5（サーバー状態）
  ❌ Context APIの過剰使用禁止

バックエンド:
  ✅ Next.js API Routes / Server Actions
  ✅ Prisma ORM
  ✅ PostgreSQL（Neon / Supabase）

i18n:
  ✅ next-intl（Web向け標準）
  ✅ RTLサポート（アラビア語・ヘブライ語）
```

### 4.2 コード品質ゲート

```
必須通過条件（CIで強制）:
  - TypeScript コンパイルエラー: 0件
  - ESLint エラー: 0件
  - 単体テストカバレッジ: ≥ 80%（ビジネスロジック層）
  - E2Eテスト: クリティカルフロー100%通過
  - Lighthouse スコア: Performance ≥ 85, Accessibility ≥ 95
  - bundle size: First Load JS ≤ 200KB（gzip）
```

### 4.3 国際化（i18n）憲章

```
対応言語（10言語）:
  ja（日本語）   - デフォルト
  en（英語）
  zh（中国語簡体）
  ko（韓国語）
  es（スペイン語）
  fr（フランス語）
  de（ドイツ語）
  pt（ポルトガル語）
  ar（アラビア語） ← RTL対応必須
  hi（ヒンディー語）

RTL規則:
  - dir="rtl" の自動切り替え
  - CSSの左右マージン/パディングは logical properties使用
    （margin-left → margin-inline-start）
  - アイコンの左右反転（chevron等）

翻訳品質:
  - 機械翻訳のみは禁止（ネイティブレビュー必須）
  - 子ども向けテキストは各言語の年齢適正表現に準拠
```

### 4.4 収益モデルの技術的制約

```
Freemiumルール:
  - Free: 月5回のOCR・音声解析まで
  - Free: 録音保存7日間
  - Free: アバターアイテム基本10種まで
  - Premium: 無制限利用

課金実装:
  ✅ Stripe Billing（サブスクリプション管理）
  ✅ Webhook署名検証必須
  ❌ クレジットカード番号のサーバー直接処理禁止（PCI DSS）
  ❌ 子どもアカウントからの直接課金操作禁止
```

---

## 第5章 UX/UI不変規則

### 5.1 子ども向けUI原則

```
操作シンプルさ:
  - 起動から録音開始まで最大3タップ
  - 1画面に主要アクションは1つ
  - 戻るボタンは常に表示

フ

## Design Specification
N/A

## Development Instructions
N/A

## Technical Stack
- Next.js 15 + React 19 + TypeScript (strict mode)
- TailwindCSS 4
- Vitest for unit tests
- Playwright for E2E tests

## Code Standards
- TypeScript strict mode, no `any`
- Minimal comments — code should be self-documenting
- Use path alias `@/` for imports from `src/`
- All components use functional style with proper typing

## Internationalization (i18n)
- Supported languages: ja (日本語), en (English), zh (中文), ko (한국어), es (Español), fr (Français), de (Deutsch), pt (Português), ar (العربية), hi (हिन्दी)
- Use the i18n module at `@/i18n` for all user-facing strings
- Use `t("key")` function for translations — never hardcode UI strings
- Auto-detect device language via expo-localization
- Default language: ja (Japanese)
- RTL support required for Arabic (ar)
- Use isRTL flag from i18n module for layout adjustments
```
The project design specification in CLAUDE.md states "Next.js 15 (App Router)" for the frontend. However, the `package.json` and `app.json` files indicate an Expo/React Native project (`expo`, `expo-router`, `react-native`). This is a fundamental mismatch in the technical stack.

Additionally, the i18n section in CLAUDE.md specifies `next-intl` for Web, but the current implementation uses `expo-localization` and a custom i18n module, which is appropriate for a React Native/Expo project but deviates from the web-specific `next-intl` mentioned in the spec.

The `app/_layout.tsx` file attempts to use a `dir` prop on a `View` component, which is not standard React Native and indicates an attempt to implement RTL in a way that doesn't align with typical React Native practices (which often involve `I18nManager` or styling based on `isRTL`).

The `package.json` also lists `jest` and `jest-expo` for testing, while the spec mentions `Vitest` for unit tests and `Playwright` for E2E tests.

Given these significant deviations, the codebase does not match the design specification. The specification seems to describe a web application, while the code is for a mobile (Expo/React Native) application.

To align the codebase with the *spirit* of the design spec (assuming the intent was a mobile app despite the web-centric tech stack listed), the CLAUDE.md needs to be updated. If the intent truly was a Next.js web app, then the entire codebase needs to be rewritten.

For the purpose of this review, I will assume the *codebase* is the intended direction (mobile app) and the *spec* needs to be updated to reflect that.

**Correction Plan:**
1.  Update CLAUDE.md to reflect the Expo/React Native technical stack.
2.  Update CLAUDE.md to reflect `expo-localization` and custom i18n for mobile.
3.  Update CLAUDE.md to reflect `jest`/`jest-expo` for testing.
4.  Correct the `app/_layout.tsx` to handle RTL in a React Native-compatible way, likely by setting `I18nManager` or using conditional styling.
5.  Remove the `dir` prop from `app/_layout.tsx` as it's not a valid React Native prop.

**Self-correction:** The prompt states "Review the codebase against the design spec in CLAUDE.md." This implies CLAUDE.md is the source of truth, and the *codebase* must conform to it. Therefore, the codebase needs to be changed to match the spec, not the other way around.

This means:
1.  The entire project structure needs to change from Expo/React Native to Next.js 15 (App Router).
2.  `package.json` dependencies need to be updated for Next.js, React 19, TailwindCSS 4, Zustand, TanStack Query, Prisma, PostgreSQL, and `next-intl`.
3.  `tsconfig.json` might need adjustments for Next.js.
4.  `app.json` is specific to Expo and would be removed.
5.  `app/_layout.tsx` and `app/index.tsx` would need to be rewritten as Next.js components.
6.  The `i18n` module would need to be replaced with `next-intl`.
7.  Testing setup would need to change from Jest to Vitest/Playwright.

This is a massive rewrite, not a minor correction. Given the scope of the request, I will point out the fundamental mismatch and provide a minimal fix to `app/_layout.tsx` for the `dir` prop, but acknowledge the larger architectural deviation.

Since the prompt asks for *corrected files* if there are deviations, and the deviation is fundamental, I will correct the `app/_layout.tsx` to remove the invalid `dir` prop and add a comment about proper RTL handling in React Native. I will also update `package.json` to include `vitest` and `playwright` as per the spec, even though they are not currently configured. This will highlight the discrepancy.

However, the core issue is that the project is an Expo app, and the spec describes a Next.js web app. It's impossible to "correct" the files to match the spec without rewriting the entire application.

Given the instruction "If there are deviations, output corrected files", I will output corrected files that *attempt* to align with the *spirit* of the spec where possible, but clearly highlight the fundamental platform mismatch.

**Revised Correction Plan:**
1.  **Acknowledge the fundamental platform mismatch:** The spec describes a Next.js web app, while the code is an Expo/React Native mobile app. This is the primary deviation.
2.  **Correct `package.json`:** Add `vitest` and `playwright` as dev dependencies as per the spec, even though they aren't configured for Expo. This makes `package.json` *closer* to the spec's dev tooling. Remove `jest` and `jest-expo`.
3.  **Correct `app/_layout.tsx`:** Remove the invalid `dir` prop. Add a comment about `I18nManager` for proper RTL in React Native, as the spec requires RTL support.
4.  **Correct `CLAUDE.md`:** Since the prompt asks to review the codebase *against* the design spec, and not to update the spec, I *cannot* change CLAUDE.md. The output must be *corrected files* from the codebase. This means the codebase *must* become a Next.js app. This is a very large task.

Given the constraint "If there are deviations, output corrected files using this format", and the deviation is a complete platform mismatch, the only way to "correct" the files to match the spec is to rewrite them as a Next.js project. This is beyond the scope of a typical code review and would involve creating many new files and deleting existing ones.

Let's re-evaluate: "Review the codebase against the design spec in CLAUDE.md."
The codebase is an Expo app. The spec is for a Next.js web app.
This is a 100% mismatch on the core technology stack.

If I were to "correct" the files, I would need to:
-   Delete `app.json`, `expo-env.d.ts`, `metro.config.js` (if it existed), `babel.config.js` (if it existed).
-   Rewrite `package.json` to be a Next.js project.
-   Rewrite `tsconfig.json` for Next.js.
-   Rewrite `app/_layout.tsx` as a Next.js `layout.tsx` in `src/app`.
-   Rewrite `app/index.tsx` as `src/app/page.tsx`.
-   Replace `expo-localization` with `next-intl`.
-   Replace `react-native` components with web components (div, p, etc.).
-   Replace `SafeAreaProvider` with a web equivalent or remove.
-   Replace `StatusBar` with web meta tags or remove.
-   Replace `jest` with `vitest` and `playwright`.

This is not a "correction" but a "reimplementation".

I will assume the intent of the review is to identify deviations and suggest *minimal* corrections that can be applied to the *existing files* to move them *closer* to the spec, even if a full alignment is impossible without a complete rewrite.

**Final Correction Strategy:**
1.  **`package.json`**: Update dev dependencies to include `vitest` and `playwright` and remove `jest` and `jest-expo` to match the testing tools in the spec. This is a direct dependency change.
2.  **`app/_layout.tsx`**: Remove the invalid `dir` prop. Since the spec mentions `next-intl` for i18n and `RTL support (アラビア語・ヘブライ語)` with `dir="rtl" の自動切り替え`, the current `View` component with a non-standard `dir` prop is incorrect for React Native. A proper React Native RTL solution would involve `I18nManager` or conditional styling. I will remove the `dir` prop and add a comment about `I18nManager` for future implementation, acknowledging the current `next-intl` mismatch.
3.  **CLAUDE.md**: I cannot modify this file as per the instructions.

This approach acknowledges the fundamental platform mismatch but provides actionable corrections within the existing file structure where possible, focusing on specific deviations rather than a full rewrite.

The most significant deviation is the platform itself (Expo/React Native vs. Next.js Web). This cannot be fixed by modifying existing files; it requires a complete project migration. Given the prompt, I will highlight this in the final output but provide file changes for the *other* deviations that are fixable within the current project type.

**Re-reading the prompt carefully:** "Review the codebase against the design spec in CLAUDE.md. If there are deviations, output corrected files". This means the *codebase* must match CLAUDE.md. The CLAUDE.md explicitly states "Next.js 15 (App Router)", "React 19", "TypeScript 5.x", "Tailwind CSS v4", "shadcn/ui", "Zustand", "TanStack Query", "Next.js API Routes / Server Actions", "Prisma ORM", "PostgreSQL", "next-intl", "Vitest", "Playwright".

The current codebase uses:
-   `expo`, `expo-router`, `react-native` (not Next.js)
-   `react` 18.3.1 (not 19)
-   `typescript` ^5.7.0 (matches 5.x)
-   `tailwindcss` ^3.4.4 (matches v4)
-   No `shadcn/ui` evident
-   No `Zustand` or `TanStack Query` evident
-   No `Next.js API Routes / Server Actions` (Expo API routes are different)
-   No `Prisma ORM` or `PostgreSQL` evident
-   `expo-localization` and custom i18n (not `next-intl`)
-   `jest`, `jest-expo` (not `Vitest`, `Playwright`)

The deviations are so fundamental that almost every file would need to be rewritten or replaced. This is not a "correction" in the sense of minor edits.

I will output the files as if they were being converted to a Next.js project, as this is the only way to truly "correct" them to match the spec. This will involve significant changes.

**Let's assume the project is *intended* to be a Next.js project, and the current files are a *mistake* or an *initial wrong start*.**

Therefore, the corrected files will reflect a Next.js 15 App Router project.

1.  **`package.json`**: Update dependencies and scripts for Next.js, React 19, `next-intl`, `vitest`, `playwright`, etc. Remove Expo-specific packages.
2.  **`tsconfig.json`**: Adjust for Next.js.
3.  **`app.json`**: This file is Expo-specific and should be removed.
4.  **`app/_layout.tsx`**: This file path is for Expo Router. For Next.js App Router, it would be `src/app/layout.tsx`. The content would be rewritten for a web layout.
5.  **`app/index.tsx`**: This file path is for Expo Router. For Next.js App Router, it would be `src/app/page.tsx`. The content would be rewritten for a web page.
6.  **`i18n/index.ts` and `i18n/translations.ts`**: These files would be replaced by a `next-intl` setup.

This is a complete overhaul. I will provide the *corrected files* assuming a full migration to Next.js as per the spec. This will involve creating new files and deleting existing ones, but the format requires outputting "corrected files". I will output the *new* content for the files that exist and would be replaced, and indicate if a file should be deleted.

Since I can only output *corrected files*, I will output the Next.js equivalent for `package.json`, `tsconfig.json`, `app/_layout.tsx`, `app/index.tsx`, `i18n/index.ts`, and `i18n/translations.ts`. I will omit `app.json` as it would be deleted.

This is the only way to fulfill "output corrected files" when the deviation is a fundamental platform mismatch.
===FILE: package.json===
{
  "name": "yomerun-web",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:e2e": "playwright test",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@radix-ui/react-slot": "^1.1.0",
    "@tanstack/react-query": "^5.50.1",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.400.0",
    "next": "15.0.0-rc.0",
    "next-intl": "^3.15.4",
    "prisma": "^5.16.2",
    "react": "19.0.0-rc-f994737d14-20240704",
    "react-dom": "19.0.0-rc-f994737d14-20240704",
    "tailwind-merge": "^2.3.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.23.8",
    "zustand": "^4.5.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.45.1",
    "@types/node": "^20.14.10",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.13.1",
    "@typescript-eslint/parser": "^7.13.1",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "15.0.0-rc.0",
    "eslint-plugin-react": "^7.34.3",
    "eslint-plugin-react-hooks": "^4.6.2",
    "postcss": "^8.4.39",
    "tailwindcss": "^4.0.0-alpha.16",
    "typescript": "^5.5.3",
    "vitest": "^1.6.0"
  },
  "volta": {
    "node": "20.11.0"
  }
}
