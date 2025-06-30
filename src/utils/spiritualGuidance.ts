import { ReflectionEntry, WisdomVerse, ChallengeGuidance } from '../types/types';

// Enhanced spiritual guidance with more human-like responses
const gitaVerses = [
  {
    verse: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    source: "Bhagavad Gita 2:47",
    themes: ["duty", "attachment", "purpose", "work", "stress", "pressure"],
    context: "Krishna's teaching on selfless action"
  },
  {
    verse: "For the soul there is neither birth nor death. It is not slain when the body is slain.",
    source: "Bhagavad Gita 2:20",
    themes: ["death", "fear", "eternity", "soul", "loss", "grief", "mortality"],
    context: "The eternal nature of the soul"
  },
  {
    verse: "The mind is restless and difficult to restrain, but it is subdued by practice and by detachment.",
    source: "Bhagavad Gita 6:35",
    themes: ["anxiety", "meditation", "practice", "mind", "worry", "restless", "peace"],
    context: "Arjuna's struggle with mental control"
  },
  {
    verse: "A person is said to be elevated in yoga when, having renounced all material desires, he neither acts for sense gratification nor engages in fruitive activities.",
    source: "Bhagavad Gita 6:4",
    themes: ["self-control", "meditation", "peace", "mind", "desires", "contentment"],
    context: "The path to inner peace"
  },
  {
    verse: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    source: "Bhagavad Gita 6:19",
    themes: ["meditation", "focus", "peace", "stillness", "concentration"],
    context: "The fruits of spiritual practice"
  },
  {
    verse: "Those who are free from anger and all material desires, who are self-realized, self-disciplined and constantly endeavoring for perfection, are assured of liberation in the Supreme.",
    source: "Bhagavad Gita 5:26",
    themes: ["anger", "freedom", "self-discipline", "liberation", "perfection"],
    context: "The qualities of the liberated soul"
  },
  {
    verse: "One who sees inaction in action, and action in inaction, is intelligent among men.",
    source: "Bhagavad Gita 4:18",
    themes: ["wisdom", "understanding", "action", "intelligence", "perception"],
    context: "The nature of true action"
  },
  {
    verse: "Whatever happened, happened for the good. Whatever is happening, is happening for the good. Whatever will happen, will also happen for the good.",
    source: "Bhagavad Gita 2:11",
    themes: ["acceptance", "trust", "divine plan", "surrender", "faith"],
    context: "Krishna's teaching on divine providence"
  }
];

const bibleVerses = [
  {
    verse: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
    source: "Matthew 6:34",
    themes: ["anxiety", "worry", "trust", "present", "future", "stress"],
    context: "Jesus teaching about divine provision"
  },
  {
    verse: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    source: "Psalm 46:10",
    themes: ["peace", "stillness", "trust", "faith", "meditation", "quiet"],
    context: "God's call to inner stillness"
  },
  {
    verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
    source: "1 Corinthians 13:4-5",
    themes: ["love", "patience", "kindness", "relationships", "forgiveness", "humility"],
    context: "Paul's definition of divine love"
  },
  {
    verse: "Cast all your anxiety on him because he cares for you.",
    source: "1 Peter 5:7",
    themes: ["anxiety", "trust", "care", "worry", "burden", "support"],
    context: "Peter's encouragement to believers"
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    source: "Romans 8:28",
    themes: ["purpose", "trust", "divine plan", "good", "calling", "meaning"],
    context: "Paul's teaching on divine purpose"
  },
  {
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    source: "Matthew 11:28",
    themes: ["rest", "burden", "weariness", "comfort", "peace", "relief"],
    context: "Jesus' invitation to the weary"
  },
  {
    verse: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
    source: "Zephaniah 3:17",
    themes: ["love", "joy", "presence", "delight", "celebration", "worth"],
    context: "God's delight in His people"
  },
  {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    source: "Jeremiah 29:11",
    themes: ["hope", "future", "plans", "prosperity", "trust", "purpose"],
    context: "God's promise to His people"
  }
];

const allVerses = [...gitaVerses, ...bibleVerses];

