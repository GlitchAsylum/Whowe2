import type { Metadata } from "next";
import '@/app/ui/global/global.css';

export const metadata: Metadata = {
  title: "Words for the World",
  description: "Words for the World gives people a voice to express their opinion on the state of the world.",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
      <div>
        {children}
      </div>
  );
}