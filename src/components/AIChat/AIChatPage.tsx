import React, { useState } from 'react';
import ModeSelector from './ModeSelector';
import ChatInterface from './ChatInterface';

const AIChatPage: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<'study' | 'plan' | 'ideation'>('study');
  const [messages, setMessages] = useState<Array<{id: number, text: string, sender: 'user' | 'ai', timestamp: string}>>([
    { id: 1, text: "Hello! I'm your AI tutor. How can I help you today?", sender: 'ai', timestamp: "10:00 AM" },
    { id: 2, text: "I want to learn about photosynthesis.", sender: 'user', timestamp: "10:01 AM" },
    { id: 3, text: "Great! Photosynthesis is the process by which plants convert sunlight into energy...", sender: 'ai', timestamp: "10:01 AM" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            AI-Powered <span className="text-orange-500">Learning Assistant</span>
          </h1>
          <p className="text-gray-600">
            Multilingual support for 22+ Indian languages with adaptive learning engine
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-wrap gap-4 mb-6">
            {(['study', 'plan', 'ideation'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setCurrentMode(mode)}
                className={`px-4 py-2 rounded-full capitalize transition-all ${
                  currentMode === mode
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {mode} Mode
              </button>
            ))}
          </div>
          
          <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-200">
            <p>
              {currentMode === 'study' && 'Focused learning environment with structured conversation flow and detailed explanations.'}
              {currentMode === 'plan' && 'Learning path creation and goal tracking with multilingual content planning capabilities.'}
              {currentMode === 'ideation' && 'Creative brainstorming and concept exploration with open-ended discussions.'}
            </p>
          </div>
        </div>
        
        <ChatInterface 
          currentMode={currentMode} 
          messages={messages} 
          setMessages={setMessages} 
        />
      </div>
    </div>
  );
};

export default AIChatPage;