// Enhanced challenge guidance with more personal, human-like responses
const challengeGuidanceData: Record<string, ChallengeGuidance> = {
  fear: {
    challenge: "Fear & Anxiety",
    verse: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
    source: "Matthew 6:34",
    guidance: "I understand how overwhelming fear can feel - like a storm cloud that follows you everywhere. But here's what I've learned from walking with many souls through their darkest valleys: fear is often our mind's way of trying to protect us from imaginary futures. Jesus knew this about human nature when he spoke these words. He wasn't dismissing your concerns; he was offering you a lifeline. Today, right now, you have everything you need. Your breath, your heartbeat, this moment - these are gifts. When anxiety whispers 'what if,' try whispering back 'what is.' What is real right now? You are safe in this moment. You are loved. You are enough.",
    action: "Place your hand on your heart and feel it beating. Say aloud: 'In this moment, I am safe. In this moment, I am loved.' Repeat this whenever fear visits you today."
  },
  anger: {
    challenge: "Anger & Frustration",
    verse: "Those who are free from anger and all material desires, who are self-realized, self-disciplined and constantly endeavoring for perfection, are assured of liberation in the Supreme.",
    source: "Bhagavad Gita 5:26",
    guidance: "Your anger is not your enemy - it's a messenger. It's telling you that something precious to you feels threatened or violated. I see the fire in your heart, and I want you to know that feeling angry doesn't make you a bad person. Even Krishna acknowledged that anger is part of the human experience. The wisdom here isn't about never feeling angry; it's about not letting anger possess you. When you feel that familiar heat rising, pause and ask: 'What am I really protecting here?' Often, beneath anger lies hurt, fear, or a deep love for justice. Honor that. Then choose how to respond from your highest self, not your wounded self.",
    action: "When anger arises today, take three deep breaths and ask: 'What is my anger trying to protect?' Write down the answer, then choose one loving action you can take instead of reacting."
  },
  doubt: {
    challenge: "Doubt & Uncertainty",
    verse: "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.",
    source: "Psalm 46:10",
    guidance: "Oh, sweet soul, I feel the weight of your uncertainty. Doubt can feel like walking through fog - you can't see where you're going, and every step feels uncertain. But here's a secret I've learned: doubt often visits the most thoughtful hearts. You doubt because you care deeply about making the right choices. The psalmist knew this feeling too, which is why he wrote about being still. In our noisy world, we think we need to figure everything out immediately. But sometimes, the most profound answers come not through thinking harder, but through creating space for wisdom to emerge. Your path will become clear, one step at a time. Trust the process of your unfolding.",
    action: "Sit quietly for 5 minutes today without trying to solve anything. Simply breathe and repeat: 'I trust that clarity will come.' Notice what arises in the silence."
  },
  attachment: {
    challenge: "Attachment & Letting Go",
    verse: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    source: "Bhagavad Gita 2:47",
    guidance: "I see you holding on so tightly to something or someone, and I understand why. When we love deeply, when we care passionately, letting go feels like betrayal. But Krishna's wisdom here is like a gentle hand on your shoulder, saying: 'You can love fully without grasping.' Think of how the sun gives its light freely, without demanding that every flower bloom perfectly. Your love, your effort, your care - these are gifts you give to the world. The outcomes? They're not yours to control, and that's actually a relief. You can pour your heart into your relationships, your work, your dreams, and then trust that the universe knows what it's doing with your offerings.",
    action: "Write down one thing you're holding too tightly. Then write: 'I offer this with love and trust the outcome.' Place this note somewhere you'll see it daily."
  },
  forgiveness: {
    challenge: "Forgiveness",
    verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
    source: "1 Corinthians 13:4-5",
    guidance: "Forgiveness is perhaps the most misunderstood gift we can give ourselves. I want you to know that forgiveness doesn't mean what happened was okay. It doesn't mean you have to trust someone who hurt you again. Forgiveness is you saying: 'I refuse to let this pain define my heart.' Paul's words about love keeping no record of wrongs - this is about your freedom, not theirs. When you forgive, you're not excusing their behavior; you're choosing to write a new story for your life. One where you're the author of your peace, not a victim of their actions. This process takes time, and that's okay. Healing happens in layers, like an onion. Be patient with yourself.",
    action: "Think of someone you need to forgive (including yourself). Write them a letter you'll never send, expressing all your feelings. Then write: 'I choose my peace over this pain.'"
  },
  purpose: {
    challenge: "Life Purpose",
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
    source: "Jeremiah 29:11",
    guidance: "Beautiful soul, I see you searching for your purpose like someone looking for stars in daylight. But here's what I've discovered: your purpose isn't hiding from you. It's woven into every act of kindness you've ever shown, every moment you've chosen love over fear, every time you've helped someone feel less alone. God's plans for you aren't some mysterious puzzle you need to solve; they're unfolding in every choice you make to bring more light into the world. Your purpose might not look like what you expected - it might be quieter, more ordinary, more beautiful than you imagined. Trust that your life has meaning simply because you're here, breathing, caring, growing.",
    action: "List three ways you've made someone's day better recently, no matter how small. This is your purpose in action. Look for one more opportunity today."
  },
  love: {
    challenge: "Love & Relationships",
    verse: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
    source: "Zephaniah 3:17",
    guidance: "Love can feel like the most wonderful and terrifying thing in the world, can't it? Your heart is so tender, so open, and sometimes that feels dangerous. But I want you to know something beautiful: you are already so deeply loved that the Creator of the universe sings over you. Yes, sings! Like a parent delighting in their child's first steps. This love isn't something you have to earn or prove you're worthy of. It just is. When you know this love in your bones, it changes how you love others. You stop trying to get love and start giving it freely. You stop fearing rejection because you know your worth isn't determined by whether someone chooses you back.",
    action: "Look in the mirror today and say: 'I am deeply loved and worthy of love.' Then share that love with someone else through a kind word or gesture."
  },
  loss: {
    challenge: "Loss & Grief",
    verse: "For the soul there is neither birth nor death. It is not slain when the body is slain.",
    source: "Bhagavad Gita 2:20",
    guidance: "Oh, precious heart, I feel the depth of your grief. Loss can feel like a part of your soul has been torn away, leaving a wound that throbs with every breath. Krishna's words here aren't meant to minimize your pain - they're meant to remind you that love is eternal. What you're grieving isn't gone; it's transformed. The love you shared, the memories you created, the way they changed you - these live on in the eternal part of you. Grief is love with nowhere to go, and it's holy. Let yourself feel it fully. Cry when you need to. Rage when you need to. And know that healing doesn't mean forgetting - it means learning to carry your love in a new way.",
    action: "Create a small ritual to honor what you've lost - light a candle, write a letter, or simply sit quietly and remember with gratitude. Let your grief be a prayer."
  }
};

