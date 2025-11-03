import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import PromptInput from './PromptInput';
import GenerationResults from './GenerationResults';

const ImageGenPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('education');

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">Multilingual Image Generation System</h1>
          <p className="text-gray-600">AI-powered educational visuals for all 22+ Indian languages</p>
        </div>
        
        <CategorySelector 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        
        <PromptInput 
          prompt={prompt} 
          setPrompt={setPrompt} 
          isGenerating={isGenerating} 
          setIsGenerating={setIsGenerating}
        />
        
        <GenerationResults 
          isGenerating={isGenerating} 
          selectedCategory={selectedCategory} 
        />
      </div>
    </div>
  );
};

export default ImageGenPage;