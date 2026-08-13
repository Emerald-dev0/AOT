import React, { useRef, useState, useEffect } from 'react';
import { CHARACTERS_DATA, ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Shield, Sword, Quote, UserCheck } from 'lucide-react';

export const CharacterArchive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCharIndex, setActiveCharIndex] = useState(0);
  const [slashingIdx, setSlashingIdx] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const idx = Math.min(CHARACTERS_DATA.length - 1, Math.floor(progress * CHARACTERS_DATA.length * 0.99));
      setActiveCharIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawBlade = (idx: number) => {
    setSlashingIdx(idx);
    soundEngine.triggerBladeWhoosh();
    setTimeout(() => setSlashingIdx(null), 400);
  };

  const characterTrackX = -scrollProgress * 480; // in vw

  return (
    <div
      ref={containerRef}
      id="soldiers"
      className="relative h-[400vh] w-full bg-[#070709] select-none"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={ASSETS.scoutOdmAction}
            alt="Survey Corps"
            className="w-full h-full object-cover filter blur-3xl opacity-15 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#070709]/90" />
        </div>

        {/* Top Header Tag */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between border-b border-[#1E1E22] pb-3 sm:pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
              <span className="w-2 h-2 rounded-full bg-[#6B7C6B] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                SURVEY CORPS • WINGS OF FREEDOM
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E0D1]">
              THE SOLDIERS
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-[#C5A880] shrink-0">
            <Shield className="w-3.5 h-3.5 text-[#6B7C6B]" />
            <span className="hidden sm:inline">SCOUT REGIMENT VANGUARD</span>
            <span className="sm:hidden">SCOUTS</span>
          </div>
        </div>

        {/* Dual-Track Asymmetric Horizontal Character Ribbon */}
        <div
          className="relative z-10 w-[550vw] flex items-center px-4 sm:px-12 gap-6 sm:gap-12 transition-transform duration-100 ease-out will-change-transform my-auto"
          style={{ transform: `translate3d(${characterTrackX}vw, 0, 0)` }}
        >
          {CHARACTERS_DATA.map((char, idx) => {
            const isCurrent = idx === activeCharIndex;
            const isSlashing = slashingIdx === idx;

            return (
              <div
                key={char.id}
                className={`relative w-[88vw] sm:w-[65vw] max-w-[760px] max-h-[72dvh] sm:max-h-none overflow-y-auto sm:overflow-visible shrink-0 border transition-all duration-700 p-4 sm:p-6 md:p-8 bg-[#09090C]/95 backdrop-blur-md flex flex-col md:flex-row gap-4 sm:gap-6 items-center ${
                  isCurrent
                    ? 'border-[#6B7C6B] shadow-2xl scale-[1.01] sm:scale-[1.02] ring-1 ring-[#6B7C6B]/40'
                    : 'border-[#222226] opacity-60 scale-95'
                }`}
              >
                {/* Character Portrait with Blade Slice Animation */}
                <div className="relative w-full md:w-1/2 h-36 sm:h-52 md:h-auto md:aspect-[4/3] bg-black overflow-hidden border border-[#1A1A1E] group shrink-0">
                  <img
                    src={char.image}
                    alt={char.name}
                    className={`w-full h-full object-cover object-top filter contrast-125 brightness-95 transition-all duration-500 ${
                      isSlashing ? 'scale-110 blur-sm brightness-150' : 'group-hover:scale-105'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />

                  {isSlashing && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent animate-ping pointer-events-none" />
                  )}

                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-[11px] bg-black/80 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1">
                    <UserCheck className="w-3 h-3 text-[#6B7C6B]" />
                    <span>{char.rank}</span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                    <span className="font-editorial text-xs sm:text-sm text-[#C5A880]">
                      {char.japaneseName}
                    </span>
                    {char.titanForm && (
                      <span className="font-mono text-[9px] sm:text-[10px] text-[#E65C5C] bg-[#200A0A] border border-[#7A1E1E] px-1.5 sm:px-2 py-0.5 uppercase">
                        {char.titanForm}
                      </span>
                    )}
                  </div>
                </div>

                {/* Character Info & Quote */}
                <div className="w-full md:w-1/2 space-y-2 sm:space-y-4">
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-widest uppercase block">
                      {char.branch}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E6E0D1] leading-none mt-0.5 sm:mt-1">
                      {char.name}
                    </h3>
                  </div>

                  {char.quote && (
                    <blockquote className="pl-2 sm:pl-3 border-l-2 border-[#6B7C6B] font-editorial italic text-[11px] sm:text-xs md:text-sm text-[#E6E0D1] leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                      “{char.quote}”
                    </blockquote>
                  )}

                  <p className="text-[11px] sm:text-xs md:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                    {char.description}
                  </p>

                  <div className="pt-2 sm:pt-3 border-t border-[#1C1C20] flex items-center justify-between font-mono text-[10px] sm:text-xs">
                    <div>
                      <span className="text-[#666] block text-[9px] sm:text-[10px]">STATUS</span>
                      <span className="text-[#C5A880] font-bold uppercase">{char.status}</span>
                    </div>

                    <button
                      onClick={() => handleDrawBlade(idx)}
                      className="px-2.5 sm:px-3 py-1.5 bg-[#141418] hover:bg-[#1F1F26] border border-[#333] hover:border-[#6B7C6B] text-[#E6E0D1] flex items-center gap-1.5 transition-all cursor-pointer text-[10px] sm:text-xs min-h-[34px] sm:min-h-0"
                    >
                      <Sword className="w-3.5 h-3.5 text-[#6B7C6B]" />
                      <span>DRAW BLADE</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C897F] border-t border-[#1C1C20] pt-2.5 sm:pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#6B7C6B] font-bold">
              0{activeCharIndex + 1} / 0{CHARACTERS_DATA.length}
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-[#E6E0D1] uppercase truncate max-w-[140px] sm:max-w-none">
              {CHARACTERS_DATA[activeCharIndex].name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666] hidden sm:inline">SCROLL TO EXPLORE SOLDIERS</span>
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
