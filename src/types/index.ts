export interface JournalEntry {
  id: string;
  text: string;
  timestamp: Date;
  mood: string;
  aiResponse?: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  heartNote: string;
}

export interface QuizAnswer {
  question: string;
  answer: string;
}

export interface VibeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  gradient: string;
}