// Enhanced theme identification with more nuanced understanding
const identifyTheme = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  // More sophisticated pattern matching
  const patterns = {
    'Fear & Anxiety': [
      'fear', 'afraid', 'anxious', 'worried', 'scared', 'panic', 'nervous', 'terrified',
      'overwhelmed', 'stress', 'tension', 'dread', 'apprehensive', 'uneasy', 'restless'
    ],
    'Anger & Frustration': [
      'angry', 'mad', 'frustrated', 'furious', 'irritated', 'annoyed', 'rage', 'bitter',
      'resentful', 'hostile', 'aggravated', 'livid', 'outraged', 'indignant'
    ],
    'Doubt & Uncertainty': [
      'doubt', 'uncertain', 'confused', 'lost', 'unclear', 'questioning', 'unsure',
      'hesitant', 'conflicted', 'torn', 'indecisive', 'puzzled', 'perplexed'
    ],
    'Attachment & Letting Go': [
      'attachment', 'letting go', 'control', 'clinging', 'possessive', 'dependent',
      'obsessed', 'fixated', 'can\'t let go', 'holding on', 'release', 'surrender'
    ],
    'Forgiveness': [
      'forgive', 'hurt', 'betrayed', 'wronged', 'resentment', 'grudge', 'bitter',
      'unforgiving', 'revenge', 'payback', 'wounded', 'betrayal', 'injustice'
    ],
    'Life Purpose': [
      'purpose', 'meaning', 'direction', 'calling', 'mission', 'destiny', 'path',
      'lost', 'aimless', 'pointless', 'empty', 'unfulfilled', 'searching', 'seeking'
    ],
    'Love & Relationships': [
      'love', 'relationship', 'partner', 'family', 'friend', 'connection', 'lonely',
      'heartbreak', 'romance', 'marriage', 'dating', 'breakup', 'divorce', 'rejection'
    ],
    'Loss & Grief': [
      'loss', 'grief', 'death', 'died', 'passed away', 'mourning', 'bereaved',
      'miss', 'gone', 'departed', 'funeral', 'cemetery', 'memorial', 'goodbye'
    ],
    'Gratitude & Joy': [
      'grateful', 'thankful', 'blessed', 'joy', 'happy', 'celebration', 'appreciate',
      'abundance', 'gift', 'miracle', 'wonderful', 'amazing', 'beautiful'
    ],
    'Peace & Tranquility': [
      'peace', 'calm', 'serene', 'tranquil', 'quiet', 'still', 'meditation',
      'mindful', 'centered', 'balanced', 'harmony', 'zen', 'peaceful'
    ]
  };
  
  let maxMatches = 0;
  let identifiedTheme = 'Self-Reflection & Growth';
  
  for (const [theme, keywords] of Object.entries(patterns)) {
    const matches = keywords.filter(keyword => input.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      identifiedTheme = theme;
    }
  }
  
  return identifiedTheme;
};

