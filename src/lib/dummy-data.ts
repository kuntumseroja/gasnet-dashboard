// ============================================================
// GASNET — PGN Executive Intelligence Platform — Dummy Data
// All figures based on actual PGN FY2024/Q1-2025 baseline
// ============================================================

export interface KpiCardData {
  title: string
  value: string
  change: number
  changeLabel: string
  sparkline: number[]
  format: 'currency' | 'percentage' | 'number' | 'volume'
  unit?: string
  icon: string
}

export interface TimeSeriesPoint {
  date: string
  value: number
  forecast?: number
  lower?: number
  upper?: number
}

export interface AlertItem {
  id: string
  title: string
  description: string
  severity: 'critical' | 'warning' | 'info'
  source: string
  timestamp: string
  acknowledged: boolean
}

export interface SentimentPoint {
  date: string
  positive: number
  negative: number
  neutral: number
  score: number
}

export interface PipelineSegment {
  id: string
  name: string
  status: 'healthy' | 'warning' | 'critical'
  lat: number
  lng: number
  lengthKm: number
  pressure: number
  flow: number
  availability: number
}

export interface NewsItem {
  id: string
  title: string
  source: string
  publishedAt: string
  sentiment: number
  sentimentLabel: 'positive' | 'negative' | 'neutral'
  summary: string
  category: string
}

export interface RiskDimension {
  dimension: string
  score: number
  trend: 'up' | 'down' | 'stable'
  details: string
}

export interface ScenarioResult {
  hgbtPrice: number
  revenue: number
  ebitda: number
  ebitdaMargin: number
  netProfit: number
  netMargin: number
  fcf: number
}

export interface CapexProject {
  name: string
  totalBudget: number
  spent: number
  progress: number
  aiPredictedCompletion: string
  riskScore: number
  status: 'on-track' | 'at-risk' | 'delayed'
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  sources?: string[]
}

// ============================================================
// Executive Command Center KPIs
// ============================================================
export const executiveKpis: KpiCardData[] = [
  {
    title: 'Revenue (TTM)',
    value: '$3.89B',
    change: -8.7,
    changeLabel: 'vs FY2024',
    sparkline: [3.62, 3.78, 3.95, 4.10, 4.26, 4.15, 4.02, 3.95, 3.89],
    format: 'currency',
    icon: 'dollar-sign',
  },
  {
    title: 'EBITDA Margin',
    value: '21.6%',
    change: -3.7,
    changeLabel: 'vs FY2024 25.3%',
    sparkline: [26.0, 25.8, 25.3, 24.5, 23.8, 22.5, 21.8, 21.2, 21.6],
    format: 'percentage',
    icon: 'trending-down',
  },
  {
    title: 'Gas Volume',
    value: '861',
    change: 0.7,
    changeLabel: 'BBTUD vs FY2024',
    sparkline: [842, 845, 850, 852, 855, 858, 860, 859, 861],
    format: 'volume',
    unit: 'BBTUD',
    icon: 'flame',
  },
  {
    title: 'Infra Availability',
    value: '99.0%',
    change: 0.0,
    changeLabel: 'On Target',
    sparkline: [99.1, 98.9, 99.0, 99.2, 99.0, 98.8, 99.1, 99.0, 99.0],
    format: 'percentage',
    icon: 'shield-check',
  },
]

