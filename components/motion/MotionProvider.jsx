'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Pengamat tunggal untuk seluruh situs: memicu [data-reveal] saat masuk layar,
// mengisi koordinat kursor untuk kartu [data-spotlight], serta menjaga posisi
// scroll tetap utuh saat halaman di-refresh.
export default function MotionProvider() {
  const pathname = usePathname()

  // ── 01. RESTORASI POSISI SCROLL OTOMATIS SAAT REFRESH ──
  useEffect(() => {
    if (typeof window === 'undefined') return

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const scrollKey = 'fk_scroll_' + pathname

    // Simpan posisi scroll secara aktif (debounced) & saat unload/pagehide
    let saveTimer
    const saveScroll = () => {
      try {
        sessionStorage.setItem(scrollKey, window.scrollY.toString())
      } catch (e) {}
    }

    const onScroll = () => {
      clearTimeout(saveTimer)
      saveTimer = setTimeout(saveScroll, 60)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', saveScroll)
    window.addEventListener('beforeunload', saveScroll)

    // Pulihkan posisi scroll yang tersimpan
    const saved = sessionStorage.getItem(scrollKey)
    if (saved) {
      const targetY = parseInt(saved, 10)
      if (!isNaN(targetY) && targetY > 0) {
        document.documentElement.style.scrollBehavior = 'auto'
        window.scrollTo(0, targetY)

        // Kawal posisi scroll selama proses rendering Next.js & pemuatan gambar
        let count = 0
        const interval = setInterval(() => {
          count++
          if (document.documentElement.scrollHeight > targetY) {
            window.scrollTo(0, targetY)
          }
          if (count >= 15 || Math.abs(window.scrollY - targetY) < 3) {
            clearInterval(interval)
            document.documentElement.style.scrollBehavior = ''
          }
        }, 35)
      }
    }

    return () => {
      clearTimeout(saveTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', saveScroll)
      window.removeEventListener('beforeunload', saveScroll)
    }
  }, [pathname])

  // ── 02. SISTEM GERAK & SPOTLIGHT ──
  useEffect(() => {
    // Tandai sistem gerak aktif agar failsafe di <head> tidak mematikan animasi
    window.__fkMotionReady = true

    const revealAll = () =>
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => el.classList.add('is-revealed'))

    // Spotlight kursor (desktop dengan mouse saja)
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const onMove = (ev) => {
      const card = ev.target instanceof Element ? ev.target.closest('[data-spotlight]') : null
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${ev.clientX - r.left}px`)
      card.style.setProperty('--my', `${ev.clientY - r.top}px`)
    }
    if (finePointer) document.addEventListener('pointermove', onMove, { passive: true })

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) {
      revealAll()
      return () => document.removeEventListener('pointermove', onMove)
    }

    // Trigger animasi saat elemen mulai terlihat di viewport (offset -40px dari bawah layar agar gerakan terlihat jelas dan anggun)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            io.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '60px 0px -5% 0px', threshold: 0.02 }
    )

    const scan = () =>
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => io.observe(el))
    scan()

    // Tangkap elemen yang dirender belakangan oleh client component
    let timer
    const mo = new MutationObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(scan, 16)
    })
    mo.observe(document.querySelector('main') || document.body, { childList: true, subtree: true })

    return () => {
      clearTimeout(timer)
      io.disconnect()
      mo.disconnect()
      document.removeEventListener('pointermove', onMove)
    }
  }, [pathname])

  return null
}
