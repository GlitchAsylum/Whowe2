'use client';
import Image from 'next/image';
import Button from '@/app/ui/components/buttons/Button';
import { useCallback } from 'react';

// Define types for better type safety
interface AboutUsContent {
  title: string;
  story: string;
  description: string;
  solution: string;
  buttonText: string;
}

const aboutUsContent: AboutUsContent = {
    title: 'Our Story',
    description:
    'As we traverse the seasons of life, we mourn the loss of those who have slipped away. With each departure, a unique narrative fades into silence. Gone is the tale of Sai, an orphan who became a soldier and then a pastor desperately trying to leave a record of his life experience before, during and after the Vietnam War that brought him and his family to America. With each fading generation, we think about our human connection. What experience and wisdom would they have passed down to us that we could learn from.  Who were they, what were their beliefs, culture and traditions?',
    story: 
    'The wind carried the scent of rain as Sai knelt beside the flickering candle, its frail light dancing on the walls of his modest study. Outside, the world spun through another autumn, leaves spiraling like memories too fragile to hold. At seventy-two, Sai felt the weight of time pressing against him, each heartbeat a reminder of stories slipping through his fingers. His trembling hands clutched a worn notebook, its pages filled with fragments of a life that began in the ashes of loss and stretched across continents, wars, and moments of grace and redemption.',
    solution: 
    'At Whowe, we are driven by a mission to amplify the narrative of every unique individual. Our goal is to provide a platform where every voice can shine, free from the influence of those who decide who wins and who loses. We believe in the power of individuality and the importance of every person’s story. By capturing and sharing these meaningful stories and traditions, we strive to preserve and strengthen the bonds of human connection.',
    buttonText: 'SHARE YOUR STORY',
};

export default function AboutUs() {
  const handleClick = useCallback(() => {
    console.log('Button Clicked!');
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <main className="mb-40 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 text-center px-4">
        <Image
          src="/whowe_logo_noText.svg"
          alt="Whowe logo"
          width={120}
          height={40}
          priority
          sizes="(max-width: 768px) 100vw, 120px"
          style={{ objectFit: 'contain' }}
        />
        <h1 className="text-4xl font-bold tracking-[0.05em] md:text-5xl">{aboutUsContent.title}</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
          {aboutUsContent.story}
        </p>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
          {aboutUsContent.description}
        </p>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
          {aboutUsContent.solution}
        </p>
        <Button
          onClick={handleClick}
          variant="glass"
          size="large"
          className="w-full max-w-xs"
          aria-label="Start sharing your story"
        >
          {aboutUsContent.buttonText}
        </Button>
      </main>
    </div>
  );
}