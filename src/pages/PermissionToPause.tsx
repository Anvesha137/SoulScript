import React, { useState } from 'react';
import { Coffee } from 'lucide-react';

export const PermissionToPause: React.FC = () => {
  const poems = [
    {
      title: "Permission Granted",
      content: "Your breath is proof you're already enough.\nLet the world spin without you for a sec.\nThe dishes can wait.\nYour worth isn't measured in tasks completed."
    },
    {
      title: "Rest is Resistance",
      content: "In a world that screams 'do more,'\nyour stillness is revolutionary.\nYour existence without productivity\nis a beautiful rebellion."
    },
    {
      title: "Soft Day",
      content: "Today you don't have to be\nthe best version of yourself.\nYou can just be\nthe tired version,\nthe overwhelmed version,\nthe human version."
    }
  ];

  const [currentPoem, setCurrentPoem] = useState(0);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold text-purple-600">Permission to Pause 🌿</h2>
        <p className="text-gray-600">
          Yo legend 🫶 wanna smash that 'no productivity today' button? You don't have to optimize a single thing.
        </p>
      </div>

      <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded-xl text-white text-center">
        <h3 className="text-2xl font-bold mb-4">You Have Permission To:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <div className="space-y-2">
            <p>🛋️ Stay in bed all day</p>
            <p>🍕 Order takeout again</p>
            <p>📱 Scroll mindlessly</p>
            <p>😴 Nap whenever you want</p>
          </div>
          <div className="space-y-2">
            <p>🎬 Watch the same comfort show</p>
            <p>🧦 Wear mismatched socks</p>
            <p>🎯 Ignore your to-do list</p>
            <p>💝 Just exist beautifully</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Tiny Poem for Your Heart 💜</h3>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-purple-700 mb-3">
              {poems[currentPoem].title}
            </h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {poems[currentPoem].content}
            </p>
          </div>
          <div className="flex justify-center space-x-2">
            {poems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPoem(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentPoem ? 'bg-purple-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 rounded-xl text-white">
        <h3 className="text-xl font-semibold mb-3">Gentle Reminder 🌱</h3>
        <p>
          Rest isn't earned. It's a basic human need. Your worth isn't tied to your productivity. 
          You're allowed to have soft days, slow days, and days where you do absolutely nothing at all.
        </p>
      </div>
    </div>
  );
};