import React from 'react';

interface TabNavigationProps {
  activeTab: 'upload' | 'materials' | 'questions';
  setActiveTab: React.Dispatch<React.SetStateAction<'upload' | 'materials' | 'questions'>>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-orange-100 border-b-2 border-orange-200">
      <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5">
        {(['upload', 'materials', 'questions'] as const).map((tab) => {
          const labels: Record<typeof tab, string> = {
            upload: 'Upload',
            materials: 'Learning Materials',
            questions: 'Generated Questions'
          };
          
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full capitalize transition-all font-semibold text-xs sm:text-sm md:text-base shadow-md transform hover:scale-105 ${
                activeTab === tab
                  ? 'bg-orange-400 text-white hover:bg-orange-500 shadow-lg'
                  : 'bg-white text-orange-600 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300'
              }`}
            >
              {labels[tab]}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;