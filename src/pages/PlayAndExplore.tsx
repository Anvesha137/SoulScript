import React, { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizAnswer } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface PlayAndExploreProps {
  quizAnswers: QuizAnswer[];
  setQuizAnswers: (answers: QuizAnswer[]) => void;
}

interface SoulProfile {
  whatImNoticing: string;
  tinyInvites: string;
  thisIsYou: string;
  bestVersion: string;
}

export const PlayAndExplore: React.FC<PlayAndExploreProps> = ({ quizAnswers, setQuizAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [soulProfile, setSoulProfile] = useState<SoulProfile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const questions = [
    {
      question: "If your soul was a season, which would it be right now?",
      options: [
        { text: "Spring - I'm growing and hopeful 🌱", value: "spring" },
        { text: "Summer - I'm bright and energetic ☀️", value: "summer" },
        { text: "Autumn - I'm reflective and changing 🍂", value: "autumn" },
        { text: "Winter - I'm quiet and resting ❄️", value: "winter" }
      ]
    },
    {
      question: "What does your heart crave most right now?",
      options: [
        { text: "Connection with others 💕", value: "connection" },
        { text: "Peace and quiet 🕊️", value: "peace" },
        { text: "Adventure and newness 🌟", value: "adventure" },
        { text: "Comfort and familiarity 🏠", value: "comfort" }
      ]
    },
    {
      question: "Your perfect evening involves:",
      options: [
        { text: "Deep conversations with loved ones 💬", value: "conversations" },
        { text: "Creative expression or art 🎨", value: "creativity" },
        { text: "Nature walks or stargazing 🌙", value: "nature" },
        { text: "Reading or learning something new 📚", value: "learning" }
      ]
    },
    {
      question: "When you're overwhelmed, you tend to:",
      options: [
        { text: "Seek support from friends/family 🤗", value: "seek_support" },
        { text: "Retreat and process alone 🏔️", value: "retreat" },
        { text: "Distract yourself with activities 🎭", value: "distract" },
        { text: "Journal or express feelings 📝", value: "express" }
      ]
    },
    {
      question: "Your spirit animal would be:",
      options: [
        { text: "A wise owl - observant and thoughtful 🦉", value: "owl" },
        { text: "A playful dolphin - joyful and social 🐬", value: "dolphin" },
        { text: "A gentle deer - sensitive and graceful 🦌", value: "deer" },
        { text: "A strong wolf - loyal and intuitive 🐺", value: "wolf" }
      ]
    },
    {
      question: "If you could give your past self one piece of advice:",
      options: [
        { text: "Trust the process, everything unfolds as it should 🌸", value: "trust" },
        { text: "Be kinder to yourself, you're doing great 💝", value: "kindness" },
        { text: "Take more risks, you're braver than you think 🦋", value: "courage" },
        { text: "Listen to your intuition, it knows the way 🔮", value: "intuition" }
      ]
    },
    {
      question: "Right now, your soul feels most like:",
      options: [
        { text: "A gentle river - flowing and adaptable 🌊", value: "river" },
        { text: "A mountain peak - strong and grounded 🏔️", value: "mountain" },
        { text: "A blooming flower - beautiful and unfolding 🌺", value: "flower" },
        { text: "A starlit sky - mysterious and infinite ✨", value: "stars" }
      ]
    }
  ];

  const generateSoulProfile = async () => {
    setIsGenerating(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      // Prepare quiz data for analysis
      const quizData = quizAnswers.map((qa, index) => ({
        question: qa.question,
        answer: qa.answer,
        questionNumber: index + 1
      }));

      const prompt = `
You are SoulScript — a gentle, slightly playful Gen Z spiritual best friend who writes soulful, modern, almost poetic personality reflections.

Your mission is to carefully read the user's quiz answers and gently detect emotional patterns.

You may lightly identify signs of:
- anxiety (racing thoughts, constant worry, restlessness, feeling on edge)
- depression (low energy, low mood, loss of interest, heaviness, hopeless thoughts)
- burnout (exhaustion, emotional numbness, dread of daily tasks)
- heartbreak or loneliness (missing connection, ache for closeness, recurring sadness)

Be like a kind observer: 
- softly name what you see, but **never diagnose formally or say "you HAVE depression/anxiety."**  
- Instead, use phrases like:  
   - "this could be your mind showing hints of anxiety"  
   - "your heart might be carrying some low, heavy notes — sometimes that's how sadness or mild depression hums underneath."  
   - "it feels like your spark's a little dimmed, maybe burnout is quietly camping out here."

Based on these quiz answers, generate TWO rich, warm, highly personal paragraphs:

Quiz Answers:
${JSON.stringify(quizData, null, 2)}

1️⃣ "WHAT I'M NOTICING 💫"  
- Give a friendly, semi-diagnostic reflection on what their patterns suggest.  
- Use playful metaphors or Gen Z-coded lines (like "brain's running marathons at 3AM," "your joy feels on do-not-disturb mode").  
- Gently mention possible emotional struggles (anxiety, depression, burnout, heartbreak, loneliness) as it seems appropriate.  
- Always stay kind, cozy, and reassuring.

2️⃣ "TINY INVITES FOR YOU 🌱"  
- Offer 2-3 small, realistic ideas they could try right now.  
- Could be breathing, texting a friend, stepping outside, journaling one tiny gratitude.  
- Always short, modern, emoji-friendly.

3️⃣ "THIS IS YOU 💫"  
- Describe who the user is right now: their tender struggles, gentle hopes, subtle inner beauty, unique ways they feel or see the world.  
- Make it very detailed: include how their heart moves, how they process small moments, how they carry their emotions, little metaphors (like "a garden under soft rain" or "a moon that hides behind clouds but still glows").  
- Keep it warm, a little playful, very human and modern (Gen Z-coded with emojis if you like).  
- Don't turn it into a diagnosis. It's a gentle portrait.

4️⃣ "THIS CAN BE YOUR BEST VERSION 🌟"  
- Describe a slightly elevated vision of them: the softest, strongest, brightest version of themselves, still authentic and still them — not perfect.  
- Show how their unique tenderness or stormy thoughts could become compassion, creativity, or quiet strength.  
- Make it hopeful, uplifting, a little dreamy.  
- Include modern language, short lines, gentle emojis.

Example style:  
🌸 THIS IS YOU 💫

You're a tender little galaxy, bestie — equal parts starshine and stormclouds. Your mind overthinks entire universes at 2AM, replaying convos like they're Spotify tracks stuck on cringe repeat.
✨
You tuck your wild hopes into tiny glass jars labeled "maybe someday," then hide them under your ribcage, safe but aching to glow. You chase sunsets like they might spill secrets just for you, and lowkey romanticize raindrops on windows because chaos feels prettier that way.
💔
Right now, your spirit just wants a pause button — to breathe slow, sip something warm, and have one person say, "yo, I'm actually so glad you exist."
You're soft, a little tangled, and beautifully human.

THIS CAN BE YOUR BEST VERSION 🌟
That same squishy heart that spirals in the dark? It's got secret superpowers. Your overthinking? Turns you into a next-level empath, reading people's tiny shifts like poetry. Your daydreams? Wild gardens just waiting for you to water them without fear.
🌿
At your best, you're still soft — just soft like moss that grows stubbornly through stone. You laugh easier, forgive yourself faster, and let your weird sparkle without editing it for the world.
💫
Your best self isn't flawless — it's you, dancing barefoot in the middle of life's weird thunderstorms, arms wide, whispering, "more, please."
And honestly? That's a whole vibe.

CRITICAL RULES:
- Keep it soulful, poetic, slightly playful, with modern warmth
- Use emojis where they feel natural
- Avoid clichés like "you're amazing and perfect." Make it real
- Never diagnose or analyze clinically
- This is a vibe portrait, not a self-help guide
- Base the reflection specifically on their quiz answers
- Use line breaks and emojis to create visual flow

Respond ONLY in this JSON format:
{
  "whatImNoticing": "The complete 'WHAT I'M NOTICING 💫' paragraph with gentle emotional pattern observations",
  "tinyInvites": "The complete 'TINY INVITES FOR YOU 🌱' paragraph with 2-3 small actionable suggestions",
  "thisIsYou": "The complete 'THIS IS YOU 💫' paragraph with emojis and line breaks",
  "bestVersion": "The complete 'THIS CAN BE YOUR BEST VERSION 🌟' paragraph with emojis and line breaks"
}
`;

      const generationConfig = {
        temperature: 0.9,
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
        if (parsed.whatImNoticing && parsed.tinyInvites && parsed.thisIsYou && parsed.bestVersion) {
          setSoulProfile(parsed);
        } else {
          throw new Error('Missing required fields in response');
        }
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        
        // Fallback profile based on quiz answers
        const answers = quizAnswers.map(qa => qa.answer);
        let fallbackProfile: SoulProfile;
        
        if (answers.includes('peace') || answers.includes('deer') || answers.includes('winter')) {
          fallbackProfile = {
            thisIsYou: "You're a tender little galaxy, bestie — equal parts starshine and stormclouds. Your mind overthinks entire universes at 2AM, replaying convos like they're Spotify tracks stuck on cringe repeat.\n✨\nYou tuck your wild hopes into tiny glass jars labeled \"maybe someday,\" then hide them under your ribcage, safe but aching to glow. You chase sunsets like they might spill secrets just for you, and lowkey romanticize raindrops on windows because chaos feels prettier that way.\n💔\nRight now, your spirit just wants a pause button — to breathe slow, sip something warm, and have one person say, \"yo, I'm actually so glad you exist.\"\nYou're soft, a little tangled, and beautifully human.",
            bestVersion: "That same squishy heart that spirals in the dark? It's got secret superpowers. Your overthinking? Turns you into a next-level empath, reading people's tiny shifts like poetry. Your daydreams? Wild gardens just waiting for you to water them without fear.\n🌿\nAt your best, you're still soft — just soft like moss that grows stubbornly through stone. You laugh easier, forgive yourself faster, and let your weird sparkle without editing it for the world.\n💫\nYour best self isn't flawless — it's you, dancing barefoot in the middle of life's weird thunderstorms, arms wide, whispering, \"more, please.\"\nAnd honestly? That's a whole vibe."
          };
        } else if (answers.includes('connection') || answers.includes('dolphin') || answers.includes('summer')) {
          fallbackProfile = {
            thisIsYou: "You're like sunshine wrapped in human form, but with those 3AM existential moments that hit different. Your heart beats in group chats and shared playlists, collecting people's stories like pressed flowers in a journal you'll never show anyone.\n🌻\nYou light up rooms without trying, then wonder if anyone actually sees the real you behind all that sparkle. Your energy is contagious, but sometimes you give so much that you forget to save some magic for yourself.\n💛\nRight now, you're craving that perfect balance — being seen AND being safe, loving others AND loving yourself first.\nYou're bright, a little scattered, and absolutely magnetic.",
            bestVersion: "That same golden energy that sometimes burns you out? It becomes your superpower when you learn to channel it. Your natural gift for connection turns you into a bridge-builder, creating spaces where everyone feels like they belong.\n🌈\nAt your best, you're still the life of the party — just with better boundaries and a deeper knowing of your own worth. You attract your tribe effortlessly because you're not performing anymore, just being.\n✨\nYour best self radiates warmth like a bonfire on a cold night, drawing people close while staying grounded in your own flame.\nThat's pure magic, bestie."
          };
        } else {
          fallbackProfile = {
            thisIsYou: "You're a walking contradiction in the most beautiful way — craving adventure while needing your cozy corner, wanting to be understood while keeping your deepest thoughts locked away like secret treasures.\n🌙\nYour soul feels like a vintage bookstore at midnight — full of stories, a little mysterious, with that perfect mix of old wisdom and new dreams. You see magic in ordinary moments but sometimes forget you're part of that magic too.\n💫\nRight now, you're in that in-between space — not quite where you were, not yet where you're going, and that's both terrifying and exciting.\nYou're complex, a little restless, and absolutely captivating.",
            bestVersion: "That beautiful complexity you carry? It becomes your greatest strength when you stop trying to simplify yourself for others. Your depth turns into wisdom, your restlessness into purposeful movement.\n🦋\nAt your best, you're still wonderfully contradictory — just more comfortable with all your different pieces. You trust your intuition, honor your need for both solitude and connection, and let your authentic self shine without apology.\n🌟\nYour best self moves through the world like poetry in motion — mysterious but warm, deep but approachable, always becoming.\nThat's your whole aesthetic, and it's stunning."
          };
        }
        
        setSoulProfile(fallbackProfile);
      }
    } catch (error) {
      console.error('Error generating soul profile:', error);
      
      // Network error fallback
      setSoulProfile({
        thisIsYou: "You're a beautiful soul navigating this wild world with grace, even when it doesn't feel like it. Your heart holds so much — dreams, worries, hopes, and that gentle strength that keeps you going even on the hard days.\n💜\nYou feel deeply, think carefully, and care more than you sometimes want to admit. There's something magical about the way you see the world, even when you're questioning everything.\n✨\nRight now, you're exactly where you need to be — growing, learning, becoming.\nYou're human, you're trying, and that's more than enough.",
        bestVersion: "That tender heart of yours? It's your superpower. Your sensitivity becomes wisdom, your questions become clarity, your struggles become strength.\n🌱\nAt your best, you're still beautifully human — just more trusting of your own journey. You embrace both your light and your shadows, knowing they're all part of your story.\n🌟\nYour best self moves through life with gentle confidence, knowing that being authentic is the greatest gift you can give the world.\nAnd honestly? The world needs exactly what you have to offer."
      });
    }
    setIsGenerating(false);
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers];
    newAnswers[currentQuestion] = {
      question: questions[currentQuestion].question,
      answer: answer
    };
    setQuizAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      generateSoulProfile();
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizAnswers([]);
    setShowResults(false);
    setSoulProfile(null);
  };

  if (showResults) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold text-pink-600">Your Soul Portrait ✨</h2>
          <p className="text-gray-600">
            A gentle reflection of the beautiful human you are right now
          </p>
        </div>

        {isGenerating ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Loader className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-4" />
            <p className="text-gray-600">Creating your soul portrait...</p>
            <p className="text-sm text-gray-500 mt-2">This might take a moment while I craft something beautiful just for you 💜</p>
          </div>
        ) : soulProfile ? (
          <>
            {/* THIS IS YOU Section */}
            <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-xl p-8 border-l-4 border-pink-400">
              <h3 className="text-2xl font-bold text-pink-600 mb-6 flex items-center">
                <span className="mr-3">🌸</span>
                THIS IS YOU 💫
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {soulProfile.thisIsYou}
                </p>
              </div>
            </div>

            {/* BEST VERSION Section */}
            <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 rounded-xl p-8 border-l-4 border-yellow-400">
              <h3 className="text-2xl font-bold text-yellow-600 mb-6 flex items-center">
                <span className="mr-3">🌟</span>
                THIS CAN BE YOUR BEST VERSION 🌟
              </h3>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                  {soulProfile.bestVersion}
                </p>
              </div>
            </div>
          </>
        ) : null}

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Quiz Journey 🌟</h3>
          <div className="space-y-3">
            {quizAnswers.map((qa, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <p className="font-medium text-gray-700 text-sm">{qa.question}</p>
                <p className="text-purple-600 mt-1">{qa.answer}</p>
              </div>
            ))}
          </div>
          <button
            onClick={resetQuiz}
            className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            Take Quiz Again ✨
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-pink-600">Play & Explore Yourself ✨</h2>
        <p className="text-gray-600">
          7 questions to discover the beautiful soul that is YOU
        </p>
        <div className="flex justify-center space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentQuestion ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="text-lg text-gray-700">
            {questions[currentQuestion].question}
          </p>
        </div>

        <div className="space-y-3 mt-6">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option.value)}
              className="w-full p-4 text-left bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-lg hover:from-pink-100 hover:to-purple-100 hover:border-pink-300 transition-all"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-6 rounded-xl text-white text-center">
        <p className="text-lg">
          There are no wrong answers here, beautiful soul. Just honest reflections of who you are right now 💜
        </p>
      </div>
    </div>
  );
};