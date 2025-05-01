'use client';
import Image from 'next/image';
import Button from '@/app/ui/components/buttons/Button';
import { useCallback } from 'react';

// Define types for better type safety
interface AboutUsContent {
  title: string;
  subtitle: string;
  mission: string;
  story: string;
  values: string;
  team: { member: string }[];
  usp: string;
  audience: string;
  achievements: string;
  contact: {
    email: string;
    contactForm: string;
    socialMedia: { platform: string; url: string }[];
  };
  buttonText: string;
}

const aboutUsContent: AboutUsContent = {
  title: 'About Us',
  subtitle: 'self-actualization and human connection through shared life experience.',
  mission: 'At Whowe, we believe that every person’s life experiences, traditions, and cultural heritage deserve to be preserved and shared. Our mission is to empower individuals of all ages to capture their stories with ease, ensuring that the wisdom and memories of today are cherished for generations to come. ',
  story: 'Launched in 2025',
  values: 'human connection',
  team: [
    { member: 'Trevor Lukanen' },
    { member: 'Yeng Lukanen' },
  ],
  usp: 'While our platform is designed to be accessible and intuitive for everyone, we have placed a special focus on empowering older adults. We understand that technology can sometimes feel overwhelming, which is why we’ve integrated cutting-edge accessibility features and user-friendly tools tailored specifically for seniors. From simplified interfaces to voice-activated recording options and clear, step-by-step guidance, our platform makes it effortless for older generations to document their legacies and share or even sell their traditions with loved ones or the world. Whether it’s a cherished family recipe, a heartfelt life lesson, or a story from decades past, we’re here to help seniors preserve what matters most—easily, confidently, and meaningfully.',
  audience: 'Focus on life experience not age',
  achievements: 'milestones or interactive timeline',
  contact: {
    email: 'support@whowe.com',
    contactForm: '/contact',
    socialMedia: [
      { platform: 'Twitter', url: 'https://twitter.com/whoweapp' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/whowe' },
      { platform: 'Facebook', url: 'https://facebook.com/company/whowe' },
    ],
  },
  buttonText: 'SHARE YOUR STORY',
};

export default function AboutUs() {
  const handleClick = useCallback(() => {
    console.log('Button Clicked!');
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <main className="mb-40 gap-8 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 text-center px-4">
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
        <h2 className="text-l font-bold tracking-[0.05em] md:text-xl">{aboutUsContent.subtitle}</h2>

        <div>
          <h3>Our Mission</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            {aboutUsContent.mission}
          </p>
        </div>
        <div>
          <h3>USP</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            {aboutUsContent.usp}
          </p>
        </div>
        <div className='pt-8'>
          <h3 className='mb-4'>Who uses Whowe?</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            {aboutUsContent.audience}
          </p>
        </div>
        <div>
          <h3>Our Story</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            {aboutUsContent.story}
          </p>
        </div>
        <div>
          <h3>Achievements</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            {aboutUsContent.achievements}
          </p>
        </div>
        <div>
          <h3>Our Values</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            {aboutUsContent.values}
          </p>
        </div>
        <div>
          <h3>Our Team</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            {aboutUsContent.team.map((member, index) => (
              <span key={index}>
                {member.member}
                {index < aboutUsContent.team.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>
        <div>
          <h3>Contact Us</h3>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-left text-gray-300 sm:text-lg">
            Reach out to us at{' '}
            <a href={`mailto:${aboutUsContent.contact.email}`} className="text-blue-400 hover:underline">
              {aboutUsContent.contact.email}
            </a>{' '}
            or visit our{' '}
            <a href={aboutUsContent.contact.contactForm} className="text-blue-400 hover:underline">
              contact form
            </a>
            .
          </p>
          <div className="mt-2">
            <h4 className="text-lg font-semibold">Follow Us</h4>
            <ul className="flex justify-center gap-4">
              {aboutUsContent.contact.socialMedia.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {social.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

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

//Personal Touch-team photos, handwritten notes/doodles to humanize and foster emotional connection.
//Gamification - interactive visuals
//Video introduction compelling story - storyboard it.
//personable be part of something, brand call to action to be part of something.
//outreach
//community relationship betwwen Whowe and individual.
// don't focus on age but life experience.
//GSM general social media vs MSM
//508 compliance and WCAG compliant
//self-actualization and human connection through shared life experience.