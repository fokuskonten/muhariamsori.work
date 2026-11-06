'use client'

import { useEffect, useRef } from 'react'

/**
 * ParticleMesh - Kanvas partikel monokrom berkonsep "pecahan teks/glif kode yang terkumpul".
 * Menghadirkan serpihan karakter kode (0, 1, {}, </>, ;, fk, =>) yang melayang halus
 * dan memiliki daya tarik magnetik lembut berkumpul ke arah judul hero.
 * 100% native HTML5 Canvas, zero-cost, zero library, dan auto-pause saat off-screen.
 */
const GLYPHS = ['{', '}', '</>', '0', '1', ';', '_', 'fk', '[]', '=>', '*', '::']

export default function ParticleMesh({
  particleCount = 38,
  connectionDistance = 100,
  speed = 0.32,
  className = 'absolute inset-0 pointer-events-none',
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let isVisible = true
    let width = 0
    let height = 0
    let mouse = { x: -9999, y: -9999, radius: 130 }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let particles = []

    const initParticles = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
          fontSize: 9 + Math.floor(Math.random() * 4), // 9px s/d 12px
          baseAlpha: 0.12 + Math.random() * 0.16,
          angle: (Math.random() - 0.5) * 0.4,
          vAngle: (Math.random() - 0.5) * 0.005,
        })
      }
    }

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      initParticles()
      if (prefersReducedMotion) {
        drawFrame()
      }
    }

    // Pusat magnetik tempat serpihan teks berhimpun (area judul hero)
    const getTargetCenter = () => ({
      x: width * 0.5,
      y: height * 0.38,
    })

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Gambar benang koneksi tipis antar serpihan terdekat
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.065
            ctx.strokeStyle = `rgba(15, 23, 42, ${alpha})`
            ctx.lineWidth = 0.75
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }

        // Benang koneksi halus ke kursor mouse
        const mouseDx = particles[i].x - mouse.x
        const mouseDy = particles[i].y - mouse.y
        const mouseDist = Math.hypot(mouseDx, mouseDy)
        if (mouseDist < mouse.radius) {
          const mouseAlpha = (1 - mouseDist / mouse.radius) * 0.12
          ctx.strokeStyle = `rgba(15, 23, 42, ${mouseAlpha})`
          ctx.lineWidth = 0.9
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      // 2. Gambar serpihan glif/teks monospace
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.font = `${p.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`
        ctx.fillStyle = `rgba(15, 23, 42, ${p.baseAlpha})`
        ctx.fillText(p.char, 0, 0)
        ctx.restore()
      }
    }

    const animate = () => {
      if (!isVisible) return

      drawFrame()

      const center = getTargetCenter()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Daya tarik magnetik lembut menuju pusat judul hero
        const toCenterX = center.x - p.x
        const toCenterY = center.y - p.y
        const distToCenter = Math.hypot(toCenterX, toCenterY)

        if (distToCenter > 40 && distToCenter < width * 0.6) {
          // Tarikan mikroskopis agar partikel perlahan berkumpul mengitari judul
          const pullForce = 0.00018
          p.vx += (toCenterX / distToCenter) * pullForce * (distToCenter * 0.02)
          p.vy += (toCenterY / distToCenter) * pullForce * (distToCenter * 0.02)
        }

        // Redam kecepatan maksimal agar tetap tenang dan tidak liar
        const maxV = speed * 1.3
        p.vx = Math.max(-maxV, Math.min(maxV, p.vx))
        p.vy = Math.max(-maxV, Math.min(maxV, p.vy))

        p.x += p.vx
        p.y += p.vy
        p.angle += p.vAngle

        // Respons terhadap gerakan kursor: menyebar lembut
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius
          p.x += (dx / dist) * force * 1.1
          p.y += (dy / dist) * force * 1.1
        }

        // Pantul lembut di batas kanvas
        if (p.x < 10) {
          p.x = 10
          p.vx *= -1
        } else if (p.x > width - 10) {
          p.x = width - 10
          p.vx *= -1
        }

        if (p.y < 10) {
          p.y = 10
          p.vy *= -1
        } else if (p.y > height - 10) {
          p.y = height - 10
          p.vy *= -1
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const onMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseleave', onMouseLeave, { passive: true })

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas.parentElement || canvas)

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting
          if (isVisible && !prefersReducedMotion) {
            cancelAnimationFrame(animationFrameId)
            animationFrameId = requestAnimationFrame(animate)
          } else {
            cancelAnimationFrame(animationFrameId)
          }
        })
      },
      { threshold: 0.05 }
    )
    intersectionObserver.observe(canvas)

    handleResize()
    if (!prefersReducedMotion) {
      animationFrameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [particleCount, connectionDistance, speed])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
