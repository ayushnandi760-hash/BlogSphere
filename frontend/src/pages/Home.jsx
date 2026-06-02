import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import BlogCard from '../components/BlogCard';
import SkeletonCard from '../components/SkeletonCard';
import { useToast } from '../context/ToastContext';
import blogService from '../services/blogService';

const Home = () => {
  const toast = useToast();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Error fetching blogs', err);
      const msg = 'Unable to retrieve publications. Please check your connection.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setLoading(true);
    setError(null);
    try {
      if (query.trim() === '') {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
      } else {
        const data = await blogService.searchBlogs(query);
        setBlogs(data);
      }
    } catch (err) {
      console.error('Error searching blogs', err);
      const msg = 'Search lookup failed. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-tr from-primary-900 to-slate-900 text-white p-8 sm:p-16 border border-slate-800 shadow-xl">
        <div className="max-w-2xl relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs font-bold uppercase tracking-wider">
            Explore BlogSphere
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Express Your Voice, <br />
            <span className="bg-gradient-to-r from-primary-400 to-purple-300 bg-clip-text text-transparent">Share Your World</span>
          </h1>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Read, write, and interact with bloggers worldwide. Start browsing thousands of articles covering tech, lifestyle, arts, and more.
          </p>
        </div>
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Dynamic Search Component */}
      <div className="mb-12">
        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
      </div>

      {/* Publications Listing */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Recent Publications'}
          </h2>
          <span className="text-xs text-slate-400 font-semibold dark:text-slate-500 uppercase tracking-widest bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full">
            {blogs.length} {blogs.length === 1 ? 'Post' : 'Posts'}
          </span>
        </div>

        {/* Loading Skeletons Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          /* Error Banner */
          <div className="text-center py-12 border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/10 rounded-2xl p-8 max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/20 text-red-600 dark:text-red-400 mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{error}</p>
            <button
              onClick={fetchBlogs}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
            >
              Retry Connection
            </button>
          </div>
        ) : blogs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 mb-4 animate-bounce">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No blog publications found</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 max-w-xs mx-auto">
              We couldn't locate any posts matching your search query. Be the first to express yourself and share your knowledge!
            </p>
          </div>
        ) : (
          /* Grid of Blog Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} className="animate-fadeIn">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Home;
