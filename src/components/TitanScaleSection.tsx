import React, { useRef, useState, useEffect } from 'react';
import { ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { ArrowUp, Maximize2 } from 'lucide-react';

const SCALE_STAGES = [
  {
    id: 'human',
    name: 'HUMAN SCOUT',
    height: '1.7M',
    multiplier: 1,
    image: ASSETS.humanScoutOdm,
    description: 'Humanity: Fragile biological frame reliant on compressed gas propulsion, steel blades, and rapid maneuvering.',
  },
  {
    id: 'attack',
    name: 'ATTACK TITAN',
    height: '15M',
    multiplier: 8.8,
    image: ASSETS.attackTitanRoar,
    description: 'Almost 9 times taller than a human. Highly agile combat titan capable of demolishing stone houses with bare hands.',
  },
  {
    id: 'wall',
    name: 'WALL MARIA PARAPET',
    height: '50M',
    multiplier: 29.4,
    image: ASSETS.wallsMonolith,
    description: 'Nearly 30 times human height. Monolithic barrier containing millions of hardened Colossal Titans embedded inside.',
  },
  {
    id: 'colossal',
    name: 'COLOSSAL TITAN',
    height: '60M',
    multiplier: 35.3,
    image: ASSETS.colossalTitan,
    description: 'Over 35 times human height. Peeks over the 50-meter walls, generating explosive transformation blasts and superheated steam.',
  },
  {
    id: 'founding',
    name: 'FOUNDING TITAN (RUMBLING)',
    height: '200M+',
    multiplier: 117.6,
    image: ASSETS.rumblingFounding,
    description: 'Over 117 times the human body. A colossal skeletal titan stretching thousands of feet into the clouds.',
  },
];

export const TitanScaleSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const idx = Math.min(SCALE_STAGES.length - 1, Math.floor(progress * SCALE_STAGES.length * 0.99));
      setActiveStageIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scaleTrackX = -scrollProgress * 320; // in vw

  return (
    <div
      ref={containerRef}
      id="scale"
      className="relative h-[350vh] w-full bg-[#070709] select-none"
    >
      {/* Sticky Scale Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8">
        
        {/* Top Header Tag */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 flex items-center justify-between border-b border-[#1E1E22] pb-3 sm:pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-0.5 sm:mb-1">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                SIZE COMPARISON • PHYSICAL SCALE
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E0D1]">
              THE SCALE OF TERROR
            </h2>
          </div>

          <div className="font-mono text-[10px] sm:text-xs text-[#C5A880] flex items-center gap-1.5 shrink-0">
            <ArrowUp className="w-3.5 h-3.5 text-[#6B7C6B]" />
            <span className="hidden sm:inline">1.7 METERS → 200+ METERS</span>
            <span className="sm:hidden">1.7M → 200M+</span>
          </div>
        </div>

        {/* Ascending Scale Continuum Horizontal Runway */}
        <div
          className="relative z-10 w-[420vw] flex items-end px-4 sm:px-12 gap-6 sm:gap-16 transition-transform duration-100 ease-out will-change-transform my-auto pb-3 sm:pb-6"
          style={{ transform: `translate3d(${scaleTrackX}vw, 0, 0)` }}
        >
          {SCALE_STAGES.map((stage, idx) => {
            const isCurrent = idx === activeStageIndex;
            return (
              <div
                key={stage.id}
                className={`relative w-[88vw] sm:w-[65vw] max-w-[760px] max-h-[72dvh] sm:max-h-[520px] overflow-y-auto sm:overflow-visible shrink-0 border transition-all duration-700 p-4 sm:p-6 md:p-8 bg-[#09090C]/95 backdrop-blur-md flex flex-col justify-between ${
                  isCurrent
                    ? 'border-[#C5A880] shadow-2xl scale-[1.01] sm:scale-[1.02] ring-1 ring-[#C5A880]/40'
                    : 'border-[#222226] opacity-60 scale-95'
                }`}
              >
                {/* Artwork Box */}
                <div className="relative w-full h-36 sm:h-48 md:aspect-[16/9] bg-black overflow-hidden border border-[#1A1A1E] group shrink-0">
                  <img
                    src={stage.image}
                    alt={stage.name}
                    className="w-full h-full object-cover filter brightness-90 contrast-125 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />

                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-xs bg-black/80 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1">
                    <Maximize2 className="w-3 h-3 text-[#C5A880]" />
                    <span>{stage.height}</span>
                  </div>

                  <div className="absolute bottom-2.5 left-3 right-3 flex justify-between items-end">
                    <span className="font-mono text-[10px] sm:text-xs text-[#C5A880]">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="font-display font-black text-2xl sm:text-4xl text-[#6B7C6B]">
                      {stage.height}
                    </span>
                  </div>
                </div>

                {/* Stage Info */}
                <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-display font-black text-xl sm:text-3xl text-[#E6E0D1]">
                      {stage.name}
                    </h3>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] shrink-0">
                      {stage.multiplier}x HUMAN
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                    {stage.description}
                  </p>

                  {/* Relative size progress bar */}
                  <div className="space-y-1 font-mono text-[10px] sm:text-[11px] pt-1.5 sm:pt-2 border-t border-[#1C1C20]">
                    <div className="flex justify-between text-[#888]">
                      <span>SCALE MULTIPLIER</span>
                      <span className="text-[#E6E0D1] font-bold">{stage.multiplier}x</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#141418] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C5A880]"
                        style={{ width: `${Math.min(100, (stage.multiplier / 117.6) * 100)}%` }}
                      />
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
            <span className="text-[#C5A880] font-bold">
              0{activeStageIndex + 1} / 0{SCALE_STAGES.length}
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-[#E6E0D1] uppercase truncate max-w-[140px] sm:max-w-none">
              {SCALE_STAGES[activeStageIndex].name} ({SCALE_STAGES[activeStageIndex].height})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666] hidden sm:inline">SCROLL TO ASCEND IN HEIGHT</span>
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
