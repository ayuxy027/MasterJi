import React from 'react';

type Mode = 'study' | 'plan' | 'ideation';

interface ModeSelectorProps {
  currentMode: Mode;
  setCurrentMode: (mode: Mode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, setCurrentMode }) => {
  const modes: Array<{id: Mode, label: string, icon: string, description: string}> = [
    {
      id: 'study',
      label: 'Study Mode',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v8.5C4.168 14.523 5.754 14 7.5 14s3.332.523 4.5 1.253',
      description: 'Focused learning environment with structured conversation flow, detailed explanations, and progressive learning paths.'
    },
    {
      id: 'plan',
      label: 'Plan Mode',
      icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      description: 'Learning path creation and goal tracking with multilingual content planning capabilities.'
    },
    {
      id: 'ideation',
      label: 'Ideation Mode',
      icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      description: 'Creative brainstorming and concept exploration with open-ended discussions.'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Mode</h2>
      <div className="flex flex-wrap gap-4">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setCurrentMode(mode.id)}
            className={`px-6 py-3 rounded-full capitalize transition-all ${
              currentMode === mode.id
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mode.icon}></path>
              </svg>
              <span className="font-medium">{mode.label}</span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-blue-800">
          {modes.find(m => m.id === currentMode)?.description}
        </p>
      </div>
    </div>
  );
};

export default ModeSelector;