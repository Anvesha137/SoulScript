export interface ReflectionEntry {
  id: string;
  date: string;
  userInput: string;
  theme: string;
  verse: string;
  source: string;
  meaning: string;
  affirmation: string;
  timestamp: number;
  mood?: string;
  isVenting?: boolean;
}

export interface WisdomVerse {
  verse: string;
  source: string;
  meaning: string;
  reflectionQuestion: string;
}

export interface ChallengeGuidance {
  challenge: string;
  verse: string;
  source: string;
  guidance: string;
  action: string;
}