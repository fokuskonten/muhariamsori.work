'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { getApiBaseUrl } from '@/lib/apiConfig'

const DEFAULT_MESSAGES = [
  {
    role: 'assistant',
    content: 'Selamat datang di portofolio resmi Muhari Amsori. Saya asisten interaktif di sini. Ada yang ingin Anda tanyakan mengenai riwayat kerja lapangan, aplikasi Android offline, pengalaman marketplace Shopee, atau kontak kerja sama?'
  }
]

const QUICK_CHIPS = [
  { label: 'Siapa Muhari Amsori?', query: 'Siapa Muhari Amsori dan apa keahlian utamanya?' },
  { label: 'Aplikasi Kasir Android', query: 'Aplikasi kasir Android apa saja yang dibuat oleh Muhari?' },
  { label: 'Toko Shopee Star Seller', query: 'Bagaimana rekam jejak toko online Shopee Star Seller Muhari?' },
  { label: 'Usia & Domisili', query: 'Berapa usia, status, dan domisili Muhari Amsori?' },
  { label: 'Kontak WhatsApp', query: 'Bagaimana cara menghubungi langsung Muhari Amsori?' },
]

export default function MuhariChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(DEFAULT_MESSAGES)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [thinkingPhase, setThinkingPhase] = useState(0)
  const [hasHydrated, setHasHydrated] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Muat riwayat pesan dari localStorage
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem('muhari_chat_history_v1')
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
        }
      }
      const savedIsOpen = localStorage.getItem('muhari_chat_open_v1')
      if (savedIsOpen === 'true') {
        setIsOpen(true)
      }
    } catch (e) {
      console.warn('Storage read error', e)
    }
    setHasHydrated(true)
  }, [])

  // Simpan riwayat chat ke localStorage
  useEffect(() => {
    if (!hasHydrated) return
    try {
      localStorage.setItem('muhari_chat_history_v1', JSON.stringify(messages))
      localStorage.setItem('muhari_chat_open_v1', isOpen ? 'true' : 'false')
    } catch (e) {
      console.warn('Storage write error', e)
    }
  }, [messages, isOpen, hasHydrated])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, thinkingPhase])

  // Efek rotasi status pemrosesan
  useEffect(() => {
    if (!isLoading) {
      setThinkingPhase(0)
      return
    }
    const timer1 = setTimeout(() => setThinkingPhase(1), 1000)
    const timer2 = setTimeout(() => setThinkingPhase(2), 2400)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [isLoading])

  const handleResetChat = () => {
    setMessages(DEFAULT_MESSAGES)
    setIsLoading(false)
    try {
      localStorage.removeItem('muhari_chat_history_v1')
    } catch (e) {}
  }

  const sendMessage = async (userText) => {
    if (!userText.trim() || isLoading) return

    const trimmed = userText.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: trimmed }])
    setIsLoading(true)

    try {
      const baseUrl = getApiBaseUrl()
      const aiUrl = `${baseUrl}/ai/muhari`

      // Kirim konteks 6 riwayat percakapan terakhir
      const recentHistory = messages
        .filter(m => (m.role === 'user' || m.role === 'assistant') && m.content)
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content }))

      const chatPayload = JSON.stringify({
        message: trimmed,
        history: recentHistory,
        pageContext: {
          url: typeof window !== 'undefined' ? window.location.pathname : '',
          title: typeof document !== 'undefined' ? document.title : ''
        }
      })

      let res = null
      try {
        res = await fetch(aiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: chatPayload
        })
      } catch (fetchErr) {
        console.warn('[MuhariChatWidget] Request primary gagal, mencoba failover:', fetchErr.message)
      }

      // Failover jika primary URL gagal
      if (!res || !res.ok) {
        const fallbackUrl = aiUrl.includes('localhost') || aiUrl.includes('127.0.0.1')
          ? 'http://localhost:8090/api/v1/ai/muhari'
          : 'https://api.fokuskonten.my.id/api/v1/ai/muhari'

        if (fallbackUrl !== aiUrl) {
          try {
            res = await fetch(fallbackUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: chatPayload
            })
          } catch (fbErr) {
            console.warn('[MuhariChatWidget] Failover juga gagal:', fbErr.message)
          }
        }
      }

      if (!res || !res.ok) throw new Error('AI Server Offline')

      const data = await res.json()
      setIsLoading(false)
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Maaf, belum ada respons yang dapat ditampilkan.' }
      ])
    } catch (err) {
      console.error('[MuhariChatWidget Error]:', err)
      setIsLoading(false)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Layanan konsultasi AI sedang sibuk. Anda dapat menghubungi langsung Muhari Amsori melalui [WhatsApp Resmi: 0895-2913-1131](https://wa.me/6289529131131).'
        }
      ])
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  const renderFormattedLine = (line, lineKey) => {
    const boldRegex = /\*\*(.*?)\*\*/g
    const subParts = []
    let last = 0
    let bMatch
    while ((bMatch = boldRegex.exec(line)) !== null) {
      if (bMatch.index > last) {
        subParts.push(line.substring(last, bMatch.index))
      }
      subParts.push(
        <strong key={`b-${lineKey}-${bMatch.index}`} className="font-semibold text-neutral-950">
          {bMatch[1]}
        </strong>
      )
      last = boldRegex.lastIndex
    }
    if (last < line.length) {
      subParts.push(line.substring(last))
    }
    return subParts
  }

  const renderMessageContent = (content) => {
    if (typeof content !== 'string') return content
    const regex = /\[(.*?)\]\((.*?)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index))
      }
      const linkText = match[1]
      const linkUrl = match[2]
      const isInternal = linkUrl.startsWith('/')

      parts.push(
        isInternal ? (
          <Link
            key={match.index}
            href={linkUrl}
            className="text-neutral-950 hover:text-neutral-700 underline font-semibold transition-colors"
          >
            {linkText}
          </Link>
        ) : (
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-950 hover:text-neutral-700 underline font-semibold transition-colors"
          >
            {linkText} ↗
          </a>
        )
      )
      lastIndex = regex.lastIndex
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex))
    }

    return parts.map((part, idx) => {
      if (typeof part === 'string') {
        return part.split('\n').map((line, lIdx, arr) => (
          <span key={`${idx}-${lIdx}`}>
            {renderFormattedLine(line, `${idx}-${lIdx}`)}
            {lIdx < arr.length - 1 && <br />}
          </span>
        ))
      }
      return part
    })
  }

  return (
    <>
      {/* Floating Button Asisten Muhari — Ukuran Proporsional 48px Identik FokusKonten */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 lg:bottom-12 right-4 lg:right-8 z-50 w-12 h-12 rounded-full bg-neutral-950 text-white shadow-lg shadow-black/35 hover:shadow-2xl hover:shadow-black/50 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 border border-neutral-800 cursor-pointer ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        aria-label="Tanya Asisten Profil Muhari Amsori"
        title="Chat Asisten Profil Resmi"
      >
        <div className="relative flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
          </svg>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-neutral-950" />
          </span>
        </div>
      </button>

      {/* Jendela Chat Ringkas Sesuai FokusKonten & STANDAR_UI_WEB_OFFICIAL.md */}
      <div
        className={`fixed bottom-20 lg:bottom-12 right-4 lg:right-8 z-50 w-[315px] sm:w-[345px] max-w-[calc(100vw-1.5rem)] h-[440px] sm:h-[480px] max-h-[calc(100vh-5rem)] bg-white rounded-2xl shadow-2xl border border-neutral-200 flex flex-col transition-all duration-300 origin-bottom-right font-sans overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Header Widget Ringkas Identik FokusKonten */}
        <div className="bg-neutral-950 px-4 py-3 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400 shadow-soft shrink-0">
              <img
                src="/brand/muhari-chat-avatar.jpg"
                alt="Muhari Amsori"
                className="w-full h-full object-cover object-[45%_25%]"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-white font-display font-bold text-sm tracking-tight">Muhari Amsori</h3>
                <span className="text-[10px] bg-neutral-800 text-neutral-200 px-1.5 py-0.5 rounded font-mono font-bold border border-neutral-700">AI</span>
              </div>
              <p className="text-emerald-400 text-[11px] font-medium flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online • Asisten Digital
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleResetChat}
              className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800"
              aria-label="Mulai Ulang Percakapan"
              title="Reset Chat"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer border border-neutral-800"
              aria-label="Tutup Percakapan"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Daftar Pesan */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-neutral-50 text-xs sm:text-[13px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role !== 'user' && (
                <div className="w-6 h-6 rounded-lg bg-neutral-950 text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                  M
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl p-3 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-neutral-950 text-white rounded-tr-none font-medium'
                    : 'bg-white border border-neutral-200 text-neutral-900 rounded-tl-none shadow-xs'
                }`}
              >
                <div className="whitespace-pre-wrap">{renderMessageContent(msg.content)}</div>
              </div>
            </div>
          ))}

          {/* Indikator Memproses */}
          {isLoading && (
            <div className="flex gap-2 items-start justify-start">
              <div className="w-6 h-6 rounded-lg bg-neutral-950 text-white flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                M
              </div>
              <div className="bg-white border border-neutral-200 text-neutral-700 rounded-xl rounded-tl-none p-3 shadow-xs text-xs flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-950 animate-pulse" />
                <span>
                  {thinkingPhase === 0 && 'Menganalisis data portofolio...'}
                  {thinkingPhase === 1 && 'Memvalidasi rekam jejak kerja...'}
                  {thinkingPhase === 2 && 'Menyusun tanggapan resmi...'}
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Chips Pertanyaan Solid Sesuai Pilar 4 */}
        <div className="px-3 py-2 bg-neutral-100 border-t border-neutral-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {QUICK_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => sendMessage(chip.query)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white hover:bg-neutral-950 hover:text-white border border-neutral-300 text-neutral-900 whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Bar Monokrom Bersih */}
        <form onSubmit={handleFormSubmit} className="p-2.5 bg-white border-t border-neutral-200 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tanyakan profil, keahlian, atau kontak..."
            disabled={isLoading}
            className="flex-1 bg-neutral-100 text-neutral-950 rounded-xl px-3 py-2 text-xs border border-neutral-300 focus:border-neutral-950 focus:outline-none focus:ring-0 disabled:opacity-50 placeholder:text-neutral-500 font-sans"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="w-8 h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
            aria-label="Kirim Pesan"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>
    </>
  )
}
