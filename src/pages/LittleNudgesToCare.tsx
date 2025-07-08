import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { TodoItem } from '../types';

interface LittleNudgesToCareProps {
  todoItems: TodoItem[];
  addTodoItem: (text: string, heartNote: string) => void;
  toggleTodo: (id: string) => void;
}

export const LittleNudgesToCare: React.FC<LittleNudgesToCareProps> = ({ 
  todoItems, 
  addTodoItem, 
  toggleTodo 
}) => {
  const [newTodo, setNewTodo] = useState('');
  const [newHeart, setNewHeart] = useState('');

  const soulCareTasks = [
    { text: "Drink a glass of water", heart: "Your body is a temple, hydrate it gently 💧" },
    { text: "Step outside for 5 minutes", heart: "Fresh air is free therapy 🌬️" },
    { text: "Text someone you miss", heart: "Connection heals the soul 💌" },
    { text: "Take three deep breaths", heart: "Your breath is your anchor ⚓" },
    { text: "Write down one thing you're grateful for", heart: "Gratitude shifts everything ✨" }
  ];

  const addSoulCareTask = (task: { text: string; heart: string }) => {
    addTodoItem(task.text, task.heart);
  };

  const handleAddCustomTodo = () => {
    if (newTodo.trim()) {
      addTodoItem(newTodo, newHeart || "You've got this, beautiful soul 💜");
      setNewTodo('');
      setNewHeart('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-teal-600">Little Nudges to Care 💌</h2>
        <p className="text-gray-600">
          From our talks, here's your tiny heart list. We can update this anytime, lovely.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Quick Soul Care Tasks 🌿</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {soulCareTasks.map((task, index) => (
            <button
              key={index}
              onClick={() => addSoulCareTask(task)}
              className="p-4 bg-teal-50 border-2 border-teal-200 rounded-lg hover:bg-teal-100 transition-all text-left"
            >
              <p className="text-teal-800 font-medium">{task.text}</p>
              <p className="text-teal-600 text-sm mt-1">{task.heart}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Add Your Own Task 💭</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="What needs gentle attention today?"
            className="w-full p-3 border-2 border-teal-200 rounded-lg focus:border-teal-400 focus:outline-none"
          />
          <input
            type="text"
            value={newHeart}
            onChange={(e) => setNewHeart(e.target.value)}
            placeholder="Add a gentle note to yourself (optional) 💜"
            className="w-full p-3 border-2 border-teal-200 rounded-lg focus:border-teal-400 focus:outline-none"
          />
          <button
            onClick={handleAddCustomTodo}
            className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-green-600 transition-all"
          >
            Add to Heart List ✨
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Your Heart List 💝</h3>
        {todoItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Your heart list is ready for some gentle tasks 🌱</p>
          </div>
        ) : (
          <div className="space-y-3">
            {todoItems.map((todo) => (
              <div key={todo.id} className="bg-white rounded-lg shadow-sm p-4 border-l-4 border-teal-400">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 w-5 h-5 rounded-full border-2 transition-all ${
                      todo.completed
                        ? 'bg-teal-500 border-teal-500'
                        : 'border-gray-300 hover:border-teal-400'
                    }`}
                  >
                    {todo.completed && <span className="text-white text-xs">✓</span>}
                  </button>
                  <div className="flex-1">
                    <p className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                      {todo.text}
                    </p>
                    <p className="text-sm text-teal-600 mt-1">{todo.heartNote}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};