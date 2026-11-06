import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white text-neutral-900 pt-16 pb-12 border-t border-neutral-200">
      <div className="container-page max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-neutral-300 bg-neutral-100 shrink-0">
                <img
                  src="/brand/muhari-pasfoto-merah.jpg"
                  alt="Muhari Amsori"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-display font-extrabold text-base text-neutral-950">Muhari Amsori</h4>
                <p className="text-xs text-neutral-500 font-mono">Pengelola Toko Online &amp; Pembuat Aplikasi</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md">
              Saya memiliki pengalaman kerja nyata lebih dari 8 tahun dalam pengelolaan toko online marketplace, pembuatan aplikasi kasir dan program komputer, serta pengalaman fisik di pabrik dan percetakan.
            </p>
          </div>

          {/* Col 2: Navigasi Cepat */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-950">
              Halaman Keahlian
            </h5>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li><Link href="/" className="hover:text-neutral-950 transition-colors">Halaman Utama</Link></li>
              <li><Link href="/ecommerce" className="hover:text-neutral-950 transition-colors">Toko Online &amp; Marketplace</Link></li>
              <li><Link href="/software" className="hover:text-neutral-950 transition-colors">Aplikasi Kasir &amp; Komputer</Link></li>
              <li><Link href="/fotografi" className="hover:text-neutral-950 transition-colors">Fotografi &amp; Video</Link></li>
              <li><Link href="/woodworking" className="hover:text-neutral-950 transition-colors">Kerajinan Kayu &amp; Desain 3D</Link></li>
              <li><Link href="/percetakan" className="hover:text-neutral-950 transition-colors">Percetakan &amp; Dus Kemasan</Link></li>
              <li><Link href="/manufaktur" className="hover:text-neutral-950 transition-colors">Pengalaman Pabrik &amp; Gudang</Link></li>
            </ul>
          </div>

          {/* Col 3: Kontak & Berkas */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-xs uppercase tracking-wider text-neutral-950">
              Kontak &amp; Berkas
            </h5>
            <ul className="space-y-2 text-xs text-neutral-600">
              <li>
                <a
                  href="https://wa.me/6289529131131?text=Halo%20Muhari,%20saya%20sudah%20melihat%20halaman%20profil%20Anda."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-950 transition-colors font-medium text-neutral-900"
                >
                  WhatsApp: 0895-2913-1131
                </a>
              </li>
              <li>
                <a
                  href="mailto:muhariamsori@gmail.com"
                  className="hover:text-neutral-950 transition-colors"
                >
                  muhariamsori@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fokuskonten"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-950 transition-colors"
                >
                  GitHub: github.com/fokuskonten
                </a>
              </li>
              <li className="text-neutral-500 font-mono text-[11px]">
                Domisili: Kab. Bekasi, Jawa Barat
              </li>
              <li className="pt-2">
                <a
                  href="/cv/CV_MUHARI_LEMBAR_TUNGGAL.pdf"
                  download="CV_Muhari_Amsori.pdf"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-950 underline underline-offset-4"
                >
                  <span>Unduh CV Saya (PDF) &rarr;</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; 2026 Muhari Amsori. Hak Cipta Dilindungi.
          </div>
          <div className="font-mono text-[11px] text-neutral-500">
            Kabupaten Bekasi, Jawa Barat • Siap Kerja Lapangan / Shift
          </div>
        </div>
      </div>
    </footer>
  )
}
