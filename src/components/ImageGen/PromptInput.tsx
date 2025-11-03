import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ 
  prompt, 
  setPrompt, 
  isGenerating, 
  setIsGenerating
}) => {
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate image generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="bg-orange-100 rounded-2xl shadow-lg p-6 border border-orange-200">
      <h2 className="text-xl font-semibold text-orange-800 mb-4">Generate Educational Visuals</h2>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Describe the educational image you want to generate</label>
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: 'Create an educational poster about the solar system with planets labeled in Hindi'"
            className="w-full border border-orange-300 rounded-xl p-4 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm bg-white"
          />
          <div className="absolute bottom-3 right-3">
            <span className="text-xs text-gray-500">{prompt.length}/500</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isGenerating}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all transform hover:scale-105 ${
            (!prompt.trim() || isGenerating)
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg'
          }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
              </svg>
              Generate Images
            </>
          )}
        </button>
        
        <div className="text-sm text-orange-700 flex items-center gap-2 bg-orange-50 p-3 rounded-lg border border-orange-200">
          <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          Generates 3 contextual images in a grid format
        </div>
      </div>
    </div>
  );
};

export default PromptInput;