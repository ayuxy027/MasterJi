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
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Select Category</label>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              selectedCategory === category.id
                ? 'bg-teal-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;