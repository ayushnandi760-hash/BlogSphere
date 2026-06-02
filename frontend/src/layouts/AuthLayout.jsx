import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-darkBg p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-darkCard rounded-3xl shadow-xl p-8 sm:p-10 border border-slate-100 dark:border-slate-800 transition-all duration-300">
        
        {/* Brand Link & Brand Visual */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 text-2xl font-extrabold text-primary-600 dark:text-primary-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>BlogSphere</span>
          </Link>
          {title && (
            <h2 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Body Slot */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
