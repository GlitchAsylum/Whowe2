'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import FormField from '@/app/ui/components/FormField';
import { PencilIcon, MapPinIcon } from '@heroicons/react/24/outline'; // Add MapPinIcon

// TypeScript interfaces (unchanged)
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

// Static country list (unchanged)
const COUNTRIES: Country[] = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'FRA', label: 'France' },
  { value: 'JPN', label: 'Japan' },
  { value: 'SGP', label: 'Singapore' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
];

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
    profile: 'Software developer with a passion for AI and open-source projects.',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); // Initialize router

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      if (name.startsWith('location.')) {
        const field = name.split('.')[1] as keyof Location;
        setUser((prev) => ({
          ...prev,
          location: { ...prev.location, [field]: value },
        }));
      } else {
        setUser((prev) => ({ ...prev, [name]: value }));
      }
      setError('');
    },
    []
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
      setError('');
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
    // Navigate to /map with location as query parameters
    const { city, state, country } = user.location;
    const query = new URLSearchParams({
      city: city || '',
      state: state || '',
      country: country || '',
    }).toString();
    router.push(`/map?${query}`);
  }, [user.location, router]);

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center py-12 px-4 mb-20 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/6 p-8 rounded-sm shadow-lg">
        {/* Header and Edit Profile Button */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Who I Am</h1>
          {!isEditingProfile && activeTab === 'profile' && (
            <button
              type="button"
              onClick={() => setIsEditingProfile(true)}
              className="ml-4 px-4 py-2 bg-white/6 text-white rounded-md text-sm font-medium hover:bg-white/12 transition-color duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer flex items-center"
              aria-label="Edit profile"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit Profile
            </button>
          )}
        </div>

        {/* Tabs */}
        <nav className="border-b border-gray-600" aria-label="Settings tabs">
          <div className="-mb-px flex space-x-8">
            {['profile', 'account'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'profile' | 'account')}
                className={`${
                  activeTab === tab
                    ? 'border-white text-white'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-200 transition-all duration-300 cursor-pointer'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                aria-current={activeTab === tab ? 'page' : undefined}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </nav>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div>
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={previewAvatar}
                  alt="User avatar"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                />
                {isEditingProfile && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-white/12 border border-[#c6e1e7] text-[#c6e1e7] rounded-full p-2 hover:bg-white/24 hover:border-white/6 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
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
            {!isEditingProfile && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={handleLocationClick}
                  className="inline-flex items-center px-4 py-2 bg-white/6 text-white rounded-md text-sm font-medium hover:bg-white/12 transition-color duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  aria-label="View location on map"
                >
                  <MapPinIcon className="h-5 w-5 mr-2" />
                  Location: {user.location.city}
                  {user.location.state && `, ${user.location.state}`}
                  {user.location.country && `, ${user.location.country}`}
                </button>
                <p className="text-sm text-white mt-2">Bio: {user.profile}</p>
              </div>
            )}
            <form onSubmit={handleProfileSubmit} className="mt-8 space-y-6">
              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-red-600 bg-red-100 p-2 rounded-md"
                >
                  {error}
                </div>
              )}
              <div className="space-y-4">
                <FormField
                  id="name"
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  disabled={!isEditingProfile}
                  required
                />
                <FormField
                  id="nickname"
                  label="Nickname"
                  name="nickname"
                  value={user.nickname}
                  onChange={handleChange}
                  disabled={!isEditingProfile}
                />
                <FormField
                  id="location.city"
                  label="City"
                  name="location.city"
                  value={user.location.city}
                  onChange={handleChange}
                  disabled={!isEditingProfile}
                  placeholder="e.g., Tokyo, Paris"
                />
                <FormField
                  id="location.state"
                  label="State/Province/Region (Optional)"
                  name="location.state"
                  value={user.location.state}
                  onChange={handleChange}
                  disabled={!isEditingProfile}
                  placeholder="e.g., NY, Ontario, or leave blank"
                />
                <FormField
                  id="location.country"
                  label="Country"
                  name="location.country"
                  value={user.location.country}
                  onChange={handleChange}
                  disabled={!isEditingProfile}
                  required
                  options={COUNTRIES}
                />
              </div>
              <div className="flex justify-end space-x-3">
                {isEditingProfile && (
                  <>
                    <button
                      type="button"
                      onClick={handleProfileCancel}
                      className="px-4 py-2 rounded-md text-sm font-medium text-[#c6e1e7] transition-color duration-300 hover:bg-white/6 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      aria-label="Cancel profile expireditIcon changes"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-white/6 text-[#c6e1e7] rounded-sm text-sm font-medium transition-color duration-300 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      aria-label="Save profile changes"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Account Tab (unchanged) */}
        {activeTab === 'account' && (
          <form onSubmit={handleAccountSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
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
                disabled={!isEditingAccount}
                required
              />
              <FormField
                id="profile"
                label="Profile"
                name="profile"
                value={user.profile}
                onChange={handleChange}
                disabled={!isEditingAccount}
              />
              <FormField
                id="password"
                label="Password"
                name="password"
                type="password"
                value=""
                onChange={handleChange}
                disabled={!isEditingAccount}
                placeholder={isEditingAccount ? 'Enter new password' : '••••••••'}
              />
              <div className="flex items-center space-x-4">
                <FormField
                  id="subscriptionPlan"
                  label="Subscription Plan"
                  name="subscriptionPlan"
                  value={user.subscriptionPlan}
                  disabled
                />
                <button
                  type="button"
                  onClick={handleUpgradeClick}
                  className="px-4 py-2 bg-green-600 text-white rounded-sm text-sm font-medium hover:bg-green-700 transition-color duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                  aria-label="Upgrade subscription plan"
                >
                  Upgrade
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              {isEditingAccount ? (
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
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingAccount(true)}
                  className="px-4 py-2 bg-white/6 text-white rounded-sm text-sm font-medium hover:bg-white/12 transition-color duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Edit account"
                >
                  Edit Account
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}