// ============================================================
// Finance Page KPIs (10 cards)
// ============================================================
export const financeKpis: KpiCardData[] = [
  {
    title: 'Revenue (TTM)',
    value: '$3.89B',
    change: -8.7,
    changeLabel: 'vs FY2024',
    sparkline: [3.62, 3.78, 3.95, 4.10, 4.26, 4.15, 4.02, 3.95, 3.89],
    format: 'currency',
    icon: 'dollar-sign',
  },
  {
    title: 'EBITDA',
    value: '$840M',
    change: -22.0,
    changeLabel: 'vs FY2024 $1,077M',
    sparkline: [940, 980, 1020, 1050, 1077, 1010, 950, 880, 840],
    format: 'currency',
    icon: 'bar-chart-2',
  },
  {
    title: 'Net Profit',
    value: '$238M',
    change: -29.8,
    changeLabel: 'vs FY2024 $339M',
    sparkline: [264, 280, 300, 320, 339, 310, 280, 260, 238],
    format: 'currency',
    icon: 'trending-down',
  },
  {
    title: 'Gross Margin',
    value: '20.0%',
    change: 0.0,
    changeLabel: 'Stable',
    sparkline: [20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0, 20.0],
    format: 'percentage',
    icon: 'percent',
  },
  {
    title: 'Cash Position',
    value: '$1.55B',
    change: -4.6,
    changeLabel: 'vs FY2024 $1.62B',
    sparkline: [1.50, 1.55, 1.58, 1.60, 1.62, 1.60, 1.58, 1.55, 1.55],
    format: 'currency',
    icon: 'wallet',
  },
  {
    title: 'Free Cash Flow',
    value: '$205M',
    change: -64.7,
    changeLabel: 'Q1 annualized vs FY2024',
    sparkline: [580, 550, 500, 450, 400, 350, 300, 250, 205],
    format: 'currency',
    icon: 'arrow-down-right',
  },
  {
    title: 'Debt/Equity',
    value: '34%',
    change: -7.0,
    changeLabel: 'improved vs 41%',
    sparkline: [45, 44, 43, 42, 41, 39, 37, 35, 34],
    format: 'percentage',
    icon: 'shield',
  },
  {
    title: 'CAPEX Budget',
    value: '$353M',
    change: 0,
    changeLabel: 'FY2026 Plan',
    sparkline: [280, 290, 310, 320, 340, 345, 350, 352, 353],
    format: 'currency',
    icon: 'hard-hat',
  },
  {
    title: 'Dividend Yield',
    value: '9.3%',
    change: 0.0,
    changeLabel: 'Annualized',
    sparkline: [8.5, 8.7, 8.9, 9.0, 9.1, 9.2, 9.3, 9.3, 9.3],
    format: 'percentage',
    icon: 'gift',
  },
  {
    title: 'Stock (PGAS.JK)',
    value: 'IDR 1,980',
    change: 2.1,
    changeLabel: '52w: 1,425-2,020',
    sparkline: [1425, 1500, 1600, 1700, 1780, 1850, 1900, 1950, 1980],
    format: 'number',
    icon: 'line-chart',
  },
]

// ============================================================
// Revenue Time Series (Monthly, 2024-2025)
// ============================================================
export const revenueTimeSeries: TimeSeriesPoint[] = [
  { date: '2024-01', value: 340 },
  { date: '2024-02', value: 325 },
  { date: '2024-03', value: 365 },
  { date: '2024-04', value: 350 },
  { date: '2024-05', value: 370 },
  { date: '2024-06', value: 355 },
  { date: '2024-07', value: 360 },
  { date: '2024-08', value: 345 },
  { date: '2024-09', value: 375 },
  { date: '2024-10', value: 355 },
  { date: '2024-11', value: 340 },
  { date: '2024-12', value: 380 },
  { date: '2025-01', value: 320 },
  { date: '2025-02', value: 310 },
  { date: '2025-03', value: 337 },
  { date: '2025-04', value: 315, forecast: 315, lower: 298, upper: 332 },
  { date: '2025-05', value: 0, forecast: 325, lower: 300, upper: 350 },
  { date: '2025-06', value: 0, forecast: 335, lower: 305, upper: 365 },
]

// ============================================================
// EBITDA Time Series
// ============================================================
export const ebitdaTimeSeries: TimeSeriesPoint[] = [
  { date: '2024-01', value: 88 },
  { date: '2024-02', value: 82 },
  { date: '2024-03', value: 95 },
  { date: '2024-04', value: 90 },
  { date: '2024-05', value: 92 },
  { date: '2024-06', value: 87 },
  { date: '2024-07', value: 91 },
  { date: '2024-08', value: 85 },
  { date: '2024-09', value: 93 },
  { date: '2024-10', value: 88 },
  { date: '2024-11', value: 82 },
  { date: '2024-12', value: 95 },
  { date: '2025-01', value: 68 },
  { date: '2025-02', value: 65 },
  { date: '2025-03', value: 72 },
  { date: '2025-04', value: 0, forecast: 70, lower: 62, upper: 78 },
  { date: '2025-05', value: 0, forecast: 73, lower: 63, upper: 83 },
  { date: '2025-06', value: 0, forecast: 76, lower: 64, upper: 88 },
]

