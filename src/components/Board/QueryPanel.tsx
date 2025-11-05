import React, { useState } from 'react';
import { Bot, X } from 'lucide-react';

interface QueryPanelProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const QueryPanel: React.FC<QueryPanelProps> = ({ query, setQuery, onSubmit, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
      {!isExpanded ? (
        // Collapsed state - Robot icon button
        <button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg transition-all duration-300 flex items-center justify-center group"
          title="Generate Cards"
        >
          <Bot size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      ) : (
        // Expanded state - Query input panel
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orange-200 p-4 w-80">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bot size={20} className="text-orange-500" />
              <h3 className="text-sm font-semibold text-orange-600">Generate Cards</h3>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-orange-500 hover:text-orange-600 transition-colors"
              title="Collapse"
            >
              <X size={18} />
            </button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-3">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your query to generate cards..."
              className="w-full px-3 py-2 bg-transparent border border-orange-200 rounded-lg outline-none text-orange-900 placeholder-orange-400 resize-none focus:border-orange-400 transition-colors"
              rows={4}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Bot size={16} />
                  <span>Generate</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QueryPanel;

