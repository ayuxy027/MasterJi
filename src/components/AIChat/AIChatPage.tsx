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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">AI-Powered Learning Assistant</h1>
          <p className="text-gray-600">Multilingual support for 22+ Indian languages</p>
        </div>
        
        <ModeSelector currentMode={currentMode} setCurrentMode={setCurrentMode} />
        
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