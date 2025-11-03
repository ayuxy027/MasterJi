import React from 'react';

interface QuestionAnswer {
  id: number;
  question: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answer: string;
}

const QuestionsTab: React.FC = () => {
  const mockQuestions: QuestionAnswer[] = [
    { 
      id: 1, 
      question: 'What is the process of photosynthesis?', 
      subject: 'Biology', 
      difficulty: 'Medium', 
      answer: 'Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water...' 
    },
    { 
      id: 2, 
      question: 'Solve for x: 2x + 5 = 15', 
      subject: 'Mathematics', 
      difficulty: 'Easy', 
      answer: 'x = 5' 
    },
    { 
      id: 3, 
      question: 'When did India gain independence?', 
      subject: 'History', 
      difficulty: 'Easy', 
      answer: 'India gained independence on August 15, 1947' 
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Questions & Answers</h3>
      <div className="space-y-4">
        {mockQuestions.map((qa) => (
          <div key={qa.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <h4 className="font-medium text-gray-800">{qa.question}</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                qa.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                qa.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {qa.difficulty}
              </span>
            </div>
            <div className="mt-3">
              <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded mr-2">
                {qa.subject}
              </span>
            </div>
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700"><span className="font-medium">Answer:</span> {qa.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsTab;