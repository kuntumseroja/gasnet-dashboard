'use client'

import { marginBridgeData } from '@/lib/dummy-data'
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts'

export function MarginBridge() {
  // Calculate cumulative values for waterfall effect
  let cumulative = 0
  const waterfallData = marginBridgeData.map((item) => {
    if (item.isTotal) {
      const result = { ...item, start: 0, end: item.value, fill: '#05283C' }
      cumulative = item.value
      return result
    }
    const start = cumulative
    cumulative += item.value
    return {
      ...item,
      start,
      end: cumulative,
      fill: item.isPositive ? '#87AC4A' : '#E30613',
    }
  })

  return (
    <div className="pgn-card">
      <div className="pgn-card-header">
        <h3 className="text-sm font-semibold text-brand-navy">EBITDA Margin Bridge</h3>
        <p className="text-xs text-pgn-text-muted mt-0.5">FY2024 25.3% → Q1 2025 21.2% — Decomposition</p>
      </div>
      <div className="pgn-card-body">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waterfallData} margin={{ top: 20, right: 10, left: 0, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 9, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                angle={-30}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 30]}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #EAEAEA',
                  borderRadius: '8px',
                  fontSize: '11px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(value: number) => [`${value.toFixed(1)}%`]}
              />
              {/* Invisible bar for spacing */}
              <Bar dataKey="start" stackId="a" fill="transparent" />
              {/* Visible bar */}
              <Bar dataKey={(d: typeof waterfallData[0]) => Math.abs(d.end - d.start)} stackId="a" radius={[4, 4, 0, 0]}>
                {waterfallData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
