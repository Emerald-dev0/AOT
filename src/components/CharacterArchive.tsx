import React, { useState } from 'react';
import { CHARACTERS_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Shield, Sword, UserCheck, Star, Award, ChevronRight } from 'lucide-react';

export const CharacterArchive: React.FC = () => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [isSlashingIndex, setIsSlashingIndex] = useState<number | null>(null);

  const activeChar = CHARACTERS_DATA[activeCharacterIndex];

  const handleDrawBlade = (idx: number) => {
    setActiveCharacterIndex(idx);
    setIsSlashingIndex(idx);
    soundEngine.triggerThump(120, 0.15, 0.25);
    soundEngine.triggerBladeWhoosh();

    setTimeout(() => {
      setIsSlashingIndex(null);
    }, 450);
  };

  return (
    <section id="soldiers" className="relative w-full bg-[#070709] py-16 sm:py-24 px-4 sm:px-6 md:px-10 select-none border-t border-[#1C1C20]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          src={activeChar.image}
          alt="Soldier Background"
          className="w-full h-full object-cover filter blur-3xl saturate-125 scale-125 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#070709]/85" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E1E22] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.25em] uppercase">
                SURVEY CORPS • WINGS OF FREEDOM COMBAT DOSSIERS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#E6E0D1]">
              THE SOLDIERS
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#34d399] shrink-0">
            <Shield className="w-4 h-4 text-[#10b981]" />
            <span>SCOUT REGIMENT ELITE VANGUARD</span>
          </div>
        </div>

        {/* Tactile Soldier Squad Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {CHARACTERS_DATA.map((char, idx) => {
            const isSelected = idx === activeCharacterIndex;
            return (
              <button
                key={char.id}
                onClick={() => handleDrawBlade(idx)}
                className={`group relative p-3 text-left border transition-all duration-300 cursor-pointer rounded-sm flex flex-col justify-between h-28 sm:h-32 overflow-hidden ${
                  isSelected
                    ? 'bg-[#0f241a] border-[#10b981] shadow-xl ring-1 ring-[#10b981]/50'
                    : 'bg-[#0A0A0E] border-[#1C1C22] hover:border-[#333] hover:bg-[#121218] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative z-10 font-mono text-[10px] flex justify-between">
                  <span className={isSelected ? 'text-[#34d399] font-bold' : 'text-[#666]'}>0{idx + 1}</span>
                  <span className="text-[#888] truncate ml-1">{char.rank.split(' ')[0]}</span>
                </div>

                <div className="relative z-10">
                  <h4 className="font-display font-black text-sm sm:text-base text-[#E6E0D1] leading-tight line-clamp-1">
                    {char.name}
                  </h4>
                  <span className="font-editorial text-xs text-[#C5A880] block mt-0.5">
                    {char.japaneseName}
                  </span>
                </div>

                {/* Subdued soldier portrait */}
                <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover filter contrast-125"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Featured Soldier Spotlight & Tactile Dossier Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#09090D] border border-[#222228] p-5 sm:p-8 rounded-sm shadow-2xl">
          
          {/* Soldier Image Frame with Slash FX */}
          <div className="lg:col-span-6 relative aspect-[4/3] bg-black overflow-hidden border border-[#1C1C22] rounded-sm group">
            <img
              src={activeChar.image}
              alt={activeChar.name}
              className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

            {/* Live Blade Slash Animation */}
            {isSlashingIndex === activeCharacterIndex && (
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent animate-ping pointer-events-none" />
            )}

            {/* Rank Tag */}
            <div className="absolute top-3 left-3 font-mono text-xs bg-black/80 px-2.5 py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1.5 backdrop-blur-sm">
              <UserCheck className="w-3.5 h-3.5 text-[#10b981]" />
              <span>{activeChar.rank}</span>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="font-editorial text-sm sm:text-base text-[#C5A880]">
                {activeChar.japaneseName}
              </span>
              {activeChar.titanForm && (
                <span className="font-mono text-xs text-[#E65C5C] bg-[#220B0B] border border-[#7A1E1E] px-2 py-0.5 uppercase">
                  {activeChar.titanForm}
                </span>
              )}
            </div>
          </div>

          {/* Detailed Soldier Information & Audio Interaction */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="font-mono text-xs text-[#8C897F] tracking-widest uppercase block">
                {activeChar.branch}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#E6E0D1] mt-0.5">
                {activeChar.name}
              </h3>
            </div>

            {activeChar.quote && (
              <blockquote className="pl-3.5 border-l-2 border-[#10b981] font-editorial italic text-sm sm:text-base text-[#E6E0D1] leading-relaxed bg-[#0E1612] py-2 pr-3">
                “{activeChar.quote}”
              </blockquote>
            )}

            <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
              {activeChar.description}
            </p>

            {/* Action Bar & Status */}
            <div className="pt-3 border-t border-[#1C1C22] flex items-center justify-between font-mono text-xs">
              <div>
                <span className="text-[#666] block text-[10px]">COMBAT STATUS</span>
                <span className="text-[#C5A880] font-bold uppercase">{activeChar.status}</span>
              </div>

              <button
                onClick={() => handleDrawBlade(activeCharacterIndex)}
                className="px-4 py-2 bg-[#021f14] hover:bg-[#053322] border border-[#10b981] text-[#e6fbf3] hover:text-white rounded-sm font-mono text-xs flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-md min-h-[38px]"
              >
                <Sword className="w-3.5 h-3.5 text-[#34d399]" />
                <span>DRAW BLADES (SLASH)</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
