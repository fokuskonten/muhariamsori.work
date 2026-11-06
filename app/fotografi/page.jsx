import Link from 'next/link'

export const metadata = {
  title: 'Portofolio Fotografi & Video — Muhari Amsori',
  description: 'Dokumenter sekolah, video pernikahan, foto studio, dan editing warna di komputer.',
}

export default function FotografiPortfolioPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Bersih */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950">&larr; Kembali ke Halaman Utama</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Fotografi, Videografi &amp; Multimedia</span>
        </div>

        {/* Judul & Deskripsi Langsung Tanpa Kapsul */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-950 mb-4 tracking-tight">
            Fotografi, Videografi, Video Editor &amp; Multimedia Operator
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Saya bisa mengoperasikan kamera profesional DSLR dan Mirrorless untuk foto produk, acara, dan videografi liputan sekolah/pernikahan, serta menguasai editing video dan audio (Premiere Pro, CapCut) hingga pasca-produksi warna foto di Lightroom.
          </p>
        </div>

        {/* Banner Portofolio Fotografi 16:9 (Bersih Tanpa Kapsul Mengambang & Shadow Kental) */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 group">
          <img
            src="/portfolio/fotografi/fotografi-hero-banner-web.jpg"
            alt="Portofolio Fotografi & Video Muhari Amsori"
            className="w-full h-auto block"
          />
        </div>

        {/* 3 Kotak Keahlian */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">FILM DOKUMENTER</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Profil Sekolah &amp; Acara</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Membuat konsep alur video, pengambilan gambar wawancara dan kegiatan, serta merangkai cerita video yang rapi dan enak ditonton.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">VIDEO PERNIKAHAN</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Momen Pernikahan &amp; Teaser</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Mengabadikan momen penting acara pernikahan dengan gerakan kamera yang tenang dan penyesuaian musik pengiring yang pas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">PENGEDITAN KOMPUTER</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Warna Foto &amp; Potong Video</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Mengedit warna foto di Adobe Lightroom, merapikan video di Premiere Pro dan CapCut, serta membersihkan suara rekaman.
            </p>
          </div>
        </div>

        {/* Wadah Portofolio (Tanpa Kapsul) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-950 text-white border border-neutral-800 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Galeri Contoh Foto &amp; Video
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Bagian ini disiapkan untuk menampilkan contoh foto hasil jepretan kamera, tautan cuplikan video pernikahan, dan dokumenter sekolah.
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
