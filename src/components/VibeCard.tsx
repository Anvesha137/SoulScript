import React from 'react';
import { VibeCardProps } from '../types';

export const VibeCard: React.FC<VibeCardProps> = ({ icon, title, description, onClick, gradient }) => (
  <div
    onClick={onClick}
    className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl text-white cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20 backdrop-blur-sm`}
  >
    <div className="flex items-center space-x-3 mb-4">
      <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-white/90 leading-relaxed">{description}</p>
    <div className="mt-4 flex justify-end">
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        <span className="text-white text-sm">→</span>
      </div>
    </div>
  </div>
);