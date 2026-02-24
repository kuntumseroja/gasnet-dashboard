'use client'

import { sentimentTrend } from '@/lib/dummy-data'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export function SentimentChart() {
  return (
    <div className="pgn-card">
      <div className="pgn-card-header flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-brand-navy">Public Sentiment Trend</h3>
          <p className="text-xs text-pgn-text-muted mt-0.5">IndoBERT analysis — 30 day rolling (news + social media)</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>Positive
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red"></span>Negative
          </span>
        </div>
      </div>
      <div className="pgn-card-body">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sentimentTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#87AC4A" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#87AC4A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="negGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E30613" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#E30613" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => v.slice(5)}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 10, fill: '#787474' }}
                tickLine={false}
                axisLine={false}
                domain={[0, 100]}
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
              />
              <Area
                type="monotone"
                dataKey="positive"
                stroke="#87AC4A"
                strokeWidth={1.5}
                fill="url(#posGrad)"
                dot={false}
              />
              <Area
                type="monotone"
                dataKey="negative"
                stroke="#E30613"
                strokeWidth={1.5}
                fill="url(#negGrad)"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
