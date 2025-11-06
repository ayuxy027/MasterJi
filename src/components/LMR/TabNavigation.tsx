import React, { useState } from 'react';

interface TabNavigationProps {
  activeTab: 'upload' | 'materials' | 'questions';
  setActiveTab: React.Dispatch<React.SetStateAction<'upload' | 'materials' | 'questions'>>;
  hasUploadedFile: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, hasUploadedFile }) => {
  const [tooltipTab, setTooltipTab] = useState<string | null>(null);

  const handleTabClick = (tab: 'upload' | 'materials' | 'questions') => {
    if (tab === 'upload' || hasUploadedFile) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="bg-orange-100 border-b-2 border-orange-200">
      <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 md:p-5">
        {(['upload', 'materials', 'questions'] as const).map((tab) => {
          const labels: Record<typeof tab, string> = {
            upload: 'Upload',
            materials: 'Learning Materials',
            questions: 'Generated Questions'
          };
          
          const isDisabled = tab !== 'upload' && !hasUploadedFile;
          
          return (
            <div 
              key={tab}
              className="relative"
              onMouseEnter={() => isDisabled && setTooltipTab(tab)}
              onMouseLeave={() => setTooltipTab(null)}
            >
              <button
                onClick={() => handleTabClick(tab)}
                disabled={isDisabled}
                className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full capitalize transition-all font-semibold text-xs sm:text-sm md:text-base shadow-md transform ${
                  isDisabled 
                    ? 'bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed'
                    : activeTab === tab
                    ? 'bg-orange-400 text-white hover:bg-orange-500 shadow-lg hover:scale-105'
                    : 'bg-white text-orange-600 border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 hover:scale-105'
                }`}
              >
                {labels[tab]}
              </button>
              
              {/* Tooltip */}
              {tooltipTab === tab && isDisabled && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap z-50 shadow-lg">
                  Upload docs first
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                    <div className="border-4 border-transparent border-t-gray-800"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation;