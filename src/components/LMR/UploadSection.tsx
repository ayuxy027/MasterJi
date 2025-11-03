import React from 'react';

interface UploadSectionProps {
  uploadedFile: File | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  uploadedFile, 
  setUploadedFile, 
  isProcessing,
  setIsProcessing
}) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setIsProcessing(true);
      
      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">Upload Learning Material</h2>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          uploadedFile ? 'border-orange-400 bg-orange-50' : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
        }`}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="flex flex-col items-center justify-center">
          {!uploadedFile ? (
            <>
              <svg className="w-10 h-10 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-gray-700 mb-1">Click to upload a PDF or document</p>
              <p className="text-xs text-gray-500">Supports: PDF, DOC, DOCX</p>
            </>
          ) : (
            <>
              <svg className="w-10 h-10 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-800 text-sm font-medium">{uploadedFile.name}</p>
              <p className="text-xs text-orange-600 mt-1">Uploaded</p>
            </>
          )}
        </div>
        
        {isProcessing && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
            <p className="text-xs text-gray-600 mt-1">Processing...</p>
          </div>
        )}
      </div>
      
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileUpload}
      />
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-1.5 rounded-md">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-800">PDF Rendering</h3>
              <p className="text-xs text-gray-600">PDF.js for document display</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-1.5 rounded-md">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-800">AI Extraction</h3>
              <p className="text-xs text-gray-600">Content with Groq API</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 p-1.5 rounded-md">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0-3c-1.045 0-1.979.7-2.132 1.75m0 0c.211.578.813 1 1.5 1M12 11.5v-1m-5.5 3.5V13h2v2.5a1.5 1.5 0 11-3 0z"></path>
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-800">Question Gen</h3>
              <p className="text-xs text-gray-600">AI questions from content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;