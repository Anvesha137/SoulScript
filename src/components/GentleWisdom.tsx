import React, { useState } from 'react';
import { Sparkles, Heart, Send } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { JournalEntry } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface WisdomResponse {
  verse: string;
  commentary: string;
  affirmation: string;
}

interface GentleWisdomProps {
  journalEntries: JournalEntry[];
  addJournalEntry: (text: string, mood: string, aiResponse?: string) => void;
}

export const GentleWisdom: React.FC<GentleWisdomProps> = ({ journalEntries, addJournalEntry }) => {
  const [userInput, setUserInput] = useState('');
  const [wisdom, setWisdom] = useState<WisdomResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getWisdom = async () => {
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Get context from previous entries
      const recentEntries = journalEntries.slice(0, 3).map(entry => ({
        text: entry.text,
        mood: entry.mood,
        time: entry.timestamp.toLocaleString(),
        response: entry.aiResponse
      }));
      
      const contextString = recentEntries.length > 0 
        ? `Previous reflections for context: ${JSON.stringify(recentEntries)}`
        : '';
      
      const prompt = `
You are SoulScript, a Gen Z spiritual companion. The user shared: "${userInput}"

${contextString}

Your response style should match this EXACT format and tone:

Example tone: "Hey, it's rough when things don't go as planned, especially with the side hustle and social stuff. Those late-night spirals? Totally get it. Jeremiah's verse isn't about ignoring the suck, it's about remembering there's *something* else there, even if you can't see it right now. Maybe not a magic 'good enough' switch, but a reminder that things can shift. It's okay to feel this way; it doesn't mean you're bad. Just means you're human."

CRITICAL RULES:
- Reference their previous entries if relevant to show you remember their journey
- Use specific details from their current message
- Be conversational like you're texting a close friend
- Quote verses EXACTLY from Bible or Bhagavad Gita but don't mention book names
- Validate their feelings without saying "that's valid AF" every time
- Use natural language, not forced Gen Z slang
- Make it personal to their specific situation

Respond ONLY in this JSON format:
{
  "verse": "exact scripture text - do not change a single word",
  "commentary": "conversational commentary in the style shown above - be specific to their situation, reference context if relevant",
  "affirmation": "a gentle personal affirmation in quotes"
}

Your response style should match this EXACT format and tone:

Example: "Hey, it's 12:48 AM. Yeah, these past few Sundays have been rough. That whole 'should be doing more' thing? It's a total trap. It sounds like you're beating yourself up about your side hustle and feeling kinda lonely. That verse? It's not some cheesy 'everything will be fine' thing. It's saying even when things are a mess (like, REALLY messy), there's still a plan, even if you can't see it right now. Try focusing on one small thing you CAN control tomorrow. Maybe even just planning something for next weekend, something to break this cycle."

CRITICAL RULES:
- Start with current time if it feels natural (like "Hey, it's 12:48 AM")
- Reference specific details from their message and previous entries
- Acknowledge patterns you notice ("these past few Sundays", "that whole X thing")
- Be conversational like texting a close friend late at night
- Quote verses EXACTLY but don't mention book names ("That verse" not "This Matthew verse")
- Give specific, actionable suggestions that relate to their situation
- Use natural language, avoid forced slang
- Make it feel personal and specific to what they're going through
- End with a concrete suggestion they can try
`;

      // Add temperature and other parameters to make responses more varied
      const generationConfig = {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      };

      const result = await model.generateContent(prompt, { generationConfig });
      const response = await result.response;
      const text = response.text();
      
      console.log('Raw AI response:', text); // Debug log
      
      // Try to parse JSON response
      let cleanedText = '';
      try {
        // Clean the response text to extract JSON
        cleanedText = text.trim();
        
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
        if (parsed.verse && parsed.commentary && parsed.affirmation) {
          setWisdom(parsed);
          
          // Save this interaction to journal entries
          const fullResponse = `${parsed.commentary}\n\n"${parsed.verse}"\n\n${parsed.affirmation}`;
          addJournalEntry(userInput, 'reflective', fullResponse);
        } else {
          throw new Error('Missing required fields in response');
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        console.error('Cleaned text:', cleanedText);
        
        // Fallback response if JSON parsing fails
        // Generate a more varied fallback based on user input
        const fallbackResponses = [
          {
            verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
            commentary: `Hey, it's ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}. ${userInput.toLowerCase().includes('anxiety') || userInput.toLowerCase().includes('worried') ? "That anxious spiral hitting again? Yeah, I see you." : userInput.toLowerCase().includes('lonely') || userInput.toLowerCase().includes('alone') ? "Feeling alone hits different when it's quiet like this." : userInput.toLowerCase().includes('tired') || userInput.toLowerCase().includes('exhausted') ? "That bone-deep tired feeling? I get it." : "Whatever's going on in your head right now, it matters."} That verse isn't some cheesy 'everything will be perfect' thing. It's more like... even when you can't see the path forward, there's still something there. Try doing one tiny thing tomorrow that feels good - maybe just making your bed or texting someone who makes you smile.`,
            affirmation: "I can feel uncertain and still trust that something good is coming."
          },
          {
            verse: "You have the right to work, not to the fruits of work.",
            commentary: `Hey, this basically said 'do your thing and let go of the outcome' and honestly? That hits different when you're ${userInput.toLowerCase().includes('stress') || userInput.toLowerCase().includes('pressure') ? "feeling all that pressure to perform." : userInput.toLowerCase().includes('work') || userInput.toLowerCase().includes('job') ? "dealing with work stuff." : "trying to control everything."} You can only control your effort, not how things turn out. Maybe try focusing on just showing up tomorrow, not on being perfect or getting specific results.`,
            affirmation: "I can show up and do my best without needing to control the outcome."
          },
          {
            verse: "Cast all your anxiety on Him because He cares for you.",
            commentary: `This is basically saying 'give your messy brain stuff to God because He actually cares.' ${userInput.toLowerCase().includes('overwhelm') || userInput.toLowerCase().includes('too much') ? "When everything feels like too much, you don't have to carry it all." : userInput.toLowerCase().includes('anxiety') || userInput.toLowerCase().includes('worried') ? "All those racing thoughts? You don't have to solve them all tonight." : "Your worries matter, but you don't have to handle everything alone."} Try writing down three things you're worried about, then literally saying 'okay, I'm giving these to you' and closing the notebook.`,
            affirmation: "I can give my worries away and trust that I'm cared for."
          }
        ];
        
        // Select a fallback based on content or randomly
        const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
        setWisdom({
          ...fallbackResponses[randomIndex]
        });
        
        // Save fallback response too
        const fullResponse = `${fallbackResponses[randomIndex].commentary}\n\n"${fallbackResponses[randomIndex].verse}"\n\n${fallbackResponses[randomIndex].affirmation}`;
        addJournalEntry(userInput, 'reflective', fullResponse);
      }
    } catch (error) {
      console.error('Error getting wisdom:', error);
      // Network or API error fallback
      setWisdom({
        verse: "Be still, and know that I am God.",
        commentary: `Hey, looks like there was a tech hiccup, but maybe that's the universe telling us to pause for a sec. This verse is basically saying 'take a breath, you don't have to figure everything out right now.' ${userInput.toLowerCase().includes('stress') || userInput.toLowerCase().includes('overwhelm') ? "Especially when you're feeling all that pressure." : "Sometimes the best thing is just... being still."} Try taking three deep breaths and reminding yourself that this moment is enough.`,
        affirmation: "I can be still and trust that I don't need to have it all figured out."
      });
      
      // Save error fallback too
      const fullResponse = `Hey, looks like there was a tech hiccup, but maybe that's the universe telling us to pause for a sec. This verse is basically saying 'take a breath, you don't have to figure everything out right now.' ${userInput.toLowerCase().includes('stress') || userInput.toLowerCase().includes('overwhelm') ? "Especially when you're feeling all that pressure." : "Sometimes the best thing is just... being still."} Try taking three deep breaths and reminding yourself that this moment is enough.\n\n"Be still, and know that I am God."\n\nI can be still and trust that I don't need to have it all figured out.`;
      addJournalEntry(userInput, 'reflective', fullResponse);
    }
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWisdom();
    setUserInput(''); // Clear input after submission
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            SoulScript
          </h1>
          <Sparkles className="w-8 h-8 text-purple-400" />
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hey beautiful soul 🌸 What's going on in your world right now? Share what's on your heart and let ancient wisdom meet your modern vibes.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What I'm picking up on 💭
              </label>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Late-night existential questioning and a little bit of the Sunday Scaries creeping in early..."
                className="w-full h-24 p-4 border-2 border-purple-200 rounded-xl focus:border-purple-400 focus:outline-none resize-none transition-all focus:shadow-lg"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={!userInput.trim() || isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Getting wisdom...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Get Some Ancient Wisdom ✨</span>
                </>
              )}
            </button>
          </form>
        </div>

        {wisdom && (
          <div className="space-y-4">
            {/* Bible/Gita Verse */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-l-4 border-blue-400 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white text-sm font-bold">📖</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-800 italic text-lg leading-relaxed">
                    "{wisdom.verse}"
                  </p>
                </div>
              </div>
            </div>

            {/* Modern Commentary */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border-l-4 border-green-400 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-white text-sm">💭</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    What this could mean for you today
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {wisdom.commentary}
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Affirmation */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-l-4 border-pink-400 shadow-lg">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-pink-700 mb-2">
                    Something to carry with you
                  </h3>
                  <p className="text-pink-800 font-medium text-lg italic">
                    "{wisdom.affirmation}"
                  </p>
                  <p className="text-pink-600 text-sm mt-2">
                    No pressure to believe it right away. Sometimes we grow into our affirmations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-6 rounded-2xl text-white shadow-xl">
          <h3 className="text-xl font-semibold mb-3">lil reminder 🌸</h3>
          <p>
            These ancient texts have been comforting souls for thousands of years. 
            You're not the first to feel this way, and you won't be the last. 
            That's actually kind of beautiful, isn't it? 💜
          </p>
        </div>
      </div>
    </div>
  );
};