import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key not found. Please add VITE_GEMINI_API_KEY to your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey || 'dummy-key');

export interface ReflectionResponse {
  theme: string;
  verse: string;
  source: string;
  meaning: string;
  affirmation: string;
  isVenting: boolean;
  mood: string;
}

export interface WisdomResponse {
  verse: string;
  source: string;
  meaning: string;
  reflectionQuestion: string;
}

export interface ChallengeResponse {
  challenge: string;
  verse: string;
  source: string;
  guidance: string;
  action: string;
}

export interface JourneyAnalysis {
  patterns: string;
  growth: string;
  focus: string;
}

const getTimeContext = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.toLocaleDateString('en-US', { weekday: 'long' });
  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  
  let timeOfDay = 'morning';
  if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
  else if (hour >= 17) timeOfDay = 'evening';
  
  return { day, time, timeOfDay, hour };
};

const handleApiError = (error: any, fallbackResponse: any) => {
  console.error('Gemini API Error:', error);
  
  if (error?.message?.includes('API_KEY_INVALID')) {
    throw new Error('Invalid API key. Please check your Gemini API key configuration.');
  } else if (error?.message?.includes('QUOTA_EXCEEDED')) {
    throw new Error('API quota exceeded. Please check your Gemini API usage limits, or try again later.');
  } else if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add your API key to the .env file.');
  }
  
  return fallbackResponse;
};

const parseJsonResponse = (text: string) => {
  try {
    // Try to find JSON in the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No JSON found in response');
  } catch (error) {
    console.error('Failed to parse JSON response:', text);
    throw error;
  }
};

// Add randomization helpers
const getRandomWisdomContext = () => {
  const contexts = [
    "when you're feeling stuck",
    "for those 'what am I doing with my life' moments",
    "when you need a perspective shift",
    "for when everything feels chaotic",
    "when you're questioning everything",
    "for those overwhelming days",
    "when you need some clarity",
    "for moments of doubt",
    "when you're feeling lost",
    "for those breakthrough moments",
    "when you need courage",
    "for finding your center"
  ];
  return contexts[Math.floor(Math.random() * contexts.length)];
};

const getRandomWisdomFocus = () => {
  const focuses = [
    "inner peace",
    "letting go",
    "finding purpose",
    "dealing with change",
    "self-acceptance",
    "courage",
    "patience",
    "trust",
    "wisdom",
    "love",
    "growth",
    "resilience"
  ];
  return focuses[Math.floor(Math.random() * focuses.length)];
};

export const generateDailyReflection = async (userInput: string, pastReflections: any[] = []): Promise<ReflectionResponse> => {
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const { day, time, timeOfDay } = getTimeContext();
  
  // Analyze past patterns for context
  const recentPatterns = pastReflections.slice(-5).map(r => ({
    theme: r.theme,
    mood: r.mood || 'neutral',
    timestamp: r.timestamp
  }));

  const systemPrompt = `You are SoulScript - think of yourself as that one friend who actually listens and somehow always knows what to say. You're wise but not preachy, spiritual but not cheesy, and you get that life is messy.

Your vibe:
- You talk like a real person, not a self-help book
- You notice patterns but don't make people feel bad about them
- You use metaphors that actually make sense (like "your mind is like a browser with 47 tabs open")
- You validate feelings before offering wisdom
- You're honest about when things suck while still finding hope
- You explain ancient wisdom like you're translating for a friend

Context: It's ${timeOfDay} on ${day} at ${time}.
Their recent patterns: ${recentPatterns.length > 0 ? JSON.stringify(recentPatterns) : 'First time here'}

Read their input and respond with ONLY valid JSON (no markdown, no extra text):
{
  "theme": "What you're really picking up on (be specific and relatable)",
  "verse": "An actual line from the Bhagavad Gita or Bible that fits their situation - use the exact text from the book",
  "source": "Book chapter:verse",
  "meaning": "What this could mean for you today - explain this like you're texting a friend who's having a rough day. Use their language, reference their situation, be real about it. No spiritual platitudes.",
  "affirmation": "Something they can actually believe, not generic fluff",
  "isVenting": true/false,
  "mood": "their actual emotional state"
}

Make it feel like someone who really sees them is responding.

User input: "${userInput}"`;

  const fallbackResponse = {
    theme: "Life being life",
    verse: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    source: "Psalm 46:10",
    meaning: "Look, I get it. Your brain is probably running like a hamster on espresso right now. This verse isn't telling you to sit in lotus position and find your zen - it's saying sometimes the most productive thing you can do is stop trying to control everything. Your feelings are valid, and honestly? Just pausing to reflect like this is already you being still in the way that matters.",
    affirmation: "I don't have to figure it all out today",
    isVenting: true,
    mood: "overwhelmed"
  };

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();
    return parseJsonResponse(response);
  } catch (error) {
    return handleApiError(error, fallbackResponse);
  }
};

