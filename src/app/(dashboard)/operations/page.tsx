'use client'

import { PipelineMap } from '@/components/PipelineMap'
import { AlertFeed } from '@/components/AlertFeed'
import { pipelineSegments } from '@/lib/dummy-data'
import { cn } from '@/lib/utils'
import { Activity, Gauge, Truck, Anchor, AlertTriangle } from 'lucide-react'

const supplyDemandData = [
  { region: 'West Java', supply: 520, demand: 495, balance: 25, status: 'surplus' },
  { region: 'East Java', supply: 380, demand: 375, balance: 5, status: 'tight' },
  { region: 'South Sumatera', supply: 445, demand: 320, balance: 125, status: 'surplus' },
  { region: 'Kalimantan', supply: 290, demand: 280, balance: 10, status: 'tight' },
  { region: 'Batam/Riau', supply: 145, demand: 140, balance: 5, status: 'tight' },
  { region: 'Arun/NAD', supply: 237, demand: 200, balance: 37, status: 'surplus' },
]

const lngCargos = [
  { vessel: 'LNG Tangguh Sago', origin: 'Tangguh, Papua', destination: 'Arun Terminal', eta: '2025-02-27', volume: 65, status: 'en-route' },
  { vessel: 'Golar Glacier', origin: 'Ras Laffan, Qatar', destination: 'FSRU Lampung', eta: '2025-03-05', volume: 77, status: 'en-route' },
  { vessel: 'Cheniere Sabine', origin: 'Sabine Pass, US', destination: 'FSRU Jakarta', eta: '2025-03-12', volume: 42, status: 'loading' },
  { vessel: 'Pertamina LNG', origin: 'Bontang, Kaltim', destination: 'Cilegon Terminal', eta: '2025-02-28', volume: 55, status: 'en-route' },
]

export default function OperationsPage() {
  const healthyCount = pipelineSegments.filter((s) => s.status === 'healthy').length
  const warningCount = pipelineSegments.filter((s) => s.status === 'warning').length
  const criticalCount = pipelineSegments.filter((s) => s.status === 'critical').length

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-brand-navy">Operations Command</h1>
        <p className="text-sm text-pgn-text-secondary mt-0.5">
          Real-time pipeline network monitoring — 13,581 km infrastructure
        </p>
      </div>

      {/* Status Tiles */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: 'Total Network', value: '13,581 km', icon: Activity, color: 'bg-brand-blue/10 text-brand-blue' },
          { label: 'Healthy Segments', value: `${healthyCount}/${pipelineSegments.length}`, icon: Gauge, color: 'bg-brand-green/10 text-brand-green' },
          { label: 'Warning', value: `${warningCount}`, icon: AlertTriangle, color: 'bg-amber-50 text-amber-600' },
          { label: 'Critical', value: `${criticalCount}`, icon: AlertTriangle, color: 'bg-brand-red/10 text-brand-red' },
          { label: 'Availability', value: '99.0%', icon: Gauge, color: 'bg-brand-blue/10 text-brand-blue' },
        ].map((tile) => (
          <div key={tile.label} className="pgn-card p-4">
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', tile.color)}>
              <tile.icon className="w-4 h-4" />
            </div>
            <span className="pgn-stat-label">{tile.label}</span>
            <div className="pgn-stat-value mt-1">{tile.value}</div>
          </div>
        ))}
      </div>

      {/* Pipeline Map + Alerts */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <PipelineMap />
        </div>
        <div className="col-span-4">
          <AlertFeed limit={5} />
        </div>
      </div>

      {/* Supply-Demand Balance */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-brand-navy">National Gas Supply-Demand Balance</h3>
            <p className="text-xs text-pgn-text-muted mt-0.5">NDC dispatch overview by region (MMSCFD)</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-pgn-border">
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Region</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Supply</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Demand</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Balance</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Utilization</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {supplyDemandData.map((row) => (
                <tr key={row.region} className="border-b border-pgn-border/50 hover:bg-pgn-card/50">
                  <td className="py-3 px-4 font-medium text-pgn-text">{row.region}</td>
                  <td className="py-3 px-4 text-right text-pgn-text">{row.supply}</td>
                  <td className="py-3 px-4 text-right text-pgn-text">{row.demand}</td>
                  <td className="py-3 px-4 text-right font-medium text-brand-green">+{row.balance}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-pgn-border rounded-full overflow-hidden">
                        <div
                          className={cn('h-full rounded-full', {
                            'bg-brand-green': row.status === 'surplus',
                            'bg-amber-400': row.status === 'tight',
                          })}
                          style={{ width: `${(row.demand / row.supply) * 100}%` }}
                        />
                      </div>
                      <span className="text-pgn-text-muted">{Math.round((row.demand / row.supply) * 100)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn('pgn-badge', {
                      'pgn-badge-success': row.status === 'surplus',
                      'pgn-badge-warning': row.status === 'tight',
                    })}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* LNG Cargo Tracker */}
      <div className="pgn-card">
        <div className="pgn-card-header flex items-center gap-2">
          <Anchor className="w-4 h-4 text-brand-blue" />
          <div>
            <h3 className="text-sm font-semibold text-brand-navy">LNG Cargo Tracker</h3>
            <p className="text-xs text-pgn-text-muted mt-0.5">Active shipments to PGN terminals</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-pgn-border">
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Vessel</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Origin</th>
                <th className="text-left py-3 px-4 font-medium text-pgn-text-secondary">Destination</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">ETA</th>
                <th className="text-right py-3 px-4 font-medium text-pgn-text-secondary">Volume (BBTUD)</th>
                <th className="text-center py-3 px-4 font-medium text-pgn-text-secondary">Status</th>
              </tr>
            </thead>
            <tbody>
              {lngCargos.map((cargo) => (
                <tr key={cargo.vessel} className="border-b border-pgn-border/50 hover:bg-pgn-card/50">
                  <td className="py-3 px-4 font-medium text-pgn-text flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-brand-blue" />
                    {cargo.vessel}
                  </td>
                  <td className="py-3 px-4 text-pgn-text-secondary">{cargo.origin}</td>
                  <td className="py-3 px-4 text-pgn-text">{cargo.destination}</td>
                  <td className="py-3 px-4 text-center text-pgn-text">{cargo.eta}</td>
                  <td className="py-3 px-4 text-right font-medium text-pgn-text">{cargo.volume}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={cn('pgn-badge', {
                      'pgn-badge-info': cargo.status === 'en-route',
                      'pgn-badge-warning': cargo.status === 'loading',
                    })}>
                      {cargo.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
