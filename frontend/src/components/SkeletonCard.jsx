import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-darkCard rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden h-full shadow-sm">
      {/* Image placeholder */}
      <div className="aspect-video skeleton" />

      <div className="p-6 space-y-3">
        {/* Category pill */}
        <div className="skeleton h-4 w-20 rounded-full" />
        {/* Title lines */}
        <div className="skeleton h-5 w-full rounded-lg" />
        <div className="skeleton h-5 w-4/5 rounded-lg" />
        {/* Excerpt */}
        <div className="skeleton h-3.5 w-full rounded-md mt-4" />
        <div className="skeleton h-3.5 w-full rounded-md" />
        <div className="skeleton h-3.5 w-3/4 rounded-md" />

        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {/* Author block */}
          <div className="flex items-center space-x-3">
            <div className="skeleton w-8 h-8 rounded-full" />
            <div className="space-y-1.5">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-2.5 w-14 rounded" />
            </div>
          </div>
          {/* Read more placeholder */}
          <div className="skeleton h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
