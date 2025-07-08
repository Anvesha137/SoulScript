import React, { useState, useEffect } from 'react';
import { TrendingUp, Heart, Lightbulb, ArrowRight, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { JournalEntry } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface JourneyAnalysis {
  patterns: string;
  growth: string;
  suggestions: string;
}

interface NoticePatternsProps {
  journalEntries: JournalEntry[];
}

export const NoticePatterns: React.FC<NoticePatternsProps> = ({ journalEntries }) => {
  const [analysis, setAnalysis] = useState<JourneyAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateJourneyAnalysis = async () => {
    if (journalEntries.length < 2) return;
    
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Prepare journal data for analysis
      const journalData = journalEntries.map((entry, index) => ({
        number: journalEntries.length - index,
        mood: entry.mood,
        text: entry.text,
        timestamp: entry.timestamp.toISOString(),
        timeOfDay: entry.timestamp.getHours() >= 22 || entry.timestamp.getHours() <= 5 ? 'late-night' : 
                   entry.timestamp.getHours() >= 6 && entry.timestamp.getHours() <= 11 ? 'morning' :
                   entry.timestamp.getHours() >= 12 && entry.timestamp.getHours() <= 17 ? 'afternoon' : 'evening'
      }));

      const prompt = `
You are SoulScript, a gentle AI companion analyzing someone's journal entries to provide compassionate insights. 

Here are their journal entries (newest first):
${JSON.stringify(journalData, null, 2)}

Analyze these entries and provide insights in this EXACT format and tone:

For "Patterns I'm seeing": Look for recurring themes, emotional patterns, timing patterns, connections between physical and emotional states, triggers, or cycles. Write in a warm, observant tone like "Hey friend, I've noticed..." Be specific about what you observe.

For "How you're growing": Identify positive developments, consistency, emotional honesty, resilience, self-awareness, courage in vulnerability, or any signs of progress. Acknowledge their strength and growth. End with "The fact that you're noticing these patterns is huge progress in itself. You're already much more self-aware than you may realize."

For "What might help next": Provide 1-2 specific, gentle, actionable suggestions based on the patterns you identified. Focus on small, manageable steps. Be encouraging and non-prescriptive.

CRITICAL RULES:
- Write in a caring, friend-like tone
- Be specific to their actual entries, not generic
- Validate their feelings as normal and human
- Focus on growth and strength, not problems to fix
- Keep suggestions gentle and achievable
- Use phrases like "Hey friend," "I've noticed," "That's a huge strength!"

Respond ONLY in this JSON format:
{
  "patterns": "Hey friend, I've noticed [specific observations about their patterns]...",
  "growth": "[Specific observations about their positive developments and growth]... The fact that you're noticing these patterns is huge progress in itself. You're already much more self-aware than you may realize.",
  "suggestions": "[1-2 specific, gentle suggestions based on their patterns]..."
}
`;

      const generationConfig = {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      };

      const result = await model.generateContent(prompt, { generationConfig });
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw AI response:', text);
      
      try {
        // Clean the response text to extract JSON
        let cleanedText = text.trim();
        
        // Remove any markdown code blocks if present
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');
        } else if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');
        }
        
        // Find JSON object in the response
        const jsonStart = cleanedText.indexOf('{');
        const jsonEnd = cleanedText.lastIndexOf('}') + 1;
        
        if (jsonStart !== -1 && jsonEnd > jsonStart) {
          cleanedText = cleanedText.substring(jsonStart, jsonEnd);
        }
        
        const parsed = JSON.parse(cleanedText);
        
        // Validate that all required fields are present
        if (parsed.patterns && parsed.growth && parsed.suggestions) {
          setAnalysis(parsed);
        } else {
          throw new Error('Missing required fields in response');
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        
        // Fallback analysis
        setAnalysis({
          patterns: "Hey friend, I've noticed you're building a beautiful practice of self-reflection. Each entry shows your willingness to be honest with yourself about your feelings and experiences.",
          growth: "You've shown incredible consistency in checking in with yourself. That emotional honesty and self-awareness is a real strength. The fact that you're noticing these patterns is huge progress in itself. You're already much more self-aware than you may realize.",
          suggestions: "Keep honoring your feelings and writing them down. Consider setting a gentle reminder to check in with yourself regularly, maybe at the same time each day when you feel most centered."
        });
      }
    } catch (error) {
      console.error('Error generating analysis:', error);
      
      // Network error fallback
      setAnalysis({
        patterns: "Hey friend, I can see you're taking time to reflect on your inner world. That's such a beautiful practice of self-care and awareness.",
        growth: "Your willingness to be vulnerable with yourself and explore your feelings shows real courage. The fact that you're noticing these patterns is huge progress in itself. You're already much more self-aware than you may realize.",
        suggestions: "Keep being gentle with yourself as you continue this journey of self-discovery. Trust that each reflection is helping you understand yourself better."
      });
    }
    setIsLoading(false);
  };

  // Generate analysis when component mounts or entries change
  useEffect(() => {
    if (journalEntries.length >= 2) {
      generateJourneyAnalysis();
    }
  }, [journalEntries]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-green-600">Notice Your Patterns 📊</h2>
        <p className="text-gray-600">
          Let's gently explore the beautiful patterns in your soul's journey
        </p>
      </div>

      {journalEntries.length < 2 ? (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl text-center">
          <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <p className="text-gray-600">
            Keep journaling, beautiful soul 💫 I'll start noticing your patterns after a few more entries
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Journey Analysis */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-400">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-green-700 flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                What I'm Noticing About Your Journey
              </h3>
              {isLoading && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Analyzing patterns...</span>
                </div>
              )}
            </div>
            
            {analysis ? (
              <>
                {/* Patterns Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Patterns I'm seeing
                  </h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {analysis.patterns}
                    </p>
                  </div>
                </div>

                {/* Growth Section */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                    How you're growing
                  </h4>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {analysis.growth}
                    </p>
                  </div>
                </div>

                {/* Suggestions Section */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <ArrowRight className="w-5 h-5 mr-2 text-blue-600" />
                    What might help next
                  </h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">
                      {analysis.suggestions}
                    </p>
                  </div>
                </div>
              </>
            ) : isLoading ? (
              <div className="text-center py-8">
                <Loader className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
                <p className="text-gray-600">Analyzing your beautiful journey...</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  I'm ready to analyze your patterns when you have a few more entries 💫
                </p>
              </div>
            )}
          </div>

          {/* All Reflections */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-400">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">💜</span>
              Your Soul Diary
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              This is where your journey lives - all the messy thoughts, breakthrough moments, and patterns that make you uniquely you. I'm watching for the threads that connect it all.
            </p>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {journalEntries.map((entry, index) => (
                <div key={entry.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-2 border-purple-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-purple-600 font-medium">
                        #{journalEntries.length - index}
                      </span>
                      <span className="text-sm text-purple-600 font-medium">
                        {entry.mood === 'peaceful' && '😊'} 
                        {entry.mood === 'heavy' && '😢'} 
                        {entry.mood === 'reflective' && '💭'} 
                        {entry.mood === 'tired' && '😴'} 
                        {entry.mood === 'hopeful' && '🌟'} 
                        {entry.mood === 'frustrated' && '😤'} 
                        {entry.mood === 'grateful' && '🤗'} 
                        {entry.mood}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {entry.timestamp.toLocaleDateString()} at {entry.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{entry.text}</p>
                  {entry.aiResponse && (
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <p className="text-xs text-purple-600 mb-1">SoulScript's response:</p>
                      <p className="text-gray-600 text-sm italic leading-relaxed whitespace-pre-line">
                        {entry.aiResponse}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-3">Gentle Reminder 🌿</h3>
        <p>
          Patterns aren't about fixing yourself, lovely. They're about understanding the beautiful, complex human you are. 
          Every emotion you've felt is valid and part of your gorgeous journey. You're not broken - you're growing.
        </p>
      </div>
    </div>
  );
};