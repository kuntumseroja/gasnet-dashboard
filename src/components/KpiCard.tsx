'use client'

import { cn } from '@/lib/utils'
import type { KpiCardData } from '@/lib/dummy-data'
import {
  DollarSign, TrendingDown, TrendingUp, Flame, ShieldCheck, BarChart2,
  Percent, Wallet, ArrowDownRight, Shield, HardHat, Gift, LineChart, Activity,
} from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'dollar-sign': DollarSign,
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  'flame': Flame,
  'shield-check': ShieldCheck,
  'bar-chart-2': BarChart2,
  'percent': Percent,
  'wallet': Wallet,
  'arrow-down-right': ArrowDownRight,
  'shield': Shield,
  'hard-hat': HardHat,
  'gift': Gift,
  'line-chart': LineChart,
  'activity': Activity,
}

interface KpiCardProps {
  data: KpiCardData
  className?: string
  delay?: number
}

export function KpiCard({ data, className, delay = 0 }: KpiCardProps) {
  const Icon = iconMap[data.icon] || Activity
  const isPositive = data.change > 0
  const isNeutral = data.change === 0
  const sparklineData = data.sparkline.map((v, i) => ({ v, i }))

  return (
    <div
      className={cn(
        'pgn-card p-4 animate-slide-up group',
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            'w-8 h-8 rounded-lg flex items-center justify-center',
            isPositive ? 'bg-brand-green/10' : isNeutral ? 'bg-brand-blue/10' : 'bg-brand-red/10'
          )}>
            <Icon className={cn(
              'w-4 h-4',
              isPositive ? 'text-brand-green' : isNeutral ? 'text-brand-blue' : 'text-brand-red'
            )} />
          </div>
          <span className="pgn-stat-label">{data.title}</span>
        </div>
        <div className={cn(
          'flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded',
          isPositive ? 'text-brand-green bg-brand-green/10' :
          isNeutral ? 'text-brand-blue bg-brand-blue/10' :
          'text-brand-red bg-brand-red/10'
        )}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : isNeutral ? null : <TrendingDown className="w-3 h-3" />}
          {data.change !== 0 ? `${data.change > 0 ? '+' : ''}${data.change}%` : '—'}
        </div>
      </div>

      <div className="pgn-stat-value mb-1">{data.value}</div>
      <div className="text-[11px] text-pgn-text-muted mb-3">{data.changeLabel}</div>

      {/* Sparkline */}
      <div className="h-8 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id={`sparkGrad-${data.title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isPositive || isNeutral ? '#0069B4' : '#E30613'} stopOpacity={0.2} />
                <stop offset="100%" stopColor={isPositive || isNeutral ? '#0069B4' : '#E30613'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={isPositive || isNeutral ? '#0069B4' : '#E30613'}
              strokeWidth={1.5}
              fill={`url(#sparkGrad-${data.title})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
