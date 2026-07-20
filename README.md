# ListForge — AI-Powered Ecommerce Listing Optimizer

> 出海工具站实战项目 · Phase 2-4  
> 技术栈：Next.js 14 + TypeScript + Tailwind CSS + NextAuth.js + PayPal/Creem

## 项目简介

ListForge 是一个面向独立卖家的跨平台 AI Listing 优化工具。输入产品信息，AI 自动生成针对 Amazon、Shopify、Etsy、eBay 优化的标题、Bullet Points、描述和搜索词，并提供 0-100 质量评分和改进建议。支持 15+ 语言。

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 填入 AI API Key 等

# 3. 启动开发服务器
npm run dev
# http://localhost:3000

# 4. 构建部署
npm run build
```

## 项目结构

```
listforge/
├── src/
│   ├── app/
│   │   ├── (marketing)/       # 营销页面
│   │   │   ├── pricing/       # 定价页（3 Tier: Free/Pro/Business）
│   │   │   ├── faq/           # FAQ（11 个折叠问答）
│   │   │   └── about/         # 关于页
│   │   ├── (dashboard)/
│   │   │   └── dashboard/     # 工具主界面（Listing生成器）
│   │   ├── (seo)/             # SEO 落地页（5 个关键词页）
│   │   │   ├── amazon-listing-optimizer/
│   │   │   ├── shopify-product-description-generator/
│   │   │   ├── ai-ecommerce-listing-tool/
│   │   │   ├── amazon-seo-keyword-tool/
│   │   │   └── etsy-listing-optimization/
│   │   ├── api/
│   │   │   ├── generate/      # AI 生成 API (POST)
│   │   │   └── auth/          # 认证 API (NextAuth)
│   │   ├── layout.tsx         # 根布局（SEO metadata + GA）
│   │   ├── page.tsx           # Landing Page
│   │   ├── sitemap.ts         # 自动 Sitemap（含SEO页）
│   │   └── not-found.tsx      # 404 页面
│   ├── components/
│   │   ├── layout/            # Header, Footer, GoogleAnalytics
│   │   ├── landing/           # Hero, Features, CTASection
│   │   ├── dashboard/         # ListingGenerator（核心工具组件）
│   │   ├── seo/               # SEOLandingPage（SEO页复用模板）
│   │   └── ui/                # Button 基础组件
│   └── lib/
│       ├── ai.ts              # AI 生成逻辑（核心，Demo模式）
│       ├── ai-providers.ts    # AI 多Provider抽象层（OpenAI/DeepSeek/Anthropic）
│       ├── auth.ts            # Auth 配置（NextAuth.js v5）
│       ├── payment.ts         # 支付集成（PayPal + Creem）
│       ├── db/
│       │   └── schema.ts      # Supabase PostgreSQL Schema（完整DDL+RLS）
│       └── utils.ts           # 工具函数 + Site Config
├── public/
│   └── robots.txt
├── .env.example               # 环境变量模版（含所有服务配置）
├── wrangler.toml              # Cloudflare Pages 部署配置
├── 30天执行路线图.md           # Day 1-30 逐日执行计划
├── 产品复盘表-模版.md          # 上线后数据复盘框架
└── README.md
```

## 页面清单

| 页面 | 路径 | 状态 |
|------|------|------|
| Landing Page | `/` | ✅ |
| 工具页（Dashboard） | `/dashboard` | ✅ |
| 定价页 | `/pricing` | ✅ |
| FAQ 页 | `/faq` | ✅ |
| 关于页 | `/about` | ✅ |
| 404 页 | `/*` | ✅ |
| Sitemap | `/sitemap.xml` | ✅ |
| SEO 落地页（5个） | `/amazon-listing-optimizer` 等 | ⬜ |

## 关键技术决策

- **Next.js App Router** — 最新 Next.js 架构，SSR + 静态导出双模式
- **Demo 模式优先** — lib/ai.ts 含完整 Demo 逻辑，可一行切换为真实 API
- **Cloudflare Pages** — 免费部署，全球 CDN
- **NextAuth.js v5** — 标准化 Google OAuth 接入
- **PayPal + Creem** — 双支付通道，降低单点风险
- **shadcn/ui 风格** — 自建轻量组件，不依赖外部 UI 库

## 下一步（按优先级）

1. **本地运行** — `npm install && npm run dev`
2. **AI API 接入** — 编辑 `src/lib/ai.ts`，替换 Demo 逻辑为 OpenAI/DeepSeek API
3. **域名 + 部署** — Cloudflare Pages 连接 GitHub，绑定域名
4. **Auth 接入** — `npm install next-auth@beta`，配置 Google OAuth
5. **支付接入** — 实现 PayPal/Creem 订阅流程
6. **SEO 落地页** — 创建 5 个关键词目标页
7. **GSC + GA 接入** — 数据追踪

## 许可证

MIT
