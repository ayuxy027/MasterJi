import React from 'react';

interface Material {
  id: number;
  title: string;
  subject: string;
  grade: string;
  content: string;
  keywords: string[];
}

const MaterialsTab: React.FC = () => {
  const mockMaterials: Material[] = [
    { 
      id: 1, 
      title: 'Photosynthesis Process', 
      subject: 'Biology', 
      grade: 'Class 10', 
      content: 'Detailed explanation of how plants convert sunlight into energy, including the role of chlorophyll...', 
      keywords: ['photosynthesis', 'chlorophyll', 'glucose', 'sunlight'] 
    },
    { 
      id: 2, 
      title: 'Algebra Basics', 
      subject: 'Mathematics', 
      grade: 'Class 8', 
      content: 'Fundamental concepts of algebra including variables, equations, and solving quadratic equations...', 
      keywords: ['algebra', 'equations', 'variables', 'polynomials'] 
    },
    { 
      id: 3, 
      title: 'India\'s Independence', 
      subject: 'History', 
      grade: 'Class 12', 
      content: 'Detailed analysis of India\'s struggle for independence, including the freedom fighters and key events...', 
      keywords: ['independence', 'freedom', 'history', 'freedom fighters'] 
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-orange-800 mb-6">Generated Learning Materials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMaterials.map((material) => (
          <div key={material.id} className="bg-white rounded-xl border border-orange-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-5 border-b border-orange-200">
              <h4 className="font-bold text-orange-800 text-lg">{material.title}</h4>
              <div className="flex gap-3 mt-3">
                <span className="text-xs bg-orange-200 text-orange-800 px-3 py-1 rounded-full">{material.subject}</span>
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full">{material.grade}</span>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-700 mb-4">{material.content}</p>
              <div className="flex flex-wrap gap-2">
                {material.keywords.map((keyword, idx) => (
                  <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full border border-orange-200">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsTab;