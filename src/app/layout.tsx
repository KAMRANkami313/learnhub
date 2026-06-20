import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#05050a',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'LearnHub — Next-Gen Learning Dashboard',
  description:
    'A futuristic, animated education dashboard built with Next.js, Supabase, and Framer Motion. Track courses, visualize activity, and grow your skills.',
  keywords: ['learning', 'dashboard', 'courses', 'progress', 'supabase', 'next.js'],
  openGraph: {
    title: 'LearnHub — Next-Gen Learning Dashboard',
    description: 'Track your learning journey with a beautiful, animated dashboard.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
