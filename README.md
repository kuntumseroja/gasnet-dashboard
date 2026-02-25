# GASNET — AI-Powered Executive Intelligence Platform

> Cognitive Command Center for PT Perusahaan Gas Negara Tbk (PGN)
> Indonesia's largest gas transportation & distribution company

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Claude AI](https://img.shields.io/badge/Claude-Sonnet_4-CC785C?logo=anthropic)](https://anthropic.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

---

## Overview

**GASNET** (codename: **Garuda Eye**) is an AI-powered executive intelligence platform that unifies PGN's internal operational/financial data with external intelligence through foundation models and LLM-powered analytics into a single cognitive command center for C-suite decision-making.

PGN operates **13,581 km** of pipeline network, controls **91% of Indonesia's national gas market**, and generates **US$3.89B TTM revenue**. GASNET transforms executive decision-making from reactive report consumption to proactive AI-assisted strategic command, reducing decision latency from **48+ hours to under 15 minutes**.

```
                    ┌─────────────────────────────────────────────┐
                    │          GASNET Executive Dashboard          │
                    │     Next.js 14 · React · Tailwind · shadcn  │
                    └──────────────────┬──────────────────────────┘
                                       │
              ┌────────────────────────┼────────────────────────┐
              │                        │                        │
    ┌─────────▼──────────┐  ┌─────────▼──────────┐  ┌─────────▼──────────┐
    │   Finance Engine   │  │  Operations Intel  │  │    AI/ML Services   │
    │  KPI · P&L · HGBT  │  │  SCADA · Pipeline  │  │  LLM · RAG · FM    │
    └─────────┬──────────┘  └─────────┬──────────┘  └─────────┬──────────┘
              │                        │                        │
    ┌─────────▼────────────────────────▼────────────────────────▼──────────┐
    │                        Data Platform Layer                           │
    │          Kafka · Spark · TimescaleDB · Weaviate · Redis              │
    └─────────────────────────────────────────────────────────────────────┘
```

---

## Screenshots

### Executive Gallery
The main dashboard with KPIs, AI-generated recommended actions, revenue trends, pipeline map, sentiment analysis, and risk radar.

### Financial Health
10 financial KPI cards, P&L waterfall, EBITDA margin bridge (explaining 25.3% → 21.2% decline), cash forecast, debt maturity, and CAPEX tracker.

### HGBT Scenario Simulator
Interactive government-regulated gas price simulator ($5.50–$7.50/MMBtu) with real-time P&L cascade, sensitivity curves, and AI-generated narrative.

### Ask GASNET
Conversational AI panel powered by Claude with data-grounded responses, source citations, and in-context chart rendering.

---

## Tech Stack

### Frontend (This Repository)
| Technology | Purpose |
|---|---|
| **Next.js 14** | App Router, React Server Components, SSR/SSG |
| **TypeScript** | Strict mode, full type safety |
| **Tailwind CSS** | Utility-first styling with PGN design tokens |
| **Recharts** | KPI sparklines, time-series, waterfall, radar charts |
| **Lucide React** | Icon library |
| **Framer Motion** | Animations and transitions |
| **clsx + tailwind-merge** | Conditional class composition |

### Backend Services (Production Architecture)
| Technology | Purpose |
|---|---|
| **Express.js + tRPC** | Type-safe API gateway with Zod validation |
| **FastAPI (Python)** | AI/ML microservices, briefing engine |
| **PostgreSQL 16 + TimescaleDB** | Time-series KPI storage, financial data |
| **PostGIS** | Geospatial pipeline queries |
| **Prisma ORM** | Type-safe database access |
| **Apache Kafka** | Event streaming (SCADA, SAP, market data) |
| **Redis 7** | LLM cache, session store, pub/sub |
| **Weaviate** | Vector database for RAG pipeline |

### AI/ML Stack
| Model | Use Case |
|---|---|
| **Claude (claude-sonnet-4-5-20250929)** | Primary LLM — morning briefs, NL queries, scenario narratives, report generation |
| **GPT-4** | Fallback LLM with automatic failover |
| **IndoBERT** | Bahasa Indonesia sentiment analysis (F1 >88%) |
| **GridFM (LF Energy)** | Gas flow optimization, contingency analysis |
| **TerraMind (IBM/ESA)** | Pipeline corridor satellite monitoring |
| **GraphCast (DeepMind)** | 10-day weather forecast for operations |
| **Pangu-Weather (Huawei)** | Secondary weather model, ensemble forecasting |
| **NVIDIA Triton** | Production model serving |
| **ONNX Runtime** | Lightweight model inference |
| **LangChain** | ReAct agent orchestration for Ask GASNET |
| **MLflow** | Experiment tracking and model registry |

### Infrastructure
| Technology | Purpose |
|---|---|
| **AWS EKS** | Kubernetes orchestration |
| **AWS RDS** | Managed PostgreSQL |
| **AWS MSK** | Managed Kafka |
| **AWS S3** | Object storage |
| **Terraform** | Infrastructure as Code |
| **Docker** | Containerization |
| **GitHub Actions** | CI/CD pipelines |
| **Datadog + Grafana** | APM and observability |
| **Sentry** | Error tracking |
| **PagerDuty** | Incident management |

---

## Dashboard Pages

| Route | Page | Description |
|---|---|---|
| `/` | **Executive Gallery** | KPI overview, AI recommended actions, revenue chart, pipeline map, sentiment, risk radar |
| `/finance` | **Financial Health** | 10 KPI cards, P&L waterfall, margin bridge, cash forecast, debt maturity, CAPEX tracker |
| `/finance/scenarios` | **Scenario Simulator** | HGBT price slider with real-time P&L cascade, sensitivity curves, AI narrative |
| `/operations` | **Operations Command** | Pipeline map, SCADA alerts, supply-demand balance, LNG cargo tracker |
| `/supply-chain` | **Supply Chain** | Gas flow diagram, supplier portfolio, customer segments, inventory gauges |
| `/intelligence` | **Intelligence Hub** | Sentiment analysis, topic cloud, news feed, competitor benchmark |
| `/risk` | **Risk & Compliance** | 6-dimension risk radar, risk register, regulatory timeline |
| `/briefing` | **AI Morning Brief** | Daily AI-generated executive brief with priority sections |

---

## PGN Financial Baseline

All dummy data is based on actual PGN public financial disclosures:

| Metric | FY 2024 | Q1 2025 | TTM Sep-25 |
|---|---|---|---|
| Revenue | US$4.26B | US$967M | US$3.89B |
| EBITDA Margin | 25.3% | 21.2% | 21.6% |
| Net Profit | US$339M | US$62M | US$238M |
| Cash Position | US$1,620M | US$1,546M | — |
| Debt/Equity | 41% | 34% | — |
| Gas Trading Volume | 855 BBTUD | 861 BBTUD | — |
| Pipeline Network | 13,500 km | 13,581 km | — |
| Infra Availability | 99.0% | 99.0% | — |
| PGAS.JK Stock | — | IDR 1,980 | — |
| Dividend Yield | 9.3% | 9.3% (ann.) | — |

---

## Getting Started

### Prerequisites
- Node.js 20 LTS
- pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/kuntumseroja/gasnet-dashboard.git
cd gasnet-dashboard

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
pnpm build
pnpm start
```

---

## Project Structure

```
gasnet-dashboard/
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── page.tsx              # Executive Gallery (main dashboard)
│   │   │   ├── finance/
│   │   │   │   ├── page.tsx          # Financial Health
│   │   │   │   └── scenarios/
│   │   │   │       └── page.tsx      # HGBT Scenario Simulator
│   │   │   ├── operations/
│   │   │   │   └── page.tsx          # Operations Command
│   │   │   ├── supply-chain/
│   │   │   │   └── page.tsx          # Supply Chain Intelligence
│   │   │   ├── intelligence/
│   │   │   │   └── page.tsx          # External Intelligence Hub
│   │   │   ├── risk/
│   │   │   │   └── page.tsx          # Risk & Compliance Center
│   │   │   ├── briefing/
│   │   │   │   └── page.tsx          # AI Morning Brief
│   │   │   └── layout.tsx            # Dashboard shell layout
│   │   ├── globals.css               # PGN design system CSS
│   │   └── layout.tsx                # Root layout
│   ├── components/
│   │   ├── Sidebar.tsx               # Navigation sidebar
│   │   ├── TopBar.tsx                # Top header bar
│   │   ├── DashboardShell.tsx        # Layout wrapper
│   │   ├── KpiCard.tsx               # KPI display card with sparkline
│   │   ├── AlertFeed.tsx             # AI insights & alerts feed
│   │   ├── PipelineMap.tsx           # Indonesia pipeline network SVG map
│   │   ├── AskGasnet.tsx             # Conversational AI slide-out panel
│   │   └── charts/
│   │       ├── RevenueChart.tsx      # Revenue time-series with forecast
│   │       ├── SentimentChart.tsx    # Positive/negative sentiment trend
│   │       ├── MarginBridge.tsx      # EBITDA margin waterfall
│   │       ├── PnlWaterfall.tsx      # P&L income statement waterfall
│   │       ├── CashForecast.tsx      # 90-day cash flow forecast
│   │       └── RiskRadar.tsx         # 6-dimension spider chart
│   └── lib/
│       ├── dummy-data.ts             # PGN financial & operational mock data
│       └── utils.ts                  # Utility functions (cn, formatters)
├── tailwind.config.ts                # PGN design tokens & theme
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Key Domain Concepts

| Term | Definition |
|---|---|
| **HGBT** | Harga Gas Bumi Tertentu — Government-regulated gas price ($6.5–7/MMBtu) |
| **BBTUD** | Billion BTU per Day — Gas trading volume unit |
| **MMSCFD** | Million Standard Cubic Feet per Day — Transmission volume unit |
| **JKM** | Japan Korea Marker — Asia LNG spot price benchmark |
| **NDC** | National Dispatching Center — PGN gas supply-demand coordination |
| **RAG** | Retrieval-Augmented Generation — Grounding LLM in factual data |
| **SCADA** | Supervisory Control and Data Acquisition — Pipeline telemetry |

---

## Design System

PGN Corporate Light Theme based on [pgn.co.id](https://pgn.co.id):

| Token | Hex | Usage |
|---|---|---|
| `--brand-blue` | `#0069B4` | Primary actions, links, chart primary |
| `--brand-lime` | `#C8D300` | AI/GASNET accent, highlights |
| `--brand-navy` | `#05283C` | Headings, stat backgrounds |
| `--brand-red` | `#E30613` | Critical alerts, negative indicators |
| `--brand-green` | `#87AC4A` | Positive indicators, success |
| `--bg-secondary` | `#F8F8F8` | Card backgrounds |
| `--border-primary` | `#EAEAEA` | Borders, dividers |

---

## License

Proprietary — PT Perusahaan Gas Negara Tbk. Confidential.

---

<p align="center">
  <strong>GASNET</strong> · Garuda Eye · AI-Powered Executive Intelligence<br/>
  <sub>Built with Claude Code</sub>
</p>
