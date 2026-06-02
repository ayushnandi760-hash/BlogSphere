import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-darkBg dark:text-slate-100 transition-colors duration-300">
      {/* Header Navigation */}
      <Navbar />

      {/* Main Page Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
        {children}
      </main>

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
};

export default MainLayout;
