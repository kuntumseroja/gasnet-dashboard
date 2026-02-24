'use client'

import { KpiCard } from '@/components/KpiCard'
import { PnlWaterfall } from '@/components/charts/PnlWaterfall'
import { MarginBridge } from '@/components/charts/MarginBridge'
import { CashForecast } from '@/components/charts/CashForecast'
import { financeKpis, capexProjects } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { Sliders, Download, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function FinancePage() {
  const totalCapex = capexProjects.reduce((a, p) => a + p.totalBudget, 0)
  const totalSpent = capexProjects.reduce((a, p) => a + p.spent, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-brand-navy">Financial Health</h1>
          <p className="text-sm text-pgn-text-secondary mt-0.5">
            TTM Sep-2025 · Revenue US$3.89B · EBITDA Margin 21.6%
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="pgn-btn-primary text-xs gap-2">
            <Download className="w-3.5 h-3.5" />
            Export Report
          </button>
          <Link
            href="/finance/scenarios"
            className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-lg text-xs font-medium hover:bg-brand-navy/90 transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            Scenario Simulator
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid (10 cards, 5x2) */}
      <div className="grid grid-cols-5 gap-3">
        {financeKpis.map((kpi, i) => (
          <KpiCard key={kpi.title} data={kpi} delay={i * 80} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-4">
        <PnlWaterfall />
        <MarginBridge />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <CashForecast />
        </div>

        {/* Debt Maturity */}
        <div className="col-span-5">
          <div className="pgn-card">
            <div className="pgn-card-header">
              <h3 className="text-sm font-semibold text-brand-navy">Debt Maturity Profile</h3>
              <p className="text-xs text-pgn-text-muted mt-0.5">Total Debt: US$1,281M · D/E: 34%</p>
            </div>
            <div className="pgn-card-body space-y-3">
              {[
                { year: '2025', amount: 320, pct: 25 },
                { year: '2026', amount: 280, pct: 22 },
                { year: '2027', amount: 210, pct: 16 },
                { year: '2028', amount: 185, pct: 14 },
                { year: '2029+', amount: 286, pct: 22 },
              ].map((item) => (
                <div key={item.year} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-pgn-text-secondary w-10">{item.year}</span>
                  <div className="flex-1 h-6 bg-pgn-card rounded-full overflow-hidden border border-pgn-border">
                    <div
                      className="h-full bg-gradient-to-r from-brand-blue to-brand-blue/70 rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                      style={{ width: `${item.pct * 2.5}%` }}
                    >
                      <span className="text-[9px] font-medium text-white">${item.amount}M</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-pgn-text-muted w-8 text-right">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CAPEX Tracker */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-brand-navy">CAPEX Tracker</h3>
            <p className="text-xs text-pgn-text-muted mt-0.5">
              FY2026 Budget: US$353M · Committed: US${totalSpent}M ({Math.round((totalSpent / totalCapex) * 100)}%)
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-green"></span>On Track</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span>At Risk</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-red"></span>Delayed</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-pgn-border">
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Project</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Budget</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Spent</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Progress</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">AI Prediction</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Risk</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {capexProjects.map((project) => (
                <tr key={project.name} className="border-b border-pgn-border/50 hover:bg-pgn-card/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-pgn-text">{project.name}</td>
                  <td className="py-3 px-4 text-right text-pgn-text">${project.totalBudget}M</td>
                  <td className="py-3 px-4 text-right text-pgn-text">${project.spent}M</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-pgn-border rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full transition-all', {
                            'bg-brand-green': project.status === 'on-track',
                            'bg-amber-400': project.status === 'at-risk',
                            'bg-brand-red': project.status === 'delayed',
                          })}
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-pgn-text-muted w-8 text-right">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-pgn-text-secondary">{project.aiPredictedCompletion}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn('font-semibold', {
                      'text-brand-green': project.riskScore < 30,
                      'text-amber-500': project.riskScore >= 30 && project.riskScore < 60,
                      'text-brand-red': project.riskScore >= 60,
                    })}>
                      {project.riskScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn('pgn-badge', {
                      'pgn-badge-success': project.status === 'on-track',
                      'pgn-badge-warning': project.status === 'at-risk',
                      'pgn-badge-critical': project.status === 'delayed',
                    })}>
                      {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
