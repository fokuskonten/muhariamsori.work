import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import MotionProvider from '@/components/motion/MotionProvider'

export const metadata = {
  title: 'Muhari Amsori — Portofolio & Profil Profesional',
  description: 'Website resmi Muhari Amsori. Praktisi e-commerce marketplace, developer aplikasi Android native & desktop Windows, fotografi sinematik, serta setting pra-cetak percetakan.',
  authors: [{ name: 'Muhari Amsori', url: 'https://muhariamsori.work' }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                try {
                  if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                  }
                  var key = 'fk_scroll_' + window.location.pathname;
                  var saved = sessionStorage.getItem(key);
                  if (saved) {
                    var y = parseInt(saved, 10);
                    if (!isNaN(y) && y > 0) {
                      window.scrollTo(0, y);
                    }
                  }
                } catch(e) {}
                var d = document.documentElement;
                d.classList.add('fk-motion');
                setTimeout(function(){
                  if(!window.__fkMotionReady){
                    d.classList.remove('fk-motion');
                  }
                }, 3000);
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-950 selection:text-white">
        <MotionProvider />
        <Navbar />
        <main className="relative">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
