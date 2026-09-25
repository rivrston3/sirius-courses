import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', axes: ['SOFT', 'WONK'] });

export const metadata: Metadata = {
  title: 'Sirius Bioregional Learning Center',
  description: 'Community-led education and land-based learning at Sirius.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <header className="py-6 px-8 border-b border-sirius-sand bg-white/50 backdrop-blur">
          <div className="max-w-6xl mx-auto flex items-baseline justify-between">
            <h1 className="text-2xl font-serif text-sirius-green tracking-tight font-medium">Sirius Learning Center</h1>
            <nav className="text-sm font-medium space-x-6">
              <a href="#" className="hover:text-sirius-clay transition-colors">Courses</a>
              <a href="#" className="hover:text-sirius-clay transition-colors">About</a>
              <a href="mailto:education@siriuscommunity.org" className="text-sirius-clay hover:underline">Teach</a>
            </nav>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="py-12 px-8 bg-sirius-green text-sirius-sand mt-auto">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div>
              <h3 className="font-serif text-xl mb-4 text-white">Sirius Community</h3>
              <p className="opacity-80 max-w-sm">
                An intentional community and ecovillage in the Pioneer Valley dedicated to spiritual practice, ecological sustainability, and education.
              </p>
            </div>
            <div className="md:text-right space-y-2 opacity-80">
              <p>education@siriuscommunity.org</p>
              <p>Shutesbury, MA</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
