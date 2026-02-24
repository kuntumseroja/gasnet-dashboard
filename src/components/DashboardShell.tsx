'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { AskGasnet } from './AskGasnet'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <div className="pl-[240px] transition-all duration-300">
        <TopBar onOpenChat={() => setChatOpen(true)} />
        <main className="p-6">
          {children}
        </main>
      </div>
      <AskGasnet open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}
