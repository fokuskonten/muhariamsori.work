/**
 * apiConfig.js — Konfigurasi Central API Helper untuk Portofolio Muhari Amsori
 * Menghubungkan front-end statis di GitHub Pages (muhariamsori.work) ke Server FokusKonten port 8090 via Cloudflare Tunnel resmi.
 */

export function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:8090/api/v1'
  }

  const hostname = window.location.hostname
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')

  if (isLocal) {
    return 'http://localhost:8090/api/v1'
  }

  // Live domain di GitHub Pages (muhariamsori.work / fokuskonten.github.io)
  // Menghubungi Cloudflare Tunnel terverifikasi yang langsung terhubung ke Server Port 8090
  return 'https://api.fokuskonten.my.id/api/v1'
}
