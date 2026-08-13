import React from 'react';
import { TIMELINE_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Calendar, ShieldAlert, ShieldCheck, Clock, Bookmark } from 'lucide-react';

interface StoryTimelineProps {
  isSpoilerSafe: boolean;
  setIsSpoilerSafe: (val: boolean) => void;
}

export const StoryTimeline: React.FC<StoryTimelineProps> = ({
  isSpoilerSafe,
  setIsSpoilerSafe,
}) => {
  const toggleSpoilers = () => {
    setIsSpoilerSafe(!isSpoilerSafe);
    soundEngine.triggerThump(40, 0.1, 0.2);
  };

  return (
    <section id="timeline" className="relative w-full bg-[#070709] py-16 sm:py-24 px-4 sm:px-6 md:px-10 select-none border-t border-[#1C1C20]">
      {/* Subtle Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1010_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Section Header & Spoiler Protection Switch */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E1E22] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#7A1E1E] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.25em] uppercase">
                HISTORICAL CHRONOLOGY • 2,000 YEARS OF TRAGEDY
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#E6E0D1]">
              YEAR 845 – 854+
            </h2>
          </div>

          <button
            onClick={toggleSpoilers}
            className={`font-mono text-xs px-4 py-2 border transition-all flex items-center gap-2 cursor-pointer rounded-sm shadow-md min-h-[38px] ${
              isSpoilerSafe
                ? 'border-[#333] bg-[#101012] text-[#A6A295] hover:border-[#10b981] hover:text-[#E6E0D1]'
                : 'border-[#7A1E1E] bg-[#220B0B] text-[#FF9E9E]'
            }`}
          >
            {isSpoilerSafe ? (
              <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-[#E65C5C]" />
            )}
            <span>{isSpoilerSafe ? 'SPOILER PROTECTION: ON' : 'SPOILER PROTECTION: OFF'}</span>
          </button>
        </div>

        {/* Vertical Chronology Spine with Alternating Cards */}
        <div className="relative">
          
          {/* Central Spine Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#7A1E1E] via-[#C5A880] to-[#7A1E1E] -translate-x-1/2 hidden sm:block opacity-60" />

          <div className="space-y-8 sm:space-y-12">
            {TIMELINE_DATA.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isMasked = isSpoilerSafe && item.isSpoiler;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0A0A0E] border-2 border-[#7A1E1E] items-center justify-center z-20 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#C5A880]" />
                  </div>

                  {/* Card Container */}
                  <div className="w-full sm:w-[calc(50%-2rem)] bg-[#09090D] border border-[#222228] p-5 sm:p-6 rounded-sm shadow-2xl space-y-4 hover:border-[#7A1E1E] transition-all duration-300">
                    
                    {/* Event Artwork Frame */}
                    <div className="relative aspect-[16/9] bg-black overflow-hidden border border-[#1A1A1E] rounded-sm group">
                      <img
                        src={item.image}
                        alt={item.title}
                        className={`w-full h-full object-cover filter transition-transform duration-700 group-hover:scale-105 ${
                          isMasked ? 'blur-md contrast-150 brightness-50' : 'contrast-125 brightness-95'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

                      {/* Year Badge */}
                      <div className="absolute top-2.5 left-2.5 font-mono text-[11px] bg-black/85 px-2.5 py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>YEAR {item.year}</span>
                      </div>

                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                        <span className="font-editorial text-xs sm:text-sm text-[#C5A880]">
                          {item.japaneseTitle}
                        </span>
                        <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] uppercase">
                          {item.phase}
                        </span>
                      </div>
                    </div>

                    {/* Content Header */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#C5A880] tracking-wider uppercase">
                          CHRONICLE 0{idx + 1}
                        </span>
                        <span className="text-[#666]">YEAR {item.year}</span>
                      </div>
                      <h3 className="font-display font-black text-2xl text-[#E6E0D1]">
                        {item.title}
                      </h3>
                    </div>

                    {/* Summary / Classified Mask */}
                    {isMasked ? (
                      <div className="p-3.5 bg-[#140A0A] border border-[#7A1E1E] text-xs font-mono text-[#E65C5C] leading-relaxed rounded-sm">
                        [ CLASSIFIED HISTORICAL RECORD — TURN OFF SPOILER PROTECTION TO REVEAL FULL DETAILS ]
                      </div>
                    ) : (
                      <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
                        {item.summary}
                      </p>
                    )}

                    <div className="pt-2 border-t border-[#1C1C22] flex items-center justify-between font-mono text-[10px] text-[#666]">
                      <span>ERA: {item.phase}</span>
                      <span className="text-[#7A1E1E]">STATUS: RECORDED</span>
                    </div>
                  </div>

                  {/* Empty Spacer on Opposite Side */}
                  <div className="hidden sm:block w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
