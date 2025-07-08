import React, { useState } from 'react';
import { MessageCircle, X, Send, Heart } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const ChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{text: string, isUser: boolean, timestamp: Date}>>([
    {
      text: "Hey beautiful soul 💖 I'm here whenever you need to talk. What's on your heart?",
      isUser: false,
      timestamp: new Date()
    }
  ]);

  const generateAIResponse = async (userMessage: string) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `
You are SoulScript, a gentle, caring AI companion. The user just shared: "${userMessage}"

Respond with warmth, empathy, and genuine care. Keep it:
- Short and conversational (1-2 sentences max)
- Emotionally supportive
- Use gentle emojis naturally
- Modern, Gen Z-friendly language
- Never give medical advice or diagnose
- Focus on validation and emotional support

Examples of your style:
"I hear you, lovely. That sounds really tough. 💜"
"Thank you for sharing that with me. Your feelings are so valid. 🌸"
"I'm sitting with you in this moment. You're not alone. ✨"

Respond naturally to their message:
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (error) {
      console.error('Error generating AI response:', error);
      // Fallback responses
      const fallbacks = [
        "I hear you, lovely. That sounds really tough. 💜",
        "Thank you for sharing that with me. Your feelings are so valid. 🌸",
        "I'm sitting with you in this moment. You're not alone. ✨",
        "That takes courage to share. I'm proud of you for opening up. 💛",
        "Your heart is safe here. Take all the time you need. 🌙"
      ];
      return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Generate AI response
    const aiResponseText = await generateAIResponse(message);
    
    setIsTyping(false);

    const botResponse = {
      text: aiResponseText,
      isUser: false,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, botResponse]);
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group relative bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
            isOpen ? 'w-14 h-14' : 'px-6 py-4'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 mx-auto" />
          ) : (
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium whitespace-nowrap">Want to keep talking? 💖</span>
            </div>
          )}
          
          {/* Floating hearts animation */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full animate-ping opacity-75"></div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">SoulScript</h3>
                <p className="text-xs text-white/80">Your gentle companion</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-purple-50/30 to-pink-50/30">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.isUser
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.isUser ? 'text-white/70' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-bl-md shadow-sm p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share what's on your heart..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:border-purple-400 focus:outline-none text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};