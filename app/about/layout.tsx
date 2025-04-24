import type { Metadata } from "next";
import '@/app/ui/global/global.css';

export const metadata: Metadata = {
  title: "About Us",
  description: "Whowe is a revolutionary social history platform designed to help you record, share, and even sell your life stories and traditions to current and future generations.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
      <div>
        {children}
      </div>
  );
}