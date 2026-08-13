import React, { useState } from 'react';
import { WALLS_DATA, ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Eye, ShieldAlert, Layers, Shield, Compass, Crosshair } from 'lucide-react';

export const WallSection: React.FC = () => {
  const [activeWallIndex, setActiveWallIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const activeWall = WALLS_DATA[activeWallIndex];

  const toggleXRay = () => {
    setIsRevealed(!isRevealed);
    soundEngine.triggerThump(40, 0.15, 0.4);
    soundEngine.triggerSteamHiss();
  };

  const handleSelectWall = (index: number) => {
    setActiveWallIndex(index);
    soundEngine.triggerBladeWhoosh();
  };

  return (
    <section id="walls" className="relative w-full bg-[#060608] py-16 sm:py-24 px-4 sm:px-6 md:px-10 select-none border-t border-[#1C1C20]">
      {/* Subtle Background Wall Texture Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          src={isRevealed ? ASSETS.colossalTitan : ASSETS.wallsMonolith}
          alt="Wall Monolith Texture"
          className="w-full h-full object-cover filter brightness-50 contrast-150 blur-sm scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060608] via-transparent to-[#060608]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E1E22] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6B7C6B] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.25em] uppercase">
                DEFENSIVE ARCHITECTURE • CONCENTRIC BASTIONS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#E6E0D1]">
              THE 50-METER WALLS
            </h2>
          </div>

          {/* Interactive X-Ray / Titan Masonry Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleXRay}
              className={`px-4 py-2 font-mono text-xs border transition-all duration-200 cursor-pointer flex items-center gap-2 shadow-lg min-h-[38px] ${
                isRevealed
                  ? 'border-[#7A1E1E] bg-[#2A0E0E] text-[#FF9E9E]'
                  : 'border-[#333] bg-[#101012] text-[#A6A295] hover:border-[#6B7C6B] hover:text-[#E6E0D1]'
              }`}
            >
              <Eye className="w-4 h-4 text-[#E65C5C]" />
              <span>{isRevealed ? 'SEAL STONE MASONRY' : 'REVEAL ENCASED TITANS'}</span>
            </button>
          </div>
        </div>

        {/* Warning Banner when X-Ray is Activated */}
        {isRevealed && (
          <div className="p-3.5 sm:p-4 bg-[#1A0A0A]/95 border border-[#7A1E1E] flex items-center gap-3 rounded-sm animate-in fade-in slide-in-from-top-2 duration-300 shadow-xl">
            <ShieldAlert className="w-5 h-5 text-[#E65C5C] shrink-0" />
            <p className="text-xs sm:text-sm text-[#FFB3B3] font-sans leading-relaxed">
              <strong className="text-white font-semibold">CLASSIFIED RECORD:</strong> Tens of thousands of hardened Colossal Titans stand shoulder-to-shoulder within the 50-meter stone core, awaiting the Founder's command to initiate the Rumbling.
            </p>
          </div>
        )}

        {/* Concentric Ring Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {WALLS_DATA.map((wall, index) => {
            const isCurrent = activeWallIndex === index;
            return (
              <button
                key={wall.id}
                onClick={() => handleSelectWall(index)}
                className={`p-4 text-left border transition-all duration-300 cursor-pointer rounded-sm flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#121218] border-[#6B7C6B] shadow-xl ring-1 ring-[#6B7C6B]/40'
                    : 'bg-[#09090C] border-[#1C1C22] hover:border-[#333] hover:bg-[#0E0E12] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1A1A20] font-mono text-[10px]">
                  <span className="text-[#8C897F]">RING 0{index + 1}</span>
                  <span className={isCurrent ? 'text-[#6B7C6B] font-bold' : 'text-[#555]'}>
                    {wall.radiusKm} KM RADIUS
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#E6E0D1]">
                  {wall.name}
                </h3>
                <span className="font-editorial text-xs text-[#C5A880] mt-0.5">
                  {wall.japaneseName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Wall Visual & Architectural Cross-Section Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#09090D] border border-[#222228] p-5 sm:p-8 rounded-sm shadow-2xl">
          
          {/* Visual Artwork Frame with Peeling Mask & X-Ray Mode */}
          <div className="lg:col-span-6 relative aspect-[16/10] bg-black overflow-hidden border border-[#1C1C22] rounded-sm group">
            <img
              src={isRevealed ? ASSETS.colossalTitan : ASSETS.wallsMonolith}
              alt={activeWall.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isRevealed ? 'contrast-150 brightness-95 saturate-150 scale-105' : 'contrast-125 brightness-90 group-hover:scale-105'
              }`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Tactical Overlays */}
            <div className="absolute top-3 left-3 font-mono text-xs bg-black/80 px-2.5 py-1 border border-[#333] text-[#E6E0D1] backdrop-blur-sm">
              HEIGHT: 50 METERS
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end font-mono text-xs">
              <span className="text-[#C5A880] font-editorial text-sm">{activeWall.japaneseName}</span>
              <span className="text-[#E65C5C] bg-[#1F0808] px-2 py-0.5 border border-[#7A1E1E] uppercase">
                {activeWall.breachStatus}
              </span>
            </div>
          </div>

          {/* Detailed Wall Architectural Dossier */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-[#8C897F] tracking-widest uppercase">
                <Compass className="w-3.5 h-3.5 text-[#6B7C6B]" />
                <span>CONCENTRIC PERIMETER REPORT</span>
              </div>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#E6E0D1] mt-1">
                {activeWall.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
              {activeWall.description}
            </p>

            {/* Architectural Specs Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3 border-t border-[#1C1C22] font-mono text-xs">
              <div className="p-3 bg-[#111116] border border-[#1E1E26]">
                <span className="text-[#666] block text-[10px]">DEFENSIVE RADIUS</span>
                <span className="text-[#E6E0D1] font-bold text-sm">{activeWall.radiusKm} km</span>
              </div>

              <div className="p-3 bg-[#111116] border border-[#1E1E26]">
                <span className="text-[#666] block text-[10px]">CIRCUMFERENCE</span>
                <span className="text-[#E6E0D1] font-bold text-sm">{activeWall.circumferenceKm} km</span>
              </div>

              <div className="p-3 bg-[#111116] border border-[#1E1E26] col-span-2 sm:col-span-1">
                <span className="text-[#666] block text-[10px]">ENCLOSED AREA</span>
                <span className="text-[#C5A880] font-bold text-sm">{activeWall.areaKm2}</span>
              </div>
            </div>

            {/* Military Garrison Protocol */}
            <div className="p-3.5 bg-[#0F1410] border border-[#1E3A24] flex items-center justify-between font-mono text-xs text-[#9FC4A5]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#6B7C6B]" /> DEFENSE FORCE:
              </span>
              <span className="text-[#E6E0D1]">GARRISON REGIMENT ARTILLERY</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
