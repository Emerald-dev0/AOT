import React, { useState } from 'react';
import { ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { useCinematicCamera } from '../hooks/useCinematicCamera';
import { ChevronDown, Volume2, Maximize2 } from 'lucide-react';

type CameraShot = 'wide' | 'focal_eye' | 'scout_pov';

export const HeroSection: React.FC = () => {
  const [shotState, setShotState] = useState<CameraShot>('wide');
  const camera = useCinematicCamera();

  const handleShotChange = (shot: CameraShot) => {
    setShotState(shot);
    soundEngine.triggerThump(45, 0.12, 0.3);
    soundEngine.triggerSteamHiss();
  };

  // Compute camera transformation based on shot mode & mouse parallax
  const getCameraStyle = () => {
    if (camera.isReducedMotion) {
      return { transform: 'scale(1)' };
    }

    const parallaxX = camera.mouseX * 12;
    const parallaxY = camera.mouseY * 8;

    switch (shotState) {
      case 'focal_eye':
        return {
          transform: `translate(${parallaxX}px, ${parallaxY - 40}px) scale(1.65)`,
          transformOrigin: '55% 25%',
        };
      case 'scout_pov':
        return {
          transform: `translate(${parallaxX * 0.5}px, ${parallaxY + 20}px) scale(1.25)`,
          transformOrigin: 'center 75%',
        };
      case 'wide':
      default:
        return {
          transform: `translate(${parallaxX * 0.8}px, ${parallaxY * 0.8 + camera.scrollY * 0.2}px) scale(${1.06 + camera.scrollY * 0.0002})`,
          transformOrigin: 'center center',
        };
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#050507] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Cinematic Full-Bleed Image Stage with Camera Framing */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="w-full h-full transition-all duration-1000 ease-out"
          style={getCameraStyle()}
        >
          <img
            src={ASSETS.heroWall}
            alt="The Colossal Titan breaches Wall Maria with billowing heat"
            className={`w-full h-full object-cover object-center filter transition-all duration-1000 ${
              shotState === 'focal_eye'
                ? 'contrast-150 brightness-95 saturate-125'
                : 'brightness-90 contrast-125 saturate-110'
            }`}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Cinematic Vignette Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-[#060608]/40 to-[#060608]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608]/90 via-transparent to-[#060608]/90" />

        {/* Heat haze glow layer */}
        <div className="absolute top-1/4 left-1/3 w-[650px] h-[650px] bg-red-950/25 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pt-6 sm:pt-10 flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#8C897F]">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-[#7A1E1E] animate-ping shrink-0" />
          <span className="text-[#E6E0D1] tracking-[0.2em] sm:tracking-[0.3em] uppercase">PARADIS ISLAND • YEAR 845</span>
        </div>
        <span className="tracking-[0.15em] sm:tracking-[0.2em] text-[#C5A880] font-editorial text-xs sm:text-sm">
          進撃の巨人 • ATTACK ON TITAN
        </span>
      </div>

      {/* Main Title & Perspective Controls */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 my-auto py-8 sm:py-12 flex flex-col justify-center">
        <div className="max-w-4xl space-y-3 sm:space-y-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="h-[1px] w-8 sm:w-12 bg-[#7A1E1E]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.4em] uppercase text-[#A6A295]">
              WALL MARIA • THE FALL OF SHIGANSHINA
            </span>
          </div>

          <h1
            id="hero-main-title"
            className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-[130px] leading-[0.85] sm:leading-[0.82] tracking-tight text-[#E6E0D1] drop-shadow-2xl select-none"
          >
            <span className="block hover:text-white transition-colors">ATTACK</span>
            <span className="block text-[#6B7C6B] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-light tracking-[0.2em] sm:tracking-[0.25em] my-1">
              ON
            </span>
            <span className="block text-[#D8D4C8]">TITAN</span>
          </h1>

          <p className="max-w-xl text-xs sm:text-sm md:text-base text-[#BDB8AB] font-light leading-relaxed pt-1 sm:pt-2 font-sans drop-shadow-md">
            “On that day, mankind received a grim reminder. We lived in fear of the Titans and were disgraced to live in these cages we called walls.”
          </p>

          {/* Perspective Selector Controls */}
          <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs">
            <span className="text-[#777] text-[10px] tracking-widest uppercase w-full sm:w-auto mb-1 sm:mb-0">
              VIEW PERSPECTIVE:
            </span>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleShotChange('wide')}
                className={`px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer text-[11px] sm:text-xs min-h-[36px] sm:min-h-0 flex items-center ${
                  shotState === 'wide'
                    ? 'border-[#6B7C6B] bg-[#141418] text-[#E6E0D1]'
                    : 'border-[#2A2A2E] bg-[#0A0A0D]/80 text-[#888] hover:text-[#E6E0D1]'
                }`}
              >
                WIDE RAMPART
              </button>
              <button
                onClick={() => handleShotChange('focal_eye')}
                className={`px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer flex items-center gap-1.5 text-[11px] sm:text-xs min-h-[36px] sm:min-h-0 ${
                  shotState === 'focal_eye'
                    ? 'border-[#7A1E1E] bg-[#220B0B] text-[#FF9999]'
                    : 'border-[#2A2A2E] bg-[#0A0A0D]/80 text-[#888] hover:text-[#E6E0D1]'
                }`}
              >
                <Maximize2 className="w-3 h-3 text-[#E65C5C]" /> TITAN CLOSE-UP
              </button>
              <button
                onClick={() => handleShotChange('scout_pov')}
                className={`px-2.5 sm:px-3 py-1.5 border transition-all cursor-pointer text-[11px] sm:text-xs min-h-[36px] sm:min-h-0 flex items-center ${
                  shotState === 'scout_pov'
                    ? 'border-[#C5A880] bg-[#1A1812] text-[#E6E0D1]'
                    : 'border-[#2A2A2E] bg-[#0A0A0D]/80 text-[#888] hover:text-[#E6E0D1]'
                }`}
              >
                GROUND PERSPECTIVE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scene Scroll Prompt */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-10 pb-6 sm:pb-8 flex items-center justify-between font-mono text-[11px] sm:text-xs text-[#8C897F] border-t border-[#1C1C20]/80 pt-3 sm:pt-4">
        <span className="tracking-widest uppercase text-[10px] sm:text-[11px] text-[#A6A295]">
          EXPLORE CONCENTRIC WALLS
        </span>

        <a
          href="#walls"
          className="flex items-center gap-2 hover:text-[#E6E0D1] transition-colors cursor-pointer group py-1"
          id="hero-scroll-prompt"
        >
          <span className="tracking-widest uppercase text-[10px] sm:text-[11px] group-hover:translate-y-0.5 transition-transform">
            SCROLL TO EXPLORE
          </span>
          <ChevronDown className="w-4 h-4 text-[#6B7C6B] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
