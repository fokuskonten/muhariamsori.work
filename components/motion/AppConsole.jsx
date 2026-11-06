'use client'

import { useState } from 'react'
import Link from 'next/link'

// Konsol etalase hero: memutar produk lintas platform secara otomatis.
// Timing digerakkan animasi CSS .fk-progress (onAnimationEnd) sehingga
// hover cukup mem-pause animasi, dan reduced-motion otomatis mematikan autoplay.
const pad = (n) => String(n).padStart(2, '0')
const toPath = (href) =>
  href.startsWith('http')
    ? href.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `muhariamsori.work${href.replace(/\/$/, '')}`

export default function AppConsole({ items }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = items.length
  const item = items[active]
  const path = toPath(item.href)
  const next = () => setActive((i) => (i + 1) % total)

  const ctaClass =
    'group/btn inline-flex items-center gap-2 px-5 py-3 rounded-xl font-display font-semibold text-xs text-white bg-black hover:bg-neutral-800 shadow-sm transition-all'
  const arrow = (
    <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )

  return (
    <div
      className="relative mx-auto max-w-5xl text-left bg-white border border-neutral-200 rounded-3xl shadow-[0_20px_48px_-12px_rgba(0,0,0,0.12)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* Kepala konsol: label + penghitung, tanpa tombol jendela tiruan */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-100">
        <div className="flex items-center gap-2.5 text-[11px] font-mono font-semibold text-neutral-900">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-50 motion-safe:animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neutral-950" />
          </span>
          muhariamsori.work
        </div>
        <span className="text-[11px] font-mono text-neutral-400 tabular-nums">
          {pad(active + 1)} / {pad(total)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr]">
        {/* Daftar item: horizontal nomor di mobile, vertikal di desktop */}
        <div role="tablist" aria-label="Keahlian utama" className="flex md:flex-col gap-1.5 p-3 border-b md:border-b-0 md:border-r border-neutral-100 overflow-x-auto md:max-h-[440px] md:overflow-y-auto">
          {items.map((it, i) => {
            const on = i === active
            return (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`relative shrink-0 flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${on ? 'bg-neutral-50' : 'hover:bg-neutral-50/70'}`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 border transition-colors ${on ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-neutral-100 text-neutral-700 border-neutral-200'}`}>
                  {pad(i + 1)}
                </span>
                <span className="hidden md:flex flex-col min-w-0">
                  <span className={`text-sm font-display font-semibold truncate ${on ? 'text-neutral-950' : 'text-neutral-600'}`}>{it.name}</span>
                  <span className="text-[11px] font-mono text-neutral-400 truncate">{it.category}</span>
                </span>
                {on && (
                  <span className="absolute left-2.5 right-2.5 bottom-0.5 h-[2px] rounded-full bg-neutral-200 overflow-hidden">
                    <span
                      className="fk-progress block h-full bg-neutral-950"
                      style={{ animationPlayState: paused ? 'paused' : 'running' }}
                      onAnimationEnd={next}
                    />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Panel detail item aktif (Murni Tipografi Bersih Tanpa Ikon) */}
        <div key={active} role="tabpanel" className="fk-swap p-6 sm:p-8 min-h-[340px] flex flex-col justify-between">
          <div>
            <div className="text-[11px] sm:text-xs font-mono text-neutral-500 mb-4">
              <span className="fk-type" style={{ '--n': path.length }}>{path}</span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                <span className="text-[11px] font-mono font-semibold text-neutral-500 uppercase tracking-wider">
                  {item.category}
                </span>
                <span className="text-xs font-mono font-bold text-neutral-400">
                  {pad(active + 1)} / {pad(total)}
                </span>
              </div>
              <h3 className="heading-lg text-xl sm:text-2xl text-neutral-950 font-display font-extrabold">
                {item.name}
              </h3>
            </div>

            {/* Narasi Deskripsi Nilai Bisnis / Problem-Solution */}
            <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-xl mb-5">
              {item.description}
            </p>

            {/* 3-4 Chip Fitur Unggulan (Pola Hibrida Solusi + Fitur Kunci) */}
            {Array.isArray(item.features) && item.features.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-6">
                {item.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-neutral-50/90 border border-neutral-200/90 text-neutral-800 text-xs font-medium"
                  >
                    <svg className="w-3.5 h-3.5 text-neutral-950 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-2">
            {item.external ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                {item.actionText}
                {arrow}
              </a>
            ) : (
              <Link href={item.href} className={ctaClass}>
                {item.actionText}
                {arrow}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
