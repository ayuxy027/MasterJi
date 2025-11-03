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
      content: 'Detailed explanation of how plants convert sunlight into energy...', 
      keywords: ['photosynthesis', 'chlorophyll', 'glucose'] 
    },
    { 
      id: 2, 
      title: 'Algebra Basics', 
      subject: 'Mathematics', 
      grade: 'Class 8', 
      content: 'Fundamental concepts of algebra including variables, equations...', 
      keywords: ['algebra', 'equations', 'variables'] 
    },
    { 
      id: 3, 
      title: 'India\'s Independence', 
      subject: 'History', 
      grade: 'Class 12', 
      content: 'Detailed analysis of India\'s struggle for independence...', 
      keywords: ['independence', 'freedom', 'history'] 
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Learning Materials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockMaterials.map((material) => (
          <div key={material.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300">
            <div className="bg-indigo-100 p-4">
              <h4 className="font-semibold text-indigo-800">{material.title}</h4>
              <div className="flex gap-2 mt-2">
                <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-1 rounded">{material.subject}</span>
                <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">{material.grade}</span>
              </div>
            </div>
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-3">{material.content}</p>
              <div className="flex flex-wrap gap-1">
                {material.keywords.map((keyword, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
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