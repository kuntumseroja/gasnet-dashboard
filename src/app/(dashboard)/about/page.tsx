'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  Flame, Brain, Database, Globe, Shield, Zap, ArrowRight, ChevronRight,
  BarChart2, Cpu, Cloud, Lock, Layers, Radio, Satellite, Wind,
  MessageSquare, FileText, TrendingUp, Eye, Server, GitBranch,
  MonitorSpeaker, Workflow, Sparkles, CheckCircle2, Target,
  DollarSign, Activity, Users, Clock, AlertTriangle, Gauge,
} from 'lucide-react'

// ============================================================
// Interactive Tab Sections
// ============================================================
type TabId = 'vision' | 'architecture' | 'ai' | 'rag' | 'models' | 'data'

const tabs: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'vision', label: 'Business Vision', icon: Target },
  { id: 'architecture', label: 'System Architecture', icon: Layers },
  { id: 'ai', label: 'AI/ML Stack', icon: Brain },
  { id: 'rag', label: 'RAG & LLM', icon: Sparkles },
  { id: 'models', label: 'Foundation Models', icon: Satellite },
  { id: 'data', label: 'Data Platform', icon: Database },
]

// ============================================================
// Main Page Component
// ============================================================
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabId>('vision')
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy via-[#0a3a5c] to-brand-navy p-8 border border-white/5">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand-blue rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-lime rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-brand-lime/20 flex items-center justify-center">
                <Flame className="w-7 h-7 text-brand-lime" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">GASNET</h1>
                <span className="text-xs text-brand-lime font-medium tracking-widest">GARUDA EYE PLATFORM</span>
              </div>
            </div>

            <p className="text-base text-white/80 leading-relaxed mb-6">
              AI-Powered Executive Intelligence Platform that transforms PGN&apos;s decision-making
              from <span className="text-white font-semibold">48+ hour report cycles</span> to{' '}
              <span className="text-brand-lime font-semibold">&lt;15 minute AI-assisted insights</span>.
              Unifying SCADA telemetry, SAP financials, market intelligence, and satellite imagery
              through foundation models into a single cognitive command center.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                { label: 'US$3.89B Revenue', icon: DollarSign },
                { label: '13,581 km Pipeline', icon: Activity },
                { label: '91% Market Share', icon: Gauge },
                { label: '6 Foundation Models', icon: Brain },
                { label: 'Real-Time SCADA', icon: Radio },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs text-white/90 border border-white/10">
                  <badge.icon className="w-3 h-3 text-brand-lime" />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="hidden xl:grid grid-cols-2 gap-3 min-w-[280px]">
            {[
              { label: 'Decision Latency', before: '48+ hrs', after: '<15 min', improvement: '99.5%' },
              { label: 'Risk Lead Time', before: 'Reactive', after: '7-14 days', improvement: 'Proactive' },
              { label: 'Report Generation', before: '5-10 days', after: '<1 hour', improvement: '99%' },
              { label: 'Margin Forecast', before: '±15%', after: '±3%', improvement: '5x' },
            ].map((m) => (
              <div key={m.label} className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                <span className="text-[9px] text-white/50 uppercase tracking-wider">{m.label}</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-xs text-white/40 line-through">{m.before}</span>
                  <ArrowRight className="w-3 h-3 text-brand-lime" />
                  <span className="text-sm font-bold text-brand-lime">{m.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 p-1 bg-pgn-card rounded-xl border border-pgn-border overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap',
                isActive
                  ? 'bg-brand-navy text-white shadow-lg shadow-brand-navy/20'
                  : 'text-pgn-text-secondary hover:bg-white hover:shadow-sm'
              )}
            >
              <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-brand-lime' : '')} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'vision' && <VisionSection />}
        {activeTab === 'architecture' && <ArchitectureSection hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />}
        {activeTab === 'ai' && <AiStackSection />}
        {activeTab === 'rag' && <RagSection />}
        {activeTab === 'models' && <ModelsSection />}
        {activeTab === 'data' && <DataPlatformSection />}
      </div>

      {/* Footer */}
      <div className="pgn-card p-4 text-center">
        <p className="text-xs text-pgn-text-muted">
          <span className="font-medium">GASNET v2.0</span> · Garuda Eye Platform · Built with Claude Code ·
          PT Perusahaan Gas Negara Tbk · Confidential
        </p>
      </div>
    </div>
  )
}

// ============================================================
// VISION SECTION
// ============================================================
function VisionSection() {
  return (
    <div className="space-y-6">
      {/* Problem → Solution */}
      <div className="grid grid-cols-2 gap-4">
        <div className="pgn-card border-l-4 border-l-brand-red p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-brand-red" />
            <h3 className="text-sm font-bold text-brand-navy">The Problem</h3>
          </div>
          <div className="space-y-3">
            {[
              'Fragmented data across SAP, SCADA, treasury & market systems',
              '24-48 hour stale manual reports for executive decisions',
              'No systematic capture of external signals (social, regulatory, weather)',
              'EBITDA margin compressed 25.3% → 21.2% — no real-time scenario capability',
              'Reactive risk management — post-event instead of predictive',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
                <span className="text-xs text-pgn-text-secondary leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pgn-card border-l-4 border-l-brand-green p-6">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-brand-green" />
            <h3 className="text-sm font-bold text-brand-navy">GASNET Solution</h3>
          </div>
          <div className="space-y-3">
            {[
              'Unified cognitive command center — all data in one AI-powered view',
              'Real-time streaming from SCADA, SAP, markets via Apache Kafka',
              'IndoBERT sentiment + news + social media monitoring every 15 min',
              'HGBT scenario simulator with instant P&L cascade + AI narrative',
              '7-14 day predictive risk alerts via foundation models',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-green mt-0.5 flex-shrink-0" />
                <span className="text-xs text-pgn-text-secondary leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Value Chain */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-bold text-brand-navy mb-5">Executive Decision Value Chain</h3>
        <div className="flex items-center justify-between gap-2">
          {[
            { step: 'Ingest', desc: 'SCADA, SAP, News, Market, Satellite', icon: Database, color: 'bg-brand-blue' },
            { step: 'Process', desc: 'Kafka streaming, Spark/Flink transforms', icon: Workflow, color: 'bg-brand-blue' },
            { step: 'Analyze', desc: 'Foundation Models, IndoBERT, GridFM', icon: Brain, color: 'bg-purple-500' },
            { step: 'Augment', desc: 'RAG + Claude LLM narrative generation', icon: Sparkles, color: 'bg-brand-lime' },
            { step: 'Present', desc: 'Interactive dashboard, alerts, briefs', icon: MonitorSpeaker, color: 'bg-brand-navy' },
            { step: 'Decide', desc: 'C-suite action within 15 minutes', icon: Target, color: 'bg-brand-green' },
          ].map((item, i) => (
            <div key={item.step} className="flex items-center gap-2 flex-1">
              <div className="flex flex-col items-center text-center flex-1">
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center mb-2', item.color)}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-bold text-brand-navy">{item.step}</span>
                <span className="text-[9px] text-pgn-text-muted mt-0.5 leading-tight">{item.desc}</span>
              </div>
              {i < 5 && <ChevronRight className="w-4 h-4 text-pgn-border flex-shrink-0 -mt-6" />}
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Map */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-bold text-brand-navy mb-4">Stakeholder Access Matrix (RBAC)</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { role: 'Board & President Director', pages: 'All pages + board pack generation', badge: 'BOARD', color: 'bg-brand-navy' },
            { role: 'Directors (CFO, COO, etc.)', pages: 'Finance, Scenarios, Risk, Briefing, Operations', badge: 'DIRECTOR', color: 'bg-brand-blue' },
            { role: 'VP & SVP', pages: 'Operations, Supply Chain, Intelligence (read-only finance)', badge: 'VP', color: 'bg-brand-blue/70' },
            { role: 'Senior Analysts', pages: 'Dashboard view, Intelligence Hub, limited Ask GASNET', badge: 'ANALYST', color: 'bg-pgn-text-muted' },
            { role: 'External Auditors', pages: 'Finance reports (read-only, time-limited)', badge: 'AUDITOR', color: 'bg-amber-500' },
            { role: 'System (AI/ML)', pages: 'All data ingestion, model inference, alert generation', badge: 'SERVICE', color: 'bg-brand-green' },
          ].map((item) => (
            <div key={item.role} className="bg-pgn-card rounded-xl p-4 border border-pgn-border">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn('pgn-badge text-white text-[9px]', item.color)}>{item.badge}</span>
                <span className="text-xs font-semibold text-brand-navy">{item.role}</span>
              </div>
              <p className="text-[10px] text-pgn-text-muted leading-relaxed">{item.pages}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// ARCHITECTURE SECTION — Interactive Diagram
// ============================================================
function ArchitectureSection({ hoveredNode, setHoveredNode }: { hoveredNode: string | null; setHoveredNode: (n: string | null) => void }) {
  const layers = [
    {
      id: 'presentation',
      label: 'Presentation Layer',
      color: 'from-brand-blue to-blue-600',
      nodes: [
        { id: 'nextjs', name: 'Next.js 14', desc: 'App Router, RSC, SSR/SSG', icon: MonitorSpeaker },
        { id: 'tailwind', name: 'Tailwind + shadcn', desc: 'PGN design system', icon: Eye },
        { id: 'recharts', name: 'Recharts + D3', desc: 'Executive visualizations', icon: BarChart2 },
        { id: 'socketclient', name: 'socket.io Client', desc: 'Real-time updates', icon: Radio },
      ],
    },
    {
      id: 'api',
      label: 'API & Services Layer',
      color: 'from-brand-navy to-[#0a3a5c]',
      nodes: [
        { id: 'trpc', name: 'tRPC + Express', desc: 'Type-safe API gateway', icon: Server },
        { id: 'socketserver', name: 'WebSocket Server', desc: '6 real-time event channels', icon: Zap },
        { id: 'briefing', name: 'Briefing Engine', desc: 'Python FastAPI + LangChain', icon: FileText },
        { id: 'mlservice', name: 'ML Services', desc: 'FastAPI + Triton + ONNX', icon: Cpu },
      ],
    },
    {
      id: 'ai',
      label: 'AI/ML Layer',
      color: 'from-purple-600 to-purple-800',
      nodes: [
        { id: 'claude', name: 'Claude (Primary LLM)', desc: 'Briefs, NL queries, narratives', icon: Sparkles },
        { id: 'indobert', name: 'IndoBERT', desc: 'Bahasa sentiment F1>88%', icon: MessageSquare },
        { id: 'gridfm', name: 'GridFM + TerraMind', desc: 'Gas flow + satellite analysis', icon: Satellite },
        { id: 'weather', name: 'GraphCast + Pangu', desc: 'Weather ensemble forecast', icon: Wind },
      ],
    },
    {
      id: 'data',
      label: 'Data Platform Layer',
      color: 'from-brand-green to-green-700',
      nodes: [
        { id: 'postgres', name: 'PostgreSQL + TimescaleDB', desc: 'OLTP + time-series', icon: Database },
        { id: 'weaviate', name: 'Weaviate', desc: 'Vector DB for RAG', icon: Brain },
        { id: 'kafka', name: 'Apache Kafka', desc: 'Event streaming', icon: Workflow },
        { id: 'redis', name: 'Redis 7', desc: 'Cache + pub/sub', icon: Zap },
      ],
    },
  ]

  return (
    <div className="space-y-4">
      <div className="pgn-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-brand-navy">System Architecture</h3>
            <p className="text-xs text-pgn-text-muted mt-0.5">Hover over any component to see details</p>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-pgn-text-muted">
            <span className="flex items-center gap-1"><span className="w-6 h-1.5 rounded bg-gradient-to-r from-brand-blue to-blue-600" />Frontend</span>
            <span className="flex items-center gap-1"><span className="w-6 h-1.5 rounded bg-gradient-to-r from-brand-navy to-[#0a3a5c]" />API</span>
            <span className="flex items-center gap-1"><span className="w-6 h-1.5 rounded bg-gradient-to-r from-purple-600 to-purple-800" />AI/ML</span>
            <span className="flex items-center gap-1"><span className="w-6 h-1.5 rounded bg-gradient-to-r from-brand-green to-green-700" />Data</span>
          </div>
        </div>

        <div className="space-y-3">
          {layers.map((layer, layerIdx) => (
            <div key={layer.id}>
              {/* Layer Label */}
              <div className="flex items-center gap-2 mb-2">
                <div className={cn('h-0.5 w-4 rounded bg-gradient-to-r', layer.color)} />
                <span className="text-[10px] font-bold text-pgn-text-muted uppercase tracking-wider">{layer.label}</span>
                <div className="flex-1 h-px bg-pgn-border" />
              </div>

              {/* Nodes */}
              <div className="grid grid-cols-4 gap-2">
                {layer.nodes.map((node) => {
                  const isHovered = hoveredNode === node.id
                  const Icon = node.icon
                  return (
                    <div
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={cn(
                        'relative rounded-xl p-3 border transition-all duration-300 cursor-pointer group',
                        isHovered
                          ? 'bg-white shadow-lg shadow-brand-blue/10 border-brand-blue/30 scale-[1.02]'
                          : 'bg-pgn-card border-pgn-border hover:border-brand-blue/20'
                      )}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-lg flex items-center justify-center mb-2 bg-gradient-to-br transition-all',
                        layer.color
                      )}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-brand-navy block">{node.name}</span>
                      <span className="text-[10px] text-pgn-text-muted">{node.desc}</span>

                      {isHovered && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-lime border-2 border-white animate-ping" />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Connection arrows between layers */}
              {layerIdx < layers.length - 1 && (
                <div className="flex justify-center py-1.5">
                  <div className="flex items-center gap-1 text-pgn-border">
                    <div className="w-px h-3 bg-pgn-border" />
                    <ChevronRight className="w-3 h-3 rotate-90" />
                    <div className="w-px h-3 bg-pgn-border" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Languages', items: ['TypeScript (Strict)', 'Python 3.11+'], color: 'bg-brand-blue' },
          { label: 'Frameworks', items: ['Next.js 14', 'Express + tRPC', 'FastAPI'], color: 'bg-brand-navy' },
          { label: 'AI/ML', items: ['Claude API', 'LangChain', 'Triton', 'PyTorch'], color: 'bg-purple-600' },
          { label: 'Infrastructure', items: ['AWS EKS', 'Terraform', 'Docker', 'GitHub Actions'], color: 'bg-brand-green' },
        ].map((group) => (
          <div key={group.label} className="pgn-card p-4">
            <div className={cn('w-6 h-1.5 rounded mb-2', group.color)} />
            <span className="text-xs font-bold text-brand-navy">{group.label}</span>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-[10px] text-pgn-text-secondary">
                  <div className="w-1 h-1 rounded-full bg-pgn-text-muted" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// AI STACK SECTION
// ============================================================
function AiStackSection() {
  const [expandedModel, setExpandedModel] = useState<string | null>(null)

  const models = [
    {
      id: 'claude', name: 'Claude (Anthropic)', role: 'Primary LLM', icon: Sparkles,
      color: 'from-orange-400 to-orange-600',
      version: 'claude-sonnet-4-5-20250929',
      specs: '200K context window · Multi-lingual · Tool use · Citations',
      useCases: ['Morning brief generation', 'Ask GASNET NL queries', 'Financial report writing', 'Scenario narratives', 'Anomaly explanation', 'Board pack generation'],
      integration: 'LangChain ReAct agent → Weaviate RAG → Response with citations',
    },
    {
      id: 'gpt4', name: 'GPT-4 (OpenAI)', role: 'Fallback LLM', icon: Brain,
      color: 'from-green-500 to-green-700',
      version: 'gpt-4-turbo',
      specs: '128K context · Fallback chain · 3x retry exponential backoff',
      useCases: ['Automatic failover when Claude unavailable', 'Load balancing during peak', 'Redundancy for critical briefs'],
      integration: 'Same LangChain pipeline, same tools, flagged as fallback in response',
    },
    {
      id: 'indobert', name: 'IndoBERT', role: 'NLP / Sentiment', icon: MessageSquare,
      color: 'from-brand-blue to-blue-700',
      version: 'IndoBERT-base fine-tuned v3.2',
      specs: 'F1 > 88% · 15-min polling · Bahasa Indonesia specialized',
      useCases: ['Twitter/X sentiment analysis', 'YouTube comment analysis', 'News portal sentiment', 'Topic classification', 'Crisis detection (harga gas, LPG)'],
      integration: 'ONNX Runtime → Kafka consumer → news_articles + social_media_posts tables',
    },
    {
      id: 'gridfm', name: 'GridFM (LF Energy)', role: 'Gas Flow Optimization', icon: Activity,
      color: 'from-yellow-500 to-amber-600',
      version: 'Fine-tuned on PGN topology',
      specs: '300K+ OPF solutions pretrained · GPU inference via Triton',
      useCases: ['Gas flow optimization', 'Contingency analysis', 'Supply-demand balancing', 'Gas-to-power demand forecasting'],
      integration: 'NVIDIA Triton → kpi_metrics + ai_insights tables',
    },
    {
      id: 'terramind', name: 'TerraMind (IBM/ESA)', role: 'Geospatial Intelligence', icon: Satellite,
      color: 'from-teal-500 to-teal-700',
      version: 'v2.0 · 500B tokens Earth observation',
      specs: 'Any-to-any multimodal · Sentinel-2 imagery · Daily analysis',
      useCases: ['Land subsidence detection', 'Pipeline encroachment monitoring', 'Flood risk mapping', 'Environmental change detection'],
      integration: '50m buffer around pipeline GeoJSON → anomaly coordinates + confidence → ai_insights',
    },
    {
      id: 'graphcast', name: 'GraphCast + Pangu-Weather', role: 'Weather Intelligence', icon: Wind,
      color: 'from-sky-500 to-sky-700',
      version: 'DeepMind + Huawei ensemble',
      specs: '10-day forecast <60s · ECMWF-matching accuracy · 6-hourly refresh',
      useCases: ['Operational zone forecasting', 'LNG cargo route risk', 'Temperature-driven demand', 'Tropical cyclone warning'],
      integration: 'Ensemble output → demand correlation model → kpi_metrics + alerts',
    },
  ]

  return (
    <div className="space-y-3">
      {models.map((model) => {
        const isExpanded = expandedModel === model.id
        const Icon = model.icon
        return (
          <div
            key={model.id}
            className={cn(
              'pgn-card overflow-hidden transition-all duration-300',
              isExpanded ? 'shadow-lg shadow-brand-blue/5' : ''
            )}
          >
            <button
              onClick={() => setExpandedModel(isExpanded ? null : model.id)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-pgn-card/50 transition-colors"
            >
              <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br', model.color)}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-brand-navy">{model.name}</span>
                  <span className="pgn-badge pgn-badge-info text-[9px]">{model.role}</span>
                </div>
                <span className="text-[10px] text-pgn-text-muted">{model.specs}</span>
              </div>
              <ChevronRight className={cn('w-4 h-4 text-pgn-text-muted transition-transform', isExpanded && 'rotate-90')} />
            </button>

            {isExpanded && (
              <div className="px-4 pb-4 pt-0 border-t border-pgn-border animate-fade-in">
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div>
                    <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold">Version</span>
                    <p className="text-xs text-pgn-text-secondary mt-1 font-mono">{model.version}</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold">Use Cases</span>
                    <div className="mt-1 space-y-0.5">
                      {model.useCases.map((uc) => (
                        <div key={uc} className="flex items-center gap-1.5 text-[10px] text-pgn-text-secondary">
                          <CheckCircle2 className="w-2.5 h-2.5 text-brand-green flex-shrink-0" />
                          {uc}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold">Integration</span>
                    <p className="text-xs text-pgn-text-secondary mt-1 leading-relaxed">{model.integration}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ============================================================
// RAG & LLM SECTION
// ============================================================
function RagSection() {
  const [activeStep, setActiveStep] = useState(0)

  const ragSteps = [
    {
      label: 'User Query',
      desc: 'Executive asks a natural language question via Ask GASNET panel',
      example: '"What is driving the EBITDA margin decline?"',
      icon: Users, color: 'bg-brand-blue',
    },
    {
      label: 'Query Processing',
      desc: 'Intent classification, entity extraction, language detection (ID/EN)',
      example: 'Intent: financial_analysis · Entities: EBITDA, margin · Lang: EN',
      icon: Cpu, color: 'bg-brand-navy',
    },
    {
      label: 'Parallel Retrieval',
      desc: 'Simultaneous vector search (Weaviate), SQL queries (TimescaleDB), and tool calls (LangChain)',
      example: 'Weaviate: 5 relevant docs · SQL: margin bridge data · Tools: get_financial_data()',
      icon: Database, color: 'bg-purple-600',
    },
    {
      label: 'Context Assembly',
      desc: 'Retrieved documents + query results + PGN financial baseline + conversation history merged into prompt',
      example: '~12K tokens of grounded context assembled for LLM',
      icon: Layers, color: 'bg-amber-500',
    },
    {
      label: 'LLM Generation',
      desc: 'Claude generates response with citations. Fallback: GPT-4 → cached → graceful degradation',
      example: 'Claude processes context with ReAct reasoning in ~3 seconds',
      icon: Sparkles, color: 'bg-brand-lime',
    },
    {
      label: 'Response Pipeline',
      desc: 'Citation injection, source attribution, bilingual formatting, confidence scoring, Redis cache (15min TTL)',
      example: 'Response with [Source: SAP Financial Module, HGBT Pricing DB]',
      icon: CheckCircle2, color: 'bg-brand-green',
    },
  ]

  return (
    <div className="space-y-6">
      {/* RAG Pipeline Visual */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-bold text-brand-navy mb-2">RAG Pipeline (Retrieval-Augmented Generation)</h3>
        <p className="text-xs text-pgn-text-muted mb-6">Click each step to explore the pipeline</p>

        {/* Step Indicators */}
        <div className="flex items-center justify-between mb-6">
          {ragSteps.map((step, i) => {
            const Icon = step.icon
            const isActive = activeStep === i
            const isPast = i < activeStep
            return (
              <div key={step.label} className="flex items-center flex-1">
                <button
                  onClick={() => setActiveStep(i)}
                  className="flex flex-col items-center text-center group"
                >
                  <div className={cn(
                    'w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 mb-1.5',
                    isActive ? cn(step.color, 'shadow-lg scale-110') :
                    isPast ? 'bg-brand-green/80' : 'bg-pgn-border group-hover:bg-pgn-text-muted/30'
                  )}>
                    {isPast && !isActive ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Icon className={cn('w-5 h-5', isActive || isPast ? 'text-white' : 'text-pgn-text-muted')} />
                    )}
                  </div>
                  <span className={cn('text-[9px] font-medium leading-tight max-w-[70px]', isActive ? 'text-brand-navy' : 'text-pgn-text-muted')}>
                    {step.label}
                  </span>
                </button>
                {i < ragSteps.length - 1 && (
                  <div className={cn('flex-1 h-0.5 mx-1 rounded transition-colors', i < activeStep ? 'bg-brand-green' : 'bg-pgn-border')} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step Detail */}
        <div className="bg-pgn-card rounded-xl border border-pgn-border p-5 animate-fade-in" key={activeStep}>
          <div className="flex items-start gap-4">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', ragSteps[activeStep].color)}>
              {(() => { const Icon = ragSteps[activeStep].icon; return <Icon className="w-5 h-5 text-white" /> })()}
            </div>
            <div>
              <h4 className="text-sm font-semibold text-brand-navy">
                Step {activeStep + 1}: {ragSteps[activeStep].label}
              </h4>
              <p className="text-xs text-pgn-text-secondary mt-1 leading-relaxed">{ragSteps[activeStep].desc}</p>
              <div className="mt-3 px-3 py-2 bg-brand-navy/5 rounded-lg border border-brand-navy/10">
                <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold">Example</span>
                <p className="text-xs text-brand-navy font-mono mt-1">{ragSteps[activeStep].example}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Fallback Chain */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-bold text-brand-navy mb-4">LLM Fallback & Resilience Chain</h3>
        <div className="flex items-center gap-3">
          {[
            { name: 'Claude API', desc: 'Primary LLM', status: 'Active', color: 'border-brand-green bg-brand-green/5' },
            { name: 'GPT-4 API', desc: 'Fallback (3x retry)', status: 'Standby', color: 'border-amber-400 bg-amber-50' },
            { name: 'Redis Cache', desc: 'Stale response', status: 'Always On', color: 'border-brand-blue bg-brand-blue/5' },
            { name: 'Graceful Degrade', desc: 'Raw data display', status: 'Last Resort', color: 'border-pgn-border bg-pgn-card' },
          ].map((item, i) => (
            <div key={item.name} className="flex items-center gap-3 flex-1">
              <div className={cn('rounded-xl p-3 border-2 flex-1', item.color)}>
                <span className="text-xs font-semibold text-brand-navy block">{item.name}</span>
                <span className="text-[9px] text-pgn-text-muted">{item.desc}</span>
                <div className="mt-1">
                  <span className={cn('pgn-badge text-[8px]', {
                    'pgn-badge-success': item.status === 'Active',
                    'pgn-badge-warning': item.status === 'Standby',
                    'pgn-badge-info': item.status === 'Always On',
                    'bg-gray-100 text-gray-500': item.status === 'Last Resort',
                  })}>
                    {item.status}
                  </span>
                </div>
              </div>
              {i < 3 && (
                <div className="flex flex-col items-center text-pgn-text-muted">
                  <span className="text-[8px]">fail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Ask GASNET Tools */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-bold text-brand-navy mb-4">Ask GASNET — LangChain ReAct Agent Tools</h3>
        <div className="grid grid-cols-4 gap-2">
          {[
            { tool: 'get_kpi_data', desc: 'Query KPI metrics with time_bucket', db: 'TimescaleDB' },
            { tool: 'get_financial_data', desc: 'P&L, balance sheet, cash flow', db: 'Prisma/PG' },
            { tool: 'get_pipeline_status', desc: 'Pipeline segments + sensors', db: 'PostGIS' },
            { tool: 'get_latest_news', desc: 'News by keywords + sentiment', db: 'PostgreSQL' },
            { tool: 'run_scenario', desc: 'HGBT pricing / financial model', db: 'In-memory' },
            { tool: 'get_weather_forecast', desc: 'Weather FM for operations', db: 'GraphCast' },
            { tool: 'get_terramind', desc: 'Satellite pipeline analysis', db: 'TerraMind' },
          ].map((t) => (
            <div key={t.tool} className="bg-pgn-card rounded-lg p-3 border border-pgn-border">
              <span className="text-[10px] font-mono font-bold text-brand-blue">{t.tool}</span>
              <p className="text-[9px] text-pgn-text-muted mt-0.5">{t.desc}</p>
              <span className="text-[8px] pgn-badge pgn-badge-info mt-1 inline-block">{t.db}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// FOUNDATION MODELS SECTION
// ============================================================
function ModelsSection() {
  return (
    <div className="space-y-4">
      {[
        {
          name: 'GridFM', org: 'LF Energy Foundation', category: 'Energy Grid',
          color: 'from-yellow-400 to-amber-600', icon: Activity,
          training: '300K+ Optimal Power Flow solutions',
          finetuning: 'PGN pipeline topology (13,581 km, 10 major segments)',
          input: 'Pipeline topology graph + flow constraints + demand signals',
          output: 'Optimized flow allocation, contingency scores, demand forecasts',
          latency: '<2s (GPU via NVIDIA Triton)', refresh: 'Daily + on-demand',
          useCases: ['Gas flow optimization across pipeline network', '"What if Grissik-Singapore goes offline?" contingency', 'NDC supply-demand balancing', 'Gas-to-power demand forecasting'],
        },
        {
          name: 'TerraMind', org: 'IBM / ESA', category: 'Geospatial',
          color: 'from-teal-400 to-teal-700', icon: Satellite,
          training: '500 billion tokens of Earth observation data',
          finetuning: 'Indonesian archipelago pipeline corridor focus',
          input: 'Sentinel-2 satellite imagery + pipeline GeoJSON (50m buffer)',
          output: 'Anomaly coordinates + confidence + classification',
          latency: '~30s per corridor', refresh: 'Daily (Sentinel-2 orbit)',
          useCases: ['Land subsidence detection (Grissik-Batam InSAR)', 'Construction encroachment in pipeline RoW', 'Flood risk mapping for pipeline corridors', 'Environmental change detection'],
        },
        {
          name: 'GraphCast', org: 'Google DeepMind', category: 'Weather',
          color: 'from-sky-400 to-sky-700', icon: Wind,
          training: 'ECMWF ERA5 reanalysis dataset (39 years)',
          finetuning: 'No fine-tuning — general purpose ensemble member',
          input: 'Current atmospheric state (temperature, pressure, humidity, wind at 37 levels)',
          output: '10-day global forecast at 0.25-degree resolution',
          latency: '<60 seconds on single TPU', refresh: 'Every 6 hours',
          useCases: ['Operational zone weather (10 pipeline zones)', 'LNG cargo route risk (Natuna, Lombok, Makassar Strait)', 'Temperature-driven gas demand forecasting', 'Tropical cyclone early warning system'],
        },
        {
          name: 'Pangu-Weather', org: 'Huawei', category: 'Weather',
          color: 'from-red-400 to-red-700', icon: Cloud,
          training: '43 years of ERA5 reanalysis data · 3D Earth-Specific Transformer',
          finetuning: 'No fine-tuning — ensemble with GraphCast',
          input: 'Same atmospheric state as GraphCast',
          output: 'Complementary 10-day forecast for ensemble',
          latency: '<60 seconds', refresh: 'Every 6 hours (paired with GraphCast)',
          useCases: ['Secondary weather verification (ensemble)', 'Seasonal planning for virtual pipeline logistics', 'Archipelagic weather pattern analysis', 'Monsoon impact on LNG operations'],
        },
        {
          name: 'IndoBERT', org: 'IndoNLP', category: 'NLP',
          color: 'from-brand-blue to-blue-800', icon: MessageSquare,
          training: 'Indonesian Wikipedia + news + social media corpus',
          finetuning: 'Energy sector corpus (PGN, Pertamina, gas pricing articles)',
          input: 'Raw text (Bahasa Indonesia) from Twitter/X, YouTube, news portals',
          output: 'Sentiment score (-1 to +1), sentiment label, topics, crisis flag',
          latency: '<100ms (ONNX Runtime)', refresh: 'Every 15 minutes',
          useCases: ['Sentiment analysis — "harga gas" trending negative', 'Crisis detection — social media spike alerts', 'Topic classification — regulatory, pricing, competition', 'News summarization for Intelligence Hub'],
        },
      ].map((model) => {
        const Icon = model.icon
        return (
          <div key={model.name} className="pgn-card overflow-hidden">
            <div className={cn('h-1 bg-gradient-to-r', model.color)} />
            <div className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br flex-shrink-0', model.color)}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-brand-navy">{model.name}</h3>
                    <span className="pgn-badge pgn-badge-info text-[9px]">{model.category}</span>
                  </div>
                  <span className="text-[10px] text-pgn-text-muted">{model.org}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[
                  { label: 'Training Data', value: model.training },
                  { label: 'Fine-tuning', value: model.finetuning },
                  { label: 'Input', value: model.input },
                  { label: 'Output', value: model.output },
                  { label: 'Latency', value: model.latency },
                  { label: 'Refresh Cycle', value: model.refresh },
                ].map((field) => (
                  <div key={field.label}>
                    <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold">{field.label}</span>
                    <p className="text-xs text-pgn-text-secondary mt-0.5">{field.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 pt-3 border-t border-pgn-border">
                <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold">PGN Use Cases</span>
                <div className="grid grid-cols-2 gap-1 mt-1.5">
                  {model.useCases.map((uc) => (
                    <div key={uc} className="flex items-center gap-1.5 text-[10px] text-pgn-text-secondary">
                      <CheckCircle2 className="w-2.5 h-2.5 text-brand-green flex-shrink-0" />
                      {uc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ============================================================
// DATA PLATFORM SECTION
// ============================================================
function DataPlatformSection() {
  return (
    <div className="space-y-6">
      {/* Kafka Streaming */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-bold text-brand-navy mb-4">Real-Time Data Streaming (Apache Kafka)</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Sources */}
          <div>
            <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold mb-2 block">Data Sources</span>
            <div className="space-y-2">
              {[
                { name: 'SAP S/4HANA', type: 'Finance', freq: 'Event-driven' },
                { name: 'SCADA Sensors', type: 'Telemetry', freq: 'Real-time' },
                { name: 'News APIs', type: 'Intelligence', freq: '15 min' },
                { name: 'Social Media', type: 'Sentiment', freq: '15 min' },
                { name: 'Market Data', type: 'Pricing', freq: '1 min' },
                { name: 'Satellite', type: 'Geospatial', freq: 'Daily' },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-2 bg-pgn-card rounded-lg p-2 border border-pgn-border">
                  <Radio className="w-3 h-3 text-brand-blue" />
                  <div className="flex-1">
                    <span className="text-[10px] font-medium text-pgn-text">{s.name}</span>
                    <span className="text-[8px] text-pgn-text-muted block">{s.type} · {s.freq}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kafka Topics */}
          <div>
            <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold mb-2 block">Kafka Topics</span>
            <div className="space-y-2">
              {[
                { topic: 'sap.finance.events', partitions: 6 },
                { topic: 'scada.telemetry', partitions: 12 },
                { topic: 'intel.news.raw', partitions: 3 },
                { topic: 'intel.social.raw', partitions: 6 },
                { topic: 'market.pricing', partitions: 3 },
                { topic: 'geo.satellite', partitions: 2 },
              ].map((t) => (
                <div key={t.topic} className="bg-brand-navy/5 rounded-lg p-2 border border-brand-navy/10">
                  <span className="text-[10px] font-mono font-bold text-brand-navy">{t.topic}</span>
                  <span className="text-[8px] text-pgn-text-muted block">{t.partitions} partitions</span>
                </div>
              ))}
            </div>
          </div>

          {/* Consumers */}
          <div>
            <span className="text-[9px] text-pgn-text-muted uppercase tracking-wider font-bold mb-2 block">Consumers</span>
            <div className="space-y-2">
              {[
                { name: 'Finance Service', action: 'KPI calculation + alerts' },
                { name: 'Anomaly Detector', action: 'ML inference + alerting' },
                { name: 'IndoBERT Pipeline', action: 'Sentiment scoring' },
                { name: 'Pricing Service', action: 'Margin computation' },
                { name: 'Weather Ensemble', action: 'Demand correlation' },
                { name: 'TerraMind Analyzer', action: 'Corridor monitoring' },
              ].map((c) => (
                <div key={c.name} className="bg-brand-green/5 rounded-lg p-2 border border-brand-green/20">
                  <span className="text-[10px] font-medium text-brand-navy">{c.name}</span>
                  <span className="text-[8px] text-pgn-text-muted block">{c.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Database Architecture */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            name: 'PostgreSQL 16', icon: Database, color: 'bg-brand-blue',
            desc: 'Primary OLTP database',
            details: ['Financial models (Prisma)', 'Pipeline segments', 'News & social data', 'AI insights & alerts'],
          },
          {
            name: 'TimescaleDB', icon: Clock, color: 'bg-brand-navy',
            desc: 'Time-series extension',
            details: ['kpi_metrics hypertable', 'sensor_readings hypertable', 'time_bucket() aggregation', 'Continuous aggregates'],
          },
          {
            name: 'Weaviate', icon: Brain, color: 'bg-purple-600',
            desc: 'Vector database for RAG',
            details: ['Document embeddings', 'Semantic search', 'Hybrid (vector + BM25)', 'Multi-tenant collections'],
          },
          {
            name: 'Redis 7', icon: Zap, color: 'bg-brand-red',
            desc: 'Cache & message broker',
            details: ['LLM response cache (15min)', 'Session store (JWT)', 'Pub/Sub (WS invalidation)', 'Celery task broker'],
          },
        ].map((db) => {
          const Icon = db.icon
          return (
            <div key={db.name} className="pgn-card p-4">
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center mb-3', db.color)}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-brand-navy">{db.name}</span>
              <span className="text-[10px] text-pgn-text-muted block mb-2">{db.desc}</span>
              <div className="space-y-1">
                {db.details.map((d) => (
                  <div key={d} className="flex items-center gap-1.5 text-[10px] text-pgn-text-secondary">
                    <div className="w-1 h-1 rounded-full bg-pgn-text-muted" />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* WebSocket Events */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-bold text-brand-navy mb-3">Real-Time WebSocket Events (socket.io)</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { event: 'sensor:update', desc: 'New SCADA reading processed', freq: 'Real-time' },
            { event: 'insight:new', desc: 'AI insight/alert generated', freq: 'On detection' },
            { event: 'sentiment:update', desc: 'New sentiment batch', freq: 'Every 15 min' },
            { event: 'kpi:refresh', desc: 'KPI value recalculated', freq: 'On new data' },
            { event: 'finance:update', desc: 'Financial metric from SAP', freq: 'Event-driven' },
            { event: 'alert:critical', desc: 'Critical alert + LLM explanation', freq: 'Immediate' },
          ].map((e) => (
            <div key={e.event} className="flex items-center gap-3 bg-pgn-card rounded-lg p-3 border border-pgn-border">
              <Radio className="w-4 h-4 text-brand-green flex-shrink-0" />
              <div>
                <span className="text-[10px] font-mono font-bold text-brand-navy">{e.event}</span>
                <span className="text-[9px] text-pgn-text-muted block">{e.desc}</span>
              </div>
              <span className="pgn-badge pgn-badge-info text-[8px] ml-auto flex-shrink-0">{e.freq}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
