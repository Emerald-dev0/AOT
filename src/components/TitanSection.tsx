import React, { useState } from 'react';
import { TITANS_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Flame, Shield, ZoomIn, Eye, Sparkles, ChevronRight, Zap, Target } from 'lucide-react';

interface TitanSectionProps {
  isSpoilerSafe: boolean;
}

export const TitanSection: React.FC<TitanSectionProps> = ({ isSpoilerSafe }) => {
  const [activeTitanIndex, setActiveTitanIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'normal' | 'close_up' | 'hardened'>('normal');

  const activeTitan = TITANS_DATA[activeTitanIndex];

  const handleSelectTitan = (index: number) => {
    setActiveTitanIndex(index);
    soundEngine.triggerThump(35, 0.15, 0.4);
    if (TITANS_DATA[index].height.includes('60') || TITANS_DATA[index].height.includes('200') || TITANS_DATA[index].height.includes('17')) {
      soundEngine.triggerSteamHiss();
    } else {
      soundEngine.triggerBladeWhoosh();
    }
  };

  const handleViewMode = (mode: 'normal' | 'close_up' | 'hardened') => {
    setViewMode(mode);
    if (mode === 'hardened') soundEngine.triggerSteamHiss();
    else if (mode === 'close_up') soundEngine.triggerThump(45, 0.1, 0.3);
    else soundEngine.triggerBladeWhoosh();
  };

  const getImageStyle = () => {
    switch (viewMode) {
      case 'close_up':
        return 'scale-125 origin-top contrast-140 brightness-95';
      case 'hardened':
        return 'scale-105 saturate-200 hue-rotate-15 contrast-160 brightness-110';
      case 'normal':
      default:
        return 'scale-100 contrast-125 brightness-90';
    }
  };

  return (
    <section id="titans" className="relative w-full bg-[#050507] py-16 sm:py-24 px-4 sm:px-6 md:px-10 select-none border-t border-[#1C1C20]">
      {/* Atmospheric Ambient Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          src={activeTitan.image}
          alt="Titan Ambient Glow"
          className="w-full h-full object-cover filter blur-3xl saturate-150 scale-125 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#050507]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E1E22] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E65C5C] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.25em] uppercase">
                ANCESTRAL BLOODLINE • YMIR'S NINE INHERITORS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#E6E0D1]">
              THE NINE TITANS
            </h2>
          </div>

          {/* View Perspective Switcher */}
          <div className="flex items-center gap-2 font-mono text-xs overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[#666] text-[10px] uppercase mr-1 hidden sm:inline">MODE:</span>
            <button
              onClick={() => handleViewMode('normal')}
              className={`px-3 py-1.5 border transition-all cursor-pointer min-h-[36px] ${
                viewMode === 'normal'
                  ? 'border-[#7A1E1E] bg-[#221010] text-[#E6E0D1]'
                  : 'border-[#2A2A30] bg-[#0E0E12] text-[#888] hover:text-white'
              }`}
            >
              FULL VIEW
            </button>
            <button
              onClick={() => handleViewMode('close_up')}
              className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] ${
                viewMode === 'close_up'
                  ? 'border-[#C5A880] bg-[#221D12] text-[#E6E0D1]'
                  : 'border-[#2A2A30] bg-[#0E0E12] text-[#888] hover:text-white'
              }`}
            >
              <ZoomIn className="w-3.5 h-3.5 text-[#C5A880]" /> CLOSE-UP
            </button>
            <button
              onClick={() => handleViewMode('hardened')}
              className={`px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] ${
                viewMode === 'hardened'
                  ? 'border-[#6B7C6B] bg-[#122216] text-[#E6E0D1]'
                  : 'border-[#2A2A30] bg-[#0E0E12] text-[#888] hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-[#6B7C6B]" /> HARDENED
            </button>
          </div>
        </div>

        {/* 9 Titans Tactile Avatar Navigator / Ribbon */}
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 sm:gap-2.5">
          {TITANS_DATA.map((titan, idx) => {
            const isSelected = idx === activeTitanIndex;
            return (
              <button
                key={titan.id}
                onClick={() => handleSelectTitan(idx)}
                className={`group relative p-2 text-left border transition-all duration-300 cursor-pointer rounded-sm overflow-hidden flex flex-col justify-between h-24 sm:h-28 ${
                  isSelected
                    ? 'bg-[#181111] border-[#E65C5C] shadow-lg ring-1 ring-[#E65C5C]/50'
                    : 'bg-[#0A0A0E] border-[#1C1C22] hover:border-[#444] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative z-10 font-mono text-[9px] sm:text-[10px] text-[#888] flex justify-between">
                  <span>0{idx + 1}</span>
                  <span className={isSelected ? 'text-[#E65C5C] font-bold' : 'text-[#666]'}>{titan.height}</span>
                </div>
                
                <div className="relative z-10">
                  <h4 className="font-display font-bold text-xs sm:text-sm text-[#E6E0D1] leading-tight line-clamp-1">
                    {titan.name.replace(' Titan', '')}
                  </h4>
                  <span className="font-editorial text-[10px] text-[#C5A880] block mt-0.5 line-clamp-1">
                    {titan.japaneseName}
                  </span>
                </div>

                {/* Subdued thumbnail bg */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-35 transition-opacity">
                  <img
                    src={titan.image}
                    alt={titan.name}
                    className="w-full h-full object-cover filter contrast-125"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Titan Cinematic Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#09090D] border border-[#222228] p-5 sm:p-8 rounded-sm shadow-2xl">
          
          {/* Main Titan Artwork Frame */}
          <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/10] bg-black overflow-hidden border border-[#1C1C22] rounded-sm group">
            <img
              src={activeTitan.image}
              alt={activeTitan.name}
              className={`w-full h-full object-cover transition-all duration-700 ${getImageStyle()} group-hover:scale-105`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

            {/* Badges */}
            <div className="absolute top-3 left-3 font-mono text-xs bg-black/80 px-2.5 py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1.5 backdrop-blur-sm">
              <Flame className="w-3.5 h-3.5 text-[#E65C5C]" />
              <span>{activeTitan.number} • {activeTitan.height} HEIGHT</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="font-editorial text-sm sm:text-base text-[#C5A880]">
                {activeTitan.japaneseName}
              </span>
              <span className="font-mono text-xs text-[#E65C5C] bg-[#220B0B] border border-[#7A1E1E] px-2 py-0.5 uppercase">
                {activeTitan.classification}
              </span>
            </div>
          </div>

          {/* Titan Dossier & Shifter Profile */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-mono text-[10px] sm:text-xs text-[#C5A880] tracking-widest uppercase block">
                {activeTitan.classification}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#E6E0D1] mt-0.5">
                {activeTitan.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
              {activeTitan.description}
            </p>

            {/* Combat Traits / Abilities */}
            <div className="space-y-1.5 pt-2">
              <span className="font-mono text-[10px] text-[#8C897F] tracking-wider uppercase block">
                COMBAT CAPABILITIES & MUTATIONS:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTitan.abilities.map((ab, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-[#121218] border border-[#282832] font-mono text-xs text-[#E6E0D1] flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3 text-[#C5A880]" />
                    {ab}
                  </span>
                ))}
              </div>
            </div>

            {/* Shifter Profile Card */}
            <div className="p-3.5 bg-[#120F0F] border border-[#301616] space-y-1 font-mono text-xs mt-3">
              <div className="flex justify-between items-center">
                <span className="text-[#888]">CURRENT VESSEL / SHIFTER</span>
                <span className="text-[#E65C5C] font-bold">
                  {isSpoilerSafe && activeTitan.spoilerWarning ? '[ REDACTED SPOILER ]' : activeTitan.currentShifter}
                </span>
              </div>
              <div className="flex justify-between items-center text-[11px] text-[#666] pt-1 border-t border-[#201212]">
                <span>INHERITANCE CYCLE</span>
                <span>CURSE OF YMIR: 13 YEARS</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
