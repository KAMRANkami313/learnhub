import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  themeColor: '#06060c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://learnhub.app'),
  title: {
    default: 'LearnHub — Next-Gen Learning Dashboard',
    template: '%s · LearnHub',
  },
  description:
    'A futuristic, animated education dashboard built with Next.js, Supabase, and Framer Motion. Track courses, visualize activity, and grow your skills.',
  keywords: ['learning', 'dashboard', 'courses', 'progress', 'supabase', 'next.js', 'education'],
  authors: [{ name: 'LearnHub' }],
  openGraph: {
    title: 'LearnHub — Next-Gen Learning Dashboard',
    description: 'Track your learning journey with a beautiful, animated dashboard.',
    type: 'website',
    siteName: 'LearnHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnHub — Next-Gen Learning Dashboard',
    description: 'Track your learning journey with a beautiful, animated dashboard.',
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