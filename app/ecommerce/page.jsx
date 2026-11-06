import Link from 'next/link'

export const metadata = {
  title: 'Portofolio Toko Online & Marketplace — Muhari Amsori',
  description: 'Pengalaman nyata mengelola toko digital Shopee, Tokopedia, TikTok Shop, katalog 380+ produk, dan sistem kirim otomatis.',
}

export default function EcommercePortfolioPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Bersih */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950">&larr; Kembali ke Halaman Utama</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">E-Commerce &amp; Marketplace Specialist</span>
        </div>

        {/* Judul & Deskripsi Langsung Tanpa Kapsul */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-950 mb-4 tracking-tight">
            E-Commerce &amp; Marketplace Specialist
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Saya mengelola toko online dari awal hingga pengiriman: membuat judul dan foto produk yang rapi, mengatur harga promo voucher diskon di Seller Center, melayani pertanyaan pembeli, hingga membuat sistem yang mengirimkan barang digital langsung ke pembeli saat pembayaran selesai.
          </p>
        </div>

        {/* Banner Portofolio Shopee 16:9 (Bersih Tanpa Kapsul Mengambang & Shadow Kental) */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 group">
          <img
            src="/portfolio/ecommerce/shopee-store-banner-web.jpg"
            alt="Toko Shopee Star Seller Fokus Konten Store - Muhari Amsori"
            className="w-full h-auto block"
          />
        </div>

        {/* 3 Kotak Bukti Nyata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="text-xs font-mono text-neutral-500 font-bold mb-1">REPUTASI &amp; ULASAN</div>
            <div className="text-2xl font-extrabold font-display text-neutral-950 mb-2">Rating 4.9 / 5.0</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Mendapatkan lebih dari 72.200 penilaian ulasan kepuasan pelanggan dengan predikat toko Star Seller resmi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="text-xs font-mono text-neutral-500 font-bold mb-1">PENGIKUT &amp; JAM TERBANG</div>
            <div className="text-2xl font-extrabold font-display text-neutral-950 mb-2">9.100+ Pengikut</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Bergabung sejak 8 tahun lalu dengan katalog 335+ produk terkurasi, voucher diskon, dan basis pelanggan setia.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)]">
            <div className="text-xs font-mono text-neutral-500 font-bold mb-1">PELAYANAN &amp; CHAT</div>
            <div className="text-2xl font-extrabold font-display text-neutral-950 mb-2">Chat 95% Cepat</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Responsif melayani pertanyaan calon pembeli dalam hitungan jam dan sistem pengiriman pesanan otomatis standby 24 jam.
            </p>
          </div>
        </div>

        {/* Wadah Bukti Gambar Langsung Tanpa Kapsul */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-950 text-white border border-neutral-800 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Toko Online Asli &amp; Terverifikasi
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Data performa toko di atas merupakan bukti nyata kemampuan saya dalam mengelola operasional marketplace, mulai dari setting etalase produk, kampanye promosi, hingga layanan kepuasan pelanggan.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-neutral-950 font-display font-bold text-xs hover:bg-neutral-100 transition-all"
            >
              &larr; Kembali ke Halaman Utama
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
