import React, { useState } from 'react';
import { Send, Sparkles, Heart, BookOpen, MessageCircle, Star, Loader2, Clock } from 'lucide-react';
import { ReflectionEntry } from '../types/types';
import { generateDailyReflection } from '../utils/openaiService';

interface DailyReflectionProps {
  onSaveReflection: (reflection: ReflectionEntry) => void;
  isDarkMode: boolean;
  pastReflections: ReflectionEntry[];
}

const DailyReflection: React.FC<DailyReflectionProps> = ({ onSaveReflection, isDarkMode, pastReflections }) => {
  const [userInput, setUserInput] = useState('');
  const [reflection, setReflection] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    setIsLoading(true);
    
    try {
      const aiResponse = await generateDailyReflection(userInput.trim(), pastReflections);
      
      const newReflection: ReflectionEntry = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        userInput: userInput.trim(),
        theme: aiResponse.theme,
        verse: aiResponse.verse,
        source: aiResponse.source,
        meaning: aiResponse.meaning,
        affirmation: aiResponse.affirmation,
        timestamp: Date.now(),
        mood: aiResponse.mood,
        isVenting: aiResponse.isVenting
      };
      
      setReflection(newReflection);
      onSaveReflection(newReflection);
      setUserInput('');
    } catch (error) {
      console.error('Error generating reflection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 18 ? 'afternoon' : 'evening';
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  // Check for patterns
  const recentReflections = pastReflections.slice(-5);
  const hasPattern = recentReflections.length >= 3 && 
    recentReflections.filter(r => r.theme === recentReflections[0].theme).length >= 2;

  return (
    <div className="space-y-10">
      {/* Introduction */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="spiritual-gradient p-4 rounded-3xl shadow-2xl animate-float">
            <Heart className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className={`text-4xl font-bold font-serif ${
            isDarkMode ? 'text-white' : 'gradient-text'
          }`}>
            Daily Reflection
          </h2>
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Clock className={`w-4 h-4 ${isDarkMode ? 'text-purple-300' : 'text-gray-500'}`} />
            <span className={isDarkMode ? 'text-purple-200' : 'text-gray-600'}>
              {timeOfDay} • {currentTime}
            </span>
          </div>
          <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
            isDarkMode ? 'text-purple-200' : 'text-gray-600'
          }`}>
            Hey there, beautiful soul. This is your space to dump whatever's on your mind - the messy thoughts, 
            the "why am I like this?" moments, the wins, the struggles. I'm here to listen and offer some ancient wisdom 
            that actually makes sense for your life.
          </p>
          
          {hasPattern && (
            <div className={`max-w-2xl mx-auto p-4 rounded-xl ${
              isDarkMode ? 'bg-yellow-900/30 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <p className={`text-sm ${
                isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
              }`}>
                💡 I notice you've been working through "{recentReflections[0].theme}" lately. 
                That's totally normal - sometimes our souls need to process things in layers.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
        isDarkMode ? 'border-purple-500/30' : 'border-purple-200/50'
      } animate-slide-up`}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label htmlFor="reflection" className={`block text-lg font-medium ${
              isDarkMode ? 'text-purple-200' : 'text-gray-700'
            }`}>
              What's going on in your world today? ✨
            </label>
            <div className="relative">
              <textarea
                id="reflection"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Seriously, anything goes here. Failed at your side hustle? Feeling weird about that text you sent? Had an amazing moment? Existential crisis at 2 AM? I'm here for all of it..."
                className={`w-full h-40 px-6 py-4 rounded-2xl border-2 transition-all duration-300 resize-none text-lg leading-relaxed ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-purple-500/30 text-white placeholder-purple-300 focus:border-purple-400 focus:bg-gray-800/70' 
                    : 'bg-white/80 border-purple-200 text-gray-800 placeholder-gray-500 focus:border-purple-400 focus:bg-white'
                } focus:ring-4 focus:ring-purple-500/20`}
                disabled={isLoading}
              />
              <div className={`absolute bottom-4 right-4 text-sm ${
                isDarkMode ? 'text-purple-300' : 'text-gray-400'
              }`}>
                {userInput.length} characters
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !userInput.trim()}
            className="w-full spiritual-gradient text-white py-4 px-8 rounded-2xl font-semibold text-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Getting some wisdom for you...</span>
              </>
            ) : (
              <>
                <Send className="w-6 h-6" />
                <span>Talk to Me</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Reflection Result */}
      {reflection && (
        <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
          isDarkMode ? 'border-purple-500/30' : 'border-purple-200/50'
        } animate-fade-in`}>
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
              <div className="spiritual-gradient p-3 rounded-2xl w-fit mx-auto">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-2xl font-bold font-serif ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {reflection.isVenting ? "I hear you" : "Some wisdom for you"}
              </h3>
              <div className="flex items-center justify-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  isDarkMode ? 'bg-purple-800/50 text-purple-200' : 'bg-purple-100 text-purple-700'
                }`}>
                  Mood: {reflection.mood}
                </span>
                {reflection.isVenting && (
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    isDarkMode ? 'bg-orange-800/50 text-orange-200' : 'bg-orange-100 text-orange-700'
                  }`}>
                    Venting detected ✓
                  </span>
                )}
              </div>
            </div>

            {/* Theme */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-purple-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="spiritual-gradient p-3 rounded-xl mt-1 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-2 ${
                    isDarkMode ? 'text-purple-200' : 'text-gray-800'
                  }`}>
                    What I'm picking up on
                  </h4>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {reflection.theme}
                  </p>
                </div>
              </div>
            </div>

            {/* Verse */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-blue-900/30' : 'bg-gradient-to-r from-blue-50 to-indigo-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="wisdom-gradient p-3 rounded-xl mt-1 shadow-lg">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <blockquote className={`text-lg italic leading-relaxed mb-4 font-serif ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  } border-l-4 border-blue-400 pl-6`}>
                    "{reflection.verse}"
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Meaning */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-green-900/30' : 'bg-gradient-to-r from-green-50 to-emerald-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl mt-1 shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-green-200' : 'text-gray-800'
                  }`}>
                    What this could mean for you today
                  </h4>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {reflection.meaning}
                  </p>
                </div>
              </div>
            </div>

            {/* Affirmation */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-pink-900/30' : 'bg-gradient-to-r from-pink-50 to-rose-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-xl mt-1 shadow-lg">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-pink-200' : 'text-gray-800'
                  }`}>
                    Something to carry with you
                  </h4>
                  <p className={`text-xl font-medium leading-relaxed px-6 py-4 rounded-xl font-serif ${
                    isDarkMode ? 'bg-pink-800/30 text-pink-100' : 'bg-pink-100 text-pink-800'
                  }`}>
                    "{reflection.affirmation}"
                  </p>
                  <p className={`text-sm mt-3 ${
                    isDarkMode ? 'text-pink-300' : 'text-pink-600'
                  }`}>
                    No pressure to believe it right away. Sometimes we grow into our affirmations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyReflection;