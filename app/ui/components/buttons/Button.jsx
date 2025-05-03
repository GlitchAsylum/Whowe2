import React from 'react';

const Button = ({ children, onClick, variant = 'primary', size = 'medium', disabled = false, className = '' }) => {
  const baseStyles = 'font-semibold rounded-sm transition-all duration-300';
  
  const variantStyles = {
    glass: 'bg-white/6 text-[#C6E1E7] hover:bg-white/12 hover:text-white active:scale-95 cursor-pointer',

  };

  const sizeStyles = {
    small: 'px-3 py-1.75 text-xs',
    medium: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;