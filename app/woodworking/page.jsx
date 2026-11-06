import Link from 'next/link'

export const metadata = {
  title: 'Portofolio Kerajinan Kayu & Desain 3D — Muhari Amsori',
  description: 'Pengerjaan kayu solid, organizer meja kerja, desain 3D Blender, dan mesin perkakas workshop.',
}

export default function WoodworkingPortfolioPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Bersih */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950">&larr; Kembali ke Halaman Utama</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">DIY Woods Furniture &amp; Powertools</span>
        </div>

        {/* Judul & Deskripsi Langsung Tanpa Kapsul */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-950 mb-4 tracking-tight">
            DIY Woods Furniture, Powertools &amp; Maintenance
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Saya bisa membuat dan merakit DIY woods furniture serta organizer meja kerja dalam model 3D di komputer menggunakan Blender, mengoperasikan beragam powertools workshop (gergaji meja, serut, bor duduk, router profil, gerinda), serta melakukan pemeliharaan (maintenance) mesin perkakas secara mandiri.
          </p>
        </div>

        {/* Banner Portofolio Kalila Woodworking 16:9 (Bersih Tanpa Kapsul Mengambang & Shadow Kental) */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 group">
          <img
            src="/portfolio/woodworking/woodworking-banner-web.jpg"
            alt="Kalila Woodworking Kerajinan Kayu Solid & Desain 3D - Muhari Amsori"
            className="w-full h-auto block"
          />
        </div>

        {/* 3 Kotak Kemampuan Workshop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">MESIN WORKSHOP</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Pengoperasian Mesin Kayu</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Terbiasa menggunakan gergaji meja (table saw), gergaji potong sudut (miter saw), mesin profil router, mesin amplas, dan bor duduk dengan ukuran presisi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">GAMBAR 3D KOMPUTER</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Desain 3D di Blender</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Menggambar bentuk barang dalam ukuran milimeter sebelum bahan kayu dipotong, sehingga tidak ada bahan baku yang terbuang sia-sia.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">SAMBUNGAN &amp; CAT</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Sambungan Kuat &amp; Lapisan Halus</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Membuat sambungan pasak kayu (dowel) dan sekrup saku (pocket hole) yang kuat, serta pengamplasan bertahap hingga pelapisan anti gores.
            </p>
          </div>
        </div>

        {/* Wadah Portofolio (Tanpa Kapsul) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-950 text-white border border-neutral-800 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Galeri Hasil Kerajinan Kayu
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Bagian ini disiapkan untuk menampilkan foto barang jadi seperti kotak organizer meja, asbak kayu, rak dinding, dan gambar desain 3D-nya.
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
