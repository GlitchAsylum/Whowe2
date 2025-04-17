import Image from "next/image";
import Link from "next/link";
import styles from '@/app/ui/components/navbar/Navbar.module.css';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-92px)]">
      <main className="flex flex-col gap-[32px] items-center text-center">
        <Image
          className="svg-component"
          src="/whowe_logo_noText.svg"
          alt="Whowe logo"
          width={180}
          height={40}
          priority
        />
        <h1 className="text-7xl font-bold leading-tight tracking-[.05em]">Whowe</h1>
        <h1 className="text-4xl font-bold leading-tight tracking-[.05em]">Everyone has a story.</h1>
        <div className="sm:text-left w-112 leading-tight tracking-[.05em] text-center">
          Whowe is a revolutionary social history platform designed to help you record, share, and even sell your life stories and traditions to current and future generations.
        </div>
        <Link href="/discover" className={styles.navItem}>
          LEAVE YOUR MARK
        </Link>           
      </main>
 
    
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a> */}
      </footer>
    </div>
  );
}