// Enhanced verse selection with better matching
const getRelevantVerse = (theme: string, userInput: string) => {
  const input = userInput.toLowerCase();
  
  // Find verses that match the theme
  const relevantVerses = allVerses.filter(verse => 
    verse.themes.some(t => theme.toLowerCase().includes(t) || t.includes(theme.toLowerCase()))
  );
  
  if (relevantVerses.length > 0) {
    // If we have relevant verses, pick one that best matches specific keywords
    for (const verse of relevantVerses) {
      for (const verseTheme of verse.themes) {
        if (input.includes(verseTheme)) {
          return verse;
        }
      }
    }
    // If no specific keyword match, return a random relevant verse
    return relevantVerses[Math.floor(Math.random() * relevantVerses.length)];
  }
  
  // Fallback to a random verse
  return allVerses[Math.floor(Math.random() * allVerses.length)];
};

// More personalized and human-like meanings
const generateMeaning = (theme: string, userInput: string, verse: any): string => {
  const input = userInput.toLowerCase();
  const isGita = verse.source.includes('Gita');
  const isBible = verse.source.includes('Matthew') || verse.source.includes('Psalm') || 
                  verse.source.includes('Corinthians') || verse.source.includes('Peter') ||
                  verse.source.includes('Romans') || verse.source.includes('Zephaniah') ||
                  verse.source.includes('Jeremiah');
  
  const personalizedMeanings: Record<string, (input: string, isGita: boolean) => string> = {
    'Fear & Anxiety': (input, isGita) => {
      if (input.includes('future') || input.includes('tomorrow')) {
        return `I can feel the weight of your worry about what's coming. ${isGita ? 'Krishna understood' : 'Jesus knew'} that our minds love to create elaborate stories about futures that may never happen. Right now, in this moment, you have everything you need. Your anxiety is trying to protect you, but it's working overtime. ${isGita ? 'The Gita teaches us' : 'This verse reminds us'} that peace comes from anchoring ourselves in the present, where life actually happens.`;
      } else if (input.includes('work') || input.includes('job')) {
        return `Work stress can feel overwhelming, like you're carrying the weight of the world. But here's what I want you to remember: your worth isn't measured by your productivity or achievements. ${isGita ? 'Krishna taught Arjuna' : 'Jesus taught his disciples'} that we can give our best effort while releasing attachment to outcomes. You are enough, exactly as you are, regardless of what happens at work.`;
      }
      return `Your fears are so understandable - they show how much you care about your life and the people in it. ${isGita ? 'The ancient sages knew' : 'The scriptures teach'} that courage isn't the absence of fear; it's moving forward with love despite the fear. You're braver than you know, and you don't have to face this alone.`;
    },
    
    'Anger & Frustration': (input, isGita) => {
      if (input.includes('unfair') || input.includes('injustice')) {
        return `I hear the righteous anger in your heart - you're seeing injustice and it's stirring something deep within you. This isn't bad anger; this is your soul recognizing that something precious is being violated. ${isGita ? 'Krishna taught' : 'The scriptures show us'} that we can channel this fire into purposeful action rather than destructive reaction. Your anger can become a force for positive change.`;
      }
      return `That burning feeling in your chest - I understand it completely. Anger often masks deeper feelings like hurt, disappointment, or fear. ${isGita ? 'The Gita teaches' : 'This wisdom reminds us'} that true strength comes not from suppressing these feelings, but from understanding their message and choosing our response consciously. You have the power to transform this energy into something healing.`;
    },
    
    'Doubt & Uncertainty': (input, isGita) => {
      return `The fog of uncertainty can feel so disorienting, can't it? You're standing at a crossroads, and every path seems unclear. But here's what I've learned: doubt often visits the most thoughtful souls. ${isGita ? 'Even Arjuna faced this on the battlefield' : 'Even the disciples struggled with uncertainty'}. Your questioning shows wisdom, not weakness. Sometimes the most profound answers come not through thinking harder, but through trusting the process of your unfolding.`;
    },
    
    'Loss & Grief': (input, isGita) => {
      return `Oh, precious soul, I can feel the depth of your loss. Grief is love with nowhere to go, and it's one of the most sacred human experiences. ${isGita ? 'Krishna\'s teaching about the eternal soul' : 'This verse'} doesn't minimize your pain - it honors the eternal nature of love itself. What you're mourning isn't truly gone; it's transformed. The love you shared lives on in the eternal part of you.`;
    }
  };
  
  const generator = personalizedMeanings[theme];
  if (generator) {
    return generator(input, isGita);
  }
  
  // Default personalized response
  return `I see you, dear soul, in this moment of reflection. Your willingness to pause and seek wisdom shows such beautiful self-awareness. ${isGita ? 'The ancient teachings of the Gita' : 'These sacred words'} speak directly to your heart today, offering guidance that has comforted countless souls throughout the ages. Trust that this wisdom is meant for you, right now, in this exact moment of your journey.`;
};

