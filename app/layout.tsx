import type { Metadata } from "next";
import '@/app/ui/global/global.css';
import Navbar from '@/app/ui/components/navbar/Navbar';
import Footer from '@/app/ui/components/footer/Footer';
import { montserrat } from '@/app/lib/fonts';

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


