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


