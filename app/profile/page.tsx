'use client';

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import FormField from '@/app/ui/components/FormField';
import { PencilIcon, MapPinIcon } from '@heroicons/react/24/outline';

// TypeScript interfaces
interface Location {
  city: string;
  state: string;
  country: string;
}

interface User {
  name: string;
  nickname: string;
  avatar: string;
  email: string;
  memberId: string;
  visibility: 'public' | 'private';
  location: Location;
  subscriptionPlan: string;
  profile: string;
}

interface Country {
  value: string;
  label: string;
}

// Static country list (moved outside component)
const COUNTRIES: Country[] = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'FRA', label: 'France' },
  { value: 'JPN', label: 'Japan' },
  { value: 'SGP', label: 'Singapore' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
];

// Reusable Tailwind classes
const buttonStyles =
  'px-4 py-2 bg-white/6 text-white rounded-md text-sm font-medium hover:bg-white/12 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center';
const cancelButtonStyles =
  'px-4 py-2 rounded-md text-sm font-medium text-[#c6e1e7] transition-colors duration-300 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer';
const saveButtonStyles =
  'px-4 py-2 bg-white/6 text-[#c6e1e7] rounded-md text-sm font-medium transition-colors duration-300 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer';

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    name: 'Yeng Lukanen',
    nickname: 'Brit',
    avatar: '/YL.jpeg',
    email: 'y.lukanen@gmail.com',
    memberId: 'M123456789',
    visibility: 'public',
    location: { city: 'St. Louis', state: 'Missouri', country: 'USA' },
    subscriptionPlan: 'Free',
    profile: 'We do not fail, we learn.',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileFormRef = useRef<HTMLFormElement>(null);
  const accountFormRef = useRef<HTMLFormElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const maxBioLength = 250;
  const remainingChars = useMemo(() => maxBioLength - user.profile.length, [user.profile]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setUser((prev) => ({
        ...prev,
        [name.startsWith('location.') ? 'location' : name]: name.startsWith('location.')
          ? { ...prev.location, [name.split('.')[1]]: value }
          : value,
      }));
      if (error) setError('');
    },
    [error]
  );

  const handleAvatarChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleProfileSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!user.location.country.trim()) {
        setError('Country is required');
        return;
      }
      setUser((prev) => ({ ...prev, avatar: previewAvatar }));
      setIsEditingProfile(false);
    },
    [user.location.country, previewAvatar]
  );

  const handleAccountSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingAccount(false);
  }, []);

  const handleProfileCancel = useCallback(() => {
    setIsEditingProfile(false);
    setPreviewAvatar(user.avatar);
    setError('');
  }, [user.avatar]);

  const handleAccountCancel = useCallback(() => {
    setIsEditingAccount(false);
  }, []);

  const handleUpgradeClick = useCallback(() => {
    alert('Redirect to upgrade page (e.g., /pricing)');
  }, []);

  const handleLocationClick = useCallback(() => {
    const { city, state, country } = user.location;
    const query = new URLSearchParams({ city: city || '', state: state || '', country: country || '' }).toString();
    router.push(`/map?${query}`);
  }, [user.location, router]);

  // Focus management for accessibility
  useEffect(() => {
    if (isEditingProfile && firstNameInputRef.current) {
      firstNameInputRef.current.focus();
    } else if (isEditingAccount && emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, [isEditingProfile, isEditingAccount]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center py-12 px-4 mb-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/6 p-8 rounded-sm shadow-lg">
        {/* Header and Edit Buttons */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Who I Am</h1>
          {!isEditingProfile && !isEditingAccount && (
            <button
              type="button"
              onClick={() => (activeTab === 'profile' ? setIsEditingProfile(true) : setIsEditingAccount(true))}
              className={`${buttonStyles} ml-4`}
              aria-label={`Edit ${activeTab}`}
              aria-expanded={activeTab === 'profile' ? isEditingProfile : isEditingAccount}
              aria-controls={activeTab === 'profile' ? 'profile-form' : 'account-form'}
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </button>
          )}
        </div>

        {/* Tabs */}
        <nav className="border-b border-gray-600" aria-label="Settings tabs">
          <div className="-mb-px flex space-x-8">
            {(['profile', 'account'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-200'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300`}
                aria-current={activeTab === tab ? 'page' : undefined}
                aria-label={`Switch to ${tab} tab`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <section aria-labelledby="profile-heading">
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={previewAvatar}
                  alt={`${user.name}'s avatar`}
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
                {isEditingProfile && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-white/12 border border-[#c6e1e7] text-[#c6e1e7] rounded-full p-2 hover:bg-white/24 hover:border-white/6 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Change avatar"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="mt-4 text-center">
              {!isEditingProfile && (
                <>
                  <button
                    type="button"
                    onClick={handleLocationClick}
                    className={`${buttonStyles} inline-flex items-center`}
                    aria-label="View location on map"
                  >
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    Location: {user.location.city}
                    {user.location.state && `, ${user.location.state}`}
                    {user.location.country && `, ${user.location.country}`}
                  </button>
                  <blockquote className="text-sm text-white mt-2 pl-4 border-l-4 border-white/50 text-left italic bg-white/6 py-2">
                    {user.profile}
                  </blockquote>
                </>
              )}
              {isEditingProfile && (
                <div className="mt-2">
                  <label htmlFor="profile" className="block text-sm font-medium text-white text-left">
                    Bio
                  </label>
                  <textarea
                    id="profile"
                    name="profile"
                    value={user.profile}
                    onChange={handleChange}
                    maxLength={maxBioLength}
                    className="mt-1 block w-full bg-white/6 text-white rounded-md border border-white/12 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={4}
                    placeholder="Enter your bio"
                    aria-describedby="profile-char-count profile-error"
                  />
                  <p
                    id="profile-char-count"
                    className="mt-1 text-sm text-white/80 text-left"
                    aria-live="polite"
                  >
                    {remainingChars}/{maxBioLength} characters remaining
                  </p>
                </div>
              )}
            </div>
            <form
              id="profile-form"
              ref={profileFormRef}
              onSubmit={handleProfileSubmit}
              className="mt-8 space-y-6"
              aria-labelledby="profile-heading"
            >
              {error && (
                <div
                  id="profile-error"
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-red-600 bg-red-100 p-2 rounded-md"
                >
                  {error}
                </div>
              )}
              <fieldset className="space-y-4" disabled={!isEditingProfile}>
                <FormField
                  id="name"
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                  ref={firstNameInputRef}
                  aria-describedby={error ? 'profile-error' : undefined}
                  aria-invalid={error ? 'true' : undefined}
                />
                <FormField
                  id="nickname"
                  label="Nickname"
                  name="nickname"
                  value={user.nickname}
                  onChange={handleChange}
                />
                <FormField
                  id="location.city"
                  label="City"
                  name="location.city"
                  value={user.location.city}
                  onChange={handleChange}
                  placeholder="e.g., Tokyo, Paris"
                />
                <FormField
                  id="location.state"
                  label="State/Province/Region (Optional)"
                  name="location.state"
                  value={user.location.state}
                  onChange={handleChange}
                  placeholder="e.g., NY, Ontario, or leave blank"
                />
                <FormField
                  id="location.country"
                  label="Country"
                  name="location.country"
                  value={user.location.country}
                  onChange={handleChange}
                  required
                  options={COUNTRIES}
                  aria-describedby={error ? 'profile-error' : undefined}
                  aria-invalid={error ? 'true' : undefined}
                />
              </fieldset>
              <div className="flex justify-end space-x-3">
                {isEditingProfile && (
                  <>
                    <button
                      type="button"
                      onClick={handleProfileCancel}
                      className={cancelButtonStyles}
                      aria-label="Cancel profile changes"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={saveButtonStyles}
                      aria-label="Save profile changes"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </section>
        )}

        {/* Account Tab */}
        {activeTab === 'account' && (
          <section aria-labelledby="account-heading">
            <form
              id="account-form"
              ref={accountFormRef}
              onSubmit={handleAccountSubmit}
              className="mt-8 space-y-6"
              aria-labelledby="account-heading"
            >
              <fieldset className="space-y-4" disabled={!isEditingAccount}>
                <FormField
                  id="memberId"
                  label="Member ID"
                  name="memberId"
                  value={user.memberId}
                  disabled
                />
                <FormField
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                  ref={emailInputRef}
                />
                <FormField
                  id="profile"
                  label="Profile"
                  name="profile"
                  value={user.profile}
                  onChange={handleChange}
                />
                <FormField
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  value=""
                  onChange={handleChange}
                  placeholder={isEditingAccount ? 'Enter new password' : '••••••••'}
                />
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <FormField
                      id="subscriptionPlan"
                      label="Subscription Plan"
                      name="subscriptionPlan"
                      value={user.subscriptionPlan}
                      disabled
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleUpgradeClick}
                    className="px-4 py-2 bg-green-600 text-white rounded-sm text-sm font-medium hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                    aria-label="Upgrade subscription plan"
                  >
                    Upgrade
                  </button>
                </div>
              </fieldset>
              <div className="flex justify-end space-x-3">
                {isEditingAccount && (
                  <>
                    <button
                      type="button"
                      onClick={handleAccountCancel}
                      className="px-4 py-2 border border-white/6 rounded-md text-sm font-medium text-gray-200 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Cancel account changes"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/6 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Save account changes"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
}