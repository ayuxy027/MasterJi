import React from 'react';

interface GenerationResultsProps {
  isGenerating: boolean;
  selectedCategory: string;
}

const GenerationResults: React.FC<GenerationResultsProps> = ({ isGenerating, selectedCategory }) => {
  const mockImages = [
    { id: 1, url: 'https://placehold.co/400x300/FF6B35/FFFFFF?text=Educational+Poster+1' },
    { id: 2, url: 'https://placehold.co/400x300/FF6B35/FFFFFF?text=Educational+Poster+2' },
    { id: 3, url: 'https://placehold.co/400x300/FF6B35/FFFFFF?text=Educational+Poster+3' },
  ];

  const getSystemFeatures = () => {
    return [
      { 
        title: 'Multilingual Support', 
        desc: 'Supports 22+ Indian languages', 
        icon: '🌐' 
      },
      { 
        title: 'Cultural Context', 
        desc: 'Relevant to Indian educational themes', 
        icon: '🎨' 
      },
      { 
        title: 'Subject Specific', 
        desc: 'Tailored for different educational subjects', 
        icon: '🎯' 
      },
      { 
        title: 'Accessibility', 
        desc: 'High contrast and visual clarity', 
        icon: '♿' 
      }
    ];
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Generated Educational Posters</h3>
        <p className="text-gray-600 text-sm">3 poster grid layout for effective learning</p>
      </div>
      
      {isGenerating ? (
        <div className="p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
          </div>
          <h4 className="text-lg font-medium text-gray-800 mb-2">Generating your educational visuals...</h4>
          <p className="text-gray-600">Our AI is creating contextual images relevant to {selectedCategory} in Indian educational context</p>
        </div>
      ) : (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockImages.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={image.url} 
                  alt={`Generated educational poster ${image.id}`} 
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <h4 className="text-white font-medium">Educational Poster #{image.id}</h4>
                    <p className="text-teal-200 text-sm">Click to download</p>
                  </div>
                </div>
                <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Features of our Image Generation System:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {getSystemFeatures().map((feature, index) => (
                <div key={index} className="bg-teal-50 p-4 rounded-lg">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mb-3">
                    <span className="text-teal-600">{feature.icon}</span>
                  </div>
                  <h5 className="font-medium text-teal-800">{feature.title}</h5>
                  <p className="text-sm text-teal-600 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerationResults;