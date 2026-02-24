'use client'

import { revenueTimeSeries } from '@/lib/dummy-data'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function RevenueChart() {
  return (
    <div className="pgn-card">
      <div className="pgn-card-header flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-brand-navy">Revenue Trend</h3>
          <p className="text-xs text-pgn-text-muted mt-0.5">Monthly revenue with AI forecast (US$M)</p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-brand-blue rounded"></span>Actual
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-brand-blue/40 rounded border border-dashed border-brand-blue"></span>Forecast
          </span>
        </div>
      </div>
      <div className="pgn-card-body">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTimeSeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0069B4" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#0069B4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C8D300" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#C8D300" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => {
                  const [, m] = v.split('-')
                  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                  return months[parseInt(m) - 1]
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${v}M`}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #EAEAEA',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(value: number, name: string) => [`$${value}M`, name === 'value' ? 'Actual' : 'Forecast']}
              />
              {/* Confidence Band */}
              <Area
                type="monotone"
                dataKey="upper"
                stroke="none"
                fill="transparent"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="lower"
                stroke="none"
                fill="#0069B4"
                fillOpacity={0.05}
                dot={false}
              />
              {/* Forecast Line */}
              <Area
                type="monotone"
                dataKey="forecast"
                stroke="#0069B4"
                strokeWidth={2}
                strokeDasharray="6 4"
                fill="url(#forecastGrad)"
                dot={false}
                connectNulls={false}
              />
              {/* Actual Line */}
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0069B4"
                strokeWidth={2}
                fill="url(#revGrad)"
                dot={false}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
