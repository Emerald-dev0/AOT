import React, { useRef, useState, useEffect } from 'react';
import { WALLS_DATA, ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Eye, ShieldAlert, Layers, ChevronRight, Compass } from 'lucide-react';

export const WallSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activeWallIndex, setActiveWallIndex] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const idx = Math.min(WALLS_DATA.length - 1, Math.floor(progress * WALLS_DATA.length * 0.99));
      setActiveWallIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleXRay = () => {
    setIsRevealed(!isRevealed);
    soundEngine.triggerThump(40, 0.15, 0.4);
    soundEngine.triggerSteamHiss();
  };

  const wallTrackX = -scrollProgress * 200; // in vw

  return (
    <div
      ref={containerRef}
      id="walls"
      className="relative h-[300vh] w-full bg-[#070709] select-none"
    >
      {/* Sticky Viewport Window with dynamic 100dvh */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8">
        
        {/* Background Atmosphere Parallax */}
        <div
          className="absolute inset-0 w-[300vw] h-full pointer-events-none transition-transform duration-75"
          style={{ transform: `translate3d(${wallTrackX * 0.3}vw, 0, 0)` }}
        >
          <img
            src={isRevealed ? ASSETS.colossalTitan : ASSETS.wallsMonolith}
            alt="Wall Background"
            className={`w-full h-full object-cover filter transition-all duration-1000 ${
              isRevealed ? 'brightness-30 contrast-150 saturate-150' : 'brightness-20 contrast-125'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-transparent to-[#070709]" />
        </div>

        {/* Top Header Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between border-b border-[#1E1E22] pb-3 sm:pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
              <span className="w-2 h-2 rounded-full bg-[#6B7C6B] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                DEFENSIVE BARRIERS • CONCENTRIC HORIZON
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E0D1]">
              THE 50-METER WALLS
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleXRay}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 font-mono text-[10px] sm:text-xs border transition-all cursor-pointer flex items-center gap-1.5 min-h-[36px] sm:min-h-0 ${
                isRevealed
                  ? 'border-[#7A1E1E] bg-[#2A0E0E] text-[#FF9E9E]'
                  : 'border-[#333] bg-[#101012] text-[#A6A295] hover:border-[#6B7C6B] hover:text-[#E6E0D1]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#E65C5C]" />
              <span>{isRevealed ? 'SEAL MASONRY' : 'REVEAL TITANS'}</span>
            </button>
          </div>
        </div>

        {/* Secret Warning Banner if Revealed */}
        {isRevealed && (
          <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 my-1 sm:my-2">
            <div className="p-2.5 sm:p-4 bg-[#180909]/95 border border-[#7A1E1E] flex items-center gap-2 sm:gap-3">
              <ShieldAlert className="w-4 h-4 text-[#E65C5C] shrink-0" />
              <p className="text-[11px] sm:text-xs text-[#D8C2C2] font-sans leading-tight sm:leading-normal">
                Millions of Colossal Titans stand shoulder-to-shoulder inside the stone masonry, hardened into silence since the founding of the walls.
              </p>
            </div>
          </div>
        )}

        {/* Horizontal Concentric Wall Strip */}
        <div
          className="relative z-10 w-[300vw] flex items-center px-4 sm:px-10 gap-6 sm:gap-16 transition-transform duration-100 ease-out will-change-transform my-auto"
          style={{ transform: `translate3d(${wallTrackX}vw, 0, 0)` }}
        >
          {WALLS_DATA.map((wall, index) => {
            const isCurrent = activeWallIndex === index;
            return (
              <div
                key={wall.id}
                className={`relative w-[88vw] sm:w-[75vw] max-w-[880px] max-h-[72dvh] sm:max-h-none overflow-y-auto sm:overflow-visible shrink-0 border transition-all duration-500 p-4 sm:p-6 md:p-8 bg-[#09090C]/90 backdrop-blur-md flex flex-col md:flex-row gap-4 sm:gap-8 items-center ${
                  isCurrent ? 'border-[#6B7C6B] shadow-2xl scale-[1.01] sm:scale-[1.02]' : 'border-[#222226] opacity-70 scale-95'
                }`}
              >
                {/* Wall Image with 3D Depth */}
                <div className="relative w-full md:w-1/2 h-36 sm:h-52 md:h-auto md:aspect-[16/10] bg-black overflow-hidden border border-[#1A1A1E] group shrink-0">
                  <img
                    src={isRevealed ? ASSETS.colossalTitan : ASSETS.wallsMonolith}
                    alt={wall.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isRevealed
                        ? 'contrast-150 brightness-95 scale-110 saturate-125'
                        : 'contrast-125 brightness-90 group-hover:scale-105'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-[11px] bg-black/80 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#333] text-[#E6E0D1]">
                    50 METERS TALL
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end font-mono text-[10px] sm:text-xs text-[#A6A295]">
                    <span>{wall.radiusKm} KM RADIUS</span>
                    <span className="text-[#C5A880]">{wall.breachStatus}</span>
                  </div>
                </div>

                {/* Wall Dossier & Story */}
                <div className="w-full md:w-1/2 space-y-2 sm:space-y-4">
                  <div>
                    <span className="font-editorial text-xs sm:text-sm text-[#C5A880] tracking-widest block">
                      {wall.japaneseName} • RING 0{index + 1}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#E6E0D1]">
                      {wall.name}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                    {wall.description}
                  </p>

                  <div className="space-y-1.5 sm:space-y-2 font-mono text-[10px] sm:text-xs border-t border-[#1C1C20] pt-2 sm:pt-4">
                    <div className="flex justify-between py-0.5 sm:py-1 border-b border-[#141418]">
                      <span className="text-[#777]">DEFENSIVE RADIUS</span>
                      <span className="text-[#E6E0D1]">{wall.radiusKm} km</span>
                    </div>
                    <div className="flex justify-between py-0.5 sm:py-1 border-b border-[#141418]">
                      <span className="text-[#777]">PERIMETER CIRCUMFERENCE</span>
                      <span className="text-[#E6E0D1]">{wall.circumferenceKm} km</span>
                    </div>
                    <div className="flex justify-between py-0.5 sm:py-1">
                      <span className="text-[#777]">ENCLOSED AREA</span>
                      <span className="text-[#C5A880]">{wall.areaKm2}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C897F] border-t border-[#1C1C20] pt-2.5 sm:pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Compass className="w-3.5 h-3.5 text-[#6B7C6B] shrink-0" />
            <span className="text-[#E6E0D1] truncate max-w-[160px] sm:max-w-none">
              RING: {WALLS_DATA[activeWallIndex].name.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666] hidden sm:inline">SCROLL TO TRAVERSE RINGS</span>
            <div className="w-20 sm:w-32 h-1 bg-[#1A1A1E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6B7C6B] transition-all duration-100"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
