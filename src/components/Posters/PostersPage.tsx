import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import PromptInput from './PromptInput';
import GenerationResults from './GenerationResults';

const PostersPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('science');
  const [numImages, setNumImages] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Generate <span className="text-orange-500">Educational Posters</span>
          </h1>
          <p className="text-gray-600">
            AI-powered educational visuals for all 22+ Indian languages
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <CategorySelector 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          
          <PromptInput 
            prompt={prompt} 
            setPrompt={setPrompt} 
            isGenerating={isGenerating} 
            setIsGenerating={setIsGenerating}
            selectedCategory={selectedCategory}
            setNumImages={setNumImages}
          />
        </div>
        
        <GenerationResults 
          isGenerating={isGenerating} 
          selectedCategory={selectedCategory}
          numImages={numImages}
        />
      </div>
    </div>
  );
};

export default PostersPage;