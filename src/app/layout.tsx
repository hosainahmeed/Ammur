import type { Metadata } from 'next';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    default:'Family legacy',
    template:'%s - Family legacy'
  },
  description: 'Honoring our history while shaping a brighter future. Together, we preserve the past and inspire tomorrow‘s possibilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <NextTopLoader />
        <Toaster position='top-center' />
        {children}
      </body>
    </html>
  );
}
