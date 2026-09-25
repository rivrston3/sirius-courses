import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'WONK'],
});

export const metadata: Metadata = {
  title: 'Sirius Bioregional Learning Center',
  description: 'Community-led education and land-based learning at Sirius Community in Shutesbury, MA.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable}`} style={{ margin: 0, fontFamily: 'var(--font-inter), sans-serif', backgroundColor: '#faf9f5', color: '#1c2b23' }}>

        {/* Navigation */}
        <header style={{ backgroundColor: '#2c4c3b', padding: '0 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 0' }}>
            <span style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.35rem', color: '#f0ebe0', fontWeight: 400, letterSpacing: '-0.01em' }}>
              Sirius Bioregional Learning Center
            </span>
            <nav style={{ display: 'flex', gap: '2rem' }}>
              {[
                { label: 'Offerings', href: '#offerings' },
                { label: 'About', href: '#about' },
                { label: 'Teach', href: 'mailto:education@siriuscommunity.org' },
              ].map(link => (
                <a key={link.label} href={link.href} style={{ color: '#c5d8c8', fontSize: '0.9rem', textDecoration: 'none', fontWeight: 400 }}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer style={{ backgroundColor: '#2c4c3b', color: '#c5d8c8', padding: '4rem 2rem', marginTop: '6rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-fraunces), serif', fontSize: '1.2rem', color: '#f0ebe0', marginBottom: '0.75rem', fontWeight: 400 }}>
                Sirius Community
              </p>
              <p style={{ lineHeight: 1.7, opacity: 0.75, maxWidth: '320px', fontSize: '0.9rem' }}>
                An intentional community and ecovillage in the Pioneer Valley dedicated to spiritual practice, ecological sustainability, and education.
              </p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.9rem', opacity: 0.75 }}>
              <p style={{ marginBottom: '0.5rem' }}>education@siriuscommunity.org</p>
              <p>Shutesbury, MA — Pioneer Valley</p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
