'use client'

import { useState, useEffect } from 'react'

/**
 * HeroHeadline - Headline hero dengan kemunculan kata per kata dan efek pengetikan (typewriter)
 * terminal kinetik pada frasa sorotan (highlight).
 * Dilengkapi fallback SSR lengkap untuk SEO dan dukungan penuh prefers-reduced-motion.
 */
export default function HeroHeadline({
  lead = 'Solusi Software & Aplikasi Andal untuk',
  highlight = 'Bisnis dan Produktivitas',
  className = '',
  typewriter = true,
}) {
  const [mounted, setMounted] = useState(false)
  const [typedChars, setTypedChars] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    setMounted(true)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !typewriter) {
      setTypedChars(highlight.length)
      setIsDone(true)
      return
    }

    // Mulai mengetik setelah kata-kata lead selesai muncul (~350ms)
    let timer
    let count = 0
    const delayStart = 350

    const typeNext = () => {
      if (count < highlight.length) {
        count++
        setTypedChars(count)
        // Kecepatan ketuk keyboard natural (35ms - 65ms per karakter)
        const jitter = 35 + Math.random() * 30
        timer = setTimeout(typeNext, jitter)
      } else {
        setIsDone(true)
      }
    }

    timer = setTimeout(typeNext, delayStart)
    return () => clearTimeout(timer)
  }, [highlight, typewriter])

  const leadWords = lead.split(' ')
  const displayedHighlight = mounted ? highlight.slice(0, typedChars) : highlight

  return (
    <h1 className={className}>
      {/* 1. Kata lead: muncul kata per kata */}
      {leadWords.map((word, i) => (
        <span key={i}>
          <span className="fk-word" style={{ '--w': i }}>
            {word}
          </span>
          {' '}
        </span>
      ))}

      {/* 2. Highlight kinetik: pengetikan + kursor terminal berkedip */}
      <span className="inline-block relative">
        <span className="text-gradient-brand">
          {displayedHighlight}
        </span>
        {/* Kursor terminal */}
        <span
          className={`inline-block font-mono font-normal text-neutral-900 select-none ml-0.5 fk-cursor-blink ${
            isDone ? 'opacity-70' : 'opacity-100'
          }`}
          aria-hidden="true"
        >
          |
        </span>
      </span>
    </h1>
  )
}
