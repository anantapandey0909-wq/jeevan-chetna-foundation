import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Jeevan Chetna Foundation – Digital Community & Activity Portal',
  description: 'Digital Community & Activity Portal for Jeevan Chetna Foundation (Haldwani, Nainital, Uttarakhand).',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#fdfcfb] text-slate-900 antialiased selection:bg-forest-100 selection:text-forest-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