export const getRandomWisdom = async (): Promise<WisdomResponse> => {
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const { timeOfDay } = getTimeContext();
  const randomContext = getRandomWisdomContext();
  const randomFocus = getRandomWisdomFocus();
  const randomSeed = Math.floor(Math.random() * 1000);

  const systemPrompt = `You're SoulScript, dropping some random wisdom like a friend who reads way too much but somehow makes it relevant to real life.

It's ${timeOfDay} - I want you to find a verse that's perfect ${randomContext}, focusing on themes around ${randomFocus}.

Random seed: ${randomSeed} (use this to vary your selection)

Pick from these sources and make sure to vary your choice:
- Bhagavad Gita (chapters 1-18, various verses)
- Bible (Psalms, Proverbs, Matthew, John, Romans, Corinthians, etc.)

Explain it like you're that friend who somehow always has the perfect thing to say, but in a "let me tell you what I learned" way, not a "let me preach at you" way.

Respond with ONLY valid JSON (no markdown, no extra text):
{
  "verse": "The actual exact verse from the Bhagavad Gita or Bible - pick something different each time",
  "source": "Book chapter:verse", 
  "meaning": "What this could mean for you today - explain this like you're sharing something that blew your mind. Use analogies, stories, whatever makes it click. No spiritual jargon. Make this unique and personal.",
  "reflectionQuestion": "A question that makes them go 'huh, I never thought about it that way' - make it specific to the verse and context"
}

IMPORTANT: Generate completely different content each time. Don't repeat the same verses or explanations. Be creative and varied in your selection.`;

  const fallbackResponses = [
    {
      verse: "The mind is restless and difficult to restrain, but it is subdued by practice and by detachment.",
      source: "Bhagavad Gita 6:35",
      meaning: "Okay so basically, even Krishna was like 'yeah, your mind is absolutely chaotic and that's normal.' It's like having a browser with 47 tabs open, three of them playing music, and you can't figure out which one. The 'practice' part isn't about becoming some zen master - it's about noticing when your mind goes full tornado mode and gently being like 'hey, come back here.' You're not broken if your thoughts are everywhere. You're human.",
      reflectionQuestion: "What would it feel like to be friends with your own mind instead of fighting it all the time?"
    },
    {
      verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      source: "Proverbs 3:5-6",
      meaning: "This isn't about blind faith - it's about admitting that sometimes your overthinking brain isn't helping. You know that feeling when you're trying to parallel park and someone's giving you directions? Sometimes you just gotta trust the process instead of second-guessing every move. Your 'understanding' is limited to what you can see right now, but life has this weird way of connecting dots you didn't even know existed.",
      reflectionQuestion: "What would change if you trusted that you don't have to figure out every step before taking the first one?"
    },
    {
      verse: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of your actions.",
      source: "Bhagavad Gita 2:47",
      meaning: "This is basically the ancient version of 'control what you can control.' You can put your whole heart into something - your work, your relationships, your dreams - but demanding specific outcomes is like trying to control the weather. It's exhausting and impossible. This verse is saying: do your thing with love, then let the universe handle the results. It's weirdly freeing once you get it.",
      reflectionQuestion: "What would you do differently if you knew the outcome wasn't your responsibility?"
    }
  ];

  const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.9, // Higher temperature for more creativity
        topP: 0.8,
        topK: 40,
      }
    });
    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();
    return parseJsonResponse(response);
  } catch (error) {
    return handleApiError(error, fallbackResponse);
  }
};

