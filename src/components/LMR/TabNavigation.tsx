import React from 'react';

interface TabNavigationProps {
  activeTab: 'upload' | 'materials' | 'questions';
  setActiveTab: React.Dispatch<React.SetStateAction<'upload' | 'materials' | 'questions'>>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden border border-gray-200 mb-6">
      <div className="border-b border-gray-200">
        <nav className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'upload' 
                ? 'text-orange-600 border-b-2 border-orange-500' 
                : 'text-gray-600 hover:text-orange-500'
            }`}
            onClick={() => setActiveTab('upload')}
          >
            Upload
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'materials' 
                ? 'text-orange-600 border-b-2 border-orange-500' 
                : 'text-gray-600 hover:text-orange-500'
            }`}
            onClick={() => setActiveTab('materials')}
          >
            Learning Materials
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'questions' 
                ? 'text-orange-600 border-b-2 border-orange-500' 
                : 'text-gray-600 hover:text-orange-500'
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