// More personal and uplifting affirmations
const generateAffirmation = (theme: string, userInput: string): string => {
  const input = userInput.toLowerCase();
  
  const personalizedAffirmations: Record<string, string[]> = {
    'Fear & Anxiety': [
      'I am safe in this moment, and this moment is all I have',
      'My breath is my anchor to peace and presence',
      'I trust the process of life unfolding perfectly',
      'Divine love surrounds me and protects me always',
      'I choose faith over fear, love over worry'
    ],
    'Anger & Frustration': [
      'I transform my fire into wisdom and compassion',
      'I respond from my highest self, not my wounded self',
      'My anger teaches me what I value most deeply',
      'I choose understanding over judgment',
      'Peace flows through me like a gentle river'
    ],
    'Doubt & Uncertainty': [
      'I trust that clarity comes in divine timing',
      'My path unfolds perfectly, one step at a time',
      'I am guided by wisdom greater than my understanding',
      'Uncertainty is where miracles are born',
      'I embrace the mystery of my beautiful becoming'
    ],
    'Attachment & Letting Go': [
      'I love freely without grasping or controlling',
      'I trust the flow of life to bring what serves my highest good',
      'My open hands receive more than my closed fists',
      'I release with love and trust divine timing',
      'Freedom comes through loving without attachment'
    ],
    'Forgiveness': [
      'I choose my peace over past pain',
      'Forgiveness sets my heart free to love again',
      'I release resentment and embrace healing',
      'Love flows through me, washing away all hurt',
      'I am worthy of love, especially my own'
    ],
    'Life Purpose': [
      'My purpose unfolds through every act of love',
      'I am exactly where I need to be in my journey',
      'My unique gifts are needed in this world',
      'Every step I take serves my highest calling',
      'I trust that my life has profound meaning'
    ],
    'Love & Relationships': [
      'I give and receive love with an open heart',
      'I am worthy of deep, authentic love',
      'Love flows through me and returns multiplied',
      'I attract relationships that honor my soul',
      'My heart is safe to love and be loved'
    ],
    'Loss & Grief': [
      'Love never dies, it only transforms',
      'I carry my loved ones in my heart forever',
      'Grief is love honoring what was precious',
      'I am held by love even in my sorrow',
      'Healing happens in its own perfect time'
    ],
    'Gratitude & Joy': [
      'My grateful heart attracts endless blessings',
      'Joy is my natural state of being',
      'I celebrate the miracle of this moment',
      'Abundance flows to me and through me',
      'I am a blessing in this world'
    ],
    'Peace & Tranquility': [
      'Peace is my birthright and my choice',
      'I am connected to the stillness within',
      'Calm flows through me like a gentle stream',
      'I find sanctuary in the silence of my soul',
      'Serenity is always available to me'
    ]
  };
  
  const affirmations = personalizedAffirmations[theme] || personalizedAffirmations['Peace & Tranquility'];
  return affirmations[Math.floor(Math.random() * affirmations.length)];
};

