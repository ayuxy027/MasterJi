import React from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const categories: Category[] = [
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'math', name: 'Mathematics', icon: '📐' },
    { id: 'history', name: 'History', icon: '🏛️' },
    { id: 'literature', name: 'Literature', icon: '📖' },
    { id: 'arts', name: 'Arts', icon: '🎨' },
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-4">Select Category</label>
      <div className="flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl'
                : 'bg-white text-gray-700 shadow-md hover:bg-orange-50 border border-orange-200'
            }`}
          >
            <span className="text-xl">{category.icon}</span>
            <span className="font-medium">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;