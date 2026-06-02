import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import blogService from '../services/blogService';
import { useToast } from '../context/ToastContext';

const CreateBlog = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Simple client validation checks
    if (title.trim().length < 5) {
      setError('Title must be at least 5 characters long');
      return;
    }

    if (content.trim().length < 20) {
      setError('Blog content must be at least 20 characters long to publish');
      return;
    }

    setLoading(true);

    try {
      // 1. Dispatch REST create API call
      const newBlog = await blogService.createBlog(title, content, category, coverImage);
      toast.success('Blog post published successfully!');
      // 2. Navigate straight to the newly created blog post detail view
      navigate(`/blogs/${newBlog.id}`);
    } catch (err) {
      console.error('Error creating blog', err);
      // Retrieve server error messages or bad parameters validations
      const message = err.response?.data?.message ||
                      err.response?.data?.error ||
                      'Operation failed. Please verify your connection.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
          Write a New Post
        </h1>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-darkCard rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 sm:p-10 shadow-sm space-y-6 animate-fadeIn">
          
          {/* Error Notice */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-2xl text-xs font-semibold leading-relaxed animate-fadeIn">
              <div className="flex items-start space-x-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
              placeholder="Enter a catchy title..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-60 transition-all"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 disabled:opacity-60"
            >
              <option>Technology</option>
              <option>Lifestyle</option>
              <option>Finance</option>
              <option>Education</option>
              <option>Entertainment</option>
              <option>Travel</option>
            </select>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              disabled={loading}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-60 transition-all"
            />
          </div>

          {/* Markdown Content */}
          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Blog Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              disabled={loading}
              rows={10}
              placeholder="Express yourself. Write your blog content here..."
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-60 transition-all font-sans"
            />
          </div>

          {/* Actions */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-primary-600 hover:bg-primary-700 active:scale-95 disabled:active:scale-100 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-primary-500/20 disabled:opacity-60 flex items-center justify-center space-x-2"
          >
            {loading && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            )}
            <span>{loading ? 'Publishing...' : 'Publish Post'}</span>
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default CreateBlog;
