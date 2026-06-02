import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">1. Information We Collect</h2>
            <p>
              When you use BlogSphere, we collect the information you provide to us directly, such as your name, email address, profile image, and the content of your blog posts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">2. How We Use Information</h2>
            <p>
              We use the information we collect to operate, maintain, and improve BlogSphere, communicate with you, and personalize your experience. Your blog posts are public and can be viewed by anyone.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">3. Data Security</h2>
            <p>
              We implement reasonable security measures, such as JSON Web Tokens (JWT) and secure password hashing, to protect your account information. However, no internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">4. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@blogsphere.local.
            </p>
          </section>

          <p className="text-sm text-slate-500 mt-8 italic">
            Last updated: June 2, 2026
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
