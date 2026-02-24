'use client'

import { supplierData, customerSegments, supplyChainFlows } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { Truck, ArrowRight, Package, Users } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

const COLORS = ['#0069B4', '#05283C', '#87AC4A', '#C8D300', '#E30613']

export default function SupplyChainPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-brand-navy">Supply Chain Intelligence</h1>
        <p className="text-sm text-pgn-text-secondary mt-0.5">
          End-to-end gas supply chain visibility — sourcing to delivery
        </p>
      </div>

      {/* Flow Diagram */}
      <div className="pgn-card p-6">
        <h3 className="text-sm font-semibold text-brand-navy mb-4">Gas Supply Chain Flow</h3>
        <div className="flex items-center justify-between gap-2 overflow-x-auto py-4">
          {['Domestic Fields', 'LNG Import', 'Transmission', 'Regasification', 'Distribution', 'End Users'].map((stage, i) => (
            <div key={stage} className="flex items-center gap-2 flex-shrink-0">
              <div className={cn(
                'px-4 py-3 rounded-xl text-xs font-medium text-center min-w-[100px] border transition-all',
                i === 0 || i === 1 ? 'bg-brand-navy text-white border-brand-navy' :
                i === 5 ? 'bg-brand-green/10 text-brand-green border-brand-green/30' :
                'bg-brand-blue/10 text-brand-blue border-brand-blue/20'
              )}>
                {stage}
                <div className="text-[9px] mt-1 opacity-70">
                  {i === 0 && '680 MMSCFD'}
                  {i === 1 && '237 BBTUD'}
                  {i === 2 && '1,602 MMSCFD'}
                  {i === 3 && '237 BBTUD'}
                  {i === 4 && '717 MMSCFD'}
                  {i === 5 && '134K+ customers'}
                </div>
              </div>
              {i < 5 && <ArrowRight className="w-4 h-4 text-pgn-text-muted flex-shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Supplier Table */}
        <div className="col-span-7">
          <div className="pgn-card">
            <div className="pgn-card-header flex items-center gap-2">
              <Package className="w-4 h-4 text-brand-blue" />
              <h3 className="text-sm font-semibold text-brand-navy">Supplier Portfolio</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-pgn-border">
                    <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Supplier</th>
                    <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Type</th>
                    <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Volume</th>
                    <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Contract</th>
                    <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Reliability</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierData.map((s) => (
                    <tr key={s.name} className="border-b border-pgn-border/50 hover:bg-pgn-card/50">
                      <td className="py-3 px-4 font-medium text-pgn-text">{s.name}</td>
                      <td className="py-3 px-4">
                        <span className={cn('pgn-badge', s.type.includes('LNG') ? 'pgn-badge-info' : 'pgn-badge-success')}>
                          {s.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-pgn-text">{s.volume} MMSCFD</td>
                      <td className="py-3 px-4 text-center text-pgn-text-secondary">{s.contract}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-pgn-border rounded-full overflow-hidden">
                            <div className="h-full bg-brand-green rounded-full" style={{ width: `${s.reliability}%` }} />
                          </div>
                          <span className="text-pgn-text-muted">{s.reliability}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Customer Segments */}
        <div className="col-span-5">
          <div className="pgn-card">
            <div className="pgn-card-header flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-blue" />
              <h3 className="text-sm font-semibold text-brand-navy">Customer Segments</h3>
            </div>
            <div className="pgn-card-body">
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      dataKey="share"
                      nameKey="segment"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {customerSegments.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '8px', fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {customerSegments.map((seg, i) => (
                  <div key={seg.segment} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-pgn-text">{seg.segment}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-pgn-text-muted">{seg.customers.toLocaleString()}</span>
                      <span className="font-medium text-pgn-text">{seg.share}%</span>
                      <span className={cn('text-[10px]', seg.growth > 0 ? 'text-brand-green' : 'text-brand-red')}>
                        {seg.growth > 0 ? '+' : ''}{seg.growth}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Gauges */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { name: 'Arun LNG Storage', current: 78, capacity: 100, unit: 'BBTUD' },
          { name: 'FSRU Lampung', current: 62, capacity: 100, unit: 'BBTUD' },
          { name: 'Cilegon LNG', current: 85, capacity: 100, unit: 'BBTUD' },
          { name: 'Virtual Pipeline Fleet', current: 45, capacity: 100, unit: '% utilization' },
        ].map((inv) => (
          <div key={inv.name} className="pgn-card p-4">
            <span className="pgn-stat-label">{inv.name}</span>
            <div className="flex items-end gap-2 mt-2">
              <span className="pgn-stat-value">{inv.current}%</span>
              <span className="text-[10px] text-pgn-text-muted mb-1">{inv.unit}</span>
            </div>
            <div className="mt-3 h-2 bg-pgn-border rounded-full overflow-hidden">
              <div
                className={cn('h-full rounded-full transition-all duration-1000', {
                  'bg-brand-green': inv.current < 70,
                  'bg-amber-400': inv.current >= 70 && inv.current < 85,
                  'bg-brand-red': inv.current >= 85,
                })}
                style={{ width: `${inv.current}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
