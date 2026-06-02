import React from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-9xl font-extrabold text-primary-500/20 dark:text-primary-400/10 tracking-widest select-none">
          404
        </h1>
        <h2 className="mt-4 text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Page Not Found
        </h2>
        <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back home!
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-md shadow-primary-500/20 transition-all hover:scale-105 active:scale-95 text-sm inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Feed</span>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
