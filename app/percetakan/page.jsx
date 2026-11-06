import Link from 'next/link'

export const metadata = {
  title: 'Portofolio Percetakan, Dus Kemasan & Sablon — Muhari Amsori',
  description: 'Pengalaman kerja percetakan 3 tahun, setting CorelDRAW, gambar pola pisau pond dus kemasan, dan pisah warna sablon.',
}

export default function PercetakanPortfolioPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Bersih */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950">&larr; Kembali ke Halaman Utama</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Desainer Katalog Percetakan &amp; Sablon</span>
        </div>

        {/* Judul & Deskripsi Langsung Tanpa Kapsul */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-950 mb-4 tracking-tight">
            Desainer Katalog Percetakan, Master Plat &amp; Sablon
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Saya memiliki pengalaman kerja selama 3 tahun di industri percetakan dan sablon digital (2018–2021). Keahlian saya berfokus pada desain katalog produk, tata letak master plat cetak offset (CTP &amp; master kertas), pisah warna film kalkir sablon, serta pengoperasian mesin laser cetak harian.
          </p>
        </div>

        {/* Banner Portofolio Pra-Cetak & Percetakan 16:9 Mix Silang (Bersih Tanpa Kapsul & Shadow Kental) */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 group">
          <img
            src="/portfolio/percetakan/percetakan-banner-web.jpg"
            alt="Workstation Setting Pra-Cetak & Laser Printer Percetakan - Muhari Amsori"
            className="w-full h-auto block"
          />
        </div>

        {/* 3 Kotak Keahlian Cetak */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">CETAK OFFSET &amp; INDUSTRI</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Master Plat CTP &amp; Kertas</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Menyiapkan layout master plat cetak offset (CTP dan master kertas) untuk mesin cetak Heidelberg SM52 dengan perhitungan presisi lembar bahan plano.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">SABLON KAOS &amp; KAIN</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Pisah Warna Film Kalkir</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Memisahkan lapisan warna gambar ke lembar kalkir afdruk sablon secara pas dengan tanda titik patokan register agar tidak bergeser.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-2">
            <div className="text-xs font-mono font-bold text-neutral-500">DESAIN KATALOG PRODUK</div>
            <h4 className="font-display font-bold text-base text-neutral-950">Layout Katalog &amp; Tracing Vektor</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Layout katalog produk bisnis, nota rangkap NCR, buku Yasin, serta menggambar ulang vektor logo buram menjadi format kurva vektor tajam di CorelDRAW.
            </p>
          </div>
        </div>

        {/* Wadah Portofolio (Tanpa Kapsul) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-950 text-white border border-neutral-800 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Galeri Contoh Desain Kemasan &amp; Cetak
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Bagian ini disiapkan untuk menampilkan gambar pola dus kemasan, foto spanduk, brosur, nota bon, dan contoh sablon yang pernah saya kerjakan.
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
