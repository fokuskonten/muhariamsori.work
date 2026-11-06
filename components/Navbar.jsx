'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/#keahlian', label: 'Keahlian' },
    { href: '/#pengalaman', label: 'Pengalaman' },
    { href: '/#berkas', label: 'Berkas Resmi' },
    { href: '/#kontak', label: 'Kontak' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] border-b border-neutral-200 py-3.5'
          : 'bg-white py-4 border-b border-neutral-200'
      }`}
    >
      <div className="container-page max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Identitas */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100 shrink-0">
            <img
              src="/brand/muhari-profile.jpg"
              alt="Muhari Amsori"
              className="w-full h-full object-cover object-[45%_25%]"
            />
          </div>
          <div>
            <div className="font-display font-extrabold text-neutral-950 text-sm sm:text-base leading-tight">
              Muhari Amsori
            </div>
            <div className="text-[11px] font-mono text-neutral-500 font-medium">
              AI-Powered Full-Stack Creator &amp; E-Commerce Specialist
            </div>
          </div>
        </Link>

        {/* Navigasi Desktop Ramping */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Tombol Aksi CV Tunggal */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="/cv/CV_MUHARI_LEMBAR_TUNGGAL.pdf"
            download="CV_Muhari_Amsori.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-950 text-white font-display font-bold text-xs hover:bg-neutral-800 transition-all shadow-sm"
          >
            <span>Unduh CV (PDF)</span>
            <span className="font-mono text-[10px] text-neutral-400">&darr;</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-neutral-950 hover:bg-neutral-100"
          aria-label="Toggle Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 border-b border-neutral-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href="/cv/CV_MUHARI_LEMBAR_TUNGGAL.pdf"
              download="CV_Muhari_Amsori.pdf"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-neutral-950 text-white font-display font-bold text-xs shadow-sm"
            >
              <span>Unduh CV Format ATS (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
