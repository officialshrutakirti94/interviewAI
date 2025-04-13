import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
}

export function Button({ children, variant = 'primary', className = '', onClick }: ButtonProps) {
  return (
    <button 
      className={`button ${variant === 'primary' ? 'button-primary' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}