// ============================================================
// Margin Bridge Data (Explaining EBITDA decline: 25.3% → 21.2%)
// ============================================================
export const marginBridgeData = [
  { name: 'FY2024 EBITDA', value: 25.3, isTotal: true },
  { name: 'Volume Growth', value: 0.3, isPositive: true },
  { name: 'Regas Growth', value: 0.8, isPositive: true },
  { name: 'HGBT Price Impact', value: -2.1, isPositive: false },
  { name: 'LNG Procurement', value: -1.5, isPositive: false },
  { name: 'OpEx Increase', value: -0.9, isPositive: false },
  { name: 'FX Impact', value: -0.5, isPositive: false },
  { name: 'Other', value: -0.2, isPositive: false },
  { name: 'Q1 2025 EBITDA', value: 21.2, isTotal: true },
]

// ============================================================
// Cash Flow Forecast (90-day)
// ============================================================
export const cashForecastData: TimeSeriesPoint[] = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(2025, 2, 1)
  date.setDate(date.getDate() + i)
  const base = 1546 - i * 1.2 + Math.sin(i / 7) * 30
  return {
    date: date.toISOString().split('T')[0],
    value: 0,
    forecast: Math.round(base),
    lower: Math.round(base - 50 - i * 0.5),
    upper: Math.round(base + 50 + i * 0.5),
  }
})

// ============================================================
// AI-Generated Alerts/Insights
// ============================================================
export const alerts: AlertItem[] = [
  {
    id: 'INS-001',
    title: 'EBITDA Margin Compression Alert',
    description:
      'EBITDA margin has declined from 25.3% (FY2024) to 21.2% (Q1 2025). Primary drivers: HGBT regulated pricing pressure (-2.1pp) and rising LNG procurement costs (-1.5pp). Recommend immediate cost optimization review.',
    severity: 'critical',
    source: 'GASNET Financial AI',
    timestamp: '2025-02-25T06:30:00Z',
    acknowledged: false,
  },
  {
    id: 'INS-002',
    title: 'Anomalous Pressure Drop — Grissik-Batam Pipeline',
    description:
      'Sensor #SN-4821 detected 12% pressure drop at KP-247. TerraMind satellite analysis shows potential land subsidence in corridor. Recommend field inspection within 48 hours.',
    severity: 'critical',
    source: 'TerraMind + SCADA AI',
    timestamp: '2025-02-25T05:45:00Z',
    acknowledged: false,
  },
  {
    id: 'INS-003',
    title: 'Regasification Volume Surge — Arun LNG Terminal',
    description:
      'Regasification volume up 39.4% YoY to 237 BBTUD. Exceeding capacity utilization target. LNG procurement costs rising — consider spot contract renegotiation.',
    severity: 'warning',
    source: 'GridFM Supply-Demand',
    timestamp: '2025-02-25T04:15:00Z',
    acknowledged: true,
  },
  {
    id: 'INS-004',
    title: 'Negative Sentiment Spike — Social Media',
    description:
      'IndoBERT detected 34% increase in negative sentiment on Twitter/X related to "harga gas" (gas pricing). 847 posts in last 6 hours. Top concern: industrial customer pricing under HGBT regulation.',
    severity: 'warning',
    source: 'IndoBERT Sentiment',
    timestamp: '2025-02-25T03:30:00Z',
    acknowledged: false,
  },
  {
    id: 'INS-005',
    title: 'Weather Advisory — Tropical Cyclone Path',
    description:
      'GraphCast 10-day forecast shows Tropical Depression forming near Natuna Sea. LNG cargo route from Qatar may be affected. Alternative routing via Lombok Strait adds 2.1 days transit.',
    severity: 'warning',
    source: 'GraphCast Weather AI',
    timestamp: '2025-02-25T02:00:00Z',
    acknowledged: false,
  },
  {
    id: 'INS-006',
    title: 'CAPEX Underspend Alert — Cirebon Extension',
    description:
      'Cirebon-Semarang pipeline extension at 23% budget utilization (target: 35%). AI predicts 3-month delay if current pace continues. Procurement bottleneck identified.',
    severity: 'info',
    source: 'GASNET Project AI',
    timestamp: '2025-02-25T01:00:00Z',
    acknowledged: true,
  },
  {
    id: 'INS-007',
    title: 'Competitor Intelligence — Pertamina Gas Expansion',
    description:
      'Pertamina announced $1.2B investment in East Java gas infrastructure. Market impact analysis: potential 3-5% volume diversion from PGN industrial segment by 2027.',
    severity: 'info',
    source: 'GASNET Market Intel',
    timestamp: '2025-02-24T22:00:00Z',
    acknowledged: true,
  },
]