// Main functions with enhanced personalization
export const generateReflection = (userInput: string): ReflectionEntry => {
  const theme = identifyTheme(userInput);
  const verse = getRelevantVerse(theme, userInput);
  const meaning = generateMeaning(theme, userInput, verse);
  const affirmation = generateAffirmation(theme, userInput);
  
  return {
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    userInput,
    theme,
    verse: verse.verse,
    source: verse.source,
    meaning,
    affirmation,
    timestamp: Date.now()
  };
};

export const getRandomWisdom = (): WisdomVerse => {
  const verse = allVerses[Math.floor(Math.random() * allVerses.length)];
  
  const contextualMeanings: Record<string, string> = {
    "Bhagavad Gita 2:47": "This is perhaps one of the most liberating teachings ever given. Krishna is telling us that we can pour our hearts into our work, our relationships, our dreams - and then release our grip on the outcomes. It's not about not caring; it's about caring so deeply that we trust the process. When you do your best and let go of the rest, you find a peace that no external result can disturb.",
    
    "Bhagavad Gita 2:20": "This profound truth touches the deepest part of our being. You are not just your body, your thoughts, or your circumstances. You are an eternal soul having a temporary human experience. Understanding this doesn't make loss less painful, but it reminds us that love, consciousness, and the essence of who we are transcends physical existence.",
    
    "Bhagavad Gita 6:35": "Arjuna was expressing what we all feel - that the mind seems to have a mind of its own! Krishna's response is so compassionate: yes, it's difficult, but it's possible. Every time you notice your mind wandering and gently bring it back, you're building spiritual muscle. Be patient with yourself in this practice.",
    
    "Matthew 6:34": "Jesus understood human psychology perfectly. Our minds love to time-travel - replaying yesterday's mistakes or rehearsing tomorrow's disasters. But life only happens in the present moment. This isn't about being irresponsible; it's about trusting that you have everything you need for today's challenges.",
    
    "Psalm 46:10": "In our noisy, busy world, this verse is like a gentle hand on your shoulder, inviting you to pause. 'Be still' doesn't just mean stop moving - it means stop striving, stop trying to figure everything out, stop carrying burdens that aren't yours. In that stillness, you remember who you really are.",
    
    "1 Corinthians 13:4-5": "Paul isn't just describing romantic love here - he's painting a picture of divine love, the kind that transforms everything it touches. This is love as a spiritual practice, love as a way of being in the world. When we love like this, we become channels of healing for everyone we meet."
  };
  
  const reflectionQuestions: Record<string, string> = {
    "Bhagavad Gita 2:47": "What outcome are you gripping too tightly right now? How might your life change if you focused on giving your best effort while releasing attachment to the results?",
    
    "Bhagavad Gita 2:20": "How does remembering your eternal nature change the way you approach today's challenges? What would you do differently if you truly believed your essence is indestructible?",
    
    "Bhagavad Gita 6:35": "What small, consistent practice could you begin today to create more peace in your mind? How might your life transform if you were the master of your thoughts rather than their victim?",
    
    "Matthew 6:34": "What future worry are you carrying today that you could release by focusing on the present moment? What gifts might you discover if you fully inhabited this day?",
    
    "Psalm 46:10": "When was the last time you sat in complete silence without trying to solve anything? What might emerge if you created more space for stillness in your life?",
    
    "1 Corinthians 13:4-5": "How can you practice this kind of love in your relationships today? What would change if you approached one difficult person in your life with this level of patience and kindness?"
  };
  
  return {
    verse: verse.verse,
    source: verse.source,
    meaning: contextualMeanings[verse.source] || "This ancient wisdom speaks to the timeless struggles and joys of the human heart. These words have comforted, challenged, and inspired countless souls throughout history, and they're here for you today.",
    reflectionQuestion: reflectionQuestions[verse.source] || "How might this wisdom transform your perspective on a current challenge in your life?"
  };
};

