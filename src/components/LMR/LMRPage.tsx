import React, { useState } from 'react';
import UploadSection from './UploadSection';
import TabNavigation from './TabNavigation';
import MaterialsTab from './MaterialsTab';
import QuestionsTab from './QuestionsTab';

const LMRPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'materials' | 'questions'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-800 mb-2 sm:mb-3">
            <span className="text-orange-400">Last Minute Recall</span> (LMR)
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered quick revision notes and questions for last-minute exam preparation
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border-2 border-orange-200/60 overflow-hidden">
          <div className="relative z-10">
            <TabNavigation 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              hasUploadedFile={!!uploadedFile && !isProcessing}
            />
          </div>
          
          <div className="p-4 sm:p-6 md:p-8 min-h-[400px] relative z-0">
            {activeTab === 'upload' && (
              <div>
                <UploadSection 
                  uploadedFile={uploadedFile} 
                  setUploadedFile={setUploadedFile} 
                  isProcessing={isProcessing} 
                  setIsProcessing={setIsProcessing}
                />
                <div className="text-center py-8 sm:py-12 mt-6">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-orange-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2">
                    Upload Your <span className="text-orange-400">Study Materials</span>
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                    Upload PDFs or documents and our AI will generate <span className="text-orange-600 font-medium">last-minute recall notes</span> and key questions
                    from the content in any of the 22+ supported Indian languages.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'materials' && uploadedFile && !isProcessing && <MaterialsTab />}
            
            {activeTab === 'questions' && uploadedFile && !isProcessing && <QuestionsTab />}
            
            {(activeTab === 'materials' || activeTab === 'questions') && (!uploadedFile || isProcessing) && (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  <span className="text-orange-400">Upload Documents First</span>
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                  Please upload your study materials to generate {activeTab === 'materials' ? 'learning materials' : 'questions'} for last-minute recall.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMRPage;