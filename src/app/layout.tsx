import type { Metadata } from 'next';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import ReduxWrapper from './provider/Redux/ReduxWrapper';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketProvider } from '@/context/SocketContext';
import { UserProvider } from '@/context/userContext';
export const metadata: Metadata = {
  title: {
    default: 'Family legacy',
    template: '%s | Family legacy',
  },
  description:
    'Honoring our history while shaping a brighter future. Together, we preserve the past and inspire tomorrow‘s possibilities.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId as string}>
      <ReduxWrapper>
        <SocketProvider>
          <UserProvider>
            <html lang="en">
              <body className={`antialiased`}>
                <NextTopLoader />
                <Toaster
                  duration={1000}
                  mobileOffset={100}
                  richColors
                  position="top-center"
                />
                {children}
              </body>
            </html>
          </UserProvider>
        </SocketProvider>
      </ReduxWrapper>
    </GoogleOAuthProvider>
  );
}
