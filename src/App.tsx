import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Target, Scroll, Sparkles, Moon, Sun } from 'lucide-react';
import DailyReflection from './components/DailyReflection';
import WisdomLibrary from './components/WisdomLibrary';
import LifeChallenges from './components/LifeChallenges';
import SoulDiary from './components/SoulDiary';
import { ReflectionEntry } from './types/types';

function App() {
  const [activeTab, setActiveTab] = useState('daily');
  const [reflections, setReflections] = useState<ReflectionEntry[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedReflections = localStorage.getItem('soulscript-reflections');
    if (savedReflections) {
      setReflections(JSON.parse(savedReflections));
    }
    
    const savedTheme = localStorage.getItem('soulscript-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  const saveReflection = (reflection: ReflectionEntry) => {
    const updatedReflections = [...reflections, reflection];
    setReflections(updatedReflections);
    localStorage.setItem('soulscript-reflections', JSON.stringify(updatedReflections));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('soulscript-theme', !isDarkMode ? 'dark' : 'light');
  };

  const tabs = [
    { 
      id: 'daily', 
      label: 'Daily Reflection', 
      icon: Heart, 
      gradient: 'spiritual-gradient',
      description: 'Dump your thoughts, get wisdom back'
    },
    { 
      id: 'wisdom', 
      label: 'Wisdom Library', 
      icon: BookOpen, 
      gradient: 'wisdom-gradient',
      description: 'Random ancient wisdom hits'
    },
    { 
      id: 'challenges', 
      label: 'Life Challenges', 
      icon: Target, 
      gradient: 'challenge-gradient',
      description: 'Specific help for specific problems'
    },
    { 
      id: 'diary', 
      label: 'Soul Diary', 
      icon: Scroll, 
      gradient: 'diary-gradient',
      description: 'Your journey patterns & growth'
    },
  ];

  const currentTime = new Date().getHours();
  const greeting = currentTime < 12 ? 'Good morning' : currentTime < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-blue-300/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-300/20 rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
      </div>

      {/* Header */}
      <header className={`glass-effect sticky top-0 z-50 transition-all duration-300 ${
        isDarkMode ? 'border-b border-purple-500/30' : 'border-b border-purple-200/50'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="spiritual-gradient p-3 rounded-2xl shadow-lg animate-glow">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold font-serif ${
                  isDarkMode ? 'text-white' : 'gradient-text'
                }`}>
                  SoulScript
                </h1>
                <p className={`text-sm ${
                  isDarkMode ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  {greeting}, beautiful soul ✨ {reflections.length > 0 && `• ${reflections.length} reflections`}
                </p>
              </div>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' 
                  : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 ${
                    isActive
                      ? `${tab.gradient} shadow-2xl`
                      : isDarkMode
                      ? 'glass-effect hover:bg-white/10'
                      : 'bg-white/70 hover:bg-white/90 shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className="relative z-10">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl mb-4 mx-auto transition-all duration-300 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : isDarkMode
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'bg-purple-100 text-purple-600 group-hover:bg-purple-200'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${
                      isActive 
                        ? 'text-white' 
                        : isDarkMode
                        ? 'text-white'
                        : 'text-gray-800'
                    }`}>
                      {tab.label}
                    </h3>
                    <p className={`text-sm ${
                      isActive 
                        ? 'text-white/80' 
                        : isDarkMode
                        ? 'text-purple-200'
                        : 'text-gray-600'
                    }`}>
                      {tab.description}
                    </p>
                  </div>
                  
                  {/* Hover effect overlay */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    !isActive ? tab.gradient : ''
                  }`}></div>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'daily' && (
            <DailyReflection 
              onSaveReflection={saveReflection} 
              isDarkMode={isDarkMode} 
              pastReflections={reflections}
            />
          )}
          {activeTab === 'wisdom' && <WisdomLibrary isDarkMode={isDarkMode} />}
          {activeTab === 'challenges' && <LifeChallenges isDarkMode={isDarkMode} />}
          {activeTab === 'diary' && <SoulDiary reflections={reflections} isDarkMode={isDarkMode} />}
        </div>
      </div>
    </div>
  );
}

export default App;