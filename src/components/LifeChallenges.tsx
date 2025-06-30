import React, { useState } from 'react';
import { Target, Zap, BookOpen, Lightbulb, CheckCircle, Loader2 } from 'lucide-react';
import { getChallengeGuidance } from '../utils/openaiService';

interface LifeChallengesProps {
  isDarkMode: boolean;
}

const challenges = [
  { id: 'fear', label: 'Fear & Anxiety', emoji: '😰', description: 'When worry takes over your brain' },
  { id: 'anger', label: 'Anger & Frustration', emoji: '😤', description: 'When you want to flip tables' },
  { id: 'doubt', label: 'Doubt & Uncertainty', emoji: '🤔', description: 'When you have no clue what to do' },
  { id: 'attachment', label: 'Letting Go', emoji: '🔗', description: 'When holding on hurts' },
  { id: 'forgiveness', label: 'Forgiveness', emoji: '🤝', description: 'When someone really messed up' },
  { id: 'purpose', label: 'Life Purpose', emoji: '🎯', description: 'When you feel lost and directionless' },
  { id: 'love', label: 'Love & Relationships', emoji: '💕', description: 'When hearts get complicated' },
  { id: 'loss', label: 'Loss & Grief', emoji: '💔', description: 'When goodbye breaks everything' },
];

const LifeChallenges: React.FC<LifeChallengesProps> = ({ isDarkMode }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<string>('');
  const [guidance, setGuidance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChallengeSelect = async (challengeId: string) => {
    setSelectedChallenge(challengeId);
    setGuidance(null);
    setIsLoading(true);
    
    try {
      const challengeLabel = challenges.find(c => c.id === challengeId)?.label || challengeId;
      const aiGuidance = await getChallengeGuidance(challengeLabel);
      setGuidance(aiGuidance);
    } catch (error) {
      console.error('Error getting challenge guidance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="challenge-gradient p-4 rounded-3xl shadow-2xl animate-float">
            <Target className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="space-y-3">
          <h2 className={`text-4xl font-bold font-serif ${
            isDarkMode ? 'text-white' : 'gradient-text'
          }`}>
            Life Challenges
          </h2>
          <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${
            isDarkMode ? 'text-orange-200' : 'text-gray-600'
          }`}>
            Life's throwing you curveballs? Pick what's messing with your peace right now, 
            and let's find some ancient wisdom that actually helps instead of just sounding pretty.
          </p>
        </div>
      </div>

      {/* Challenge Selection */}
      <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
        isDarkMode ? 'border-orange-500/30' : 'border-orange-200/50'
      } animate-slide-up`}>
        <h3 className={`text-2xl font-semibold text-center mb-8 font-serif ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`}>
          What's weighing on you today? 🎯
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {challenges.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => handleChallengeSelect(challenge.id)}
              disabled={isLoading}
              className={`group p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${
                selectedChallenge === challenge.id
                  ? isDarkMode
                    ? 'border-orange-400 bg-orange-900/30 shadow-xl'
                    : 'border-orange-500 bg-orange-50 shadow-xl'
                  : isDarkMode
                  ? 'border-gray-600 bg-gray-800/30 hover:border-orange-400 hover:bg-orange-900/20'
                  : 'border-gray-200 bg-white/80 hover:border-orange-300 hover:bg-orange-50'
              } disabled:opacity-50`}
            >
              <div className="text-center space-y-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {challenge.emoji}
                </div>
                <div>
                  <h4 className={`font-semibold text-lg mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {challenge.label}
                  </h4>
                  <p className={`text-sm leading-relaxed ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {challenge.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
          isDarkMode ? 'border-orange-500/30' : 'border-orange-200/50'
        } animate-fade-in`}>
          <div className="text-center py-12">
            <div className="challenge-gradient p-4 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className={`text-lg ${
              isDarkMode ? 'text-orange-200' : 'text-gray-600'
            }`}>
              Getting some real guidance for you...
            </p>
          </div>
        </div>
      )}

      {/* Guidance Result */}
      {guidance && !isLoading && (
        <div className={`glass-effect rounded-3xl p-8 shadow-2xl border ${
          isDarkMode ? 'border-orange-500/30' : 'border-orange-200/50'
        } animate-fade-in`}>
          <div className="space-y-8">
            {/* Challenge Header */}
            <div className="text-center space-y-4">
              <div className="challenge-gradient p-3 rounded-2xl w-fit mx-auto shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-2xl font-bold font-serif ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Guidance for {guidance.challenge}
              </h3>
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
                    "{guidance.verse}"
                  </blockquote>
                </div>
              </div>
            </div>

            {/* Guidance */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-purple-900/30' : 'bg-gradient-to-r from-purple-50 to-pink-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="spiritual-gradient p-3 rounded-xl mt-1 shadow-lg">
                  <Lightbulb className="w-5 h-5 text-white" />
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
                    {guidance.guidance}
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className={`rounded-2xl p-6 ${
              isDarkMode ? 'bg-green-900/30' : 'bg-gradient-to-r from-green-50 to-emerald-50'
            }`}>
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 rounded-xl mt-1 shadow-lg">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold text-lg mb-3 ${
                    isDarkMode ? 'text-green-200' : 'text-gray-800'
                  }`}>
                    Something small you can try today
                  </h4>
                  <p className={`text-lg leading-relaxed font-medium ${
                    isDarkMode ? 'text-white' : 'text-gray-700'
                  }`}>
                    {guidance.action}
                  </p>
                  <p className={`text-sm mt-3 ${
                    isDarkMode ? 'text-green-300' : 'text-green-600'
                  }`}>
                    Baby steps count. You don't have to transform overnight.
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

export default LifeChallenges;