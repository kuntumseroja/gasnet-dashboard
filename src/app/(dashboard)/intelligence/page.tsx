'use client'

import { SentimentChart } from '@/components/charts/SentimentChart'
import { newsItems, sentimentTrend } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { Globe, TrendingUp, TrendingDown, Minus, ExternalLink, BarChart2 } from 'lucide-react'

const topicCloud = [
  { topic: 'harga gas', weight: 85, sentiment: -0.3 },
  { topic: 'PGN dividend', weight: 72, sentiment: 0.8 },
  { topic: 'HGBT regulation', weight: 68, sentiment: -0.4 },
  { topic: 'LNG import', weight: 55, sentiment: 0.1 },
  { topic: 'Pertamina expansion', weight: 50, sentiment: -0.2 },
  { topic: 'pipeline safety', weight: 45, sentiment: -0.1 },
  { topic: 'gas infrastructure', weight: 42, sentiment: 0.5 },
  { topic: 'energy transition', weight: 38, sentiment: 0.3 },
  { topic: 'subsidi gas', weight: 35, sentiment: -0.5 },
  { topic: 'natural gas demand', weight: 32, sentiment: 0.4 },
  { topic: 'BP Tangguh', weight: 30, sentiment: 0.7 },
  { topic: 'PGAS stock', weight: 28, sentiment: 0.2 },
]

const competitors = [
  { name: 'PGN (PGAS)', marketShare: 91, revenue: 3890, ebitdaMargin: 21.6, pe: 12.5, highlight: true },
  { name: 'Pertamina Gas', marketShare: 5, revenue: 1200, ebitdaMargin: 18.2, pe: 14.8, highlight: false },
  { name: 'Medco E&P Gas', marketShare: 2, revenue: 450, ebitdaMargin: 24.1, pe: 11.2, highlight: false },
  { name: 'Panca Amara', marketShare: 1, revenue: 180, ebitdaMargin: 15.5, pe: 16.3, highlight: false },
  { name: 'Others', marketShare: 1, revenue: 280, ebitdaMargin: 12.0, pe: 0, highlight: false },
]

export default function IntelligencePage() {
  const avgScore = sentimentTrend.reduce((a, s) => a + s.score, 0) / sentimentTrend.length

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-xl font-bold text-brand-navy">External Intelligence Hub</h1>
        <p className="text-sm text-pgn-text-secondary mt-0.5">
          Market intelligence, public sentiment, and competitive landscape
        </p>
      </div>

      {/* Sentiment Overview */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Overall Sentiment', value: avgScore > 0 ? 'Positive' : 'Negative', score: `${(avgScore * 100).toFixed(0)}/100`, color: avgScore > 0 ? 'text-brand-green' : 'text-brand-red' },
          { label: 'News Articles (7d)', value: '142', score: '64% positive', color: 'text-brand-blue' },
          { label: 'Social Media Posts', value: '3,847', score: '34% spike today', color: 'text-amber-500' },
          { label: 'Regulatory Alerts', value: '3', score: 'HGBT review active', color: 'text-brand-red' },
        ].map((stat) => (
          <div key={stat.label} className="pgn-card p-4">
            <span className="pgn-stat-label">{stat.label}</span>
            <div className={cn('pgn-stat-value mt-1', stat.color)}>{stat.value}</div>
            <span className="text-[10px] text-pgn-text-muted">{stat.score}</span>
          </div>
        ))}
      </div>

      {/* Sentiment Chart + Topic Cloud */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <SentimentChart />
        </div>
        <div className="col-span-5">
          <div className="pgn-card">
            <div className="pgn-card-header">
              <h3 className="text-sm font-semibold text-brand-navy">Topic Cloud</h3>
              <p className="text-xs text-pgn-text-muted mt-0.5">IndoBERT detected topics — weighted by frequency</p>
            </div>
            <div className="pgn-card-body">
              <div className="flex flex-wrap gap-2">
                {topicCloud.map((t) => (
                  <span
                    key={t.topic}
                    className={cn(
                      'px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer hover:shadow-sm',
                      t.sentiment > 0.3 ? 'bg-brand-green/5 border-brand-green/20 text-brand-green' :
                      t.sentiment < -0.2 ? 'bg-brand-red/5 border-brand-red/20 text-brand-red' :
                      'bg-pgn-card border-pgn-border text-pgn-text-secondary'
                    )}
                    style={{ fontSize: `${Math.max(10, Math.min(16, t.weight / 6))}px` }}
                  >
                    {t.topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center gap-2">
          <Globe className="w-4 h-4 text-brand-blue" />
          <h3 className="text-sm font-semibold text-brand-navy">Latest Intelligence Feed</h3>
        </div>
        <div className="divide-y divide-pgn-border">
          {newsItems.map((news) => (
            <div key={news.id} className="px-5 py-3 hover:bg-pgn-card/50 transition-colors">
              <div className="flex items-start gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5',
                  news.sentimentLabel === 'positive' ? 'bg-brand-green/10' :
                  news.sentimentLabel === 'negative' ? 'bg-brand-red/10' : 'bg-gray-100'
                )}>
                  {news.sentimentLabel === 'positive' ? <TrendingUp className="w-4 h-4 text-brand-green" /> :
                   news.sentimentLabel === 'negative' ? <TrendingDown className="w-4 h-4 text-brand-red" /> :
                   <Minus className="w-4 h-4 text-gray-400" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-pgn-text">{news.title}</h4>
                  <p className="text-xs text-pgn-text-secondary mt-1">{news.summary}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-pgn-text-muted">
                    <span className="font-medium">{news.source}</span>
                    <span>·</span>
                    <span>{new Date(news.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    <span className={cn('pgn-badge', {
                      'pgn-badge-success': news.sentimentLabel === 'positive',
                      'pgn-badge-critical': news.sentimentLabel === 'negative',
                      'pgn-badge-info': news.sentimentLabel === 'neutral',
                    })}>
                      {news.sentimentLabel} ({(news.sentiment * 100).toFixed(0)})
                    </span>
                    <span className="pgn-badge bg-pgn-card text-pgn-text-secondary">{news.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Benchmark */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-brand-blue" />
          <h3 className="text-sm font-semibold text-brand-navy">Competitive Benchmark</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-pgn-border">
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Company</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Market Share</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Revenue ($M)</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">EBITDA Margin</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">P/E Ratio</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => (
                <tr key={c.name} className={cn('border-b border-pgn-border/50', c.highlight && 'bg-brand-blue/5')}>
                  <td className={cn('py-3 px-4 font-medium', c.highlight ? 'text-brand-blue' : 'text-pgn-text')}>
                    {c.name}
                    {c.highlight && <span className="ml-1 text-[9px] text-brand-blue">(You)</span>}
                  </td>
                  <td className="py-3 px-4 text-right">{c.marketShare}%</td>
                  <td className="py-3 px-4 text-right">${c.revenue.toLocaleString()}M</td>
                  <td className="py-3 px-4 text-right">{c.ebitdaMargin}%</td>
                  <td className="py-3 px-4 text-right">{c.pe > 0 ? `${c.pe}x` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
