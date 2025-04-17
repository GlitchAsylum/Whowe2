import type { Metadata } from "next";
import { Montserrat, Poppins } from 'next/font/google';
import '@/app/ui/global/reset.css';
import '@/app/ui/global/global.css';
import Navbar from '@/app/ui/components/navbar/Navbar';
import Footer from '@/app/ui/components/footer/Footer';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  weight: ['400', '700'], 
  style: ['normal', 'italic'], 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat', 
});

export const metadata: Metadata = {
  title: "Whowe",
  description: "Whowe is a revolutionary social history platform designed to help you record, share, and even sell your life stories and traditions to current and future generations.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}


