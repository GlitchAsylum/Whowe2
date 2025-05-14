'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

// TypeScript interfaces for type safety
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
  subscriptionPlan: string; // Added subscriptionPlan
}

interface Country {
  value: string;
  label: string;
}

// Static country list (subset for demo; use library like `countries-list` for full list)
const COUNTRIES: Country[] = [
  { value: 'USA', label: 'United States' },
  { value: 'CAN', label: 'Canada' },
  { value: 'FRA', label: 'France' },
  { value: 'JPN', label: 'Japan' },
  { value: 'SGP', label: 'Singapore' },
  { value: 'AUS', label: 'Australia' },
  { value: 'DEU', label: 'Germany' },
];

// Reusable FormField component
const FormField: React.FC<{
  id: string;
  label: string;
  name: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: Country[];
}> = React.memo(({ id, label, name, value, onChange, disabled, type = 'text', placeholder, required, options }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-900">
      {label}
    </label>
    {options ? (
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
      >
        <option value="">Select a country</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        required={required}
        aria-required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
      />
    )}
  </div>
));

// Reusable RadioGroup component
const RadioGroup: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}> = React.memo(({ name, value, onChange, disabled }) => (
  <fieldset>
    <legend className="block text-sm font-medium text-gray-900">Profile Visibility</legend>
    <div className="mt-2 flex space-x-4">
      {['public', 'private'].map((option) => (
        <div key={option} className="flex items-center">
          <input
            id={`${name}-${option}`}
            name={name}
            type="radio"
            value={option}
            checked={value === option}
            onChange={onChange}
            disabled={disabled}
            className="h-4 w-4 text-blue-600 focus:ring-2 focus:ring-blue-500 border-gray-300 disabled:opacity-50"
            aria-checked={value === option}
          />
          <label htmlFor={`${name}-${option}`} className="ml-2 text-sm text-gray-900 capitalize">
            {option}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
));

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    nickname: 'Johnny',
    avatar: '/default-avatar.png',
    email: 'john.doe@example.com',
    memberId: 'M123456789',
    visibility: 'public',
    location: { city: 'New York', state: 'NY', country: 'USA' },
    subscriptionPlan: 'Free', // Added Free plan
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatar);
  const [activeTab, setActiveTab] = useState<'profile' | 'account'>('profile');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setError(''); // Clear error on input change
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
      // Send updated profile data to backend
    },
    [user.location.country, previewAvatar]
  );

  const handleAccountSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingAccount(false);
    // Send updated account data to backend
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
    // Placeholder for upgrade functionality (e.g., redirect to payment page)
    alert('Redirect to upgrade page (e.g., /pricing)');
    // Example: window.location.href = '/pricing';
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-center text-3xl font-bold text-gray-900">User Settings</h1>

        {/* Tabs */}
        <nav className="border-b border-gray-200" aria-label="Settings tabs">
          <div className="-mb-px flex space-x-8">
            {['profile', 'account'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'profile' | 'account')}
                className={`${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
                    className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <p className="text-sm text-gray-900">
                  Location: {user.location.city}
                  {user.location.state && `, ${user.location.state}`}
                  {user.location.country && `, ${user.location.country}`}
                </p>
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
                <RadioGroup
                  name="visibility"
                  value={user.visibility}
                  onChange={handleChange}
                  disabled={!isEditingProfile}
                />
              </div>
              <div className="flex justify-end space-x-3">
                {isEditingProfile ? (
                  <>
                    <button
                      type="button"
                      onClick={handleProfileCancel}
                      className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Cancel profile changes"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Save profile changes"
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Edit profile"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Account Tab */}
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
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Cancel account changes"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Save account changes"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingAccount(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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