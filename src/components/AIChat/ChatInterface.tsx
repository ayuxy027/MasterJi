import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

interface ChatInterfaceProps {
  currentMode: 'study' | 'plan' | 'ideation';
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentMode, messages, setMessages }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    // Mock AI response after delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        text: `This is a mock response to: "${inputValue}" using ${selectedModel}. In a real implementation, the AI would provide a relevant answer based on the ${currentMode} mode.`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFileAttach = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      // Add file info to the chat
      setInputValue(prev => prev + ` [Attached: ${file.name}]`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getExamplePrompts = () => {
    switch(currentMode) {
      case 'study':
        return [
          "Explain photosynthesis",
          "Math problem: 2x + 5 = 15",
          "Tell me about the French Revolution"
        ];
      case 'plan':
        return [
          "Create study plan for physics",
          "Set learning goals",
          "Plan my study schedule for next week"
        ];
      case 'ideation':
        return [
          "Creative project ideas",
          "Brainstorm solutions for climate change",
          "How can I improve my writing skills?"
        ];
      default:
        return [];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Chat Header with Integrated Mode Selector */}
      <div className="bg-orange-500 text-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <h3 className="font-semibold">AI Learning Assistant</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/20 rounded-full px-2.5 py-1">
              {currentMode.charAt(0).toUpperCase() + currentMode.slice(1)} Mode
            </span>
            <div className="text-xs">● Online</div>
          </div>
        </div>
        
        {/* Learning Mode Selector - Integrated directly in header */}
        <div className="flex gap-2">
          {(['study', 'plan', 'ideation'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setCurrentMode(mode)}
              className={`px-3 py-1.5 text-xs rounded-full capitalize ${
                currentMode === mode
                  ? 'bg-white text-orange-500'
                  : 'bg-orange-600/50 text-orange-100 hover:bg-orange-600/70'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
      
      {/* Model Selector */}
      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">Model:</span>
          <select 
            value={selectedModel} 
            onChange={(e) => setSelectedModel(e.target.value)}
            className="text-xs bg-white border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            <option value="deepseek">DeepSeek R1</option>
            <option value="groq">Groq Llama</option>
            <option value="gemini">Gemini Pro</option>
          </select>
        </div>
      </div>
      
      {/* Messages Container */}
      <div className="h-[400px] bg-white overflow-y-auto p-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-xl p-3 ${
                message.sender === 'user' 
                  ? 'bg-orange-500 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-orange-200' : 'text-gray-500'}`}>
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* File Attachment Indicator */}
      {attachedFile && (
        <div className="px-4 py-2 bg-orange-50 border-b border-orange-200 flex items-center gap-2">
          <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
          </svg>
          <span className="text-xs text-gray-700 truncate">{attachedFile.name}</span>
          <button 
            onClick={() => setAttachedFile(null)}
            className="ml-auto text-orange-500 hover:text-orange-700"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
      
      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Ask anything in ${currentMode} mode...`}
              className="w-full border border-gray-300 rounded-lg p-3 resize-none h-12 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-transparent"
              rows={1}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className={`p-3 rounded-lg ${
              inputValue.trim()
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
            </svg>
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input
              type="file"
              id="file-attach"
              className="hidden"
              onChange={handleFileAttach}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <button
              onClick={() => document.getElementById('file-attach')?.click()}
              className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
              </svg>
              Attach
            </button>
          </div>
          
          <div className="flex gap-2">
            {getExamplePrompts().slice(0, 2).map((prompt, index) => (
              <button 
                key={index}
                className="text-xs bg-orange-100 text-orange-700 px-2.5 py-1 rounded-full hover:bg-orange-200 transition"
                onClick={() => setInputValue(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;