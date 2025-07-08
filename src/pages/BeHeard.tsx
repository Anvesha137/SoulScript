import React, { useState } from 'react';
import { Mic } from 'lucide-react';
import { JournalEntry } from '../types';

interface BeHeardProps {
  journalEntries: JournalEntry[];
  addJournalEntry: (text: string, mood: string) => void;
}

export const BeHeard: React.FC<BeHeardProps> = ({ journalEntries, addJournalEntry }) => {
  const [journalText, setJournalText] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const moods = [
    { emoji: '😊', label: 'peaceful', color: 'bg-green-100 text-green-800' },
    { emoji: '😢', label: 'heavy', color: 'bg-blue-100 text-blue-800' },
    { emoji: '😴', label: 'tired', color: 'bg-purple-100 text-purple-800' },
    { emoji: '🌟', label: 'hopeful', color: 'bg-yellow-100 text-yellow-800' },
    { emoji: '😤', label: 'frustrated', color: 'bg-red-100 text-red-800' },
    { emoji: '🤗', label: 'grateful', color: 'bg-pink-100 text-pink-800' }
  ];

  const handleSubmit = () => {
    if (journalText.trim() && selectedMood) {
      addJournalEntry(journalText, selectedMood);
      setJournalText('');
      setSelectedMood('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-purple-600">Be Heard 🎧</h2>
        <p className="text-gray-600">
          Hey lovely 🌸 wanna voice journal with me? Even if you're ugly-crying in your car — I promise it's safe here.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
              isRecording 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-purple-500 text-white hover:bg-purple-600'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>{isRecording ? 'Recording...' : 'Talk to a Friend'}</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Or type your thoughts here, beautiful soul... 💭"
            className="w-full h-32 p-4 border-2 border-purple-200 rounded-lg focus:border-purple-400 focus:outline-none resize-none"
          />
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">How are you feeling right now? 💜</p>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood.label}
                  onClick={() => setSelectedMood(mood.label)}
                  className={`px-3 py-2 rounded-full text-sm transition-all ${
                    selectedMood === mood.label 
                      ? mood.color + ' ring-2 ring-purple-400' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mood.emoji} {mood.label}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={!journalText.trim() || !selectedMood}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Share with Your Soul Friend ✨
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Your Recent Reflections 🌙</h3>
        {journalEntries.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Your journal is waiting for your first beautiful thought 💭</p>
          </div>
        ) : (
          journalEntries.slice(0, 3).map((entry) => (
            <div key={entry.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-600 font-medium">
                  {moods.find(m => m.label === entry.mood)?.emoji} {entry.mood}
                </span>
                <span className="text-xs text-gray-500">
                  {entry.timestamp.toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};