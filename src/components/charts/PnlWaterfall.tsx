'use client'

import { pnlWaterfall } from '@/lib/dummy-data'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

export function PnlWaterfall() {
  let runningTotal = 0
  const data = pnlWaterfall.map((item) => {
    if (item.isSubtotal) {
      runningTotal = item.value
      return { ...item, base: 0, bar: item.value, color: '#05283C' }
    }
    const base = item.value > 0 ? runningTotal : runningTotal + item.value
    const bar = Math.abs(item.value)
    runningTotal += item.value
    return { ...item, base, bar, color: item.value > 0 ? '#87AC4A' : '#E30613' }
  })

  return (
    <div className="pgn-card">
      <div className="pgn-card-header">
        <h3 className="text-sm font-semibold text-brand-navy">P&L Waterfall</h3>
        <p className="text-xs text-pgn-text-muted mt-0.5">TTM Sep-2025 Income Statement (US$M)</p>
      </div>
      <div className="pgn-card-body">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v >= 0 ? '' : '-'}${Math.abs(v)}M`}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #EAEAEA',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'base') return [null, null]
                  return [`$${value}M`]
                }}
              />
              <Bar dataKey="base" stackId="stack" fill="transparent" />
              <Bar dataKey="bar" stackId="stack" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
