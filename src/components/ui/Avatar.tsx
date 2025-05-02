import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt, 
  size = 'md', 
  className = '' 
}) => {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  return (
    <div className={`relative rounded-full overflow-hidden ${sizes[size]} ${className}`}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
          {alt.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};