// ============================================================
// Sentiment Trend Data (30 days)
// ============================================================
export const sentimentTrend: SentimentPoint[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 1, 25)
  date.setDate(date.getDate() - (29 - i))
  const basePositive = 45 + Math.random() * 15
  const baseNegative = 20 + Math.random() * 15
  return {
    date: date.toISOString().split('T')[0],
    positive: Math.round(basePositive),
    negative: Math.round(baseNegative),
    neutral: Math.round(100 - basePositive - baseNegative),
    score: Number(((basePositive - baseNegative) / 100).toFixed(2)),
  }
})

// ============================================================
// Pipeline Segments (Indonesia)
// ============================================================
export const pipelineSegments: PipelineSegment[] = [
  { id: 'PS-001', name: 'Grissik-Singapore', status: 'warning', lat: -2.1, lng: 103.8, lengthKm: 470, pressure: 88, flow: 320, availability: 97.5 },
  { id: 'PS-002', name: 'South Sumatera-West Java', status: 'healthy', lat: -4.5, lng: 105.2, lengthKm: 680, pressure: 95, flow: 445, availability: 99.2 },
  { id: 'PS-003', name: 'East Java Backbone', status: 'healthy', lat: -7.3, lng: 112.7, lengthKm: 520, pressure: 94, flow: 380, availability: 99.5 },
  { id: 'PS-004', name: 'West Java Distribution', status: 'healthy', lat: -6.6, lng: 106.8, lengthKm: 890, pressure: 92, flow: 520, availability: 99.1 },
  { id: 'PS-005', name: 'Cirebon-Semarang', status: 'warning', lat: -6.7, lng: 108.5, lengthKm: 310, pressure: 86, flow: 210, availability: 96.8 },
  { id: 'PS-006', name: 'Kalija (Kalimantan-Java)', status: 'healthy', lat: -5.5, lng: 110.0, lengthKm: 270, pressure: 93, flow: 290, availability: 99.3 },
  { id: 'PS-007', name: 'Arun LNG Terminal', status: 'healthy', lat: 5.2, lng: 97.1, lengthKm: 45, pressure: 97, flow: 237, availability: 99.8 },
  { id: 'PS-008', name: 'Bontang-Semarang', status: 'healthy', lat: 0.1, lng: 117.5, lengthKm: 1100, pressure: 91, flow: 480, availability: 98.9 },
  { id: 'PS-009', name: 'Muara Karang Distribution', status: 'critical', lat: -6.1, lng: 106.8, lengthKm: 120, pressure: 78, flow: 95, availability: 94.2 },
  { id: 'PS-010', name: 'Batam Industrial', status: 'healthy', lat: 1.0, lng: 104.0, lengthKm: 85, pressure: 96, flow: 145, availability: 99.6 },
]

