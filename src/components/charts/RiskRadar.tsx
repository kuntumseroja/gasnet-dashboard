'use client'

import { riskDimensions } from '@/lib/dummy-data'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts'

export function RiskRadar() {
  const data = riskDimensions.map((d) => ({
    dimension: d.dimension,
    score: d.score,
    fullMark: 100,
  }))

  const compositeScore = Math.round(
    riskDimensions.reduce((acc, d) => acc + d.score, 0) / riskDimensions.length
  )

  return (
    <div className="pgn-card">
      <div className="pgn-card-header flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-brand-navy">Risk Radar</h3>
          <p className="text-xs text-pgn-text-muted mt-0.5">6-dimension composite risk assessment</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-pgn-text-muted">Composite:</span>
          <span className={`text-lg font-bold ${compositeScore > 60 ? 'text-brand-red' : compositeScore > 40 ? 'text-amber-500' : 'text-brand-green'}`}>
            {compositeScore}
          </span>
          <span className="text-xs text-pgn-text-muted">/100</span>
        </div>
      </div>
      <div className="pgn-card-body">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
              <PolarGrid stroke="#EAEAEA" />
              <PolarAngleAxis
                dataKey="dimension"
                tick={{ fontSize: 10, fill: '#424242' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 9, fill: '#787474' }}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #EAEAEA',
                  borderRadius: '8px',
                  fontSize: '11px',
                }}
              />
              <Radar
                name="Risk Score"
                dataKey="score"
                stroke="#0069B4"
                fill="#0069B4"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Legend */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          {riskDimensions.map((d) => (
            <div key={d.dimension} className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${d.score > 60 ? 'bg-brand-red' : d.score > 40 ? 'bg-amber-400' : 'bg-brand-green'}`} />
              <span className="text-pgn-text-secondary truncate">{d.dimension}</span>
              <span className="font-semibold text-pgn-text ml-auto">{d.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
