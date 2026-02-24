'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  DollarSign,
  Activity,
  Globe,
  ShieldAlert,
  Truck,
  FileText,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Executive Gallery', icon: LayoutDashboard },
  { href: '/finance', label: 'Financial Health', icon: DollarSign },
  { href: '/finance/scenarios', label: 'Scenario Simulator', icon: Sliders },
  { href: '/operations', label: 'Operations', icon: Activity },
  { href: '/supply-chain', label: 'Supply Chain', icon: Truck },
  { href: '/intelligence', label: 'Intelligence Hub', icon: Globe },
  { href: '/risk', label: 'Risk & Compliance', icon: ShieldAlert },
  { href: '/briefing', label: 'AI Morning Brief', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen border-r border-pgn-border bg-white transition-all duration-300 flex flex-col',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-5 border-b border-pgn-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-navy">
          <Flame className="w-5 h-5 text-brand-lime" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-brand-navy tracking-wide">GASNET</span>
            <span className="text-[10px] text-pgn-text-muted tracking-wider">GARUDA EYE</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-brand-blue/10 text-brand-blue'
                  : 'text-pgn-text-secondary hover:bg-pgn-card hover:text-pgn-text',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn('w-[18px] h-[18px] flex-shrink-0', isActive && 'text-brand-blue')} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Collapse Button */}
      <div className="px-3 py-3 border-t border-pgn-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full py-2 rounded-lg text-pgn-text-muted hover:bg-pgn-card transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Status Indicator */}
      {!collapsed && (
        <div className="px-4 py-3 border-t border-pgn-border">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
            </span>
            <span className="text-[10px] text-pgn-text-muted">All systems operational</span>
          </div>
        </div>
      )}
    </aside>
  )
}
