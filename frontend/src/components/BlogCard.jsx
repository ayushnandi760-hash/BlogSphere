import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  const { id, title, content, category, coverImage, createdAt, author } = blog;

  // Format date helper: converts Java LocalDateTime array or string to standard date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return '';
    }
  };

  // Strip html/markdown markers for clean preview snippet (~120 chars)
  const getExcerpt = (text) => {
    if (!text) return '';
    const cleanText = text.replace(/[#*`_\[\]]/g, '');
    return cleanText.length > 120 ? cleanText.substring(0, 120) + '...' : cleanText;
  };

  return (
    <article className="group flex flex-col bg-white dark:bg-darkCard rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
      {/* Blog Image banner wrapper */}
      <div className="relative aspect-video overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        {/* Category Pill Tag */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-darkCard/90 backdrop-blur-sm text-[10px] font-extrabold tracking-wider text-primary-600 dark:text-primary-400 uppercase rounded-full shadow-sm">
          {category}
        </span>
      </div>

      {/* Card Content body */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 leading-snug tracking-tight transition-colors line-clamp-2">
          <Link to={`/blogs/${id}`}>{title}</Link>
        </h3>
        
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
          {getExcerpt(content)}
        </p>

        {/* Eager flex gap block pusher */}
        <div className="flex-grow mt-6" />

        {/* Footer author credentials row */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={author?.profileImage}
              alt={author?.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-100 dark:border-slate-700"
            />
            <div>
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {author?.name}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                {formatDate(createdAt)}
              </p>
            </div>
          </div>

          <Link
            to={`/blogs/${id}`}
            className="inline-flex items-center space-x-1 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span>Read More</span>
            <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
