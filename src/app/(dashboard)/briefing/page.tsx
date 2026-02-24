'use client'

import { morningBrief } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { Sparkles, Clock, Globe, RefreshCw, Download, AlertTriangle, TrendingUp, BarChart2, MessageSquare, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const priorityConfig = {
  high: { color: 'border-l-brand-red bg-brand-red/5', icon: AlertTriangle, iconColor: 'text-brand-red' },
  medium: { color: 'border-l-amber-500 bg-amber-50', icon: TrendingUp, iconColor: 'text-amber-600' },
  low: { color: 'border-l-brand-green bg-brand-green/5', icon: BarChart2, iconColor: 'text-brand-green' },
}

export default function BriefingPage() {
  const [language, setLanguage] = useState<'en' | 'id'>('en')
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = () => {
    setIsRegenerating(true)
    setTimeout(() => setIsRegenerating(false), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-brand-lime" />
            <h1 className="text-xl font-bold text-brand-navy">AI Morning Brief</h1>
          </div>
          <p className="text-sm text-pgn-text-secondary flex items-center gap-2">
            <Clock className="w-3.5 h-3.5" />
            Generated {new Date(morningBrief.generatedAt).toLocaleString('en-US', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
              hour: '2-digit', minute: '2-digit',
            })} WIB
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="flex items-center border border-pgn-border rounded-lg overflow-hidden">
            <button
              onClick={() => setLanguage('en')}
              className={cn('px-3 py-1.5 text-xs font-medium transition-colors', language === 'en' ? 'bg-brand-navy text-white' : 'text-pgn-text-secondary hover:bg-pgn-card')}
            >
              <Globe className="w-3 h-3 inline mr-1" />EN
            </button>
            <button
              onClick={() => setLanguage('id')}
              className={cn('px-3 py-1.5 text-xs font-medium transition-colors', language === 'id' ? 'bg-brand-navy text-white' : 'text-pgn-text-secondary hover:bg-pgn-card')}
            >
              ID
            </button>
          </div>
          <button
            onClick={handleRegenerate}
            className="pgn-btn-primary text-xs gap-1"
            disabled={isRegenerating}
          >
            <RefreshCw className={cn('w-3.5 h-3.5', isRegenerating && 'animate-spin')} />
            Regenerate
          </button>
          <button className="flex items-center gap-1 px-3 py-2 border border-pgn-border rounded-lg text-xs font-medium text-pgn-text-secondary hover:bg-pgn-card transition-colors">
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
        </div>
      </div>

      {/* Brief Hero Card */}
      <div className="pgn-card bg-gradient-to-br from-brand-navy via-brand-navy to-brand-navy/90 text-white p-6 border-0 gasnet-glow">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-lime/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-brand-lime" />
          </div>
          <div>
            <h2 className="text-lg font-bold mb-1">Good Morning, Pak Arief</h2>
            <p className="text-sm text-white/70 mb-3">
              Here is your executive intelligence brief for {new Date(morningBrief.date).toLocaleDateString('en-US', {
                weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
              })}
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-red/20 text-brand-red">
                <AlertTriangle className="w-3 h-3" />
                2 Critical Alerts
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                3 Warnings
              </span>
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-brand-green/20 text-brand-green">
                <CheckCircle className="w-3 h-3" />
                Operations Normal
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Brief Sections */}
      <div className="space-y-4">
        {morningBrief.sections.map((section, i) => {
          const config = priorityConfig[section.priority as keyof typeof priorityConfig]
          const Icon = config.icon

          return (
            <div
              key={section.title}
              className={cn('pgn-card border-l-4 overflow-hidden animate-slide-up', config.color)}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon className={cn('w-4 h-4', config.iconColor)} />
                  <h3 className="text-sm font-semibold text-brand-navy">{section.title}</h3>
                  <span className={cn('pgn-badge ml-auto', {
                    'pgn-badge-critical': section.priority === 'high',
                    'pgn-badge-warning': section.priority === 'medium',
                    'pgn-badge-success': section.priority === 'low',
                  })}>
                    {section.priority} priority
                  </span>
                </div>
                <div className="text-sm text-pgn-text-secondary leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Brief Footer */}
      <div className="pgn-card p-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-pgn-text-muted">
            <span className="font-medium">GASNET AI Brief v2.0</span> · Powered by Claude · Data freshness: &lt; 15 minutes
          </div>
          <div className="flex items-center gap-4 text-[10px] text-pgn-text-muted">
            <span>Sources: SAP Finance, SCADA, Market Feed, IndoBERT, TerraMind</span>
          </div>
        </div>
      </div>

      {/* Historical Briefs */}
      <div className="pgn-card">
        <div className="pgn-card-header">
          <h3 className="text-sm font-semibold text-brand-navy">Historical Briefs</h3>
        </div>
        <div className="divide-y divide-pgn-border">
          {['2025-02-24', '2025-02-23', '2025-02-22', '2025-02-21', '2025-02-20'].map((date) => (
            <button key={date} className="w-full flex items-center justify-between px-5 py-3 hover:bg-pgn-card/50 transition-colors text-left">
              <div>
                <span className="text-xs font-medium text-pgn-text">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
                <span className="block text-[10px] text-pgn-text-muted mt-0.5">06:00 WIB · 5 sections</span>
              </div>
              <span className="text-[10px] text-brand-blue font-medium">View →</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
