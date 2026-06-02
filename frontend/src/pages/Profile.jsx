import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';
import BlogCard from '../components/BlogCard';
import userService from '../services/userService';
import blogService from '../services/blogService';
import useAuth from '../hooks/useAuth';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const { user, updateUserProfileState } = useAuth();
  const toast = useToast();

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfileAndBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        // 1. Fetch fresh profile parameters from database
        const profile = await userService.getUserProfile();
        setName(profile.name);
        setProfileImage(profile.profileImage || '');

        // 2. Fetch all posts authored by this user
        if (profile.id) {
          const userBlogs = await blogService.getBlogsByAuthor(profile.id);
          setBlogs(userBlogs);
        }
      } catch (err) {
        console.error('Error fetching profile assets', err);
        setError('Failed to sync profile. Check server connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndBlogs();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Form validations
    if (name.trim().length < 3) {
      setError('Name must be at least 3 characters long');
      return;
    }

    if (password) {
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    setSaving(true);

    try {
      // 1. Dispatch REST profile update call
      const updatedUser = await userService.updateUserProfile(name, profileImage, password);
      
      // 2. Refresh Auth Context session parameters (Avatar, name instantly syncs)
      updateUserProfileState(updatedUser);
      toast.success('Profile updated successfully!');
      setSuccess('Profile credentials successfully updated!');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error('Error updating profile credentials', err);
      const message = err.response?.data?.message ||
                      err.response?.data?.error ||
                      'Save operation failed. Please check inputs.';
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">
          Personal Profile
        </h1>

        {loading ? (
          <div className="py-20">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col: Editor Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-darkCard rounded-3xl border border-slate-100 dark:border-slate-800/80 p-6 shadow-sm space-y-6">
                
                {/* Visual Avatar Display Card */}
                <div className="text-center pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="relative inline-block">
                    <img
                      src={profileImage || 'https://api.dicebear.com/7.x/adventurer/svg?seed=placeholder'}
                      alt={name}
                      className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-primary-500 shadow-md"
                    />
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900 dark:text-white leading-tight">{name}</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{user?.email}</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  {/* Status Alerts */}
                  {success && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 rounded-xl text-xs font-semibold leading-relaxed animate-fadeIn">
                      {success}
                    </div>
                  )}

                  {error && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 rounded-xl text-xs font-semibold leading-relaxed animate-fadeIn">
                      {error}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      disabled={saving}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 disabled:opacity-60 transition-all"
                    />
                  </div>

                  {/* Avatar Image URL */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Profile Image URL
                    </label>
                    <input
                      type="url"
                      value={profileImage}
                      onChange={(e) => setProfileImage(e.target.value)}
                      disabled={saving}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 disabled:opacity-60 transition-all"
                    />
                  </div>

                  {/* Optional Password Update */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <span className="block text-[10px] font-bold text-primary-500 dark:text-primary-400 uppercase tracking-widest">
                      Change Password
                    </span>

                    <div>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={saving}
                        placeholder="New password..."
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 disabled:opacity-60 transition-all"
                      />
                    </div>

                    <div>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={saving}
                        placeholder="Confirm new password..."
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-slate-800 dark:text-slate-100 disabled:opacity-60 transition-all"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 active:scale-95 disabled:active:scale-100 text-white font-semibold rounded-xl text-xs transition-all shadow-md shadow-primary-500/20 disabled:opacity-60 flex items-center justify-center space-x-2"
                  >
                    {saving && (
                      <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    <span>{saving ? 'Saving...' : 'Save Settings'}</span>
                  </button>
                </form>

              </div>
            </div>

            {/* Right Col: Authored Publications Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  My Publications
                </h2>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-full uppercase">
                  {blogs.length} {blogs.length === 1 ? 'Post' : 'Posts'}
                </span>
              </div>

              {blogs.length === 0 ? (
                /* Authored Empty State */
                <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 bg-white dark:bg-darkCard">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-450 mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-450">You haven't authored any publications yet.</p>
                  <p className="text-xs text-slate-400 mt-1 mb-4">Share your knowledge and ideas with the world today!</p>
                  <Link
                    to="/create-blog"
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl shadow-md"
                  >
                    Write First Post
                  </Link>
                </div>
              ) : (
                /* Authored Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="animate-fadeIn">
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
