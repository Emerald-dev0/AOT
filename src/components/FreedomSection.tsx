import React from 'react';
import { ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Wind } from 'lucide-react';

export const FreedomSection: React.FC = () => {
  return (
    <section
      id="freedom"
      className="relative min-h-screen bg-[#050507] py-24 border-t border-[#16161A] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Full-Bleed Sunset Landscape Anchor with Slow Ambient Breathing Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={ASSETS.freedomTree}
          alt="The lone tree on the hill looking towards the horizon"
          className="w-full h-full object-cover object-center filter contrast-125 brightness-75 scale-100 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/70 via-transparent to-[#050507]/70" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between font-mono text-xs text-[#8C897F] border-b border-[#1E1E22]/60 pb-3">
        <div className="flex items-center gap-2">
          <Wind className="w-3.5 h-3.5 text-[#6B7C6B]" />
          <span className="tracking-[0.3em] uppercase">EPILOGUE • THE FINAL HORIZON</span>
        </div>
        <span className="font-editorial text-xs text-[#C5A880] tracking-widest hidden sm:inline">
          自由を求めて • TOWARDS THE WORLD BEYOND
        </span>
      </div>

      {/* Center Cinematic Typography interacting with the horizon */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 my-auto text-center py-16 flex flex-col items-center justify-center">
        <span className="font-mono text-xs text-[#C5A880] tracking-[0.4em] uppercase mb-4 block">
          WHAT LIES BEYOND THE SEA
        </span>

        <h2
          id="freedom-monumental-heading"
          className="font-display font-black text-6xl sm:text-9xl md:text-[140px] lg:text-[180px] leading-[0.82] tracking-tight text-[#E6E0D1] drop-shadow-2xl select-none hover:text-white transition-colors"
        >
          FREEDOM
        </h2>

        <p className="mt-8 max-w-2xl text-sm sm:text-lg text-[#D0CBC0] font-light leading-relaxed font-sans drop-shadow-md">
          “Ever since the day we were born, there has been something precious waiting beyond the walls. 
          Those who have seen it... they are the ones who achieved the greatest freedom of all.”
        </p>
      </div>

      {/* Bottom Epilogue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between font-mono text-xs text-[#777] border-t border-[#1E1E22]/60 pt-4 gap-2">
        <span>THE TREE ON THE HILL • PARADIS ERA 854+</span>
        <span className="text-[#C5A880]">“TO YOU, IN 2,000 YEARS: OR 20,000 YEARS FROM NOW...”</span>
      </div>
    </section>
  );
};
