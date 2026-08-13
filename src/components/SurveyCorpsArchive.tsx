import React, { useRef, useState, useEffect } from 'react';
import { ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Crosshair, Zap, Shield, Wind } from 'lucide-react';

interface GearModule {
  id: string;
  name: string;
  category: string;
  japaneseName: string;
  description: string;
  tacticalRole: string;
  soundType: 'steam' | 'blade' | 'rumble';
}

const GEAR_MODULES: GearModule[] = [
  {
    id: 'odm-drive',
    name: 'OMNI-DIRECTIONAL MOBILITY DRIVE',
    category: 'AERIAL PROPULSION',
    japaneseName: '立体機動装置',
    description: 'Waist-mounted compressed gas turbines powering dual grappling hooks and wire spools. Enables three-dimensional high-speed combat across urban landscapes and tall trees.',
    tacticalRole: 'Rapid high-speed navigation and vertical ascent to reach Titan nape targets.',
    soundType: 'steam',
  },
  {
    id: 'blades',
    name: 'ULTRAHARD STEEL SNAP-BLADES',
    category: 'COMBAT WEAPONRY',
    japaneseName: '超硬質ブレード',
    description: 'Forged from specialized blast furnace steel infused with iceburst stone. Flexible yet razor sharp, segmented for instant replacement when dulled by Titan flesh.',
    tacticalRole: 'Precision 1-meter lethal slicing cuts across the back of the Titan neck.',
    soundType: 'blade',
  },
  {
    id: 'thunder-spears',
    name: 'THUNDER SPEAR ROCKETS',
    category: 'ANTI-ARMOR EXPLOSIVES',
    japaneseName: '雷槍',
    description: 'Arm-mounted rocket munitions detonated via pull-wire cords. Engineered specifically to shatter hardened Titan armor that deflects steel blades.',
    tacticalRole: 'Penetrates through Armored Titan plates and heavy crystal protection.',
    soundType: 'rumble',
  },
  {
    id: 'anti-personnel',
    name: 'ANTI-PERSONNEL GEAR',
    category: 'URBAN BALLISTICS',
    japaneseName: '対人立体機動装置',
    description: 'Modified maneuver harness equipped with dual shotgun-pistol triggers and back-mounted propulsion chambers, created by the Interior Police.',
    tacticalRole: 'Lethal medium-range firearm combat against human targets and military forces.',
    soundType: 'blade',
  },
];

