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
      answer: 'Photosynthesis is the process by which green plants use sunlight, carbon dioxide, and water to synthesize food materials.' 
    },
    { 
      id: 2, 
      question: 'Solve for x: 2x + 5 = 15', 
      subject: 'Mathematics', 
      difficulty: 'Easy', 
      answer: 'Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5.' 
    },
    { 
      id: 3, 
      question: 'When did India gain independence?', 
      subject: 'History', 
      difficulty: 'Easy', 
      answer: 'India gained independence on August 15, 1947.' 
    },
  ];

  return (
    <div>
      <h3 className="text-xl font-bold text-orange-800 mb-6">Generated Questions & Answers</h3>
      <div className="space-y-6">
        {mockQuestions.map((qa) => (
          <div key={qa.id} className="bg-white rounded-xl border border-orange-200 hover:shadow-md transition-shadow duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-gray-800 text-lg">{qa.question}</h4>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                  qa.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  qa.difficulty === 'Medium' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {qa.difficulty}
                </span>
              </div>
              <div className="mb-4">
                <span className="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full border border-orange-200">
                  {qa.subject}
                </span>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <p className="text-gray-700 flex items-start gap-2">
                  <span className="font-bold text-orange-600 mt-0.5">Answer:</span> 
                  <span>{qa.answer}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionsTab;