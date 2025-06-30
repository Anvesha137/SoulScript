import React, { useState } from 'react';
import { BookOpen, RefreshCw, MessageCircle, HelpCircle, Sparkles, Loader2 } from 'lucide-react';
import { getRandomWisdom } from '../utils/openaiService';

interface WisdomLibraryProps {
  isDarkMode: boolean;
}

const WisdomLibrary: React.FC<WisdomLibraryProps> = ({ isDarkMode }) => {
  const [currentWisdom, setCurrentWisdom] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWisdom = async () => {
    setIsLoading(true);
    try {
      const wisdom = await getRandomWisdom();
      setCurrentWisdom(wisdom);
    } catch (error) {
      console.error('Error fetching wisdom:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchWisdom();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="wisdom-gradient p-4 rounded-3xl shadow-2xl animate-float">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className={`text-4xl font-bold font-serif ${
            isDarkMode ? 'text-white' : 'gradient-text'
          }`}>
            Wisdom Library
          </h2>
          <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
            isDarkMode ? 'text-blue-200' : 'text-gray-600'
          }`}>
            Sometimes you just need a random hit of ancient wisdom. No agenda, no specific problem to solve - 
            just some timeless insight that might spark something in you today.
          </p>
        </div>
      </div>

      {/* Wisdom Card */}
      <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
        isDarkMode ? 'border-blue-500/30' : 'border-blue-200/50'
      } animate-slide-up`}>
        {currentWisdom && !isLoading && (
          <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="wisdom-gradient p-3 rounded-2xl w-fit mx-auto shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-2xl font-bold font-serif ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Today's Random Wisdom Drop
              </h3>
            </div>

            {/* Verse */}
            <div className="text-center space-y-6">
              <div className={`p-8 rounded-2xl ${
                isDarkMode ? 'bg-blue-900/30' : 'bg-gradient-to-r from-blue-50 to-indigo-50'
              }`}>
                <blockquote className={`text-2xl font-serif italic leading-relaxed mb-6 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  "{currentWisdom.verse}"
                </blockquote>
              </div>
            </div>

            {/* Meaning */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-purple-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="spiritual-gradient p-3 rounded-xl mt-1 shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-purple-200' : 'text-gray-800'
                  }`}>
                    What this could mean for you today
                  </h4>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {currentWisdom.meaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Reflection Question */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-green-900/30' : 'bg-gradient-to-r from-green-50 to-emerald-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl mt-1 shadow-lg">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-green-200' : 'text-gray-800'
                  }`}>
                    Something to think about
                  </h4>
                  <p className={`text-lg leading-relaxed font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {currentWisdom.reflectionQuestion}
                  </p>
                  <p className={`text-sm mt-3 ${
                    isDarkMode ? 'text-green-300' : 'text-green-600'
                  }`}>
                    No pressure to have an answer. Sometimes the question is the gift.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-16">
            <div className="wisdom-gradient p-4 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className={`text-lg ${
              isDarkMode ? 'text-blue-200' : 'text-gray-600'
            }`}>
              Finding some wisdom for you...
            </p>
          </div>
        )}

        {/* New Wisdom Button */}
        <div className="mt-10 text-center">
          <button
            onClick={fetchWisdom}
            disabled={isLoading}
            className="wisdom-gradient text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:shadow-2xl disabled:opacity-50 transition-all duration-300 flex items-center space-x-3 mx-auto transform hover:scale-105"
          >
            <RefreshCw className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Hit Me With Another One</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WisdomLibrary;