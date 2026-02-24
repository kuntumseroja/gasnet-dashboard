'use client'

import { pipelineSegments } from '@/lib/dummy-data'
import type { PipelineSegment } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { MapPin, Activity } from 'lucide-react'
import { useState } from 'react'

const statusColors = {
  healthy: '#87AC4A',
  warning: '#F59E0B',
  critical: '#E30613',
}

export function PipelineMap({ className }: { className?: string }) {
  const [selected, setSelected] = useState<PipelineSegment | null>(null)

  return (
    <div className={cn('pgn-card', className)}>
      <div className="pgn-card-header flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-brand-navy">Pipeline Network</h3>
          <p className="text-xs text-pgn-text-muted mt-0.5">13,581 km — Indonesia gas infrastructure</p>
        </div>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-green"></span>Healthy</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span>Warning</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-red"></span>Critical</span>
        </div>
      </div>
      <div className="pgn-card-body relative">
        {/* SVG Map of Indonesia */}
        <div className="relative h-[300px] bg-gradient-to-b from-blue-50/50 to-white rounded-lg overflow-hidden border border-pgn-border">
          <svg viewBox="-10 -15 145 60" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Indonesia simplified outline */}
            <path
              d="M5,20 Q15,15 25,18 Q35,12 50,15 Q60,10 75,14 Q85,12 95,16 Q105,14 115,18 Q120,22 125,20 Q130,25 120,28 Q110,32 100,28 Q90,30 80,26 Q70,28 60,24 Q50,28 40,24 Q30,28 20,24 Q10,26 5,22 Z"
              fill="#E8F0FE"
              stroke="#BFDBFE"
              strokeWidth="0.5"
              opacity="0.5"
            />
            {/* Sumatra */}
            <path d="M8,10 Q15,5 22,12 Q18,22 12,25 Q5,20 8,10Z" fill="#E8F0FE" stroke="#BFDBFE" strokeWidth="0.3" />
            {/* Java */}
            <path d="M32,30 Q50,26 70,28 Q72,32 65,34 Q50,35 35,34 Q30,33 32,30Z" fill="#E8F0FE" stroke="#BFDBFE" strokeWidth="0.3" />
            {/* Kalimantan */}
            <path d="M42,5 Q55,2 65,8 Q68,18 60,22 Q50,24 42,18 Q38,12 42,5Z" fill="#E8F0FE" stroke="#BFDBFE" strokeWidth="0.3" />
            {/* Sulawesi */}
            <path d="M72,5 Q78,2 82,8 Q80,15 76,18 Q72,12 72,5Z" fill="#E8F0FE" stroke="#BFDBFE" strokeWidth="0.3" />

            {/* Pipeline connections */}
            {pipelineSegments.map((seg, i) => {
              const nextSeg = pipelineSegments[(i + 1) % pipelineSegments.length]
              const x1 = ((seg.lng - 95) / 35) * 130 + 5
              const y1 = ((-seg.lat + 8) / 20) * 50 + 2
              const x2 = ((nextSeg.lng - 95) / 35) * 130 + 5
              const y2 = ((-nextSeg.lat + 8) / 20) * 50 + 2
              if (Math.abs(x1 - x2) > 50) return null
              return (
                <line
                  key={`line-${i}`}
                  x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={statusColors[seg.status]}
                  strokeWidth="0.8"
                  opacity="0.4"
                  strokeDasharray={seg.status === 'warning' ? '2 1' : 'none'}
                />
              )
            })}

            {/* Pipeline nodes */}
            {pipelineSegments.map((seg) => {
              const x = ((seg.lng - 95) / 35) * 130 + 5
              const y = ((-seg.lat + 8) / 20) * 50 + 2
              return (
                <g
                  key={seg.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(selected?.id === seg.id ? null : seg)}
                >
                  <circle cx={x} cy={y} r="3.5" fill="white" stroke={statusColors[seg.status]} strokeWidth="1.2" />
                  <circle cx={x} cy={y} r="1.5" fill={statusColors[seg.status]} />
                  {seg.status === 'critical' && (
                    <circle cx={x} cy={y} r="5" fill="none" stroke="#E30613" strokeWidth="0.5" opacity="0.5">
                      <animate attributeName="r" values="3.5;7;3.5" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <text x={x} y={y - 5} textAnchor="middle" fontSize="2.5" fill="#424242" fontWeight="500">
                    {seg.name.split(' ')[0]}
                  </text>
                </g>
              )
            })}
          </svg>

          {/* Selected segment detail */}
          {selected && (
            <div className="absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-sm border border-pgn-border rounded-lg p-3 shadow-lg animate-slide-up">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={cn('w-2 h-2 rounded-full', {
                      'bg-brand-green': selected.status === 'healthy',
                      'bg-amber-400': selected.status === 'warning',
                      'bg-brand-red': selected.status === 'critical',
                    })} />
                    <span className="text-sm font-semibold text-brand-navy">{selected.name}</span>
                  </div>
                  <p className="text-[10px] text-pgn-text-muted mt-1">{selected.lengthKm} km · {selected.id}</p>
                </div>
                <span className={cn('pgn-badge', {
                  'pgn-badge-success': selected.status === 'healthy',
                  'pgn-badge-warning': selected.status === 'warning',
                  'pgn-badge-critical': selected.status === 'critical',
                })}>
                  {selected.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-2">
                <div>
                  <span className="text-[9px] text-pgn-text-muted uppercase">Pressure</span>
                  <span className="block text-sm font-semibold text-brand-navy">{selected.pressure}%</span>
                </div>
                <div>
                  <span className="text-[9px] text-pgn-text-muted uppercase">Flow</span>
                  <span className="block text-sm font-semibold text-brand-navy">{selected.flow} MMSCFD</span>
                </div>
                <div>
                  <span className="text-[9px] text-pgn-text-muted uppercase">Availability</span>
                  <span className="block text-sm font-semibold text-brand-navy">{selected.availability}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