// ============================================================
// News & Intelligence
// ============================================================
export const newsItems: NewsItem[] = [
  {
    id: 'N-001',
    title: 'PGN Secures New 15-Year Gas Supply Agreement with BP Tangguh',
    source: 'Reuters',
    publishedAt: '2025-02-25T08:00:00Z',
    sentiment: 0.82,
    sentimentLabel: 'positive',
    summary: 'Strategic LNG supply contract strengthens long-term feedstock security for regasification growth.',
    category: 'Supply Chain',
  },
  {
    id: 'N-002',
    title: 'Indonesia Government Reviews HGBT Pricing Formula for 2026',
    source: 'Kompas',
    publishedAt: '2025-02-24T14:00:00Z',
    sentiment: -0.35,
    sentimentLabel: 'negative',
    summary: 'Potential downward revision of regulated gas prices could further compress PGN margins.',
    category: 'Regulatory',
  },
  {
    id: 'N-003',
    title: 'PGN Reports Strong Q4 2024 Regasification Growth',
    source: 'Jakarta Post',
    publishedAt: '2025-02-24T10:00:00Z',
    sentiment: 0.71,
    sentimentLabel: 'positive',
    summary: 'Regasification volume surge of 39.4% YoY demonstrates successful LNG strategy pivot.',
    category: 'Operations',
  },
  {
    id: 'N-004',
    title: 'JKM LNG Spot Price Rises to $14.2/MMBtu on Asian Demand',
    source: 'S&P Global Platts',
    publishedAt: '2025-02-24T06:00:00Z',
    sentiment: -0.45,
    sentimentLabel: 'negative',
    summary: 'Rising spot LNG prices increase procurement costs for PGN regas terminals.',
    category: 'Market',
  },
  {
    id: 'N-005',
    title: 'Pertamina Announces $1.2B East Java Gas Infrastructure Plan',
    source: 'Bloomberg',
    publishedAt: '2025-02-23T16:00:00Z',
    sentiment: -0.28,
    sentimentLabel: 'negative',
    summary: 'Potential competitive pressure on PGN industrial gas distribution in East Java.',
    category: 'Competitive',
  },
  {
    id: 'N-006',
    title: 'PGN Dividend Yield Reaches 9.3% — Highest in Sector',
    source: 'CNBC Indonesia',
    publishedAt: '2025-02-23T08:00:00Z',
    sentiment: 0.88,
    sentimentLabel: 'positive',
    summary: 'Attractive dividend yield positions PGN as top income stock in Indonesian energy sector.',
    category: 'Financial',
  },
]

// ============================================================
// Risk Dimensions (6-axis radar)
// ============================================================
export const riskDimensions: RiskDimension[] = [
  { dimension: 'Market & Pricing', score: 72, trend: 'up', details: 'HGBT pricing pressure + rising JKM spot prices. Margin compression risk elevated.' },
  { dimension: 'Operational', score: 35, trend: 'stable', details: '99.0% infra availability. Grissik-Batam pressure anomaly under investigation.' },
  { dimension: 'Regulatory', score: 58, trend: 'up', details: 'HGBT 2026 review pending. Potential formula change could impact $200M+ revenue.' },
  { dimension: 'Financial', score: 42, trend: 'down', details: 'D/E improved to 34%. Cash position strong at $1.55B. FCF concern if margins compress further.' },
  { dimension: 'Geopolitical', score: 48, trend: 'stable', details: 'Natuna Sea tensions stable. LNG shipping routes secure. No immediate supply disruption.' },
  { dimension: 'ESG & Climate', score: 30, trend: 'down', details: 'Methane monitoring program on track. Carbon intensity declining. Green bond issuance planned.' },
]

