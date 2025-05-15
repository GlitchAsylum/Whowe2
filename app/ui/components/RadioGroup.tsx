'use client';

import React from 'react';

// Reusable RadioGroup component
const RadioGroup: React.FC<{
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}> = React.memo(({ name, value, onChange, disabled }) => (
  <fieldset>
    <legend className="block text-sm font-medium text-gray-400">Profile Visibility</legend>
    <div className="mt-2 flex space-x-4">
      {['public', 'private'].map((option) => (
        <div
          key={option}
          className="flex items-center rounded-md bg-white/10 backdrop-blur-md border border-white/20 p-2 shadow-sm transition-all duration-300 hover:bg-white/20"
        >
          <input
            id={`${name}-${option}`}
            name={name}
            type="radio"
            value={option}
            checked={value === option}
            onChange={onChange}
            disabled={disabled}
            className="appearance-none h-5 w-5 border border-white/30 rounded-full bg-transparent checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 cursor-pointer transition-all duration-300 relative
                       before:content-[''] before:absolute before:h-2.5 before:w-2.5 before:bg-white before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:scale-0 checked:before:scale-100 before:transition-transform before:duration-300"
            aria-checked={value === option}
          />
          <label
            htmlFor={`${name}-${option}`}
            className="ml-2 text-sm text-gray-200 capitalize cursor-pointer select-none"
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
));

export default RadioGroup;

