import React from 'react';

const Loader = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  const spinner = (
    <div
      className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-t-primary-600 border-r-transparent border-b-primary-600 border-l-transparent animate-spin`}
      style={{ borderStyle: 'solid', borderColor: 'rgba(139, 92, 246, 0.15)', borderTopColor: '#8b5cf6', borderBottomColor: '#8b5cf6' }}
    />
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-darkBg transition-colors duration-300">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-4">{spinner}</div>;
};

export default Loader;
