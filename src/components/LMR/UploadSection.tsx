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
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Learning Material</h2>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          uploadedFile ? 'border-green-500 bg-green-50' : 'border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50'
        }`}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="flex flex-col items-center justify-center">
          {!uploadedFile ? (
            <>
              <svg className="w-16 h-16 text-indigo-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="text-gray-600 mb-2">Click to upload a PDF or document</p>
              <p className="text-sm text-gray-500">Supported formats: PDF, DOC, DOCX</p>
            </>
          ) : (
            <>
              <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-green-700 font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-green-600 mt-1">Uploaded successfully!</p>
            </>
          )}
        </div>
        
        {isProcessing && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full animate-pulse w-3/4"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Processing document...</p>
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
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-medium text-indigo-800">PDF Rendering</h3>
          <p className="text-sm text-indigo-600 mt-1">Using PDF.js for document display</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-medium text-indigo-800">AI Extraction</h3>
          <p className="text-sm text-indigo-600 mt-1">Content extraction with Groq API</p>
        </div>
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="font-medium text-indigo-800">Question Generation</h3>
          <p className="text-sm text-indigo-600 mt-1">AI-generated questions from content</p>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;