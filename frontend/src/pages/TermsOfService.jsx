import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-darkBg flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">1. Acceptance of Terms</h2>
            <p>
              By accessing or using BlogSphere, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you do not have permission to access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">2. User Content</h2>
            <p>
              You retain your rights to any content you submit, post or display on or through BlogSphere. However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">3. Acceptable Use</h2>
            <p>
              You agree not to use BlogSphere to post illegal, offensive, or harmful content. We reserve the right to remove any content or suspend any user account at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">4. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.
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

export default TermsOfService;
