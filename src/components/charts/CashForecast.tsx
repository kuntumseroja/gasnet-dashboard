'use client'

import { cashForecastData } from '@/lib/dummy-data'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from 'recharts'

export function CashForecast() {
  const displayData = cashForecastData.filter((_, i) => i % 3 === 0)

  return (
    <div className="pgn-card">
      <div className="pgn-card-header flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-brand-navy">Cash Flow Forecast</h3>
          <p className="text-xs text-pgn-text-muted mt-0.5">90-day AI forecast with confidence bands (US$M)</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-20 h-20 relative flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#EAEAEA" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#0069B4" strokeWidth="3"
                strokeDasharray={`${(1546 / 2000) * 94.2} 94.2`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-brand-navy">$1.55B</span>
              <span className="text-[8px] text-pgn-text-muted">CASH</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pgn-card-body">
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={displayData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="cashBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0069B4" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#0069B4" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => v.slice(5)}
                interval={3}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}M`}
                domain={['dataMin - 100', 'dataMax + 100']}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #EAEAEA',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
                formatter={(value: number, name: string) => [`$${value}M`, name]}
              />
              <ReferenceLine y={1000} stroke="#E30613" strokeDasharray="4 4" label={{ value: 'Min Threshold', fontSize: 9, fill: '#E30613' }} />
              <Area type="monotone" dataKey="upper" stroke="none" fill="url(#cashBand)" dot={false} />
              <Area type="monotone" dataKey="lower" stroke="none" fill="#fff" dot={false} />
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#0069B4"
                strokeWidth={2}
                strokeDasharray="5 3"
                fill="none"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
