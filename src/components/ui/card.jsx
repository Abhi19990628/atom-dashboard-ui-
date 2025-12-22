import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`rounded-lg ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
