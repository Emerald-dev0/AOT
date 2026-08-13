import React, { useRef, useState, useEffect } from 'react';
import { LOCATIONS_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Compass, MapPin, Eye, ArrowRight } from 'lucide-react';

export const WorldJourney: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLocIndex, setActiveLocIndex] = useState(0);
  const [isPanoramicZoom, setIsPanoramicZoom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const idx = Math.min(LOCATIONS_DATA.length - 1, Math.floor(progress * LOCATIONS_DATA.length * 0.99));
      setActiveLocIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleZoom = () => {
    setIsPanoramicZoom(!isPanoramicZoom);
    soundEngine.triggerThump(40, 0.08, 0.2);
  };

  const worldTrackX = -scrollProgress * 420; // in vw

  return (
    <div
      ref={containerRef}
      id="world"
      className="relative h-[400vh] w-full bg-[#060608] select-none"
    >
      {/* Sticky Panoramic Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8">
        
        {/* Background Ambience from Active Territory */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {LOCATIONS_DATA[activeLocIndex].image && (
            <img
              src={LOCATIONS_DATA[activeLocIndex].image}
              alt="Territory background"
              className="w-full h-full object-cover filter blur-3xl opacity-20 scale-125 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          )}
          <div className="absolute inset-0 bg-[#060608]/85" />
        </div>

        {/* Top Header Tag */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between border-b border-[#1E1E22] pb-3 sm:pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                EXPEDITION CARTOGRAPHY • BEYOND THE WALLS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E0D1]">
              TERRITORIES & THE HORIZON
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleZoom}
              className={`px-2.5 sm:px-3.5 py-1.5 font-mono text-[10px] sm:text-xs border transition-all cursor-pointer flex items-center gap-1.5 min-h-[34px] sm:min-h-0 ${
                isPanoramicZoom
                  ? 'border-[#C5A880] bg-[#1A1810] text-[#E6E0D1]'
                  : 'border-[#333] bg-[#101012] text-[#888] hover:text-[#E6E0D1]'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#6B7C6B]" />
              <span>{isPanoramicZoom ? 'PANORAMIC WIDE' : 'TOPOGRAPHIC ZOOM'}</span>
            </button>
          </div>
        </div>

        {/* Horizontal Cartographic Panorama Strip */}
        <div
          className="relative z-10 w-[520vw] flex items-center px-4 sm:px-12 gap-6 sm:gap-14 transition-transform duration-100 ease-out will-change-transform my-auto"
          style={{ transform: `translate3d(${worldTrackX}vw, 0, 0)` }}
        >
          {LOCATIONS_DATA.map((loc, idx) => {
            const isCurrent = idx === activeLocIndex;

            return (
              <div
                key={loc.id}
                className={`relative w-[88vw] sm:w-[68vw] max-w-[820px] max-h-[72dvh] sm:max-h-none overflow-y-auto sm:overflow-visible shrink-0 border transition-all duration-700 p-4 sm:p-6 md:p-8 bg-[#09090C]/95 backdrop-blur-md flex flex-col md:flex-row gap-4 sm:gap-8 items-center ${
                  isCurrent
                    ? 'border-[#C5A880] shadow-2xl scale-[1.01] sm:scale-[1.02] ring-1 ring-[#C5A880]/40'
                    : 'border-[#222226] opacity-60 scale-95'
                }`}
              >
                {/* Territory Landscape Artwork */}
                <div className="relative w-full md:w-1/2 h-36 sm:h-52 md:h-auto md:aspect-[16/10] bg-black overflow-hidden border border-[#1A1A1E] group shrink-0">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className={`w-full h-full object-cover filter transition-all duration-700 ${
                      isPanoramicZoom ? 'scale-125 contrast-140' : 'contrast-125 brightness-95 group-hover:scale-105'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />

                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-[11px] bg-black/80 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A880]" />
                    <span>{loc.region}</span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                    <span className="font-editorial text-xs sm:text-sm text-[#C5A880]">
                      {loc.japaneseName}
                    </span>
                  </div>
                </div>

                {/* Territory Description & Impact */}
                <div className="w-full md:w-1/2 space-y-2 sm:space-y-4">
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-widest uppercase block">
                      REGION 0{idx + 1}
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-3xl text-[#E6E0D1] leading-tight mt-0.5 sm:mt-1">
                      {loc.name}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                    {loc.description}
                  </p>

                  <div className="p-2.5 sm:p-3 bg-[#101014] border border-[#222228] space-y-0.5 sm:space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#C5A880] tracking-wider uppercase block">
                      HISTORICAL IMPACT:
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#D0CBC0] font-sans">
                      {loc.significance}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C897F] border-t border-[#1C1C20] pt-2.5 sm:pt-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-[#C5A880] font-bold">
              0{activeLocIndex + 1} / 0{LOCATIONS_DATA.length}
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-[#E6E0D1] uppercase truncate max-w-[140px] sm:max-w-none">
              {LOCATIONS_DATA[activeLocIndex].name} ({LOCATIONS_DATA[activeLocIndex].region})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666] hidden sm:inline">SCROLL TO GLIDE ACROSS REGIONS</span>
            <div className="w-20 sm:w-32 h-1 bg-[#1A1A1E] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C5A880] transition-all duration-100"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
