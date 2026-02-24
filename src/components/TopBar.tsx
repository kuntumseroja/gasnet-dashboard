'use client'

import { Bell, Search, Globe, User, MessageSquare } from 'lucide-react'
import { useState } from 'react'

interface TopBarProps {
  onOpenChat: () => void
}

export function TopBar({ onOpenChat }: TopBarProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-md border-b border-pgn-border flex items-center justify-between px-6">
      {/* Left: Page Context */}
      <div className="flex items-center gap-4">
        <div className="text-xs text-pgn-text-muted">
          Last updated: <span className="text-pgn-text-secondary font-medium">25 Feb 2025, 09:15 WIB</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-green"></span>
          </span>
          <span className="text-xs text-brand-green font-medium">LIVE</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        {searchOpen ? (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pgn-text-muted" />
            <input
              autoFocus
              placeholder="Ask GASNET or search..."
              className="w-64 pl-9 pr-3 py-1.5 text-sm bg-pgn-card border border-pgn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
              onBlur={() => setSearchOpen(false)}
            />
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 rounded-lg text-pgn-text-secondary hover:bg-pgn-card transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        )}

        {/* Language Toggle */}
        <button className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium text-pgn-text-secondary hover:bg-pgn-card transition-colors">
          <Globe className="w-3.5 h-3.5" />
          EN
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-pgn-text-secondary hover:bg-pgn-card transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
          </span>
        </button>

        {/* Ask GASNET */}
        <button
          onClick={onOpenChat}
          className="flex items-center gap-2 px-3 py-1.5 bg-brand-navy text-white rounded-lg text-xs font-medium hover:bg-brand-navy/90 transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          Ask GASNET
        </button>

        {/* User */}
        <div className="flex items-center gap-2 pl-2 ml-1 border-l border-pgn-border">
          <div className="w-7 h-7 rounded-full bg-brand-blue/10 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-brand-blue" />
          </div>
          <div className="hidden lg:flex flex-col">
            <span className="text-xs font-medium text-pgn-text">Arief Kurnia Risdianto</span>
            <span className="text-[10px] text-pgn-text-muted">Dirut PGN</span>
          </div>
        </div>
      </div>
    </header>
  )
}
