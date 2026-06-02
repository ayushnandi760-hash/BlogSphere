import React, { useState, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import SearchBar from '../components/SearchBar';
import BlogCard from '../components/BlogCard';
import SkeletonCard from '../components/SkeletonCard';
import { useToast } from '../context/ToastContext';
import blogService from '../services/blogService';

const BlogList = () => {
  const toast = useToast();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Technology', 'Lifestyle', 'Finance', 'Education', 'Entertainment', 'Travel'];

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await blogService.getAllBlogs();
        setBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        console.error('Error fetching browse blogs', err);
        const msg = 'Failed to load publications. Please try again later.';
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setActiveCategory('All'); // Reset category filters when searching
    setLoading(true);
    setError(null);
    try {
      if (query.trim() === '') {
        setFilteredBlogs(blogs);
      } else {
        const data = await blogService.searchBlogs(query);
        setFilteredBlogs(data);
      }
    } catch (err) {
      console.error('Search error', err);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    setSearchQuery(''); // Reset search bar
    if (category === 'All') {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((b) => b.category.toLowerCase() === category.toLowerCase());
      setFilteredBlogs(filtered);
    }
  };

  return (
    <MainLayout>
      <div className="text-center max-w-xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Browse Publications
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Discover insights, ideas, and stories from various authors across the platform.
        </p>
      </div>

      {/* Dynamic Search Bar */}
      <div className="mb-8">
        <SearchBar onSearch={handleSearch} placeholder="Filter blogs by typing queries..." initialValue={searchQuery} />
      </div>

      {/* Dynamic Category Filtering Badges bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border transition-all shrink-0 active:scale-95 ${
              activeCategory === cat
                ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-500/20'
                : 'bg-white border-slate-200 dark:bg-darkCard dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results View Box */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-500 border border-dashed border-red-200 dark:border-red-950/40 rounded-2xl max-w-sm mx-auto">
          <p className="text-sm font-semibold">{error}</p>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 max-w-sm mx-auto">
          <p className="text-slate-500 dark:text-slate-400 font-medium">No publications match your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="animate-fadeIn">
              <BlogCard blog={blog} />
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default BlogList;
