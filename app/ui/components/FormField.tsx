'use client';

import React, { useState } from 'react';

// Interface for Country
interface Country {
  value: string;
  label: string;
}

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
}> = React.memo(({ id, label, name, value, onChange, disabled, type = 'text', placeholder, required, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-white/5 rounded-sm p-4 backdrop-blur-xl  shadow-lg" style={{
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
    }}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-200 mb-3">
        {label}
      </label>
      {options ? (
        <div className="relative">
          <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            disabled={disabled}
            required={required}
            aria-required={required}
            className="appearance-none mt-1 block w-full px-3 py-2.5 text-gray-200 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 disabled:opacity-50 hover:bg-white/20 transition-all duration-300 cursor-pointer pr-10"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            <option value="" className="text-gray-400 bg-white/10">
              Select a country
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value} className="text-white bg-white/10">
                {option.label}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow */}
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className={`h-5 w-5 text-white/80 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
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
          className="mt-1 block w-full px-3 py-2 text-gray-200 bg-white/6 backdrop-blur-md border border-white/6 rounded-sm shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
        />
      )}
    </div>
  );
});

// Add display name
FormField.displayName = 'FormField';

export default FormField;