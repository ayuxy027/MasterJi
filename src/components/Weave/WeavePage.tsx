import React, { useState } from 'react';

const WeavePage: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [numSlides, setNumSlides] = useState(5);
  const [presentationStyle, setPresentationStyle] = useState('academic');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Presentation on "${topic}" with ${numSlides} slides is being generated!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Create Your <span className="text-orange-500">Presentation</span> with Weave
          </h1>
          <p className="text-gray-600">
            AI-powered personalized presentations for educators in 22+ Indian languages
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Presentation Topic
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your presentation topic..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Slides
                </label>
                <select
                  value={numSlides}
                  onChange={(e) => setNumSlides(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20].map(num => (
                    <option key={num} value={num}>{num} slides</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Presentation Style
                </label>
                <select
                  value={presentationStyle}
                  onChange={(e) => setPresentationStyle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option value="academic">Academic</option>
                  <option value="business">Business</option>
                  <option value="storytelling">Storytelling</option>
                  <option value="technical">Technical</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isGenerating}
                className={`px-8 py-4 rounded-full font-semibold text-white shadow-lg transition-all ${
                  isGenerating 
                    ? 'bg-orange-400 cursor-not-allowed' 
                    : 'bg-orange-500 hover:bg-orange-600 hover:shadow-xl transform hover:-translate-y-0.5'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate Presentation'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">How Weave Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <span className="text-orange-500 font-bold">1</span>
              </div>
              <h3 className="font-medium text-gray-800">Input Your Topic</h3>
              <p className="text-gray-600 text-sm mt-1">Enter your presentation topic and customize settings</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <span className="text-orange-500 font-bold">2</span>
              </div>
              <h3 className="font-medium text-gray-800">AI Generation</h3>
              <p className="text-gray-600 text-sm mt-1">Our AI creates personalized, culturally relevant slides</p>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-3">
                <span className="text-orange-500 font-bold">3</span>
              </div>
              <h3 className="font-medium text-gray-800">Download & Present</h3>
              <p className="text-gray-600 text-sm mt-1">Export as PDF or presentation format and share</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeavePage;