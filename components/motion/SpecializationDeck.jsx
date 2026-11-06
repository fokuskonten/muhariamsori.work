'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'

export default function SpecializationDeck({ slides, id }) {
  const [active, setActive] = useState(0)
  const [activeHeight, setActiveHeight] = useState(null)
  const slideRefs = useRef([])
  const videoRefs = useRef([])
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const total = slides.length

  const next = () => setActive((i) => (i + 1) % total)
  const prev = () => setActive((i) => (i - 1 + total) % total)
  const goTo = (i) => setActive(i)

  // Pause non-active videos on slide change
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (v && i !== active && !v.paused) {
        v.pause()
      }
    })
  }, [active])

  const updateHeight = useCallback(() => {
    const el = slideRefs.current[active]
    if (el) {
      const h = el.offsetHeight
      if (h > 0) setActiveHeight(h)
    }
  }, [active])

  useEffect(() => {
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [updateHeight])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
      if (e.key === 'ArrowRight') next()
      else if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [total])

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0) next()
      else prev()
    }
  }

  return (
    <div
      id={id || "kontainer-keahlian-software"}
      className="keahlian-card-snap rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8 lg:p-10 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_50px_-10px_rgba(0,0,0,0.22)] hover:border-neutral-900/40 transition-all duration-300 group select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── VIEWPORT SLIDER HORIZONTAL HALUS BERGESER KE SAMPING (SMOOTH CAROUSEL) ── */}
      <div
        className="overflow-hidden w-full transition-[height] duration-300 ease-out"
        style={{ height: activeHeight ? `${activeHeight}px` : undefined }}
      >
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform items-start"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {slides.map((slide, idx) => {
            const isPortrait = Boolean(slide.portrait || slide.isPortrait || slide.orientation === 'portrait' || slide.aspect === 'portrait')

            return (
              <div
                key={slide.id || idx}
                ref={(el) => (slideRefs.current[idx] = el)}
                className="w-full min-w-full flex-shrink-0"
                aria-hidden={idx !== active}
              >
                {isPortrait ? (
                  /* ── TAMPILAN KHUSUS POTRET / VERTIKAL (RINGKAS: FULL MEDIA PAS BADAN + JUDUL BERBAYANG DI ATAS) ── */
                  <div className="relative w-fit max-w-full mx-auto rounded-2xl overflow-hidden border border-neutral-800/80 bg-neutral-950 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)] flex items-center justify-center min-h-[460px] max-h-[660px]">
                    {slide.youtubeId ? (
                      <div className="relative w-[320px] sm:w-[360px] max-w-full aspect-[9/16] max-h-[660px] bg-black">
                        <iframe
                          src={`https://www.youtube.com/embed/${slide.youtubeId}?rel=0`}
                          title={slide.title}
                          className="absolute inset-0 w-full h-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ) : slide.video ? (
                      <video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        src={slide.video}
                        poster={slide.banner}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-auto h-auto max-h-[660px] max-w-full object-contain mx-auto block"
                        onLoadedMetadata={() => {
                          if (idx === active) updateHeight()
                        }}
                      />
                    ) : slide.banner ? (
                      <img
                        src={slide.banner}
                        alt={slide.title}
                        className="w-auto h-auto max-h-[660px] max-w-full object-contain mx-auto block select-none pointer-events-none"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        onLoad={() => {
                          if (idx === active) updateHeight()
                        }}
                      />
                    ) : null}

                    {/* Label Judul Tebal Berbayang di Bagian Atas (Mencegah Bentrok dengan Kontrol Video di Bawah) */}
                    <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/85 via-black/40 to-transparent pt-4 pb-10 px-5 sm:px-6 pointer-events-none z-10 flex flex-col items-center text-center">
                      <h3 className="font-display font-extrabold text-lg sm:text-xl md:text-2xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] leading-snug">
                        {slide.title}
                      </h3>
                    </div>
                  </div>
                ) : (
                  /* ── TAMPILAN STANDAR LANDSCAPE (MEDIA DI ATAS + JUDUL & DESKRIPSI DI BAWAH) ── */
                  <>
                    {/* 1. Visual Banner Lebar Penuh (Rasio Seragam Alami) */}
                    <div className="relative w-full rounded-2xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.12)] mb-5 sm:mb-8 flex items-center justify-center">
                      {slide.youtubeId ? (
                        <div className="relative w-full aspect-video max-h-[560px] sm:max-h-[640px] bg-black rounded-2xl overflow-hidden">
                          <iframe
                            src={`https://www.youtube.com/embed/${slide.youtubeId}?rel=0`}
                            title={slide.title}
                            className="absolute inset-0 w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          />
                        </div>
                      ) : slide.video ? (
                        <video
                          ref={(el) => (videoRefs.current[idx] = el)}
                          src={slide.video}
                          poster={slide.banner}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-auto max-h-[560px] sm:max-h-[640px] object-contain block bg-black/5"
                          onLoadedMetadata={() => {
                            if (idx === active) updateHeight()
                          }}
                        />
                      ) : slide.banner ? (
                        <img
                          src={slide.banner}
                          alt={slide.title}
                          className="w-full h-auto max-h-[560px] sm:max-h-[640px] object-contain block select-none pointer-events-none"
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          onLoad={() => {
                            if (idx === active) updateHeight()
                          }}
                        />
                      ) : (
                        <div className="aspect-[16/9] w-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-200/50">
                          <span className="font-display font-bold text-sm sm:text-base text-neutral-800">
                            {slide.title}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 2. Informasi & Rincian Fitur */}
                    <div className="space-y-5 sm:space-y-6">
                      <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-neutral-950 leading-tight">
                        {slide.title}
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">
                        <p className={`${slide.features && slide.features.length > 0 ? 'lg:col-span-6' : 'lg:col-span-12'} text-neutral-600 text-sm sm:text-base leading-relaxed`}>
                          {slide.desc}
                        </p>
                        {slide.features && slide.features.length > 0 && (
                          <div className="lg:col-span-6 space-y-2.5">
                            {slide.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-800">
                                <span className="w-5 h-5 rounded-md bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span className="font-medium leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* 3. CTA Buttons / Validasi Status Pengembangan */}
                      {(slide.statusBadge || slide.ctaButtons || slide.ctaLink) && (
                        <div className="pt-4 sm:pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-end gap-2">
                          {slide.statusBadge ? (
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs sm:text-sm font-display font-medium select-none shadow-sm">
                              <span className="w-2 h-2 rounded-full bg-amber-500 motion-safe:animate-pulse shrink-0" />
                              <span>{slide.statusBadge}</span>
                            </div>
                          ) : slide.ctaButtons ? (
                            slide.ctaButtons.map((btn, bIdx) => (
                              <a
                                key={bIdx}
                                href={btn.href}
                                target={btn.href.startsWith('http') ? '_blank' : undefined}
                                rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-display font-bold transition-all shadow-sm ${
                                  btn.primary
                                    ? 'bg-neutral-950 text-white hover:bg-neutral-800'
                                    : 'bg-neutral-100 border border-neutral-200/80 text-neutral-900 hover:bg-neutral-200'
                                }`}
                              >
                                <span>{btn.text}</span>
                                <span className="font-mono">&rarr;</span>
                              </a>
                            ))
                          ) : slide.ctaLink.startsWith('http') ? (
                            <a
                              href={slide.ctaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-950 text-white text-xs sm:text-sm font-display font-bold hover:bg-neutral-800 transition-all group/cta shadow-sm"
                            >
                              <span>{slide.ctaText || 'Buka Website'}</span>
                              <span className="group-hover/cta:translate-x-1 transition-transform font-mono">&rarr;</span>
                            </a>
                          ) : (
                            <Link
                              href={slide.ctaLink}
                              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-950 text-white text-xs sm:text-sm font-display font-bold hover:bg-neutral-800 transition-all group/cta shadow-sm"
                            >
                              <span>{slide.ctaText || 'Buka Portofolio'}</span>
                              <span className="group-hover/cta:translate-x-1 transition-transform font-mono">&rarr;</span>
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 4. NAVIGASI: BACK / NEXT + TITIK INDIKATOR ── */}
      <div className="mt-6 pt-5 border-t border-neutral-100 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          {active > 0 && (
            <button
              type="button"
              onClick={prev}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-display font-bold transition-all border border-neutral-200/80 active:scale-95"
            >
              <span className="font-mono">&larr;</span>
              <span>Back</span>
            </button>
          )}
          <button
            type="button"
            onClick={next}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs sm:text-sm font-display font-bold transition-all shadow-sm active:scale-95 group/btn"
          >
            <span>{total > 1 && active === total - 1 ? 'Awal ↺' : 'Next'}</span>
            {(total === 1 || active !== total - 1) && (
              <span className="group-hover/btn:translate-x-1 transition-transform font-mono">&rarr;</span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 py-1 overflow-x-auto max-w-full">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Buka slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 shrink-0 ${
                i === active ? 'w-5 sm:w-6 bg-neutral-950' : 'w-1.5 sm:w-2 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
