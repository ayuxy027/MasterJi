import React from 'react';

interface TabNavigationProps {
  activeTab: 'upload' | 'materials' | 'questions';
  setActiveTab: React.Dispatch<React.SetStateAction<'upload' | 'materials' | 'questions'>>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            className={`px-6 py-4 font-medium text-sm ${
              activeTab === 'upload' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Upload
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm ${
              activeTab === 'materials' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('materials')}
          >
            Learning Materials
          </button>
          <button
            className={`px-6 py-4 font-medium text-sm ${
              activeTab === 'questions' 
                ? 'text-indigo-600 border-b-2 border-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('questions')}
          >
            Generated Questions
          </button>
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;