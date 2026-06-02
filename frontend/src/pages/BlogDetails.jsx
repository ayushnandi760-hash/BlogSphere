import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';
import blogService from '../services/blogService';
import useAuth from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await blogService.getBlogById(id);
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog details', err);
        setError('Blog post not found or server is temporarily offline.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await blogService.deleteBlog(id);
      toast.success('Blog post deleted successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error deleting blog', err);
      toast.error('Delete operation failed. Please check your credentials.');
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return '';
    }
  };

  // Safe checks to see if active visitor is the actual author of this blog
  const isAuthor = isAuthenticated && user && blog && user.id === blog.author.id;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* Back Navigation Link */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Feed</span>
        </Link>

        {loading ? (
          <div className="py-20">
            <Loader size="lg" />
          </div>
        ) : error || !blog ? (
          <div className="text-center py-16 border border-dashed border-red-200 bg-red-50/20 dark:border-red-950/40 rounded-3xl p-8 max-w-md mx-auto">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">{error || 'Failed to load post.'}</p>
            <Link to="/" className="mt-4 inline-block px-4 py-2 bg-primary-600 text-white text-xs font-bold rounded-xl shadow-md">
              Return Home
            </Link>
          </div>
        ) : (
          <article className="bg-white dark:bg-darkCard rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-md overflow-hidden animate-fadeIn">
            
            {/* Big cover banner */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
              <img
                src={blog.coverImage}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-6 left-6 px-4 py-1.5 bg-slate-900/90 backdrop-blur-sm text-[10px] font-extrabold tracking-wider text-primary-400 uppercase rounded-full">
                {blog.category}
              </span>
            </div>

            {/* Content Layout Body */}
            <div className="p-6 sm:p-10">
              
              {/* Header Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight mb-6">
                {blog.title}
              </h1>

              {/* Author & Timestamp Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-y border-slate-100 dark:border-slate-800 py-4 mb-8 gap-4">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={blog.author.profileImage}
                    alt={blog.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {blog.author.name}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      Published on {formatDate(blog.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Conditional Owner Action Buttons */}
                {isAuthor && (
                  <div className="flex items-center space-x-3">
                    <Link
                      to={`/edit-blog/${blog.id}`}
                      className="px-4 py-2 border border-slate-200 hover:border-primary-500 dark:border-slate-700 dark:hover:border-primary-500 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-primary-600 rounded-xl transition-all inline-flex items-center space-x-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      <span>Edit</span>
                    </Link>
                    
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/30 text-xs font-semibold text-red-600 dark:text-red-400 rounded-xl transition-all inline-flex items-center space-x-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Textual Markdown Content rendering */}
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-350 text-sm sm:text-base leading-relaxed space-y-6">
                {blog.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

            </div>
          </article>
        )}
      </div>

      {/* Reusable Delete Modal Alert */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="max-w-md w-full bg-white dark:bg-darkCard rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-8 animate-scaleIn">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Delete Publication</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Are you absolutely sure you want to delete this blog post? This action is permanent and cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-60 inline-flex items-center space-x-1 shadow-md shadow-red-500/20"
              >
                {deleting && (
                  <svg className="animate-spin h-3.5 w-3.5 text-white mr-1" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                <span>{deleting ? 'Deleting...' : 'Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default BlogDetails;