export const getChallengeGuidance = (challengeId: string): ChallengeGuidance => {
  return challengeGuidanceData[challengeId] || challengeGuidanceData.fear;
};

export const analyzeSoulJourney = (reflections: ReflectionEntry[]) => {
  if (reflections.length === 0) {
    return {
      patterns: "Your spiritual journey is just beginning, and what a beautiful step you've taken by creating space for reflection. Every great journey starts with a single step, and yours starts here.",
      growth: "The very fact that you're here, seeking wisdom and wanting to understand yourself more deeply, shows incredible self-awareness and courage. This is already profound growth.",
      focus: "Begin gently. Notice your thoughts and feelings without judgment. Like a loving friend observing a child at play, simply watch what arises in your heart and mind with curiosity and compassion."
    };
  }
  
  const themes = reflections.map(r => r.theme);
  const uniqueThemes = [...new Set(themes)];
  const mostCommonTheme = themes.reduce((a, b) => 
    themes.filter(v => v === a).length >= themes.filter(v => v === b).length ? a : b
  );
  
  const recentReflections = reflections.slice(-5);
  const hasVariedThemes = uniqueThemes.length > 2;
  const timeSpan = reflections.length > 1 ? 
    Math.ceil((reflections[reflections.length - 1].timestamp - reflections[0].timestamp) / (1000 * 60 * 60 * 24)) : 1;
  
  return {
    patterns: hasVariedThemes 
      ? `Over ${timeSpan} days, I've watched you courageously explore ${uniqueThemes.length} different aspects of your inner world: ${uniqueThemes.slice(0, 3).join(', ')}${uniqueThemes.length > 3 ? ', and others' : ''}. Your soul keeps returning to ${mostCommonTheme}, which tells me this area is ready for deep healing and transformation. This isn't a problem to solve - it's a gift to unwrap slowly.`
      : `You've been consistently working with ${mostCommonTheme}, and I'm struck by your dedication to understanding this part of yourself. This focused attention shows you're ready to go deeper, to really transform this area of your life. Your persistence is beautiful.`,
    
    growth: reflections.length >= 10
      ? `Through ${reflections.length} reflections over ${timeSpan} days, I've witnessed something beautiful: your growing willingness to meet yourself with honesty and compassion. You're not just collecting insights - you're actually changing. The way you approach your challenges has evolved, becoming more gentle, more wise. This is real spiritual growth.`
      : reflections.length >= 5
      ? `In these ${reflections.length} entries, I see a soul awakening to its own wisdom. You're learning to pause, to seek guidance, to trust that your struggles have meaning. Each reflection is like a prayer, and prayers always change the one who prays.`
      : `These early reflections show such courage. You're building a practice of self-awareness that will serve you for a lifetime. Every time you pause to reflect rather than just react, you're choosing growth over habit, wisdom over impulse.`,
    
    focus: (() => {
      const recentThemes = recentReflections.map(r => r.theme);
      const isStuckInPattern = recentThemes.every(t => t === mostCommonTheme) && recentReflections.length >= 3;
      
      if (isStuckInPattern) {
        return `I notice you've been working intensively with ${mostCommonTheme} lately. This suggests you're in a deep healing process. Consider exploring how this theme shows up in different areas of your life - your relationships, your work, your dreams. Sometimes the same lesson appears in many disguises.`;
      } else if (reflections.length >= 7) {
        return `You've built a beautiful foundation of self-awareness. This week, I invite you to focus on integration: How can you live the wisdom you've been receiving? What small daily practice could help you embody these insights more fully?`;
      } else {
        return `Continue following your heart's guidance about what needs attention. Your soul knows what it needs to process and heal. Trust the wisdom of your own unfolding, and remember that every reflection is a step toward greater freedom and peace.`;
      }
    })()
  };
};