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

フィードバック:
  - 成功時はポジティブな音とアニメーション
  - 失敗時は音なし、視覚的フィードバックのみ
  - プログレスバーは常に表示

視覚的要素:
  - カラフルで親しみやすい配色
  - 大きなボタンとタップターゲット（最小44x44px）
  - 読みやすいフォントサイズ（最小16px）
  - アニメーションとトランジションを多用し、楽しさを演出

音声フィードバック:
  - 録音開始/停止、成功/失敗時に効果音
  - 肯定的なフィードバックのみ（例: 「よくできたね！」「すごい！」）
  - 否定的なフィードバックは禁止

ナビゲーション:
  - グローバルナビゲーションは常に画面下部に表示
  - 主要機能（ホーム、OCR、音声録音、設定）へのアクセスを提供
  - 現在のページを明確に表示

## グローバルナビゲーションとレイアウト (1)

### 目的
ユーザーがアプリケーションの主要機能に簡単にアクセスできるよう、一貫したグローバルナビゲーションと基本的なレイアウトを確立する。

### 構成要素
1.  **ヘッダー (`src/components/Header.tsx`)**:
    *   常に画面上部に表示。
    *   アプリ名または現在のページタイトルを表示。
    *   戻るボタン（ナビゲーションスタックがある場合のみ表示）。
    *   RTL言語（アラビア語など）の場合、レイアウトを反転（例: 戻るボタンを右に、アイコンを反転）。
    *   アクセシビリティ: `accessibilityLabel`, `accessibilityRole` を設定。
    *   最小タップターゲットサイズ: 44x44px。

2.  **タブバー (`src/components/TabBar.tsx`)**:
    *   常に画面下部に表示。
    *   主要なナビゲーションリンク（ホーム、OCR、設定）を提供。
    *   現在アクティブなタブを視覚的に強調。
    *   RTL言語の場合、タブの順序を反転し、アイコンを反転。
    *   アクセシビリティ: `accessibilityRole`, `accessibilityState` を設定。
    *   最小タップターゲットサイズ: 44x44px。

3.  **ルートレイアウト (`src/app/_layout.tsx`)**:
    *   `expo-router` のルートレイアウトとして機能。
    *   `I18nProvider` でアプリケーション全体をラップし、国際化をサポート。
    *   `Header` と `TabBar` を条件付きでレンダリング（例: 認証画面では非表示）。
    *   `Stack` コンポーネントを使用して、ページ間のナビゲーションスタックを管理。

### 技術要件
*   **Next.js 15 (App Router)**: `src/app/[locale]/layout.tsx` がWebアプリケーションのルートレイアウトとして機能し、`next-intl` を使用して国際化を処理する。
*   **Expo Router**: モバイルアプリケーションのルーティングとレイアウトを管理。
*   **`next-intl`**: Webアプリケーションの国際化に使用。
*   **`@/i18n` モジュール**: モバイルアプリケーションの国際化に使用。`useTranslations`, `useI18n`, `useDeviceLocale` を提供。
*   **RTLサポート**: アラビア語 (`ar`) の場合、`dir="rtl"` 属性を `<html>` タグに設定し、CSSの左右マージン/パディングは logical properties を使用。アイコンは必要に応じて反転。
*   **アクセシビリティ**: WCAG 2.1 AA準拠。最小タップターゲットサイズ44x44pxを確保。
*   **コンポーネントの再利用**: `Header` と `TabBar` はWebとモバイルで共通のロジックを持つが、レンダリングはそれぞれのプラットフォームのフレームワーク（Next.js / Expo Router）に合わせる。

### ファイル構成
*   `src/app/[locale]/layout.tsx`: Webアプリケーションの国際化対応ルートレイアウト。
*   `src/app/_layout.tsx`: モバイルアプリケーションのExpo Routerルートレイアウト。
*   `src/components/Header.tsx`: ヘッダーコンポーネント（モバイル向け）。
*   `src/components/TabBar.tsx`: タブバーコンポーネント（モバイル向け）。
*   `src/i18n/index.ts`: モバイル向け国際化フックとプロバイダー。
*   `src/i18n/translations.ts`: 翻訳メッセージとRTL判定ロジック。

