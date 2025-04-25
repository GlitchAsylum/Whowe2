'use client';
import Image from 'next/image';
import Link from 'next/link'
import Button from '@/app/ui/components/buttons/Button';
import { useCallback } from 'react';

// Define types for better type safety
interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
}

const heroContent: HeroContent = {
  title: 'Whowe',
  subtitle: 'Everyone has a story.',
  description:
    'Whowe is a revolutionary social history platform designed to help you record, share, and even sell your life stories and traditions to current and future generations.',
  buttonText: 'SHARE YOUR STORY',
};

export default function Home() {
  const handleClick = useCallback(() => {
    console.log('Button Clicked!');
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <main className="mx-auto flex w-full max-width-90 flex-col items-center gap-6 text-center">
        <Image
          className="mb-8"
          src="/whowe_logo_noText.svg"
          alt="Whowe logo"
          width={120}
          height={40}
          priority
          sizes="(max-width: 768px) 100vw, 120px"
          style={{ objectFit: 'contain' }}
        />
        <h1 className="text-4xl font-bold tracking-[0.05em] md:text-5xl">{heroContent.title}</h1>
        <h3 className="text-xl font-semibold tracking-[0.05em] md:text-l">
          {heroContent.subtitle}
        </h3>
        <p className="mx-auto max-w-2xl text-base px-4 leading-relaxed tracking-[0.05em] text-gray-300 sm:text-lg">
          {heroContent.description}
        </p>
        <Button
          onClick={handleClick}
          variant="glass"
          size="large"
          className="w-full max-w-xs"
          aria-label="Start sharing your story"
        >
          {heroContent.buttonText}
        </Button>
        <Link href="/about">
            <Button
              onClick={handleClick}
              variant="glass"
              size="large"
              className="w-full"
              aria-label="Learn more about us"
            >
              About Us
            </Button>
          </Link>
      </main>
    </div>
  );
}
