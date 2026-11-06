'use client'

import { useEffect, useRef, useState } from 'react'

// Angka naik sekali saat terlihat. SSR menampilkan nilai akhir (aman tanpa JS & SEO).
export default function CountUp({ value, duration = 900 }) {
  const [display, setDisplay] = useState(value)
  const ref = useRef(null)

  useEffect(() => {
    const match = /^(\D*)(\d+)(\D*)$/.exec(value)
    if (!match || !ref.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!('IntersectionObserver' in window)) return

    const [, pre, num, post] = match
    const target = parseInt(num, 10)
    let raf
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(`${pre}${Math.round(target * eased)}${post}`)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, duration])

  return <span ref={ref} className="tabular-nums">{display}</span>
}