// ============================================================
// CAPEX Projects
// ============================================================
export const capexProjects: CapexProject[] = [
  { name: 'Cirebon-Semarang Extension', totalBudget: 125, spent: 29, progress: 23, aiPredictedCompletion: '2026-Q3 (3mo delay)', riskScore: 68, status: 'at-risk' },
  { name: 'Arun Terminal Expansion', totalBudget: 85, spent: 52, progress: 61, aiPredictedCompletion: '2025-Q4 (on schedule)', riskScore: 22, status: 'on-track' },
  { name: 'East Java Digital SCADA', totalBudget: 42, spent: 35, progress: 83, aiPredictedCompletion: '2025-Q2 (on schedule)', riskScore: 15, status: 'on-track' },
  { name: 'Muara Karang Upgrade', totalBudget: 38, spent: 12, progress: 32, aiPredictedCompletion: '2026-Q1 (1mo delay)', riskScore: 45, status: 'at-risk' },
  { name: 'Virtual Pipeline Fleet', totalBudget: 28, spent: 8, progress: 29, aiPredictedCompletion: '2026-Q2 (on schedule)', riskScore: 30, status: 'on-track' },
  { name: 'Kalimantan Hub Station', totalBudget: 35, spent: 3, progress: 9, aiPredictedCompletion: '2027-Q1 (6mo delay)', riskScore: 75, status: 'delayed' },
]

// ============================================================
// HGBT Scenario Model
// ============================================================
export function calculateScenario(hgbtPrice: number): ScenarioResult {
  const baseRevenue = 3890
  const baseEbitda = 840
  const baseNetProfit = 238
  const baseFcf = 205

  const priceImpact = (hgbtPrice - 6.75) / 6.75
  const revenueImpact = baseRevenue * priceImpact * 0.65
  const ebitdaImpact = revenueImpact * 0.45
  const profitImpact = ebitdaImpact * 0.35

  const revenue = baseRevenue + revenueImpact
  const ebitda = baseEbitda + ebitdaImpact
  const netProfit = baseNetProfit + profitImpact

  return {
    hgbtPrice,
    revenue: Math.round(revenue),
    ebitda: Math.round(ebitda),
    ebitdaMargin: Number(((ebitda / revenue) * 100).toFixed(1)),
    netProfit: Math.round(netProfit),
    netMargin: Number(((netProfit / revenue) * 100).toFixed(1)),
    fcf: Math.round(baseFcf + profitImpact * 0.8),
  }
}

// ============================================================
// P&L Waterfall
// ============================================================
export const pnlWaterfall = [
  { name: 'Revenue', value: 3890 },
  { name: 'COGS', value: -3112 },
  { name: 'Gross Profit', value: 778, isSubtotal: true },
  { name: 'OpEx', value: -362 },
  { name: 'D&A', value: -424 },
  { name: 'EBIT', value: 416, isSubtotal: true },
  { name: 'Interest', value: -78 },
  { name: 'Tax', value: -100 },
  { name: 'Net Profit', value: 238, isSubtotal: true },
]

// ============================================================
// Supply Chain Sankey
// ============================================================
export const supplyChainFlows = [
  { from: 'Domestic Gas Fields', to: 'Transmission', value: 680 },
  { from: 'LNG Import', to: 'Regasification', value: 237 },
  { from: 'Regasification', to: 'Distribution', value: 237 },
  { from: 'Transmission', to: 'Distribution', value: 480 },
  { from: 'Transmission', to: 'Power Plants', value: 200 },
  { from: 'Distribution', to: 'Industrial', value: 450 },
  { from: 'Distribution', to: 'Commercial', value: 180 },
  { from: 'Distribution', to: 'Residential', value: 87 },
]

