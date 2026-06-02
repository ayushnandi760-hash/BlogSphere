import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = 'Search blogs by title, category, or content...', initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center">
        
        {/* Search Icon */}
        <div className="absolute left-4 text-slate-400 dark:text-slate-500">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Text Box */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-16 py-3.5 bg-white dark:bg-darkCard text-slate-800 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-sm shadow-slate-100/50 dark:shadow-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />

        {/* Clear Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 p-1"
          >
            Clear
          </button>
        )}

        {/* Search Submit Button */}
        <button
          type="submit"
          className="absolute right-2.5 px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-primary-500/20 active:scale-95"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
