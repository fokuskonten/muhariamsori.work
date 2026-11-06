import Link from 'next/link'

export const metadata = {
  title: 'Portofolio Web Fullstack, Aplikasi Kasir Android & Komputer — Muhari Amsori',
  description: 'Pengembangan web fullstack Next.js/Node.js, aplikasi kasir Android offline Apotek Pro & Kelontong Pro, serta software Windows ReImage Pro & WhatsApp CRM.',
}

export default function SoftwarePortfolioPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Bersih */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950">&larr; Kembali ke Halaman Utama</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">AI-Powered Full-Stack Creator</span>
        </div>

        {/* Judul & Deskripsi Langsung Tanpa Kapsul */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-950 mb-4 tracking-tight">
            AI-Powered Full-Stack Creator
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Saya bisa membuat website fullstack mandiri dan merancang software untuk kebutuhan nyata pemilik usaha. Aplikasi kasir Android yang saya buat bekerja mandiri 100% offline tanpa kuota internet bebas iuran bulanan, program Windows desktop, serta bot automation untuk otomasi browser dan sistem pengiriman digital 24 jam.
          </p>
        </div>

        {/* Banner Portofolio Web Fullstack 16:9 (Bersih Tanpa Kapsul Mengambang & Shadow Kental) */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 group">
          <img
            src="/portfolio/software/software-web-fullstack-banner-web.jpg"
            alt="Portofolio Web Fullstack & Aplikasi FokusKonten - Muhari Amsori"
            className="w-full h-auto block"
          />
        </div>

        {/* Daftar Aplikasi yang Pernah Saya Buat (Tanpa Kapsul) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <span className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider block">
              Android Kasir Farmasi
            </span>
            <h3 className="text-xl font-display font-extrabold text-neutral-950">Apotek Pro</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Aplikasi kasir apotek dengan fitur pengingat obat yang mendekati tanggal kedaluwarsa, hitung resep racikan puyer otomatis, dan cetak struk nota belanja ke printer kasir Bluetooth tanpa kuota internet.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <span className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider block">
              Android Kasir Sembako
            </span>
            <h3 className="text-xl font-display font-extrabold text-neutral-950">Kelontong Pro</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Aplikasi kasir toko kelontong dengan pemindai barcode kamera secepat kasir minimarket, pencatatan buku kasbon utang pelanggan kirim via WhatsApp, dan konversi harga dus ke satuan eceran.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <span className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider block">
              Program Komputer Windows
            </span>
            <h3 className="text-xl font-display font-extrabold text-neutral-950">ReImage Pro</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Software komputer Windows untuk mengecilkan ukuran ribuan file gambar sekaligus dengan cepat dan hasil foto tetap tajam, sangat berguna untuk upload produk toko online.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <span className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider block">
              Otomasi WhatsApp Komputer
            </span>
            <h3 className="text-xl font-display font-extrabold text-neutral-950">WhatsApp Lead CRM</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Program komputer untuk mengumpulkan data kontak usaha dari Google Maps dan mengirimkan pesan penawaran otomatis dengan jeda waktu aman.
            </p>
          </div>
        </div>

        {/* Wadah Tampilan Aplikasi (Tanpa Kapsul) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-950 text-white border border-neutral-800 text-center space-y-4">
          <h3 className="text-xl font-display font-extrabold text-white">Tangkapan Layar &amp; Bukti Aplikasi</h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
            Bagian ini disiapkan untuk menampilkan foto tampilan layar aplikasi kasir, cara pemakaian, dan video penggunaannya.
          </p>
          <div className="pt-2">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-neutral-950 font-display font-bold text-xs hover:bg-neutral-100 transition-all">
              &larr; Kembali ke Halaman Utama
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
