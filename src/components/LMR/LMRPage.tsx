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
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Learning Material Resource (LMR)
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            AI-powered document analysis and content generation system
          </p>
        </div>
        
        <UploadSection 
          uploadedFile={uploadedFile} 
          setUploadedFile={setUploadedFile} 
          isProcessing={isProcessing} 
          setIsProcessing={setIsProcessing}
        />
        
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="p-4 bg-white rounded-lg border border-gray-200 min-h-[400px]">
          {activeTab === 'upload' && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Upload Learning Materials</h3>
              <p className="text-gray-600 max-w-md mx-auto text-sm">
                Upload PDFs or documents and our AI will generate learning materials and key questions
                from the content in any of the 22+ supported Indian languages.
              </p>
            </div>
          )}
          
          {activeTab === 'materials' && <MaterialsTab />}
          
          {activeTab === 'questions' && <QuestionsTab />}
        </div>
      </div>
    </div>
  );
};

export default LMRPage;