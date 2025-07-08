import React from 'react';
import { Heart } from 'lucide-react';

interface NavigationProps {
  currentVibe: string;
  setCurrentVibe: (vibe: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentVibe, setCurrentVibe }) => (
  <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100">
    <div className="max-w-6xl mx-auto px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentVibe('default')}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-all hover:scale-105"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">SoulScript</span>
        </button>
        
        <div className="flex items-center space-x-4">
          {currentVibe !== 'default' && (
            <button
              onClick={() => setCurrentVibe('default')}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-all hover:scale-105 shadow-sm"
            >
              <span>← Back to Wisdom</span>
            </button>
          )}
          <button
            onClick={() => setCurrentVibe('menu')}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all hover:scale-105 shadow-lg"
          >
            <span>Explore More ✨</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);