import Link from 'next/link'

export const metadata = {
  title: 'Portofolio Pengalaman Kerja Pabrik & Sertifikat — Muhari Amsori',
  description: 'Riwayat kerja resmi di PT Prakarsa Alam Segar (Wings Group), PT Metindo Era Sakti, PT Agility International, dan sertifikat pelatihan Solidworks.',
}

export default function ManufakturPortfolioPage() {
  return (
    <div className="pt-28 pb-20 bg-white text-neutral-900">
      <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Bersih */}
        <div className="mb-6 flex items-center gap-2 text-xs font-mono text-neutral-500">
          <Link href="/" className="hover:text-neutral-950">&larr; Kembali ke Halaman Utama</Link>
          <span>/</span>
          <span className="text-neutral-950 font-semibold">Adaptasi Robotika &amp; Pabrik</span>
        </div>

        {/* Judul & Deskripsi Langsung Tanpa Kapsul */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-neutral-950 mb-4 tracking-tight">
            Adaptasi Penggunaan Alat Robotika &amp; Operasional Pabrik
          </h1>
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-3xl">
            Saya bisa cepat beradaptasi dengan penggunaan alat-alat robot industri dan otomasi pabrik (seperti operator robot las 6-axis OTC Daihen FD-V6 di PT Metindo Era Sakti), jalur konveyor mesin pengemasan (Wings Group), dan sistem pergudangan logistik (PT Agility). Cepat mempelajari antarmuka mesin baru, disiplin K3 tinggi, dan siap ketahanan fisik kerja shift.
          </p>
        </div>

        {/* Banner Portofolio Manufaktur 16:9 (Bersih Tanpa Kapsul & Shadow Kental) */}
        <div className="mb-12 rounded-3xl overflow-hidden border border-neutral-200/90 bg-neutral-100 shadow-[0_4px_16px_-2px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.18)] transition-all duration-300 group">
          <img
            src="/portfolio/manufaktur/manufaktur-banner-web.jpg"
            alt="Operator Robot Las OTC Daihen PT Metindo Era Sakti - Muhari Amsori"
            className="w-full h-auto block"
          />
        </div>

        {/* 3 Kotak Pengalaman Pabrik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-3">
            <span className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider block">
              2015 — 2016 • Pabrik Makanan
            </span>
            <h3 className="text-lg font-display font-extrabold text-neutral-950">PT Prakarsa Alam Segar (Wings Group)</h3>
            <div className="text-xs font-semibold text-neutral-700">Operator Packing Pengemasan</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Bekerja di bagian pengepakan makanan cepat saji dengan mengikuti kecepatan ban berjalan mesin pabrik dan menjaga kebersihan higienis makanan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-3">
            <span className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider block">
              2017 — 2018 • Pabrik Otomotif
            </span>
            <h3 className="text-lg font-display font-extrabold text-neutral-950">PT Metindo Era Sakti</h3>
            <div className="text-xs font-semibold text-neutral-700">Operator Robot Las (OTC Daihen FD-V6)</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Mengoperasikan bilik robot las otomatis presisi OTC Daihen 6-axis untuk suku cadang kendaraan otomotif dengan kepatuhan penuh standar keselamatan K3 pabrik.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] space-y-3">
            <span className="text-[11px] font-mono text-neutral-500 font-semibold uppercase tracking-wider block">
              2018 • Pergudangan Logistik
            </span>
            <h3 className="text-lg font-display font-extrabold text-neutral-950">PT Agility International</h3>
            <div className="text-xs font-semibold text-neutral-700">Staff Outbound Gudang</div>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Melakukan pemindaian barcode barang keluar dari gudang, mencocokkan muatan fisik dengan surat jalan manifest barang ekspor-impor.
            </p>
          </div>
        </div>

        {/* Wadah Sertifikat & Paklaring (Tanpa Kapsul) */}
        <div className="p-8 sm:p-12 rounded-2xl bg-neutral-950 text-white border border-neutral-800 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
            Sertifikat Pelatihan Solidworks &amp; Surat Pengalaman Kerja (Paklaring)
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Dilengkapi sertifikat resmi pelatihan desain teknik Solidworks dari RoemahCAD (2021) serta surat keterangan kerja resmi dari masing-masing perusahaan.
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