export const getChallengeGuidance = async (challenge: string): Promise<ChallengeResponse> => {
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  const systemPrompt = `You're SoulScript, and someone just told you they're dealing with "${challenge}". 

You're that friend who's been through stuff and somehow always knows what to say without making it weird or preachy.

Find a verse from the Bhagavad Gita or Bible that actually helps with this specific thing, then explain it like you're talking to someone you care about who's having a rough time.

Respond with ONLY valid JSON (no markdown, no extra text):
{
  "challenge": "${challenge}",
  "verse": "An actual exact verse from the Bhagavad Gita or Bible that relates to their situation",
  "source": "Book chapter:verse",
  "guidance": "What this could mean for you today - talk to them like a real friend. Acknowledge that this sucks, validate their feelings, then share how this ancient wisdom actually applies to their life. Use metaphors, stories, whatever helps it land.",
  "action": "One small thing they can actually do today that won't feel overwhelming"
}

Be the friend they need right now.`;

  const fallbackResponse = {
    challenge,
    verse: "Cast all your anxiety on him because he cares for you.",
    source: "1 Peter 5:7",
    guidance: "This isn't some 'just pray about it' dismissal. It's more like... you know how when you're carrying too many grocery bags and someone offers to help? This is that, but for your emotional baggage. You don't have to white-knuckle your way through everything alone. Sometimes the strongest thing you can do is admit you need backup.",
    action: "Text one person who cares about you and tell them one thing that's weighing on you. That's it."
  };

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();
    return parseJsonResponse(response);
  } catch (error) {
    return handleApiError(error, fallbackResponse);
  }
};

export const analyzeSoulJourney = async (reflections: any[]): Promise<JourneyAnalysis> => {
  if (!apiKey) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
  }

  if (reflections.length === 0) {
    return {
      patterns: "You're just getting started, and honestly? That takes guts. Most people avoid looking at their inner world like it's a messy closet they'll deal with 'someday.'",
      growth: "The fact that you're here, willing to be real with yourself, is already huge. That's not nothing - that's everything.",
      focus: "Just keep showing up. Be curious about your thoughts and feelings like you're getting to know a new friend. No pressure to have it all figured out."
    };
  }

  const recentReflections = reflections.slice(-10);
  const themes = recentReflections.map(r => r.theme);
  const moods = recentReflections.map(r => r.mood || 'neutral');
  const timeSpan = Math.ceil((Date.now() - reflections[0].timestamp) / (1000 * 60 * 60 * 24));

  const systemPrompt = `You're SoulScript, and you've been watching someone's journey for ${timeSpan} days through ${reflections.length} reflections. You're like that friend who notices patterns and growth that people can't see in themselves.

Recent themes: ${themes.join(', ')}
Recent moods: ${moods.join(', ')}

Respond like someone who's been paying attention and genuinely cares with ONLY valid JSON (no markdown, no extra text):
{
  "patterns": "What patterns do you see? Be specific but kind. Point out what they might not notice about themselves.",
  "growth": "How have they grown? Celebrate the real progress, even if it's subtle.",
  "focus": "What's one thing that might help them keep growing? Make it doable, not overwhelming."
}

Talk to them like you've been watching their journey and you're proud of how far they've come.`;

  const fallbackResponse = {
    patterns: "I see someone who keeps showing up for themselves, even when it's hard. That's not common.",
    growth: "You're getting better at catching yourself in patterns instead of just living them on repeat. That's huge.",
    focus: "Keep trusting your gut about what needs attention. You're developing good instincts about your own growth."
  };

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt);
    const response = result.response.text();
    return parseJsonResponse(response);
  } catch (error) {
    return handleApiError(error, fallbackResponse);
  }
};