### 変更点と確認事項
*   `src/app/[locale]/layout.tsx`: `html` タグに `dir` 属性が正しく設定されているか。`NextIntlClientProvider` が使用されているか。
*   `src/app/_layout.tsx`: `I18nProvider`, `Header`, `TabBar`, `Stack` が正しく構成されているか。認証ルートでの条件付きレンダリングが実装されているか。
*   `src/components/Header.tsx`: 戻るボタンの表示条件、RTL対応、アクセシビリティ属性、最小タップターゲットサイズ。
*   `src/components/TabBar.tsx`: アクティブタブの強調、RTL対応、アクセシビリティ属性、最小タップターゲットサイズ。
*   `src/i18n/index.ts`: `I18nManager` を使用したRTLの強制設定。

---

## 第6章 開発プロセス憲章

### 6.1 Gitワークフロー

```
ブランチ戦略: Git Flow
  - main: リリース済みコード（保護ブランチ）
  - develop: 開発中の最新コード（保護ブランチ）
  - feature/*: 新機能開発
  - bugfix/*: バグ修正
  - release/*: リリース準備
  - hotfix/*: 緊急修正

コミットメッセージ: Conventional Commits 1.0.0
  - feat: 新機能
  - fix: バグ修正
  - docs: ドキュメントのみの変更
  - style: コードの整形（ロジック変更なし）
  - refactor: リファクタリング（バグ修正・機能追加なし）
  - perf: パフォーマンス改善
  - test: テストの追加・修正
  - build: ビルドシステム・外部依存の変更
  - ci: CI設定の変更
  - chore: その他雑務（ビルドプロセスや補助ツールなど）
```

### 6.2 コードレビュー

```
必須レビューア数: 2名以上
承認条件:
  - 全てのコメントが解決済み
  - CI/CDパイプラインがグリーン
  - 本憲章に準拠
```

### 6.3 デプロイメント

```
環境:
  - Development: 自動デプロイ（developブランチ）
  - Staging: 手動デプロイ（releaseブランチ）
  - Production: 手動デプロイ（mainブランチ）

デプロイツール: Vercel（フロントエンド）、AWS CDK（バックエンド）
```

---

## 第7章 運用憲章

### 7.1 モニタリングとアラート

```
監視ツール: Datadog, Sentry
監視項目:
  - エラー率（5xx, JSエラー）: 閾値 0.1%
  - レイテンシ: 閾値 LCP > 3s, API > 500ms
  - サーバーリソース（CPU, Memory）: 閾値 80%
  - データベース接続数: 閾値 80%
アラート通知: Slack, PagerDuty
```

### 7.2 インシデント管理

```
インシデントレベル:
  - Critical: サービス停止、データ損失（対応時間: 15分以内）
  - High: 主要機能影響、パフォーマンス劣化（対応時間: 1時間以内）
  - Medium: 軽微な機能影響、UX劣化（対応時間: 4時間以内）
  - Low: 軽微なバグ、UI不具合（対応時間: 24時間以内）

対応フロー:
  1. アラート受信
  2. インシデントトリアージ
  3. 根本原因分析（RCA）
  4. 暫定対策
  5. 恒久対策
  6. 報告と共有
```

---

## 第8章 データ管理憲章

### 8.1 データガバナンス

```
データ分類:
  - PII（個人特定可能情報）: 厳格なアクセス制限、暗号化
  - センシティブデータ（音声、健康情報）: PIIと同等
  - 一般データ: 通常のセキュリティ対策

データライフサイクル:
  - 収集: 最小限の原則
  - 保存: 暗号化、冗長化
  - 利用: 目的外利用禁止
  - 廃棄: 完全消去
```

### 8.2 監査とコンプライアンス

```
定期監査: 年1回、外部機関によるセキュリティ監査
内部監査: 四半期に1回、データアクセスログのレビュー
コンプライアンス: COPPA, GDPR, CCPA, 日本の個人情報保護法
```

---

## 第9章 変更管理憲章

### 9.1 憲章の改訂プロセス

```
提案: 誰でも可能
レビュー: プロジェクトリーダー、セキュリティ責任者、法務担当
承認: プロジェクトオーナー
バージョン管理: Gitで変更履歴を管理
通知: 全プロジェクトメンバーに通知
```

### 9.2 技術的負債管理

```
定期レビュー: 月1回、技術的負債の棚卸し
優先順位付け: 影響度、発生頻度、修正コスト
解消計画: スプリント計画に組み込み
```

---

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

