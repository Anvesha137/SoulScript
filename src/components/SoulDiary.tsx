import React from 'react';
import { Scroll, Calendar, TrendingUp, Sparkles, Heart, BookOpen, Clock } from 'lucide-react';
import { ReflectionEntry } from '../types/types';
import { analyzeSoulJourney } from '../utils/openaiService';

interface SoulDiaryProps {
  reflections: ReflectionEntry[];
  isDarkMode: boolean;
}

const SoulDiary: React.FC<SoulDiaryProps> = ({ reflections, isDarkMode }) => {
  const [analysis, setAnalysis] = React.useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);

  React.useEffect(() => {
    const analyzeJourney = async () => {
      if (reflections.length === 0) {
        setAnalysis({
          patterns: "You're just getting started, and honestly? That takes guts. Most people avoid looking at their inner world like it's a messy closet they'll deal with 'someday.'",
          growth: "The fact that you're here, willing to be real with yourself, is already huge. That's not nothing - that's everything.",
          focus: "Just keep showing up. Be curious about your thoughts and feelings like you're getting to know a new friend. No pressure to have it all figured out."
        });
        return;
      }
      
      setIsAnalyzing(true);
      try {
        const journeyAnalysis = await analyzeSoulJourney(reflections);
        setAnalysis(journeyAnalysis);
      } catch (error) {
        console.error('Error analyzing journey:', error);
      } finally {
        setIsAnalyzing(false);
      }
    };

    analyzeJourney();
  }, [reflections]);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: Record<string, string> = {
      'anxious': '😰',
      'frustrated': '😤',
      'confused': '🤔',
      'sad': '😢',
      'angry': '😠',
      'peaceful': '😌',
      'grateful': '🙏',
      'hopeful': '🌟',
      'reflective': '💭',
      'overwhelmed': '😵',
      'content': '😊',
      'uncertain': '🤷',
      'tired': '😴'
    };
    return moodMap[mood.toLowerCase()] || '💭';
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="diary-gradient p-4 rounded-3xl shadow-2xl animate-float">
            <Scroll className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className={`text-4xl font-bold font-serif ${
            isDarkMode ? 'text-white' : 'gradient-text'
          }`}>
            Your Soul Diary
          </h2>
          <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
            isDarkMode ? 'text-teal-200' : 'text-gray-600'
          }`}>
            This is where your journey lives - all the messy thoughts, breakthrough moments, 
            and patterns that make you uniquely you. I'm watching for the threads that connect it all.
          </p>
        </div>
      </div>

      {/* Journey Analysis */}
      {analysis && (
        <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
          isDarkMode ? 'border-teal-500/30' : 'border-teal-200/50'
        } animate-slide-up`}>
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="diary-gradient p-3 rounded-2xl w-fit mx-auto shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-2xl font-bold font-serif ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                What I'm Noticing About Your Journey
              </h3>
            </div>

            {/* Patterns */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-purple-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="spiritual-gradient p-3 rounded-xl mt-1 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-purple-200' : 'text-gray-800'
                  }`}>
                    Patterns I'm seeing
                  </h4>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {analysis.patterns}
                  </p>
                </div>
              </div>
            </div>

            {/* Growth */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-green-900/30' : 'bg-gradient-to-r from-green-50 to-emerald-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl mt-1 shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-green-200' : 'text-gray-800'
                  }`}>
                    How you're growing
                  </h4>
                  <p className={`text-lg leading-relaxed ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {analysis.growth}
                  </p>
                </div>
              </div>
            </div>

            {/* Focus */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-blue-900/30' : 'bg-gradient-to-r from-blue-50 to-indigo-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="wisdom-gradient p-3 rounded-xl mt-1 shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-blue-200' : 'text-gray-800'
                  }`}>
                    What might help next
                  </h4>
                  <p className={`text-lg leading-relaxed font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {analysis.focus}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reflection History */}
      <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
        isDarkMode ? 'border-teal-500/30' : 'border-teal-200/50'
      }`}>
        <h3 className={`text-2xl font-semibold mb-8 flex items-center space-x-3 font-serif ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          <Scroll className="w-6 h-6 text-teal-600" />
          <span>Your Reflections ({reflections.length})</span>
        </h3>

        {reflections.length === 0 ? (
          <div className="text-center py-16">
            <div className={`mb-6 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-400'
            }`}>
              <Heart className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h4 className={`text-xl font-semibold mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Your diary is waiting for your first entry
            </h4>
            <p className={`text-lg mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Every journey starts with a single step of honesty.
            </p>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Head to Daily Reflection and dump whatever's on your mind - I'll be here to listen.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reflections.slice().reverse().map((reflection, index) => (
              <div key={reflection.id} className={`rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-800/30 border-gray-600 hover:border-teal-400' 
                  : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200/50 hover:border-teal-300'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isDarkMode ? 'bg-teal-800/50' : 'bg-teal-100'
                    }`}>
                      <span className="text-lg">{getMoodEmoji(reflection.mood || 'reflective')}</span>
                    </div>
                    <div>
                      <h4 className={`font-semibold text-lg ${
                        isDarkMode ? 'text-white' : 'text-gray-800'
                      }`}>
                        {reflection.theme}
                      </h4>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                            {formatDate(reflection.timestamp)}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          isDarkMode ? 'bg-teal-800/50 text-teal-200' : 'bg-teal-100 text-teal-700'
                        }`}>
                          {getTimeAgo(reflection.timestamp)}
                        </span>
                        {reflection.mood && (
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            isDarkMode ? 'bg-purple-800/50 text-purple-200' : 'bg-purple-100 text-purple-700'
                          }`}>
                            {reflection.mood}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className={`text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      What you shared:
                    </p>
                    <p className={`italic leading-relaxed ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      "{reflection.userInput}"
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? 'bg-teal-900/30' : 'bg-teal-50'
                  }`}>
                    <p className={`text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-teal-200' : 'text-teal-700'
                    }`}>
                      Your affirmation:
                    </p>
                    <p className={`font-medium leading-relaxed ${
                      isDarkMode ? 'text-white' : 'text-teal-800'
                    }`}>
                      "{reflection.affirmation}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SoulDiary;