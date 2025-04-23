'use client'
import Image from "next/image";
import  Button from '@/app/ui/components/buttons/Button'




export default function Home() {
  const handleClick = () => {console.log("Button Clicked!")}
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-16rem)]">
      <main className="flex flex-col w-90 gap-4 items-center text-center">
        <Image
        className="mb-8"
          src="/whowe_logo_noText.svg"
          alt="Whowe logo"
          width={120}
          height={40}
          priority
        />
        <h1 className="text-4xl font-bold leading-tight tracking-[.05em]">Whowe</h1>
        <h3 className="text-xl font-bold leading-tight tracking-[.05em]">Everyone has a story.</h3>
        <div className="h-40 content-center  sm:text-left leading-tight tracking-[.05em] text-center">
          Whowe is a revolutionary social history platform designed to help you record, share, and even sell your life stories and traditions to current and future generations.
        </div>
        <Button onClick={handleClick} variant="glass" size="large" className="w-90">I HAVE A STORY TO TELL</Button>
      </main>
    </div>
  );
}
