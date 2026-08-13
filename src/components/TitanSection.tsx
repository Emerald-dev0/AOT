import React, { useRef, useState, useEffect } from 'react';
import { TITANS_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Flame, Shield, ZoomIn, ArrowRight } from 'lucide-react';

interface TitanSectionProps {
  isSpoilerSafe: boolean;
}

export const TitanSection: React.FC<TitanSectionProps> = ({ isSpoilerSafe }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTitanIndex, setActiveTitanIndex] = useState(0);
  const [focusMode, setFocusMode] = useState<'normal' | 'close_up' | 'hardened'>('normal');

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const idx = Math.min(TITANS_DATA.length - 1, Math.floor(progress * TITANS_DATA.length * 0.99));
      setActiveTitanIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFocusChange = (mode: 'normal' | 'close_up' | 'hardened') => {
    setFocusMode(mode);
    if (mode === 'hardened') soundEngine.triggerSteamHiss();
    else if (mode === 'close_up') soundEngine.triggerThump(45, 0.1, 0.3);
    else soundEngine.triggerBladeWhoosh();
  };

  // Horizontal traversal across all 9 titans
  const ribbonX = -scrollProgress * 550; // in vw

  const getImageStyle = () => {
    switch (focusMode) {
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
    <div
      ref={containerRef}
      id="titans"
      className="relative h-[450vh] w-full bg-[#060608] select-none"
    >
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8">
        
        {/* Background Atmospheric Glow */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={TITANS_DATA[activeTitanIndex].image}
            alt="Titan Atmosphere"
            className="w-full h-full object-cover filter blur-3xl opacity-20 scale-125 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#060608]/85" />
        </div>

        {/* Top Header Tag & View Selector */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#1E1E22] pb-3 sm:pb-4 gap-3">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
              <span className="w-2 h-2 rounded-full bg-[#E65C5C] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                THE NINE INHERITORS • ANCESTRAL BLOODLINE
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E0D1]">
              THE NINE TITANS
            </h2>
          </div>

          {/* Simple View Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[#666] uppercase text-[10px] mr-1 hidden sm:inline">VIEW:</span>
            <button
              onClick={() => handleFocusChange('normal')}
              className={`px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer min-h-[34px] sm:min-h-0 flex items-center ${
                focusMode === 'normal'
                  ? 'border-[#7A1E1E] bg-[#1C1212] text-[#E6E0D1]'
                  : 'border-[#2A2A2E] text-[#888] hover:text-[#E6E0D1]'
              }`}
            >
              FULL VIEW
            </button>
            <button
              onClick={() => handleFocusChange('close_up')}
              className={`px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1 min-h-[34px] sm:min-h-0 ${
                focusMode === 'close_up'
                  ? 'border-[#C5A880] bg-[#1E1A12] text-[#E6E0D1]'
                  : 'border-[#2A2A2E] text-[#888] hover:text-[#E6E0D1]'
              }`}
            >
              <ZoomIn className="w-3 h-3 text-[#C5A880]" /> CLOSE-UP
            </button>
            <button
              onClick={() => handleFocusChange('hardened')}
              className={`px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1 min-h-[34px] sm:min-h-0 ${
                focusMode === 'hardened'
                  ? 'border-[#6B7C6B] bg-[#121A14] text-[#E6E0D1]'
                  : 'border-[#2A2A2E] text-[#888] hover:text-[#E6E0D1]'
              }`}
            >
              <Shield className="w-3 h-3 text-[#6B7C6B]" /> HARDENED
            </button>
          </div>
        </div>

        {/* Horizontal 3D Isometric Ribbon of Titans */}
        <div
          className="relative z-10 w-[600vw] flex items-center px-4 sm:px-12 gap-6 sm:gap-12 transition-transform duration-100 ease-out will-change-transform my-auto"
          style={{
            transform: `translate3d(${ribbonX}vw, 0, 0)`,
            perspective: '1200px',
          }}
        >
          {TITANS_DATA.map((titan, idx) => {
            const isCurrent = idx === activeTitanIndex;
            const isOdd = idx % 2 === 1;

            return (
              <div
                key={titan.id}
                className={`relative w-[88vw] sm:w-[65vw] max-w-[760px] max-h-[72dvh] sm:max-h-none overflow-y-auto sm:overflow-visible shrink-0 border transition-all duration-700 p-4 sm:p-6 md:p-8 bg-[#09090C]/95 backdrop-blur-md flex flex-col md:flex-row gap-4 sm:gap-6 items-center ${
                  isCurrent
                    ? 'border-[#7A1E1E] shadow-2xl scale-[1.01] sm:scale-[1.03] z-20 ring-1 ring-[#7A1E1E]/50'
                    : 'border-[#222226] opacity-70 scale-95'
                }`}
                style={{
                  transform: `translate3d(0, ${isOdd ? '10px' : '-10px'}, 0) rotate(${isOdd ? '-0.5deg' : '0.5deg'})`,
                }}
              >
                {/* Titan Artwork Frame */}
                <div className="relative w-full md:w-1/2 h-36 sm:h-52 md:h-auto md:aspect-[4/3] bg-black overflow-hidden border border-[#1C1C20] group shrink-0">
                  <img
                    src={titan.image}
                    alt={titan.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${getImageStyle()} group-hover:scale-105`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-[11px] bg-black/80 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#333] text-[#E6E0D1]">
                    {titan.number} • {titan.height}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end pointer-events-none">
                    <span className="font-editorial text-xs sm:text-sm text-[#C5A880]">
                      {titan.japaneseName}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8C897F]">
                      {titan.classification}
                    </span>
                  </div>
                </div>

                {/* Titan Description & Details */}
                <div className="w-full md:w-1/2 space-y-2 sm:space-y-4">
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#C5A880] tracking-widest uppercase block">
                      {titan.classification}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E6E0D1] leading-none mt-0.5 sm:mt-1">
                      {titan.name}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                    {titan.description}
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5 sm:pt-1">
                    {titan.abilities.map((ab, i) => (
                      <span key={i} className="px-1.5 sm:px-2 py-0.5 bg-[#121216] border border-[#26262C] font-mono text-[9px] sm:text-[10px] text-[#C5A880]">
                        {ab}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-[#1C1C20] flex items-center justify-between font-mono text-[10px] sm:text-xs">
                    <span className="text-[#666]">CURRENT SHIFTER:</span>
                    <span className="text-[#E6E0D1] font-bold">
                      {isSpoilerSafe && titan.spoilerWarning ? 'HIDDEN (SPOILER)' : titan.currentShifter}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C897F] border-t border-[#1C1C20] pt-2.5 sm:pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#E65C5C] font-bold">
              0{activeTitanIndex + 1} / 0{TITANS_DATA.length}
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-[#E6E0D1] uppercase truncate max-w-[140px] sm:max-w-none">
              {TITANS_DATA[activeTitanIndex].name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666] hidden sm:inline">SCROLL TO GLIDE THROUGH TITANS</span>
            <div className="w-20 sm:w-32 h-1 bg-[#1A1A1E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E65C5C] transition-all duration-100"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
