import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { GentleWisdom } from './components/GentleWisdom';
import { BeHeard } from './pages/BeHeard';
import { NoticePatterns } from './pages/NoticePatterns';
import { FeelLessAlone } from './pages/FeelLessAlone';
import { PermissionToPause } from './pages/PermissionToPause';
import { LittleNudgesToCare } from './pages/LittleNudgesToCare';
import { PlayAndExplore } from './pages/PlayAndExplore';
import { Home } from './pages/Home';
import { JournalEntry, TodoItem, QuizAnswer } from './types';
import { ChatButton } from './components/ChatButton';

function App() {
  const [currentVibe, setCurrentVibe] = useState<string>('home');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswer[]>([]);
  const [userName, setUserName] = useState<string>('');

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('soulscript-entries');
    const savedTodos = localStorage.getItem('soulscript-todos');
    const savedName = localStorage.getItem('soulscript-name');
    
    if (savedEntries) {
      const entries = JSON.parse(savedEntries);
      // Convert timestamp strings back to Date objects
      const entriesWithDates = entries.map((entry: any) => ({
        ...entry,
        timestamp: new Date(entry.timestamp)
      }));
      setJournalEntries(entriesWithDates);
    }
    if (savedTodos) setTodoItems(JSON.parse(savedTodos));
    if (savedName) setUserName(savedName);
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('soulscript-entries', JSON.stringify(journalEntries));
  }, [journalEntries]);

  useEffect(() => {
    localStorage.setItem('soulscript-todos', JSON.stringify(todoItems));
  }, [todoItems]);

  useEffect(() => {
    localStorage.setItem('soulscript-name', userName);
  }, [userName]);

  const addJournalEntry = (text: string, mood: string, aiResponse?: string) => {
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      mood,
      aiResponse
    };
    setJournalEntries([newEntry, ...journalEntries]);
  };

  const addTodoItem = (text: string, heartNote: string) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      heartNote
    };
    setTodoItems([...todoItems, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodoItems(todoItems.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const renderCurrentVibe = () => {
    switch (currentVibe) {
      case 'heard':
        return <BeHeard journalEntries={journalEntries} addJournalEntry={addJournalEntry} />;
      case 'patterns':
        return <NoticePatterns journalEntries={journalEntries} />;
      case 'community':
        return <FeelLessAlone />;
      case 'pause':
        return <PermissionToPause />;
      case 'care':
        return <LittleNudgesToCare todoItems={todoItems} addTodoItem={addTodoItem} toggleTodo={toggleTodo} />;
      case 'explore':
        return <PlayAndExplore quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers} />;
      case 'menu':
        return <Home setCurrentVibe={setCurrentVibe} userName={userName} setUserName={setUserName} />;
      case 'wisdom':
        return <GentleWisdom journalEntries={journalEntries} addJournalEntry={addJournalEntry} />;
      default:
        return <GentleWisdom journalEntries={journalEntries} addJournalEntry={addJournalEntry} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-pink-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>
      
      <Navigation currentVibe={currentVibe} setCurrentVibe={setCurrentVibe} />
      
      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        {renderCurrentVibe()}
      </div>

      <ChatButton />
    </div>
  );
}

export default App;