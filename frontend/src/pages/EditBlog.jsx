import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';
import blogService from '../services/blogService';
import useAuth from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technology');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogService.getBlogById(id);
        
        // Ownership Validation: block editing if user is not the author
        if (user && blog.author.id !== user.id) {
          navigate('/');
          return;
        }

        setTitle(blog.title);
        setCategory(blog.category);
        setCoverImage(blog.coverImage);
        setContent(blog.content);
      } catch (err) {
        console.error('Error fetching blog details for editor', err);
        setError('Blog post not found or network error.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validations
    if (title.trim().length < 5) {
      setError('Title must be at least 5 characters long');
      return;
    }

    if (content.trim().length < 20) {
      setError('Blog content must be at least 20 characters long to publish');
      return;
    }

    setSaving(true);

    try {
      // 1. Dispatch REST update API call
      await blogService.updateBlog(id, title, content, category, coverImage);
      toast.success('Blog post updated successfully!');
      // 2. Navigate straight back to detail page view
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error('Error saving edited blog', err);
      const message = err.response?.data?.message ||
                      err.response?.data?.error ||
                      'Save operation failed. Please verify your connection.';
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
          Modify Post
        </h1>

        {loading ? (
          <div className="py-20">
            <Loader size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-16 border border-dashed border-red-200 dark:border-red-900/40 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-650 dark:text-red-400">{error}</p>
          </div>
        ) : (
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
                disabled={saving}
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
                disabled={saving}
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
                Cover Image URL
              </label>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                disabled={saving}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-60 transition-all"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                Blog Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                disabled={saving}
                rows={12}
                placeholder="Write your blog content here..."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400 disabled:opacity-60 transition-all font-sans"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => navigate(`/blogs/${id}`)}
                className="w-1/3 py-3 px-4 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="w-2/3 py-3 px-4 bg-primary-600 hover:bg-primary-700 active:scale-95 disabled:active:scale-100 text-white font-semibold rounded-xl text-sm transition-all shadow-md shadow-primary-500/20 disabled:opacity-60 flex items-center justify-center space-x-2"
              >
                {saving && (
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </MainLayout>
  );
};

export default EditBlog;
