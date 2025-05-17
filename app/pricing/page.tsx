'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../ui/components/buttons/Button';

// TypeScript interfaces
interface PricingPlan {
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

interface PricingCardProps extends PricingPlan {
  onSelect: (title: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ title, price, features, isPopular = false, onSelect }) => {
  return (
    <div
      className={`bg-white/6 p-6 rounded-sm shadow-lg flex flex-col ${isPopular ? 'border-2 border-blue-500' : 'border border-white/6'}`}
    >
      {isPopular && (
        <span className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-medium px-3 py-1 rounded-bl-md">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="mt-4 text-3xl font-semibold text-white">{price}</p>
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm text-white/80">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onSelect(title)}
        className={`mt-6 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          title === 'Free'
            ? 'bg-gray-600 text-white/80 cursor-not-allowed'
            : 'bg-green-600 text-white hover:bg-green-700'
        }`}
        disabled={title === 'Free'}
        aria-label={`Select ${title} plan`}
      >
        {title === 'Free' ? 'Current Plan' : 'Choose Plan'}
      </button>
    </div>
  );
};

export default function PricingPage() {
  const router = useRouter();

  const plans: PricingPlan[] = [
    {
      title: 'Dabbler',
      price: '$0/month',
      features: [
        'Basic profile customization',
        'Limited map access',
        'Public visibility option',
        'Community support',
      ],
    },
    {
      title: 'Storyteller',
      price: '$9.99/month',
      features: [
        'Advanced profile customization',
        'Unlimited map access',
        'Private visibility option',
        'Priority email support',
        'Custom avatar uploads',
        'Can sell stories'
      ],
      isPopular: true,
    },
    {
      title: 'Biographer',
      price: '$29.99/month',
      features: [
        'All Pro features',
        'Team account management',
        'Dedicated account manager',
        'API access',
        'Custom branding',
      ],
    },
        {
      title: 'Group',
      price: 'Contact for price',
      features: [
        'All Pro features',
        'Team account management',
        'Dedicated account manager',
        'API access',
        'Custom branding',
      ],
    },
        {
      title: 'Enterprise',
      price: 'Contact us for pricing',
      features: [
        'All Pro features',
        'Team account management',
        'Dedicated account manager',
        'API access',
        'Custom branding',
      ],
    },
  ];

  const handleSelectPlan = useCallback(
    (planTitle: string) => {
      if (planTitle !== 'Free') {
        // In a real app, this would redirect to a checkout page
        router.push(`/checkout?plan=${planTitle.toLowerCase()}`);
      }
    },
    [router]
  );

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white">Choose Your Plan</h1>
          <p className="mt-4 text-lg text-white/80">
            Unlock premium features to enhance your experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PricingCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
        <div className="text-center">
          <Button
            onClick={() => router.push('/profile')}
            className="text-sm text-white/80 hover:text-white underline transition-colors duration-300"
            aria-label="Return to profile page"
          >
            Back to Profile
          </Button>
        </div>
      </div>
    </div>
  );
}