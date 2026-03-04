import type { Metadata } from 'next';
import { Epilogue, Red_Hat_Display, Sora } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const epilogue = Epilogue({
  variable: '--font-epilogue',
  subsets: ['latin'],
});

const sora = Sora({
  variable: '--font-heading',
  subsets: ['latin'],
});

const redHatDisplay = Red_Hat_Display({
  variable: '--font-brand',
  subsets: ['latin'],
});

const appName = process.env.NEXT_PUBLIC_APP_NAME?.trim() || 'QuickHire';

export const metadata: Metadata = {
  title: `${appName} | Find your dream job`,
  description: 'Discover more than 5000+ Jobs. Great platform for the job seeker.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${epilogue.variable} ${sora.variable} ${redHatDisplay.variable} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
