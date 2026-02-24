'use client'

import { useState, useMemo } from 'react'
import { calculateScenario } from '@/lib/dummy-data'
import { Bar, BarChart, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line } from 'recharts'
import { Sliders, Sparkles, Download, ArrowRight } from 'lucide-react'

export default function ScenarioSimulator() {
  const [hgbtPrice, setHgbtPrice] = useState(6.75)
  const scenario = useMemo(() => calculateScenario(hgbtPrice), [hgbtPrice])
  const baseScenario = useMemo(() => calculateScenario(6.75), [])

  const comparisonData = [
    { metric: 'Revenue', base: baseScenario.revenue, scenario: scenario.revenue, unit: '$M' },
    { metric: 'EBITDA', base: baseScenario.ebitda, scenario: scenario.ebitda, unit: '$M' },
    { metric: 'Net Profit', base: baseScenario.netProfit, scenario: scenario.netProfit, unit: '$M' },
    { metric: 'FCF', base: baseScenario.fcf, scenario: scenario.fcf, unit: '$M' },
  ]

  const sensitivityData = Array.from({ length: 21 }, (_, i) => {
    const price = 5.5 + i * 0.1
    const s = calculateScenario(price)
    return { price: price.toFixed(1), ebitdaMargin: s.ebitdaMargin, netMargin: s.netMargin }
  })

  const [showNarrative, setShowNarrative] = useState(false)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-brand-navy">HGBT Scenario Simulator</h1>
          <p className="text-sm text-pgn-text-secondary mt-0.5">
            Model impact of government-regulated gas price changes on PGN financials
          </p>
        </div>
        <button className="pgn-btn-primary text-xs gap-2">
          <Download className="w-3.5 h-3.5" />
          Export to PPTX
        </button>
      </div>

      {/* HGBT Slider */}
      <div className="pgn-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sliders className="w-5 h-5 text-brand-blue" />
          <h3 className="text-sm font-semibold text-brand-navy">HGBT Price Adjustment</h3>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-pgn-text-muted">$5.50/MMBtu</span>
              <span className="text-lg font-bold text-brand-navy">${hgbtPrice.toFixed(2)}/MMBtu</span>
              <span className="text-xs text-pgn-text-muted">$7.50/MMBtu</span>
            </div>
            <input
              type="range"
              min="5.5"
              max="7.5"
              step="0.05"
              value={hgbtPrice}
              onChange={(e) => setHgbtPrice(parseFloat(e.target.value))}
              className="w-full h-2 bg-pgn-border rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:bg-brand-blue [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-[9px] text-brand-red font-medium">Bear Case</span>
              <span className="text-[9px] text-pgn-text-muted">Current: $6.75</span>
              <span className="text-[9px] text-brand-green font-medium">Bull Case</span>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-col gap-2">
            {[
              { label: 'Stress', price: 6.0, color: 'text-brand-red' },
              { label: 'Current', price: 6.75, color: 'text-brand-blue' },
              { label: 'Upside', price: 7.25, color: 'text-brand-green' },
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => setHgbtPrice(preset.price)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border border-pgn-border hover:bg-pgn-card transition-colors ${preset.color}`}
              >
                {preset.label} ${preset.price}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Impact KPIs */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Revenue', value: `$${scenario.revenue}M`, change: ((scenario.revenue - baseScenario.revenue) / baseScenario.revenue * 100).toFixed(1) },
          { label: 'EBITDA', value: `$${scenario.ebitda}M`, change: ((scenario.ebitda - baseScenario.ebitda) / baseScenario.ebitda * 100).toFixed(1) },
          { label: 'EBITDA Margin', value: `${scenario.ebitdaMargin}%`, change: (scenario.ebitdaMargin - baseScenario.ebitdaMargin).toFixed(1) },
          { label: 'Net Profit', value: `$${scenario.netProfit}M`, change: ((scenario.netProfit - baseScenario.netProfit) / baseScenario.netProfit * 100).toFixed(1) },
          { label: 'Free Cash Flow', value: `$${scenario.fcf}M`, change: ((scenario.fcf - baseScenario.fcf) / baseScenario.fcf * 100).toFixed(1) },
        ].map((kpi) => {
          const changeNum = parseFloat(kpi.change)
          return (
            <div key={kpi.label} className="pgn-card p-4">
              <span className="pgn-stat-label">{kpi.label}</span>
              <div className="pgn-stat-value mt-1">{kpi.value}</div>
              <div className={`text-xs font-semibold mt-1 ${changeNum > 0 ? 'text-brand-green' : changeNum < 0 ? 'text-brand-red' : 'text-pgn-text-muted'}`}>
                {changeNum > 0 ? '+' : ''}{kpi.change}{kpi.label.includes('Margin') ? 'pp' : '%'} vs base
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Side-by-Side Comparison */}
        <div className="pgn-card">
          <div className="pgn-card-header">
            <h3 className="text-sm font-semibold text-brand-navy">Base vs Scenario Comparison</h3>
            <p className="text-xs text-pgn-text-muted mt-0.5">HGBT ${hgbtPrice.toFixed(2)} impact on key metrics</p>
          </div>
          <div className="pgn-card-body">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" vertical={false} />
                  <XAxis dataKey="metric" tick={{ fontSize: 11, fill: '#424242' }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#787474' }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="base" name="Base Case" fill="#0069B4" radius={[4, 4, 0, 0]} barSize={30} fillOpacity={0.3} />
                  <Bar dataKey="scenario" name="Scenario" fill="#0069B4" radius={[4, 4, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Sensitivity Curve */}
        <div className="pgn-card">
          <div className="pgn-card-header">
            <h3 className="text-sm font-semibold text-brand-navy">Margin Sensitivity Curve</h3>
            <p className="text-xs text-pgn-text-muted mt-0.5">EBITDA & Net Margin vs HGBT price ($5.50-$7.50)</p>
          </div>
          <div className="pgn-card-body">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensitivityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EAEAEA" vertical={false} />
                  <XAxis dataKey="price" tick={{ fontSize: 10, fill: '#787474' }} tickLine={false} axisLine={false} label={{ value: 'HGBT $/MMBtu', position: 'bottom', fontSize: 10, fill: '#787474' }} />
                  <YAxis tick={{ fontSize: 10, fill: '#787474' }} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #EAEAEA', borderRadius: '8px', fontSize: '11px' }} />
                  <Line type="monotone" dataKey="ebitdaMargin" name="EBITDA Margin" stroke="#0069B4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="netMargin" name="Net Margin" stroke="#C8D300" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* LLM Narrative */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-lime" />
            <h3 className="text-sm font-semibold text-brand-navy">AI Scenario Narrative</h3>
          </div>
          <button
            onClick={() => setShowNarrative(!showNarrative)}
            className="pgn-btn-primary text-xs gap-1"
          >
            <Sparkles className="w-3 h-3" />
            {showNarrative ? 'Regenerate' : 'Generate Narrative'}
          </button>
        </div>
        {showNarrative && (
          <div className="pgn-card-body animate-fade-in">
            <div className="prose prose-sm max-w-none text-xs leading-relaxed text-pgn-text-secondary">
              <p>
                <strong>Scenario Analysis: HGBT at ${hgbtPrice.toFixed(2)}/MMBtu</strong>
              </p>
              <p>
                At the modeled HGBT price of ${hgbtPrice.toFixed(2)}/MMBtu
                {hgbtPrice < 6.75 ? ', representing a downward pricing pressure scenario' : hgbtPrice > 6.75 ? ', representing an upside pricing scenario' : ' (current level)'},
                PGN&apos;s financial performance would show:
              </p>
              <ul>
                <li>Revenue {scenario.revenue > baseScenario.revenue ? 'increases' : 'decreases'} to US${scenario.revenue}M ({((scenario.revenue - baseScenario.revenue) / baseScenario.revenue * 100).toFixed(1)}% vs base)</li>
                <li>EBITDA margin {scenario.ebitdaMargin > baseScenario.ebitdaMargin ? 'improves' : 'compresses'} to {scenario.ebitdaMargin}% from {baseScenario.ebitdaMargin}%</li>
                <li>Net profit {scenario.netProfit > baseScenario.netProfit ? 'rises' : 'falls'} to US${scenario.netProfit}M</li>
                <li>Free cash flow {scenario.fcf > baseScenario.fcf ? 'strengthens' : 'weakens'} to US${scenario.fcf}M</li>
              </ul>
              {hgbtPrice < 6.5 && (
                <p className="text-brand-red font-medium">
                  Warning: At this price level, EBITDA margin drops below 20% and dividend sustainability at 9.3% yield becomes questionable.
                  Recommend accelerating LNG volume growth and virtual pipeline expansion to offset regulated price compression.
                </p>
              )}
              {hgbtPrice > 7.0 && (
                <p className="text-brand-green font-medium">
                  Positive outlook: This pricing scenario enables PGN to restore EBITDA margins toward FY2024 levels,
                  supporting continued dividend payments and CAPEX acceleration on the Cirebon-Semarang extension.
                </p>
              )}
              <p className="text-pgn-text-muted italic">
                Generated by GASNET AI · Sources: Financial Model v3.2, HGBT Pricing Database, SAP Financial Module
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
