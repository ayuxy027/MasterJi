import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MinimizedNavbarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const MinimizedNavbar: React.FC<MinimizedNavbarProps> = ({ isExpanded, onToggle }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Minimized M Button */}
      {!isExpanded && (
        <button
          onClick={onToggle}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center"
          title="Expand Menu"
        >
          M
        </button>
      )}

      {/* Expanded Drawer */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40 transition-opacity duration-300"
            onClick={onToggle}
          />

          {/* Drawer */}
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white/95 backdrop-blur-md shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-orange-200">
              <a href="/" className="text-2xl font-bold text-orange-500">
                MasterJi
              </a>
              <button
                onClick={onToggle}
                className="text-orange-500 hover:text-orange-600 transition-colors"
                title="Collapse Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
              <a
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => navigate('/')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
              <a
                href="/chat"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => navigate('/chat')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                AI Chat
              </a>
              <a
                href="/lmr"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => navigate('/lmr')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                LMR Tools
              </a>
              <a
                href="/posters"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-orange-500 hover:bg-orange-50 transition-colors"
                onClick={() => navigate('/posters')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Posters
              </a>
              <a
                href="/board"
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Whiteboard
              </a>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-orange-200">
              <a
                href="/chat"
                className="block w-full bg-orange-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-orange-500 transition-colors text-center"
              >
                Start Learning
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MinimizedNavbar;

