'use client'

import { cn } from '@/lib/utils'
import { alerts } from '@/lib/dummy-data'
import type { AlertItem } from '@/lib/dummy-data'
import { AlertTriangle, AlertCircle, Info, Check, ChevronDown, ChevronUp, Cpu } from 'lucide-react'
import { useState } from 'react'

const severityConfig = {
  critical: { icon: AlertTriangle, badge: 'pgn-badge-critical', border: 'border-l-brand-red' },
  warning: { icon: AlertCircle, badge: 'pgn-badge-warning', border: 'border-l-amber-500' },
  info: { icon: Info, badge: 'pgn-badge-info', border: 'border-l-brand-blue' },
}

interface AlertFeedProps {
  limit?: number
  className?: string
}

export function AlertFeed({ limit = 5, className }: AlertFeedProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const displayAlerts = alerts.slice(0, limit)

  return (
    <div className={cn('pgn-card', className)}>
      <div className="pgn-card-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-brand-blue" />
          <h3 className="text-sm font-semibold text-brand-navy">AI Insights & Alerts</h3>
        </div>
        <span className="pgn-badge bg-brand-red/10 text-brand-red">
          {alerts.filter((a) => a.severity === 'critical' && !a.acknowledged).length} critical
        </span>
      </div>
      <div className="divide-y divide-pgn-border max-h-[420px] overflow-y-auto">
        {displayAlerts.map((alert, i) => (
          <AlertRow
            key={alert.id}
            alert={alert}
            expanded={expandedId === alert.id}
            onToggle={() => setExpandedId(expandedId === alert.id ? null : alert.id)}
            delay={i * 100}
          />
        ))}
      </div>
    </div>
  )
}

function AlertRow({
  alert,
  expanded,
  onToggle,
  delay,
}: {
  alert: AlertItem
  expanded: boolean
  onToggle: () => void
  delay: number
}) {
  const config = severityConfig[alert.severity]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'px-4 py-3 border-l-2 transition-all duration-200 animate-fade-in cursor-pointer hover:bg-pgn-card/50',
        config.border
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn(
          'w-4 h-4 mt-0.5 flex-shrink-0',
          alert.severity === 'critical' ? 'text-brand-red' :
          alert.severity === 'warning' ? 'text-amber-500' : 'text-brand-blue'
        )} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-medium text-pgn-text truncate">{alert.title}</span>
            {alert.acknowledged && <Check className="w-3 h-3 text-brand-green flex-shrink-0" />}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-pgn-text-muted">
            <span className={config.badge}>{alert.severity}</span>
            <span>{alert.source}</span>
            <span>·</span>
            <span>{new Date(alert.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          {expanded && (
            <p className="mt-2 text-xs text-pgn-text-secondary leading-relaxed animate-fade-in">
              {alert.description}
            </p>
          )}
        </div>
        {expanded ? (
          <ChevronUp className="w-4 h-4 text-pgn-text-muted flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-pgn-text-muted flex-shrink-0" />
        )}
      </div>
    </div>
  )
}