// ============================================================
// AI Morning Brief (Sample)
// ============================================================
export const morningBrief = {
  date: '2025-02-25',
  language: 'en',
  generatedAt: '2025-02-25T06:00:00Z',
  sections: [
    {
      title: 'Financial Snapshot',
      content: `Revenue TTM stands at US$3.89B, down 8.7% from FY2024 peak. EBITDA margin has compressed to 21.6% (vs 25.3% FY2024) — driven primarily by HGBT regulated pricing pressure and rising LNG procurement costs. Cash position remains solid at US$1.55B with D/E improving to 34%.`,
      priority: 'high',
    },
    {
      title: 'Operational Highlights',
      content: `Infrastructure availability on target at 99.0%. Gas trading volume at 861 BBTUD (+0.7% YoY). Key concern: Grissik-Batam pipeline shows 12% pressure anomaly at KP-247 — field inspection recommended within 48 hours. Regasification continues strong growth at 237 BBTUD (+39.4% YoY).`,
      priority: 'high',
    },
    {
      title: 'Market Intelligence',
      content: `JKM LNG spot price at $14.2/MMBtu, increasing procurement costs. Indonesia government reviewing HGBT formula for 2026 — potential margin impact of $200M+. Pertamina announced $1.2B East Java gas expansion — competitive risk assessment initiated.`,
      priority: 'medium',
    },
    {
      title: 'Sentiment Analysis',
      content: `Overall sentiment score: +0.18 (slightly positive). Social media spike in negative sentiment around "harga gas" pricing (+34% in 6 hours). Offset by positive coverage of 9.3% dividend yield and BP Tangguh supply agreement.`,
      priority: 'medium',
    },
    {
      title: 'Action Items',
      content: `1. Review Grissik-Batam pipeline inspection schedule (CRITICAL)\n2. Evaluate HGBT 2026 scenario models — run $6.0-6.5 stress test\n3. Prepare social media response strategy for pricing sentiment\n4. Expedite Cirebon-Semarang procurement to address CAPEX delay\n5. Schedule LNG spot contract renegotiation with current suppliers`,
      priority: 'high',
    },
  ],
}

// ============================================================
// Ask GASNET — Demo Conversation
// ============================================================
export const demoConversation: ConversationMessage[] = [
  {
    role: 'user',
    content: 'What is our current EBITDA margin and why has it declined?',
    timestamp: '2025-02-25T09:00:00Z',
  },
  {
    role: 'assistant',
    content: `**Current EBITDA Margin: 21.2% (Q1 2025)**

Your EBITDA margin has declined 4.1 percentage points from FY2024's 25.3%. The key drivers:

📉 **HGBT Price Impact** (-2.1pp): Government-regulated gas pricing at $6.5-7/MMBtu has compressed trading margins as procurement costs rose.

📉 **LNG Procurement** (-1.5pp): JKM spot prices at $14.2/MMBtu have significantly increased regasification input costs, despite the 39.4% volume growth.

📉 **OpEx Increase** (-0.9pp): Maintenance and labor costs up due to Cirebon-Semarang construction and SCADA digitalization.

📈 **Partially offset** by volume growth (+0.3pp) and regasification growth (+0.8pp).

**Recommendation:** Run the HGBT scenario simulator at $6.0/MMBtu to assess downside risk ahead of 2026 pricing review.

*Sources: SAP Financial Module, HGBT Pricing Database, JKM Market Feed*`,
    timestamp: '2025-02-25T09:00:05Z',
    sources: ['SAP Financial Module', 'HGBT Pricing Database', 'JKM Market Feed'],
  },
]

// ============================================================
// Supply Chain Segments
// ============================================================
export const supplierData = [
  { name: 'BP Tangguh', type: 'LNG', volume: 95, contract: '2040', reliability: 99.2 },
  { name: 'ConocoPhillips Grissik', type: 'Pipeline Gas', volume: 320, contract: '2033', reliability: 97.5 },
  { name: 'Pertamina EP', type: 'Pipeline Gas', volume: 280, contract: '2031', reliability: 98.8 },
  { name: 'Santos (Corridor)', type: 'Pipeline Gas', volume: 185, contract: '2035', reliability: 99.1 },
  { name: 'Cheniere (US LNG)', type: 'LNG Spot', volume: 65, contract: 'Spot', reliability: 96.5 },
  { name: 'Qatar Energy', type: 'LNG', volume: 77, contract: '2038', reliability: 99.5 },
]

export const customerSegments = [
  { segment: 'Industrial', share: 52.3, customers: 1847, growth: 2.1 },
  { segment: 'Power Plants', share: 23.2, customers: 38, growth: -1.5 },
  { segment: 'Commercial', share: 15.8, customers: 4230, growth: 4.2 },
  { segment: 'Residential', share: 5.2, customers: 128500, growth: 8.7 },
  { segment: 'Transportation', share: 3.5, customers: 89, growth: 12.3 },
]