export const SurveyCorpsArchive: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeGearIndex, setActiveGearIndex] = useState(0);
  const [isFiring, setIsFiring] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      const idx = Math.min(GEAR_MODULES.length - 1, Math.floor(progress * GEAR_MODULES.length * 0.99));
      setActiveGearIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTestTrigger = (idx: number) => {
    setIsFiring(idx);
    const mod = GEAR_MODULES[idx];
    if (mod.soundType === 'steam') soundEngine.triggerSteamHiss();
    else if (mod.soundType === 'blade') soundEngine.triggerBladeWhoosh();
    else soundEngine.triggerThump(30, 0.2, 0.5);

    setTimeout(() => setIsFiring(null), 400);
  };

  const gearTrackX = -scrollProgress * 280; // in vw

  return (
    <div
      ref={containerRef}
      id="archive"
      className="relative h-[300vh] w-full bg-[#070709] select-none"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between py-4 sm:py-6 md:py-8">
        
        {/* Background Ambience */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src={ASSETS.scoutOdmAction}
            alt="Survey Corps Equipment"
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
                COMBAT ARSENAL • TACTICAL BLUEPRINTS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl tracking-tight text-[#E6E0D1]">
              3D MANEUVER GEAR
            </h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs text-[#C5A880] shrink-0">
            <Crosshair className="w-3.5 h-3.5 text-[#6B7C6B]" />
            <span className="hidden sm:inline">SCOUT CORPS COMBAT PROTOCOLS</span>
            <span className="sm:hidden">PROTOCOLS</span>
          </div>
        </div>

        {/* Exploded Blueprint Schematic Horizontal Runway */}
        <div
          className="relative z-10 w-[380vw] flex items-center px-4 sm:px-12 gap-6 sm:gap-16 transition-transform duration-100 ease-out will-change-transform my-auto"
          style={{ transform: `translate3d(${gearTrackX}vw, 0, 0)` }}
        >
          {GEAR_MODULES.map((gear, idx) => {
            const isCurrent = idx === activeGearIndex;
            const firingThis = isFiring === idx;

            return (
              <div
                key={gear.id}
                className={`relative w-[88vw] sm:w-[70vw] max-w-[820px] max-h-[72dvh] sm:max-h-none overflow-y-auto sm:overflow-visible shrink-0 border transition-all duration-700 p-4 sm:p-6 md:p-8 bg-[#09090C]/95 backdrop-blur-md flex flex-col md:flex-row gap-4 sm:gap-8 items-center ${
                  isCurrent
                    ? 'border-[#6B7C6B] shadow-2xl scale-[1.01] sm:scale-[1.02] ring-1 ring-[#6B7C6B]/40'
                    : 'border-[#222226] opacity-60 scale-95'
                }`}
              >
                {/* Artwork Viewport */}
                <div className="relative w-full md:w-1/2 h-36 sm:h-52 md:h-auto md:aspect-[16/10] bg-black overflow-hidden border border-[#1A1A1E] group shrink-0">
                  <img
                    src={ASSETS.scoutOdmAction}
                    alt={gear.name}
                    className={`w-full h-full object-cover filter transition-all duration-500 ${
                      firingThis ? 'scale-110 brightness-125 contrast-150' : 'contrast-125 brightness-95 group-hover:scale-105'
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  {firingThis && (
                    <div className="absolute inset-0 bg-red-900/30 animate-pulse pointer-events-none" />
                  )}

                  <div className="absolute top-2.5 left-2.5 font-mono text-[10px] sm:text-[11px] bg-black/80 px-2 sm:px-2.5 py-0.5 sm:py-1 border border-[#333] text-[#E6E0D1]">
                    {gear.category}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-end">
                    <span className="font-editorial text-xs sm:text-sm text-[#C5A880]">
                      {gear.japaneseName}
                    </span>
                    <button
                      onClick={() => handleTestTrigger(idx)}
                      className="px-2.5 sm:px-3 py-1.5 bg-[#7A1E1E] hover:bg-[#962525] border border-[#A83232] text-[10px] sm:text-xs font-mono text-white transition-all cursor-pointer flex items-center gap-1 shadow-md min-h-[34px] sm:min-h-0"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>TEST TRIGGER</span>
                    </button>
                  </div>
                </div>

                {/* Gear Technical Description */}
                <div className="w-full md:w-1/2 space-y-2 sm:space-y-4">
                  <div>
                    <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-widest uppercase block">
                      MODULE 0{idx + 1}
                    </span>
                    <h3 className="font-display font-black text-xl sm:text-3xl text-[#E6E0D1] leading-tight mt-0.5 sm:mt-1">
                      {gear.name}
                    </h3>
                  </div>

                  <p className="text-[11px] sm:text-xs md:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                    {gear.description}
                  </p>

                  <div className="p-2.5 sm:p-3.5 bg-[#101014] border border-[#222228] space-y-1">
                    <span className="font-mono text-[10px] sm:text-[11px] text-[#C5A880] tracking-wider uppercase block flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[#6B7C6B]" /> COMBAT ROLE:
                    </span>
                    <p className="text-[11px] sm:text-xs text-[#D0CBC0] font-sans">
                      {gear.tacticalRole}
                    </p>
                  </div>

                  <div className="pt-1.5 sm:pt-2 border-t border-[#1C1C20] flex items-center justify-between font-mono text-[10px] sm:text-xs text-[#8C897F]">
                    <span>ICEBURST GAS</span>
                    <span className="text-[#6B7C6B]">STATUS: READY</span>
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
              0{activeGearIndex + 1} / 0{GEAR_MODULES.length}
            </span>
            <span className="text-[#555]">•</span>
            <span className="text-[#E6E0D1] uppercase truncate max-w-[140px] sm:max-w-none">
              {GEAR_MODULES[activeGearIndex].name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666] hidden sm:inline">SCROLL TO INSPECT GEAR</span>
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
