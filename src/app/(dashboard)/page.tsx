'use client'

import { KpiCard } from '@/components/KpiCard'
import { RevenueChart } from '@/components/charts/RevenueChart'
import { SentimentChart } from '@/components/charts/SentimentChart'
import { RiskRadar } from '@/components/charts/RiskRadar'
import { AlertFeed } from '@/components/AlertFeed'
import { PipelineMap } from '@/components/PipelineMap'
import { executiveKpis, morningBrief } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import {
  Sparkles, ArrowRight, Clock, Zap, ShieldAlert, TrendingDown,
  Wrench, MessageSquare, DollarSign, Ship, CheckCircle2,
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const recommendedActions = [
  {
    id: 'RA-01',
    title: 'Dispatch Grissik-Batam Pipeline Inspection',
    insight: 'Anomalous 12% pressure drop at KP-247 detected by SCADA + TerraMind satellite subsidence alert',
    impact: 'Prevent potential 320 MMSCFD supply disruption to Singapore',
    urgency: 'critical' as const,
    deadline: '48 hours',
    owner: 'VP Operations',
    icon: Wrench,
    link: '/operations',
  },
  {
    id: 'RA-02',
    title: 'Run HGBT $6.0 Stress Test & Prepare Board Memo',
    insight: 'EBITDA margin declined 4.1pp to 21.2% — HGBT 2026 pricing review could compress further',
    impact: 'Quantify $200M+ downside risk before HGBT committee meeting (Mar 2025)',
    urgency: 'critical' as const,
    deadline: '1 week',
    owner: 'CFO Office',
    icon: DollarSign,
    link: '/finance/scenarios',
  },
  {
    id: 'RA-03',
    title: 'Activate Social Media Response Strategy',
    insight: 'IndoBERT detected 34% spike in negative sentiment around "harga gas" pricing (847 posts / 6hr)',
    impact: 'Contain reputational risk before mainstream media amplification',
    urgency: 'warning' as const,
    deadline: '24 hours',
    owner: 'Corporate Communications',
    icon: MessageSquare,
    link: '/intelligence',
  },
  {
    id: 'RA-04',
    title: 'Renegotiate LNG Spot Contracts',
    insight: 'JKM spot at $14.2/MMBtu driving -1.5pp EBITDA margin erosion on regasification segment',
    impact: 'Potential $45M annual savings with term contract vs spot pricing',
    urgency: 'warning' as const,
    deadline: '2 weeks',
    owner: 'Treasury & Procurement',
    icon: Ship,
    link: '/supply-chain',
  },
  {
    id: 'RA-05',
    title: 'Accelerate Cirebon-Semarang Procurement',
    insight: 'CAPEX utilization at 23% vs 35% target — AI predicts 3-month delay if pace continues',
    impact: 'Avoid $125M project delay cost and 2026 capacity shortfall',
    urgency: 'warning' as const,
    deadline: '1 month',
    owner: 'VP Projects',
    icon: TrendingDown,
    link: '/finance',
  },
  {
    id: 'RA-06',
    title: 'Review Pertamina East Java Competitive Response',
    insight: 'Pertamina $1.2B East Java gas infrastructure announcement — 3-5% volume diversion risk by 2027',
    impact: 'Secure long-term contracts with top 20 industrial customers in East Java',
    urgency: 'info' as const,
    deadline: 'Q2 2025',
    owner: 'Commercial',
    icon: ShieldAlert,
    link: '/risk',
  },
]

const urgencyConfig = {
  critical: { badge: 'pgn-badge-critical', border: 'border-l-brand-red', dot: 'bg-brand-red' },
  warning: { badge: 'pgn-badge-warning', border: 'border-l-amber-500', dot: 'bg-amber-500' },
  info: { badge: 'pgn-badge-info', border: 'border-l-brand-blue', dot: 'bg-brand-blue' },
}

export default function ExecutiveGallery() {
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set())

  const toggleAction = (id: string) => {
    setCompletedActions((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-brand-navy">Executive Gallery</h1>
          <p className="text-sm text-pgn-text-secondary mt-0.5">
            Real-time intelligence overview — PT Perusahaan Gas Negara Tbk
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/briefing"
            className="flex items-center gap-2 px-3 py-2 bg-brand-navy text-white rounded-lg text-xs font-medium hover:bg-brand-navy/90 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
            View AI Morning Brief
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* AI Brief Summary Banner */}
      <div className="pgn-card bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white p-4 border-0">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-lime/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-brand-lime" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-brand-lime">GASNET AI BRIEF</span>
              <span className="text-[10px] text-white/50 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {new Date(morningBrief.generatedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} WIB
              </span>
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              EBITDA margin compressed to 21.2% from 25.3% — driven by HGBT pricing (-2.1pp) and LNG costs (-1.5pp).
              Grissik-Batam pipeline pressure anomaly detected. Social sentiment spike on gas pricing.
              Cash position solid at $1.55B. Regasification growth strong at +39.4% YoY.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-4 gap-4">
        {executiveKpis.map((kpi, i) => (
          <KpiCard key={kpi.title} data={kpi} delay={i * 100} />
        ))}
      </div>

      {/* Recommended Actions from Insights */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-lime" />
            <h3 className="text-sm font-semibold text-brand-navy">Recommended Actions</h3>
            <span className="text-[10px] text-pgn-text-muted">AI-generated from dashboard insights</span>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-red"></span>Critical
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>Warning
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-blue"></span>Monitor
            </span>
            <span className="pgn-badge pgn-badge-success">
              {completedActions.size}/{recommendedActions.length} done
            </span>
          </div>
        </div>
        <div className="divide-y divide-pgn-border">
          {recommendedActions.map((action, i) => {
            const config = urgencyConfig[action.urgency]
            const Icon = action.icon
            const isDone = completedActions.has(action.id)

            return (
              <div
                key={action.id}
                className={cn(
                  'flex items-start gap-3 px-5 py-3.5 border-l-2 transition-all duration-200 animate-slide-up',
                  isDone ? 'border-l-brand-green bg-brand-green/5 opacity-60' : config.border,
                )}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleAction(action.id)}
                  className={cn(
                    'mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all',
                    isDone
                      ? 'bg-brand-green border-brand-green'
                      : 'border-pgn-border hover:border-brand-blue'
                  )}
                >
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                </button>

                {/* Icon */}
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                  isDone ? 'bg-brand-green/10' :
                  action.urgency === 'critical' ? 'bg-brand-red/10' :
                  action.urgency === 'warning' ? 'bg-amber-50' : 'bg-brand-blue/10'
                )}>
                  <Icon className={cn(
                    'w-4 h-4',
                    isDone ? 'text-brand-green' :
                    action.urgency === 'critical' ? 'text-brand-red' :
                    action.urgency === 'warning' ? 'text-amber-600' : 'text-brand-blue'
                  )} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={cn('text-sm font-medium', isDone ? 'text-pgn-text-muted line-through' : 'text-pgn-text')}>
                      {action.title}
                    </span>
                    <span className={cn('pgn-badge', isDone ? 'pgn-badge-success' : config.badge)}>
                      {isDone ? 'completed' : action.urgency}
                    </span>
                  </div>
                  <p className="text-xs text-pgn-text-secondary leading-relaxed mb-1">
                    <span className="font-medium text-pgn-text-muted">Insight:</span> {action.insight}
                  </p>
                  <p className="text-xs text-pgn-text-secondary">
                    <span className="font-medium text-pgn-text-muted">Impact:</span> {action.impact}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-pgn-text-muted">
                    <span>Deadline: <span className="font-medium text-pgn-text-secondary">{action.deadline}</span></span>
                    <span>·</span>
                    <span>Owner: <span className="font-medium text-pgn-text-secondary">{action.owner}</span></span>
                    <Link href={action.link} className="ml-auto text-brand-blue font-medium hover:underline">
                      View details →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-4">
        {/* Revenue Chart - Span 8 */}
        <div className="col-span-8">
          <RevenueChart />
        </div>

        {/* Alert Feed - Span 4 */}
        <div className="col-span-4">
          <AlertFeed limit={5} />
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-12 gap-4">
        {/* Pipeline Map - Span 7 */}
        <div className="col-span-7">
          <PipelineMap />
        </div>

        {/* Sentiment + Risk - Span 5 */}
        <div className="col-span-5 space-y-4">
          <SentimentChart />
          <RiskRadar />
        </div>
      </div>
    </div>
  )
}
