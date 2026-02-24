'use client'

import { RiskRadar } from '@/components/charts/RiskRadar'
import { riskDimensions, alerts } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { ShieldAlert, TrendingUp, TrendingDown, Minus, AlertTriangle, Calendar } from 'lucide-react'

const riskItems = [
  { id: 'R-001', title: 'HGBT 2026 Pricing Review', category: 'Regulatory', severity: 'high', probability: 75, impact: '$200M+ revenue', mitigation: 'Scenario modeling complete. Cost optimization plan in progress.', owner: 'CFO Office', dueDate: '2025-06-30' },
  { id: 'R-002', title: 'JKM Spot Price Escalation', category: 'Market', severity: 'high', probability: 60, impact: '-1.5pp EBITDA margin', mitigation: 'Long-term contract negotiations with BP Tangguh. Hedge strategy review.', owner: 'Treasury', dueDate: '2025-04-15' },
  { id: 'R-003', title: 'Grissik-Batam Land Subsidence', category: 'Operational', severity: 'critical', probability: 40, impact: '320 MMSCFD at risk', mitigation: 'Field inspection ordered. Contingency via Kalija interconnector.', owner: 'VP Operations', dueDate: '2025-03-01' },
  { id: 'R-004', title: 'Pertamina East Java Competition', category: 'Competitive', severity: 'medium', probability: 80, impact: '3-5% volume diversion by 2027', mitigation: 'Customer retention program. Long-term contract renewals.', owner: 'Commercial', dueDate: '2025-09-30' },
  { id: 'R-005', title: 'Natuna Sea Geopolitical Tension', category: 'Geopolitical', severity: 'medium', probability: 20, impact: 'LNG route disruption', mitigation: 'Alternative routing via Lombok Strait mapped.', owner: 'Risk Committee', dueDate: 'Ongoing' },
  { id: 'R-006', title: 'Methane Emission Compliance', category: 'ESG', severity: 'low', probability: 30, impact: 'Regulatory fine risk', mitigation: 'Monitoring program deployed. Green bond issuance planned.', owner: 'ESG Office', dueDate: '2025-12-31' },
]

const regulatoryTimeline = [
  { date: '2025-03', event: 'HGBT Q1 Review Committee Meeting', status: 'upcoming' },
  { date: '2025-04', event: 'ESDM Gas Allocation Decree Renewal', status: 'upcoming' },
  { date: '2025-06', event: 'HGBT 2026 Formula Public Consultation', status: 'upcoming' },
  { date: '2025-09', event: 'BPH Migas Annual License Review', status: 'planned' },
  { date: '2025-12', event: 'HGBT 2026 Final Determination', status: 'planned' },
  { date: '2026-01', event: 'New HGBT Price Effective Date', status: 'planned' },
]

export default function RiskPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-brand-navy">Risk & Compliance Center</h1>
        <p className="text-sm text-pgn-text-secondary mt-0.5">
          Enterprise risk monitoring with AI-powered early warning
        </p>
      </div>

      {/* Risk Radar + Risk Details */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <RiskRadar />
        </div>
        <div className="col-span-7">
          <div className="pgn-card">
            <div className="pgn-card-header flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-brand-blue" />
              <h3 className="text-sm font-semibold text-brand-navy">Risk Dimension Details</h3>
            </div>
            <div className="divide-y divide-pgn-border max-h-[400px] overflow-y-auto">
              {riskDimensions.map((dim) => (
                <div key={dim.dimension} className="px-5 py-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className={cn('w-2.5 h-2.5 rounded-full', {
                        'bg-brand-red': dim.score > 60,
                        'bg-amber-400': dim.score > 40 && dim.score <= 60,
                        'bg-brand-green': dim.score <= 40,
                      })} />
                      <span className="text-sm font-medium text-pgn-text">{dim.dimension}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('text-lg font-bold', {
                        'text-brand-red': dim.score > 60,
                        'text-amber-500': dim.score > 40 && dim.score <= 60,
                        'text-brand-green': dim.score <= 40,
                      })}>
                        {dim.score}
                      </span>
                      {dim.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5 text-brand-red" /> :
                       dim.trend === 'down' ? <TrendingDown className="w-3.5 h-3.5 text-brand-green" /> :
                       <Minus className="w-3.5 h-3.5 text-pgn-text-muted" />}
                    </div>
                  </div>
                  <p className="text-xs text-pgn-text-secondary leading-relaxed">{dim.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Active Risk Register */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-brand-navy">Active Risk Register</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-pgn-border">
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">ID</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Risk</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Category</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Severity</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Probability</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Impact</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Mitigation</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Due</th>
              </tr>
            </thead>
            <tbody>
              {riskItems.map((risk) => (
                <tr key={risk.id} className="border-b border-pgn-border/50 hover:bg-pgn-card/50">
                  <td className="py-3 px-4 text-pgn-text-muted font-mono">{risk.id}</td>
                  <td className="py-3 px-4 font-medium text-pgn-text max-w-[200px]">{risk.title}</td>
                  <td className="py-3 px-4 text-center"><span className="pgn-badge pgn-badge-info">{risk.category}</span></td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn('pgn-badge', {
                      'pgn-badge-critical': risk.severity === 'critical',
                      'pgn-badge-warning': risk.severity === 'high',
                      'pgn-badge-info': risk.severity === 'medium',
                      'pgn-badge-success': risk.severity === 'low',
                    })}>
                      {risk.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-medium">{risk.probability}%</td>
                  <td className="py-3 px-4 text-pgn-text-secondary">{risk.impact}</td>
                  <td className="py-3 px-4 text-pgn-text-secondary max-w-[200px]">{risk.mitigation}</td>
                  <td className="py-3 px-4 text-center text-pgn-text-muted">{risk.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Regulatory Timeline */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-blue" />
          <h3 className="text-sm font-semibold text-brand-navy">Regulatory Timeline</h3>
        </div>
        <div className="pgn-card-body">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-pgn-border" />
            <div className="space-y-4">
              {regulatoryTimeline.map((item, i) => (
                <div key={i} className="flex items-start gap-4 pl-1">
                  <div className={cn('w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 bg-white z-10', {
                    'border-brand-blue': item.status === 'upcoming',
                    'border-pgn-border': item.status === 'planned',
                  })}>
                    <div className={cn('w-2.5 h-2.5 rounded-full', {
                      'bg-brand-blue': item.status === 'upcoming',
                      'bg-pgn-border': item.status === 'planned',
                    })} />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-brand-navy">{item.event}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-pgn-text-muted">{item.date}</span>
                      <span className={cn('pgn-badge', {
                        'pgn-badge-info': item.status === 'upcoming',
                        'bg-gray-100 text-gray-500': item.status === 'planned',
                      })}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
