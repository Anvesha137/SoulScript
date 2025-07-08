import React, { useState } from 'react';
import { Heart, Mic, TrendingUp, Users, Coffee, CheckSquare, Sparkles, HeartHandshake } from 'lucide-react';
import { VibeCard } from '../components/VibeCard';

interface HomeProps {
  setCurrentVibe: (vibe: string) => void;
  userName: string;
  setUserName: (name: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentVibe, userName, setUserName }) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Heart className="w-8 h-8 text-pink-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SoulScript
          </h1>
          <Heart className="w-8 h-8 text-pink-400" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hey beautiful soul 🌸 Welcome to your gentle digital sanctuary. I'm here to listen, reflect, and walk alongside you through every moment.
        </p>
        {!userName && (
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="What should I call you, lovely? ✨"
              className="w-full px-4 py-3 rounded-full border-2 border-purple-200 focus:border-purple-400 focus:outline-none transition-colors"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setUserName(e.currentTarget.value);
                }
              }}
            />
          </div>
        )}
        {userName && (
          <p className="text-xl text-purple-600 font-medium">
            Hey {userName}! 💫 Ready to explore your inner world?
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VibeCard
          icon={<Mic className="w-6 h-6" />}
          title="Be Heard"
          description="Talk to a friend who really listens 🎧"
          onClick={() => setCurrentVibe('heard')}
          gradient="from-blue-500 to-purple-600"
        />
        <VibeCard
          icon={<TrendingUp className="w-6 h-6" />}
          title="Notice Your Patterns"
          description="See your beautiful patterns unfold 📊"
          onClick={() => setCurrentVibe('patterns')}
          gradient="from-emerald-500 to-blue-600"
        />
        <VibeCard
          icon={<Users className="w-6 h-6" />}
          title="Feel Less Alone"
          description="Anonymous souls sharing what helps 💛"
          onClick={() => setCurrentVibe('community')}
          gradient="from-orange-500 to-pink-600"
        />
        <VibeCard
          icon={<Coffee className="w-6 h-6" />}
          title="Permission to Pause"
          description="No need to optimize today 🌿"
          onClick={() => setCurrentVibe('pause')}
          gradient="from-purple-500 to-pink-600"
        />
        <VibeCard
          icon={<CheckSquare className="w-6 h-6" />}
          title="Little Nudges to Care"
          description="Gentle reminders for self-care 💌"
          onClick={() => setCurrentVibe('care')}
          gradient="from-teal-500 to-green-600"
        />
        <VibeCard
          icon={<Sparkles className="w-6 h-6" />}
          title="Gentle Wisdom"
          description="Ancient wisdom meets modern vibes 🌙"
          onClick={() => setCurrentVibe('wisdom')}
          gradient="from-indigo-500 to-purple-600"
        />
        <VibeCard
          icon={<Sparkles className="w-6 h-6" />}
          title="Play & Explore Yourself"
          description="7 questions to discover YOU ✨"
          onClick={() => setCurrentVibe('explore')}
          gradient="from-pink-500 to-purple-600"
        />
      </div>
    </div>
  );
};