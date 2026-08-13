import React, { useRef, useState, useEffect } from 'react';
import { TIMELINE_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { ShieldCheck, ShieldAlert, Calendar, ArrowRight } from 'lucide-react';

interface StoryTimelineProps {
  isSpoilerSafe: boolean;
  setIsSpoilerSafe: (val: boolean) => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({ isSpoilerSafe, setIsSpoilerSafe }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const idx = Math.min(TIMELINE_DATA.length - 1, Math.floor(progress * TIMELINE_DATA.length * 0.99));
      setActiveTimelineIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timelineTrackX = -scrollProgress * 420; // in vw

  return (
    <div
      ref={containerRef}
      id="story"
      className="relative h-[400vh] w-full bg-[#070709] select-none"
    >
      {/* Sticky Timeline Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {TIMELINE_DATA[activeTimelineIndex].image && (
            <img
              src={TIMELINE_DATA[activeTimelineIndex].image}
              alt="Timeline background"
              className="w-full h-full object-cover filter blur-3xl opacity-20 scale-125 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-[#070709]/85" />
        </div>

        {/* Top Header Tag & Spoiler Filter */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between border-b border-[#1E1E22] pb-3 sm:pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
              <span className="w-2 h-2 rounded-full bg-[#7A1E1E] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                HISTORICAL CHRONOLOGY • 2,000 YEARS OF TRAGEDY
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E0D1]">
              YEAR 845 – 854+
            </h2>
          </div>

          <button
            onClick={() => {
              setIsSpoilerSafe(!isSpoilerSafe);
              soundEngine.triggerThump(40, 0.1, 0.2);
            }}
            className="font-mono text-[10px] sm:text-xs px-2.5 sm:px-3.5 py-1.5 border border-[#333] hover:border-[#6B7C6B] text-[#A6A295] hover:text-[#E6E0D1] transition-all flex items-center gap-1.5 cursor-pointer bg-[#101012] min-h-[34px] sm:min-h-0 shrink-0"
          >
            {isSpoilerSafe ? <ShieldCheck className="w-3.5 h-3.5 text-[#6B7C6B]" /> : <ShieldAlert className="w-3.5 h-3.5 text-[#E65C5C]" />}
            <span>{isSpoilerSafe ? 'SPOILERS: OFF' : 'SPOILERS: ON'}</span>
          </button>
        </div>

        {/* Horizontal Timeline Memory Strip */}
        <div
          className="relative z-10 w-[520vw] flex items-center px-4 sm:px-12 gap-6 sm:gap-14 transition-transform duration-100 ease-out will-change-transform my-auto"
          style={{ transform: `translate3d(${timelineTrackX}vw, 0, 0)` }}
        >
          {TIMELINE_DATA.map((item, idx) => {
            const isCurrent = idx === activeTimelineIndex;
            const isMasked = isSpoilerSafe && item.isSpoiler;

            return (
              <div
                key={item.id}
                className={`relative w-[88vw] sm:w-[68vw] max-w-[820px] max-h-[72dvh] sm:max-h-none overflow-y-auto sm:overflow-visible shrink-0 border transition-all duration-700 p-4 sm:p-6 md:p-8 bg-[#09090C]/95 backdrop-blur-md flex flex-col md:flex-row gap-4 sm:gap-8 items-center ${
                  isCurrent
                    ? 'border-[#7A1E1E] shadow-2xl scale-[1.01] sm:scale-[1.02] ring-1 ring-[#7A1E1E]/40'
                    : 'border-[#222226] opacity-60 scale-95'
                }`}
              >
                {/* Event Artwork */}
                <div className="relative w-full md:w-1/2 h-36 sm:h-52 md:h-auto md:aspect-[16/10] bg-black overflow-hidden border border-[#1A1A1E] group shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full h-full object-cover filter transition-all duration-700 ${
                      isMasked
                        ? 'blur-xl brightness-40'
                        : 'contrast-125 brightness-95 group-hover:scale-105'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />

                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-[11px] bg-black/80 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C5A880]" />
                    <span>YEAR {item.year}</span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                    <span className="font-editorial text-xs sm:text-sm text-[#C5A880]">
                      {item.japaneseTitle}
                    </span>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8C897F]">
                      {item.phase}
                    </span>
                  </div>
                </div>

                {/* Event Story */}
                <div className="w-full md:w-1/2 space-y-2 sm:space-y-4">
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#C5A880] tracking-widest uppercase block">
                      CHRONICLE 0{idx + 1}
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-3xl text-[#E6E0D1] leading-tight mt-0.5 sm:mt-1">
                      {item.title}
                    </h3>
                  </div>

                  {isMasked ? (
                    <div className="p-3 sm:p-4 bg-[#140A0A] border border-[#7A1E1E] text-[11px] sm:text-xs font-mono text-[#E65C5C] leading-relaxed">
                      [ CLASSIFIED HISTORICAL RECORD — TURN OFF SPOILER PROTECTION TO READ ]
                    </div>
                  ) : (
                    <p className="text-[11px] sm:text-xs md:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                      {item.summary}
                    </p>
                  )}

                  <div className="pt-1.5 sm:pt-2 border-t border-[#1C1C20] flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C897F]">
                    <span>ERA: {item.phase}</span>
                    <span className="text-[#C5A880]">YEAR {item.year}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C897F] border-t border-[#1C1C20] pt-2.5 sm:pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#7A1E1E] font-bold">
              0{activeTimelineIndex + 1} / 0{TIMELINE_DATA.length}
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-[#E6E0D1] uppercase truncate max-w-[140px] sm:max-w-none">
              YEAR {TIMELINE_DATA[activeTimelineIndex].year}: {TIMELINE_DATA[activeTimelineIndex].title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666] hidden sm:inline">SCROLL TO JOURNEY THROUGH TIME</span>
            <div className="w-20 sm:w-32 h-1 bg-[#1A1A1E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7A1E1E] transition-all duration-100"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
