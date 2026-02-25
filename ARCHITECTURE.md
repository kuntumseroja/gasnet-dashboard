# GASNET Architecture Document

> System Architecture, Data Flow, AI/ML Pipeline & LLM Integration
> Version 2.0 — February 2026

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [High-Level Architecture Diagram](#2-high-level-architecture-diagram)
3. [Frontend Architecture](#3-frontend-architecture)
4. [API Layer Architecture](#4-api-layer-architecture)
5. [Data Platform Architecture](#5-data-platform-architecture)
6. [AI/ML Architecture](#6-aiml-architecture)
7. [LLM Integration & RAG Pipeline](#7-llm-integration--rag-pipeline)
8. [Foundation Model Integration](#8-foundation-model-integration)
9. [Ask GASNET — Conversational BI](#9-ask-gasnet--conversational-bi)
10. [Real-Time Data Flow](#10-real-time-data-flow)
11. [Security Architecture](#11-security-architecture)
12. [Infrastructure & Deployment](#12-infrastructure--deployment)

---

## 1. System Architecture Overview

GASNET follows a **microservices event-driven architecture** with clear separation between the presentation layer (Next.js), API gateway (Express+tRPC), AI services (Python FastAPI), and data platform (Kafka+Spark+PostgreSQL).

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        GASNET PLATFORM ARCHITECTURE                     │
│                                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │  Executive   │  │   Mobile    │  │  Board Pack │  │  Scheduled   │  │
│  │  Dashboard   │  │   PWA       │  │  Generator  │  │  Reports     │  │
│  │  (Next.js)   │  │  (React    │  │  (PDF/PPTX) │  │  (Cron)      │  │
│  │              │  │   Native)   │  │             │  │              │  │
│  └──────┬───────┘  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘  │
│         │                 │                │                │          │
│  ┌──────▼─────────────────▼────────────────▼────────────────▼───────┐  │
│  │                    API GATEWAY (Express + tRPC)                   │  │
│  │              JWT Auth · RBAC · Rate Limiting · Audit              │  │
│  │                  socket.io (WebSocket) Server                     │  │
│  └────┬──────────────┬──────────────┬──────────────┬────────────────┘  │
│       │              │              │              │                   │
│  ┌────▼─────┐  ┌─────▼─────┐  ┌────▼─────┐  ┌────▼──────┐           │
│  │ Finance  │  │ Briefing  │  │    ML    │  │ Connector │           │
│  │ Service  │  │ Engine    │  │ Services │  │ Service   │           │
│  │ (tRPC)   │  │ (FastAPI) │  │ (FastAPI)│  │ (SAP BTP) │           │
│  └────┬─────┘  └─────┬─────┘  └────┬─────┘  └────┬──────┘           │
│       │              │              │              │                   │
│  ┌────▼──────────────▼──────────────▼──────────────▼────────────────┐  │
│  │                      DATA PLATFORM LAYER                         │  │
│  │                                                                   │  │
│  │  ┌──────────┐  ┌───────────┐  ┌─────────┐  ┌──────────────────┐ │  │
│  │  │PostgreSQL│  │TimescaleDB│  │ Weaviate│  │     Apache       │ │  │
│  │  │+ PostGIS │  │(time-     │  │ (Vector │  │     Kafka        │ │  │
│  │  │(OLTP)    │  │ series)   │  │  DB)    │  │   (Streaming)    │ │  │
│  │  └──────────┘  └───────────┘  └─────────┘  └──────────────────┘ │  │
│  │  ┌──────────┐  ┌───────────┐  ┌─────────┐  ┌──────────────────┐ │  │
│  │  │  Redis   │  │   MinIO   │  │  dbt    │  │  Apache Spark/   │ │  │
│  │  │ (Cache)  │  │ (Objects) │  │(Transform│ │  Flink           │ │  │
│  │  └──────────┘  └───────────┘  └─────────┘  └──────────────────┘ │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    EXTERNAL DATA SOURCES                         │  │
│  │  SAP S/4HANA · SCADA · News APIs · Social Media · Weather APIs  │  │
│  │  Satellite (Sentinel-2) · Market Data (JKM/LNG) · BPS/BPH Migas│  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. High-Level Architecture Diagram

### Request Flow

```
User (C-Suite Executive)
    │
    ▼
┌──────────────────┐
│   Browser/PWA    │
│   Next.js 14     │◄────── CDN (Vercel/CloudFront)
│   App Router     │
└────────┬─────────┘
         │ HTTPS / WSS
         ▼
┌──────────────────┐
│   API Gateway    │
│   Express + tRPC │◄────── JWT Validation
│   + socket.io    │◄────── RBAC Enforcement
└──┬────┬────┬─────┘        (BOARD, DIRECTOR, VP, SVP, ANALYST)
   │    │    │
   │    │    └──────────────────┐
   │    │                       ▼
   │    │              ┌──────────────────┐
   │    │              │  Briefing Engine  │
   │    │              │  (Python FastAPI) │
   │    │              │  LangChain Agent  │
   │    │              │  Claude + GPT-4   │
   │    │              └────────┬─────────┘
   │    │                       │
   │    ▼                       ▼
   │  ┌──────────────┐  ┌──────────────┐
   │  │ ML Services  │  │   Weaviate   │
   │  │ (FastAPI)    │  │ Vector DB    │
   │  │ Triton/ONNX  │  │ (RAG Store)  │
   │  └──────┬───────┘  └──────────────┘
   │         │
   ▼         ▼
┌──────────────────────┐
│  PostgreSQL 16       │
│  + TimescaleDB       │
│  + PostGIS           │
│  (via Prisma ORM)    │
└──────────────────────┘
```

---

## 3. Frontend Architecture

### Component Hierarchy

```
RootLayout (src/app/layout.tsx)
└── DashboardShell
    ├── Sidebar (navigation)
    ├── TopBar (search, notifications, user profile)
    ├── AskGasnet (slide-out conversational panel)
    └── PageContent
        ├── / ─── ExecutiveGallery
        │         ├── KpiCard x4 (Revenue, EBITDA, Volume, Availability)
        │         ├── RecommendedActions (AI-generated from insights)
        │         ├── RevenueChart (time-series + forecast)
        │         ├── AlertFeed (AI insights & alerts)
        │         ├── PipelineMap (Indonesia SVG)
        │         ├── SentimentChart (IndoBERT output)
        │         └── RiskRadar (6-dimension spider)
        │
        ├── /finance ─── FinancialHealth
        │                ├── KpiCard x10
        │                ├── PnlWaterfall
        │                ├── MarginBridge (EBITDA decomposition)
        │                ├── CashForecast (90-day AI prediction)
        │                ├── DebtMaturity
        │                └── CapexTracker (with AI completion prediction)
        │
        ├── /finance/scenarios ─── ScenarioSimulator
        │                         ├── HgbtSlider ($5.50-$7.50)
        │                         ├── ImpactKpis (real-time cascade)
        │                         ├── ComparisonChart (base vs scenario)
        │                         ├── SensitivityCurve
        │                         └── AiNarrative (Claude-generated)
        │
        ├── /operations ─── OperationsCommand
        ├── /supply-chain ─── SupplyChainIntelligence
        ├── /intelligence ─── ExternalIntelligenceHub
        ├── /risk ─── RiskComplianceCenter
        └── /briefing ─── AiMorningBrief
```

### State Management Pattern

```
┌─────────────────────────────────────────────────────┐
│                  Frontend State                      │
│                                                      │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────┐ │
│  │   Zustand    │  │  React Query  │  │ socket.io│ │
│  │  (Global     │  │  (Server      │  │ (Real-   │ │
│  │   UI State)  │  │   State       │  │  time)   │ │
│  │              │  │   Cache)      │  │          │ │
│  │ • sidebar    │  │ • KPI data    │  │ • sensor │ │
│  │ • chat open  │  │ • financials  │  │ • alerts │ │
│  │ • language   │  │ • pipeline    │  │ • kpi    │ │
│  │ • theme      │  │ • sentiment   │  │ • finance│ │
│  └──────────────┘  └───────────────┘  └──────────┘ │
│                            │                         │
│              WS event ────►│ cache invalidation      │
└─────────────────────────────────────────────────────┘
```

---

## 4. API Layer Architecture

### Dual API Design

```
┌──────────────────────────────────────────────────┐
│                 API Gateway                       │
│                                                    │
│  ┌─────────────────────┐  ┌────────────────────┐ │
│  │      tRPC Routes    │  │   REST Endpoints   │ │
│  │   (Type-safe, for   │  │   (Data pipeline   │ │
│  │    dashboard)       │  │    & external)     │ │
│  │                     │  │                    │ │
│  │  finance.getPnl     │  │  GET /api/v1/kpis  │ │
│  │  finance.runScenario│  │  GET /api/v1/      │ │
│  │  briefing.getDaily  │  │    pipelines       │ │
│  │  briefing.query     │  │  POST /api/v1/     │ │
│  │  risk.getRadar      │  │    conversational  │ │
│  │  ops.getPipelineHlth│  │    -bi/query       │ │
│  └─────────────────────┘  └────────────────────┘ │
│                                                    │
│  ┌────────────────────────────────────────────┐   │
│  │           WebSocket (socket.io)             │   │
│  │                                              │   │
│  │  sensor:update   insight:new   kpi:refresh  │   │
│  │  sentiment:update  finance:update            │   │
│  │  alert:critical                              │   │
│  └────────────────────────────────────────────┘   │
│                                                    │
│  RBAC: BOARD > PRESIDENT_DIRECTOR > DIRECTOR >    │
│        VP > SVP > ANALYST                         │
└──────────────────────────────────────────────────┘
```

### REST Response Contract

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

---

## 5. Data Platform Architecture

### Database Schema

```
┌──────────────────────────────────────────────────────────────────┐
│                     PostgreSQL 16 + Extensions                    │
│                                                                    │
│  ┌─────────────────────┐  ┌──────────────────────────────────┐  │
│  │   TimescaleDB        │  │         Core Tables               │  │
│  │   (Hypertables)      │  │                                    │  │
│  │                       │  │  FinancialPeriod                  │  │
│  │  kpi_metrics          │  │    ├── FinancialMetric            │  │
│  │  ├── metric_name      │  │    ├── BudgetLine                │  │
│  │  ├── metric_value     │  │    └── FinancialAlert            │  │
│  │  ├── timestamp        │  │                                    │  │
│  │  ├── source           │  │  CashPosition                    │  │
│  │  └── tags (JSONB)     │  │  CapexProject                    │  │
│  │                       │  │  ScenarioRun (audit)             │  │
│  │  sensor_readings      │  │  RiskScore                       │  │
│  │  ├── sensor_id        │  │                                    │  │
│  │  ├── reading_type     │  │  news_articles                   │  │
│  │  ├── reading_value    │  │  social_media_posts              │  │
│  │  └── timestamp        │  │  ai_insights                     │  │
│  └─────────────────────┘  └──────────────────────────────────┘  │
│                                                                    │
│  ┌─────────────────────┐                                          │
│  │   PostGIS            │                                          │
│  │                       │                                          │
│  │  pipeline_segments    │                                          │
│  │  ├── segment_name     │                                          │
│  │  ├── geometry (GIS)   │                                          │
│  │  ├── length_km        │                                          │
│  │  └── last_inspection  │                                          │
│  └─────────────────────┘                                          │
└──────────────────────────────────────────────────────────────────┘
```

### Data Ingestion Pipeline

```
External Sources                  Kafka Topics              Consumers
═══════════════                  ════════════              ═════════

SAP S/4HANA ──────►  sap.finance.events  ──────►  Finance Service
  (via BTP OData)                                    (KPI calculation)

SCADA Sensors ─────►  scada.telemetry    ──────►  Anomaly Detector
  (13,581 km)                                       (ML model)

News APIs ─────────►  intel.news.raw     ──────►  IndoBERT Pipeline
  (Kompas, Reuters)                                 (Sentiment scoring)

Social Media ──────►  intel.social.raw   ──────►  IndoBERT Pipeline
  (Twitter/X, YT)                                   (Topic extraction)

Market Data ───────►  market.pricing     ──────►  Pricing Service
  (JKM, HGBT)                                      (Margin calculator)

Weather APIs ──────►  weather.forecast   ──────►  Weather FM Ensemble
  (GraphCast output)                                (Demand correlation)

Satellite ─────────►  geo.satellite      ──────►  TerraMind Analyzer
  (Sentinel-2)                                      (Pipeline corridor)
```

---

## 6. AI/ML Architecture

### Model Serving Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                    AI/ML Orchestrator                          │
│                    (Python FastAPI)                            │
│                                                                │
│  ┌──────────────────────────────────────────────────────┐    │
│  │                Model Registry (MLflow)                │    │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐  │    │
│  │  │ IndoBERT │ │  GridFM  │ │TerraMind │ │Weather │  │    │
│  │  │  v3.2    │ │  v1.1    │ │  v2.0    │ │ FM v1  │  │    │
│  │  │ F1=0.89  │ │          │ │          │ │        │  │    │
│  │  └──────────┘ └──────────┘ └──────────┘ └────────┘  │    │
│  └──────────────────────────────────────────────────────┘    │
│                          │                                    │
│              ┌───────────┼───────────┐                       │
│              ▼           ▼           ▼                       │
│  ┌─────────────────┐ ┌─────────┐ ┌────────────────┐        │
│  │  NVIDIA Triton  │ │  ONNX   │ │  Ray Serve     │        │
│  │  (Heavy models) │ │ Runtime │ │  (Batch jobs)  │        │
│  │                 │ │ (Light) │ │                │        │
│  │  • GridFM       │ │ • Indo  │ │ • Backtesting  │        │
│  │  • TerraMind    │ │   BERT  │ │ • Retraining   │        │
│  │  • Pangu-Weather│ │         │ │ • Evaluation   │        │
│  └─────────────────┘ └─────────┘ └────────────────┘        │
│                                                                │
│  Outputs ──► kpi_metrics + ai_insights + Weaviate vectors    │
└──────────────────────────────────────────────────────────────┘
```

### Foundation Models Detail

```
┌────────────────────────────────────────────────────────────────────┐
│                    FOUNDATION MODELS IN GASNET                      │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  GridFM (LF Energy Foundation Model)                       │    │
│  │  ├── Pretrained: 300K+ Optimal Power Flow solutions        │    │
│  │  ├── Fine-tuned: PGN pipeline topology (13,581 km)         │    │
│  │  ├── Use cases:                                             │    │
│  │  │   ├── Gas flow optimization                              │    │
│  │  │   ├── Contingency analysis ("what if Grissik offline?") │    │
│  │  │   ├── Supply-demand balancing                            │    │
│  │  │   └── Gas-to-power demand forecasting                    │    │
│  │  ├── Inference: NVIDIA Triton · GPU · <2s latency          │    │
│  │  └── Output: kpi_metrics + ai_insights                      │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  TerraMind (IBM/ESA Geospatial FM)                         │    │
│  │  ├── Training: 500B tokens of Earth observation data        │    │
│  │  ├── Input: Sentinel-2 satellite imagery (daily)            │    │
│  │  ├── Instruction: Analyze 50m buffer around pipeline GeoJSON│    │
│  │  ├── Use cases:                                             │    │
│  │  │   ├── Land subsidence detection                          │    │
│  │  │   ├── Pipeline encroachment monitoring                   │    │
│  │  │   ├── Flood risk mapping                                 │    │
│  │  │   └── Environmental change detection                     │    │
│  │  └── Output: Anomaly coordinates + confidence → ai_insights │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  GraphCast (Google DeepMind Weather AI)                     │    │
│  │  ├── Capability: 10-day forecast in <60s on single TPU      │    │
│  │  ├── Accuracy: ECMWF-matching                               │    │
│  │  ├── Refresh: Every 6 hours                                 │    │
│  │  ├── Use cases:                                             │    │
│  │  │   ├── Operational zone weather forecasting               │    │
│  │  │   ├── LNG cargo route risk assessment                    │    │
│  │  │   ├── Temperature-driven demand forecasting              │    │
│  │  │   └── Tropical cyclone early warning                     │    │
│  │  └── Ensemble: Combined with Pangu-Weather for confidence   │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  Pangu-Weather (Huawei Weather FM)                          │    │
│  │  ├── Architecture: 3D Earth-Specific Transformer            │    │
│  │  ├── Training: 43 years of ERA5 reanalysis data             │    │
│  │  ├── Use cases:                                             │    │
│  │  │   ├── Secondary weather verification                     │    │
│  │  │   ├── Seasonal logistics planning                        │    │
│  │  │   └── Archipelagic weather patterns                      │    │
│  │  └── Output: Ensembled with GraphCast → higher confidence   │    │
│  └────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────┐    │
│  │  IndoBERT (Indonesian NLP Model)                            │    │
│  │  ├── Fine-tuned: Indonesian energy sector corpus            │    │
│  │  ├── Target: F1 > 88% sentiment accuracy                   │    │
│  │  ├── Polling: Every 15 minutes                              │    │
│  │  ├── Use cases:                                             │    │
│  │  │   ├── Bahasa Indonesia sentiment analysis                │    │
│  │  │   ├── Topic classification                               │    │
│  │  │   ├── Crisis detection (harga gas, LPG, pipeline)        │    │
│  │  │   └── News summarization                                 │    │
│  │  ├── Input: Twitter/X, YouTube, news portals                │    │
│  │  └── Output: social_media_posts + news_articles tables      │    │
│  └────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────┘
```

---

## 7. LLM Integration & RAG Pipeline

### RAG Architecture (Retrieval-Augmented Generation)

```
                         ┌──────────────────────────┐
    User Query           │    Ask GASNET Panel       │
    "What is our         │    or Morning Brief       │
     EBITDA margin?"     │    Generator              │
                         └────────────┬─────────────┘
                                      │
                                      ▼
                         ┌──────────────────────────┐
                         │    Query Preprocessing     │
                         │    • Intent classification │
                         │    • Entity extraction     │
                         │    • Language detection     │
                         │      (ID/EN)               │
                         └────────────┬─────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                   ▼
         ┌──────────────┐  ┌──────────────┐   ┌──────────────┐
         │   Weaviate    │  │  TimescaleDB │   │ Tool Calls   │
         │   Vector      │  │  (Structured │   │ (LangChain   │
         │   Search      │  │   Queries)   │   │  ReAct Agent)│
         │              │  │              │   │              │
         │  Semantic     │  │  SQL via     │   │  get_kpi_data│
         │  retrieval    │  │  Prisma      │   │  run_scenario│
         │  of context   │  │              │   │  get_weather │
         │  documents    │  │              │   │  get_terramind│
         └──────┬───────┘  └──────┬───────┘   └──────┬───────┘
                │                 │                   │
                └─────────────────┼───────────────────┘
                                  │
                                  ▼
                    ┌──────────────────────────┐
                    │     Context Assembly       │
                    │                            │
                    │  Retrieved docs + query    │
                    │  results + tool outputs    │
                    │  + PGN financial baseline  │
                    │  + conversation history    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │      LLM Generation       │
                    │                            │
                    │  Primary: Claude Sonnet    │
                    │  (claude-sonnet-4-5-20250929)│
                    │                            │
                    │  Fallback: GPT-4           │
                    │  (3x retry, 30s timeout)   │
                    │                            │
                    │  System: "You are GASNET,  │
                    │  PGN's AI business analyst"│
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     Response Pipeline      │
                    │                            │
                    │  • Citation injection       │
                    │  • Source attribution       │
                    │  • Bilingual formatting     │
                    │  • Chart data extraction    │
                    │  • Confidence scoring       │
                    └──────────────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Cached in Redis        │
                    │    (TTL: 15 minutes)      │
                    │    Key: hash(query+ctx)   │
                    └──────────────────────────┘
```

### Weaviate Vector Store Schema

```
Collection: "PGNDocuments"
├── Properties:
│   ├── content (text)          — Document chunk text
│   ├── source (text)           — Origin system (SAP, SCADA, News, etc.)
│   ├── document_type (text)    — financial_report, news, regulation, etc.
│   ├── date (date)             — Document date
│   ├── entities (text[])       — Extracted entities (PGN, HGBT, etc.)
│   └── metadata (object)       — Additional context
├── Vectorizer: text2vec-transformers (multilingual)
└── Index: HNSW (cosine similarity)

Ingestion pipeline:
  SAP reports      ──► Chunking (512 tokens) ──► Embedding ──► Weaviate
  News articles    ──► Chunking + summary    ──► Embedding ──► Weaviate
  Regulatory docs  ──► Chunking              ──► Embedding ──► Weaviate
  Internal memos   ──► Chunking              ──► Embedding ──► Weaviate
```

### LLM Fallback Chain

```
┌───────────────┐     Success     ┌─────────────────┐
│  Claude API   │ ──────────────► │  Return Response │
│  (Primary)    │                 └─────────────────┘
└───────┬───────┘
        │ Failure (timeout/rate-limit/error)
        │ Retry: 3x exponential backoff
        ▼
┌───────────────┐     Success     ┌─────────────────┐
│   GPT-4 API   │ ──────────────► │  Return Response │
│  (Fallback)   │                 │  + flag fallback │
└───────┬───────┘                 └─────────────────┘
        │ Failure
        ▼
┌───────────────┐
│  Cached       │     If available from Redis
│  Response     │ ──────────────► Return stale + warning
│  (Stale)      │
└───────┬───────┘
        │ No cache
        ▼
┌───────────────┐
│  Graceful     │
│  Degradation  │ ──► "Unable to generate AI response.
│  Message      │      Here is the raw data instead."
└───────────────┘
```

---

## 8. Foundation Model Integration

### Model Orchestrator Flow

```
┌──────────────────────────────────────────────────────────┐
│                 AI Orchestrator Service                     │
│                 (apps/ml-services/src/orchestrator/)        │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │              Scheduled Pipelines                    │   │
│  │                                                      │   │
│  │  Every 6 hours:                                      │   │
│  │    GraphCast ──► Weather forecast ──► kpi_metrics    │   │
│  │    Pangu-Weather ──► Ensemble ──► kpi_metrics        │   │
│  │                                                      │   │
│  │  Daily:                                               │   │
│  │    TerraMind ──► Satellite analysis ──► ai_insights  │   │
│  │    GridFM ──► Flow optimization ──► kpi_metrics      │   │
│  │                                                      │   │
│  │  Every 15 minutes:                                    │   │
│  │    IndoBERT ──► Sentiment batch ──► news/social      │   │
│  │                                                      │   │
│  │  Daily 06:00 WIB:                                     │   │
│  │    Claude ──► Morning Brief ──► briefing store       │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌────────────────────────────────────────────────────┐   │
│  │              On-Demand Calls                        │   │
│  │                                                      │   │
│  │  Ask GASNET query ──► LangChain Agent ──► Claude    │   │
│  │  Scenario run ──► Financial Model ──► Claude narrate│   │
│  │  Alert trigger ──► Claude explain ──► notification  │   │
│  └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## 9. Ask GASNET — Conversational BI

### LangChain ReAct Agent

```
System Prompt:
"You are GASNET, PGN's AI business analyst. You help C-suite executives
understand their business through data. Answer concisely in executive-
friendly language. Use available tools to fetch data before answering.
Always cite data sources. Support both Bahasa Indonesia and English."

Available Tools:
┌──────────────────────┬──────────────────────────────────────────┐
│  Tool Name           │  Function                                │
├──────────────────────┼──────────────────────────────────────────┤
│  get_kpi_data        │  Query kpi_metrics with time_bucket      │
│  get_financial_data  │  Query Prisma financial models            │
│  get_pipeline_status │  Query pipeline_segments + sensors       │
│  get_latest_news     │  Query news_articles by keywords         │
│  run_scenario        │  Execute HGBT / financial scenario       │
│  get_weather_forecast│  Call Weather FM for operational zone    │
│  get_terramind       │  Trigger satellite pipeline analysis     │
└──────────────────────┴──────────────────────────────────────────┘

Agent Loop (ReAct Pattern):
┌─────────┐
│ Observe │◄──────────────────────────────────────┐
│ (query) │                                        │
└────┬────┘                                        │
     │                                             │
     ▼                                             │
┌─────────┐     Need more data?                    │
│  Think  │ ──── Yes ──► ┌──────────┐              │
│         │              │ Act      │              │
└────┬────┘              │ (call    │              │
     │                   │  tool)   │──────────────┘
     │ No                └──────────┘
     ▼
┌─────────┐
│ Answer  │ ──► Format response + cite sources
└─────────┘
```

### Example Flow: "What is driving the EBITDA margin decline?"

```
Step 1: Think ──► Need financial data for EBITDA trend
Step 2: Act   ──► get_kpi_data(metric="ebitda_margin", period="2024-2025")
Step 3: Observe ► Returns: FY2024=25.3%, Q1-2025=21.2%
Step 4: Think ──► Need margin bridge decomposition
Step 5: Act   ──► get_financial_data(type="margin_bridge", period="Q1-2025")
Step 6: Observe ► Returns: HGBT=-2.1pp, LNG=-1.5pp, OpEx=-0.9pp, etc.
Step 7: Think ──► Have sufficient data, generate response
Step 8: Answer ─► Formatted markdown with analysis + recommendation
                  Sources: SAP Financial Module, HGBT Pricing Database
```

---

## 10. Real-Time Data Flow

### WebSocket Event Architecture

```
┌──────────────────┐
│   Kafka Consumer  │
│   (Node.js)       │
└────────┬─────────┘
         │ New event from topic
         ▼
┌──────────────────┐
│  Event Processor  │
│  • Validate       │
│  • Enrich         │
│  • Store to DB    │
│  • Check thresholds│
└────────┬─────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────┐
│ Normal │ │ Threshold│
│ update │ │ Exceeded │
└───┬────┘ └────┬─────┘
    │           │
    ▼           ▼
socket.io    ┌──────────────┐
emit to      │ Claude API   │
subscribed   │ "Explain     │
clients      │  this alert" │
    │        └──────┬───────┘
    │               │
    │               ▼
    │        socket.io emit
    │        alert:critical
    │        with LLM explanation
    │               │
    ▼               ▼
┌──────────────────────┐
│   Browser Dashboard   │
│   React Query cache   │
│   invalidation        │
│   → UI re-render      │
└──────────────────────┘
```

### Event Types

```
sensor:update     ──► Pipeline sensor reading processed
insight:new       ──► New AI insight/alert generated
sentiment:update  ──► New sentiment batch from IndoBERT
kpi:refresh       ──► KPI value recalculated
finance:update    ──► Financial metric from SAP
alert:critical    ──► Critical alert with LLM explanation
```

---

## 11. Security Architecture

### Authentication & Authorization Flow

```
┌────────────┐
│   User      │
│  (Browser)  │
└──────┬─────┘
       │ Login (SSO / LDAP)
       ▼
┌──────────────┐
│  Auth Service │
│  (JWT Issuer) │
└──────┬───────┘
       │ JWT Token (signed, 1hr TTL)
       ▼
┌──────────────────────────────────────────────┐
│  API Gateway Middleware                        │
│                                                │
│  1. JWT Verification (RS256)                   │
│  2. Token Expiry Check                         │
│  3. Role Extraction (RBAC)                     │
│  4. Route-Level Permission Check:              │
│     ┌────────────────┬───────────────────┐    │
│     │ Route          │ Min Role Required  │    │
│     ├────────────────┼───────────────────┤    │
│     │ finance.*      │ DIRECTOR+          │    │
│     │ finance.cash   │ CFO+               │    │
│     │ briefing.*     │ DIRECTOR+          │    │
│     │ risk.*         │ DIRECTOR+          │    │
│     │ ops.*          │ VP+                 │    │
│     │ scenario.run   │ DIRECTOR+          │    │
│     └────────────────┴───────────────────┘    │
│  5. Audit Log (user, action, timestamp)        │
│  6. Rate Limiting (per user tier)              │
└──────────────────────────────────────────────┘
```

### Data Security

```
┌──────────────────────────────────────┐
│  Security Controls                    │
│                                        │
│  • TLS 1.3 everywhere (in-transit)    │
│  • AES-256 at rest (RDS, S3)         │
│  • AWS Secrets Manager (no .env)      │
│  • Pre-commit secret scanning         │
│  • OWASP Top 10 hardening            │
│  • SOC 2 Type II compliance target    │
│  • Audit trail on ALL operations      │
│  • LLM output grounding (no halluc.)  │
└──────────────────────────────────────┘
```

---

## 12. Infrastructure & Deployment

### AWS Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        AWS Cloud (ap-southeast-1)                 │
│                                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                      VPC (10.0.0.0/16)                      │  │
│  │                                                              │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │  │
│  │  │ Public Subnet│  │Private Subnet│  │  Private Subnet  │  │  │
│  │  │              │  │  (App)       │  │   (Data)         │  │  │
│  │  │  ALB         │  │              │  │                  │  │  │
│  │  │  NAT GW      │  │  EKS Nodes  │  │  RDS PostgreSQL  │  │  │
│  │  │              │  │  (Dashboard, │  │  + TimescaleDB   │  │  │
│  │  │              │  │   API, ML)   │  │                  │  │  │
│  │  │              │  │              │  │  ElastiCache     │  │  │
│  │  │              │  │              │  │  (Redis 7)       │  │  │
│  │  │              │  │              │  │                  │  │  │
│  │  │              │  │              │  │  MSK (Kafka)     │  │  │
│  │  └──────────────┘  └──────────────┘  └──────────────────┘  │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │ CloudFront│ │    S3    │  │ Secrets  │  │    CloudWatch    │ │
│  │  (CDN)    │ │ (Objects)│  │ Manager  │  │   + Datadog APM  │ │
│  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### CI/CD Pipeline

```
Developer Push
    │
    ▼
┌──────────────────────┐
│  GitHub Actions       │
│                        │
│  1. Lint (ESLint)     │
│  2. Type Check (tsc)  │
│  3. Unit Tests        │
│     • Vitest (TS)     │
│     • pytest (Python) │
│  4. Integration Tests │
│     • testcontainers  │
│  5. Security Scan     │
│     • Snyk            │
│     • Secret detect   │
│  6. Build             │
│  7. E2E (Playwright)  │
└──────────┬───────────┘
           │ All passed
           ▼
┌──────────────────────┐
│  Deploy to Staging    │
│  (EKS blue/green)     │
└──────────┬───────────┘
           │ Manual approval
           ▼
┌──────────────────────┐
│  Deploy to Production │
│  (EKS canary rollout) │
└──────────────────────┘
```

### Kubernetes Deployment

```yaml
Services on EKS:
  ├── gasnet-dashboard    (Next.js)    — 3 replicas, 512Mi
  ├── gasnet-api          (Express)    — 3 replicas, 1Gi
  ├── gasnet-briefing     (FastAPI)    — 2 replicas, 2Gi
  ├── gasnet-ml           (FastAPI)    — 2 replicas, 4Gi (GPU)
  ├── gasnet-triton       (Triton)     — 1 replica,  8Gi (GPU)
  └── gasnet-worker       (Celery)     — 3 replicas, 1Gi

Autoscaling:
  HPA: CPU 70% target, min 2, max 10
  GPU nodes: Spot instances with fallback to on-demand
```

---

## Appendix: Technology Decision Records

| Decision | Choice | Rationale |
|---|---|---|
| LLM Primary | Claude (Anthropic) | Best reasoning quality for financial analysis, 200K context window |
| LLM Fallback | GPT-4 (OpenAI) | Broad capability, ensures availability |
| Vector DB | Weaviate | Native multi-tenancy, hybrid search, good Python SDK |
| Time-Series | TimescaleDB | PostgreSQL-compatible, excellent compression, continuous aggregates |
| Streaming | Kafka | Industry standard, replay capability, exactly-once semantics |
| Frontend | Next.js 14 | React Server Components for <3s load, Vercel deployment |
| ORM | Prisma | Type-safe queries, excellent DX, migration management |
| Charting | Recharts | React-native, responsive, good for executive dashboards |
| Sentiment | IndoBERT | Purpose-built for Bahasa Indonesia, fine-tunable |
| Weather | GraphCast + Pangu | Ensemble approach maximizes forecast accuracy |
| Geospatial | TerraMind | Any-to-any multimodal, 500B tokens of Earth observation |
| Grid | GridFM | Only FM pretrained on power/gas flow optimization |

---

<p align="center">
  <strong>GASNET Architecture v2.0</strong><br/>
  <sub>PT Perusahaan Gas Negara Tbk — Confidential</sub>
</p>
