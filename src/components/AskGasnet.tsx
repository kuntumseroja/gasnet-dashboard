'use client'

import { cn } from '@/lib/utils'
import { demoConversation } from '@/lib/dummy-data'
import type { ConversationMessage } from '@/lib/dummy-data'
import { X, Send, Cpu, User, Sparkles, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface AskGasnetProps {
  open: boolean
  onClose: () => void
}

const suggestedQuestions = [
  'What is driving the EBITDA margin decline?',
  'Show me the 90-day cash forecast',
  'What are the top 3 risks this week?',
  'Summarize the Grissik-Batam pipeline issue',
  'Run HGBT scenario at $6.0/MMBtu',
]

export function AskGasnet({ open, onClose }: AskGasnetProps) {
  const [messages, setMessages] = useState<ConversationMessage[]>(demoConversation)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: ConversationMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMsg: ConversationMessage = {
        role: 'assistant',
        content: generateResponse(input),
        timestamp: new Date().toISOString(),
        sources: ['GASNET Analytics Engine', 'PGN Financial Database'],
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500 + Math.random() * 1500)
  }

  return (
    <div
      className={cn(
        'fixed top-0 right-0 z-50 h-screen w-[420px] bg-white border-l border-pgn-border shadow-2xl transition-transform duration-300',
        open ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-pgn-border bg-brand-navy">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-lime/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-brand-lime" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white">Ask GASNET</span>
            <span className="block text-[10px] text-white/60">AI Business Analyst · Powered by Claude</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ height: 'calc(100vh - 130px)' }}>
        {/* Welcome */}
        {messages.length <= 2 && (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-12 h-12 rounded-xl bg-brand-navy/5 flex items-center justify-center mx-auto mb-3">
              <Cpu className="w-6 h-6 text-brand-blue" />
            </div>
            <h4 className="text-sm font-semibold text-brand-navy">GASNET AI Analyst</h4>
            <p className="text-xs text-pgn-text-muted mt-1 max-w-[280px] mx-auto">
              Ask me anything about PGN&apos;s financials, operations, risk, or market intelligence. I have access to real-time data.
            </p>
            <div className="mt-4 space-y-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q)
                  }}
                  className="block w-full text-left px-3 py-2 text-xs text-brand-blue bg-brand-blue/5 rounded-lg hover:bg-brand-blue/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex gap-2 animate-fade-in',
              msg.role === 'user' ? 'flex-row-reverse' : ''
            )}
          >
            <div className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0',
              msg.role === 'user' ? 'bg-brand-blue/10' : 'bg-brand-navy/10'
            )}>
              {msg.role === 'user' ? (
                <User className="w-3 h-3 text-brand-blue" />
              ) : (
                <Sparkles className="w-3 h-3 text-brand-navy" />
              )}
            </div>
            <div className={cn(
              'max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed',
              msg.role === 'user'
                ? 'bg-brand-blue text-white rounded-tr-sm'
                : 'bg-pgn-card border border-pgn-border text-pgn-text rounded-tl-sm'
            )}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              {msg.sources && (
                <div className="mt-2 pt-2 border-t border-pgn-border/50">
                  <span className="text-[9px] text-pgn-text-muted">Sources: {msg.sources.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 animate-fade-in">
            <div className="w-6 h-6 rounded-full bg-brand-navy/10 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-brand-navy" />
            </div>
            <div className="bg-pgn-card border border-pgn-border rounded-xl rounded-tl-sm px-3 py-2">
              <Loader2 className="w-4 h-4 text-brand-blue animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-pgn-border bg-white">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask GASNET anything..."
            className="flex-1 px-3 py-2 text-sm bg-pgn-card border border-pgn-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue/30"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-brand-blue text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

function generateResponse(query: string): string {
  const q = query.toLowerCase()

  if (q.includes('cash') || q.includes('forecast')) {
    return `**Cash Position: US$1,546M** (Q1 2025)\n\n90-day AI forecast indicates cash declining to ~$1,420M by end of May 2025, primarily due to:\n\n1. **CAPEX disbursements** — $353M budget for 2026, front-loaded 40%\n2. **LNG procurement payments** — elevated spot pricing at $14.2/MMBtu\n3. **Debt service** — $78M interest + $120M principal due Q2\n\n**Risk Level: MODERATE** — Cash remains well above $1B minimum threshold. FCF generation of $205M/quarter provides adequate buffer.\n\n*Sources: Treasury Management System, GASNET Cash Forecast Model*`
  }

  if (q.includes('risk')) {
    return `**Top 3 Risks This Week:**\n\n1. **Market & Pricing (Score: 72/100)** 🔴\n   HGBT 2026 pricing review could compress margins by additional 2-3pp. JKM at $14.2/MMBtu increases procurement costs.\n\n2. **Regulatory (Score: 58/100)** 🟡\n   Government signaling potential HGBT formula change. Estimated revenue impact: -$200M+ if price reduced to $6.0/MMBtu.\n\n3. **Geopolitical (Score: 48/100)** 🟡\n   Natuna Sea monitoring stable. Tropical depression forming may affect LNG cargo routes from Qatar.\n\n**Composite Risk Score: 47/100** (Moderate)\n\n*Sources: Risk Assessment Engine, Market Intelligence Feed*`
  }

  if (q.includes('grissik') || q.includes('pipeline')) {
    return `**Grissik-Batam Pipeline Alert Summary:**\n\nSensor #SN-4821 at KP-247 detected a **12% pressure drop** below normal operating parameters at 05:45 WIB today.\n\n**Root Cause Analysis:**\n- TerraMind satellite imagery shows **potential land subsidence** in the pipeline corridor\n- Subsidence estimated at 15-20cm based on InSAR differential analysis\n- No gas leak detected by secondary sensors\n\n**Impact:**\n- Flow reduced from 320 to 285 MMSCFD\n- Singapore delivery may be affected if not resolved within 72 hours\n\n**Recommendation:**\n- Deploy field inspection team within 48 hours ⚠️\n- Activate contingency supply via Kalija interconnector\n- Notify Singapore buyer of potential 10% volume reduction\n\n*Sources: SCADA System, TerraMind Satellite Analysis, Pipeline Management System*`
  }

  if (q.includes('scenario') || q.includes('hgbt') || q.includes('$6')) {
    return `**HGBT Scenario: $6.0/MMBtu (Stress Test)**\n\nIf HGBT drops from current $6.75 to $6.0/MMBtu:\n\n| Metric | Current | Scenario | Change |\n|--------|---------|----------|--------|\n| Revenue | $3,890M | $3,610M | -7.2% |\n| EBITDA | $840M | $714M | -15.0% |\n| EBITDA Margin | 21.6% | 19.8% | -1.8pp |\n| Net Profit | $238M | $194M | -18.5% |\n| FCF | $205M | $170M | -17.1% |\n\n**Key Insight:** At $6.0/MMBtu, EBITDA margin drops below 20% for first time. Dividend sustainability at 9.3% yield becomes questionable.\n\n**Mitigation:** Accelerate LNG volume growth (+39% regas) and virtual pipeline expansion to offset regulated price compression.\n\n*Sources: GASNET Scenario Engine, Financial Model v3.2*`
  }

  return `Based on my analysis of PGN's current data:\n\n${query}\n\nI've queried our databases and models to provide a comprehensive answer. Key findings indicate that PGN's operational metrics remain within target ranges, though margin pressure from HGBT pricing and LNG procurement costs continues to be the primary concern.\n\nWould you like me to drill deeper into any specific area?\n\n*Sources: GASNET Analytics Engine, PGN Financial Database*`
}
