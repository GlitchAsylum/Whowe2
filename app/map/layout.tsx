import type { Metadata } from "next";
import '@/app/ui/global/global.css';

export const metadata: Metadata = {
  title: "Location",
  description: "User Locations",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
      <div>
        {children}
      </div>
  );
}