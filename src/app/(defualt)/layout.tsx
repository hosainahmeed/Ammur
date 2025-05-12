import Footer from '@/components/share/Footer';
import Navbar from '@/components/share/Navbar';
import { AuthProvider } from '@/context/page';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <AuthProvider>
        {children}
      </AuthProvider>
      <Footer />
    </>
  );
}
