import React, { useState } from 'react';
import { LOCATIONS_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { MapPin, Compass, Maximize2, Flag, Globe } from 'lucide-react';

export const WorldJourney: React.FC = () => {
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [isPanoramicZoom, setIsPanoramicZoom] = useState(false);

  const activeLoc = LOCATIONS_DATA[activeLocationIndex];

  const handleSelectLocation = (idx: number) => {
    setActiveLocationIndex(idx);
    soundEngine.triggerBladeWhoosh();
  };

  const toggleZoom = () => {
    setIsPanoramicZoom(!isPanoramicZoom);
    soundEngine.triggerThump(35, 0.1, 0.3);
  };

  return (
    <section id="world" className="relative w-full bg-[#060608] py-16 sm:py-24 px-4 sm:px-6 md:px-10 select-none border-t border-[#1C1C20]">
      {/* Background Topographical Ambience */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20">
        <img
          src={activeLoc.image}
          alt="Territory Texture"
          className="w-full h-full object-cover filter blur-2xl saturate-125 scale-125 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#060608]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E1E22] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.25em] uppercase">
                EXPEDITION CARTOGRAPHY • BEYOND THE 50-METER WALLS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#E6E0D1]">
              TERRITORIES & THE HORIZON
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#C5A880] shrink-0">
            <Globe className="w-4 h-4 text-[#C5A880]" />
            <span>GLOBAL TOPOGRAPHY</span>
          </div>
        </div>

        {/* Territory Tactical Pin Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
          {LOCATIONS_DATA.map((loc, idx) => {
            const isSelected = idx === activeLocationIndex;
            return (
              <button
                key={loc.id}
                onClick={() => handleSelectLocation(idx)}
                className={`group relative p-3 text-left border transition-all duration-300 cursor-pointer rounded-sm flex flex-col justify-between h-28 sm:h-32 overflow-hidden ${
                  isSelected
                    ? 'bg-[#1C1810] border-[#C5A880] shadow-xl ring-1 ring-[#C5A880]/50'
                    : 'bg-[#0A0A0E] border-[#1C1C22] hover:border-[#333] hover:bg-[#121218] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="relative z-10 font-mono text-[10px] flex justify-between">
                  <span className={isSelected ? 'text-[#C5A880] font-bold' : 'text-[#666]'}>0{idx + 1}</span>
                  <span className="text-[#888] truncate ml-1">{loc.region.split(' ')[0]}</span>
                </div>

                <div className="relative z-10">
                  <h4 className="font-display font-black text-sm sm:text-base text-[#E6E0D1] leading-tight line-clamp-1">
                    {loc.name}
                  </h4>
                  <span className="font-editorial text-xs text-[#C5A880] block mt-0.5 line-clamp-1">
                    {loc.japaneseName}
                  </span>
                </div>

                {/* Subdued location bg */}
                <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-40 transition-opacity">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover filter contrast-125"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Territory Panoramic View & Intelligence Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#09090D] border border-[#222228] p-5 sm:p-8 rounded-sm shadow-2xl">
          
          {/* Territory Image with Zoom Option */}
          <div className="lg:col-span-7 relative aspect-[16/10] bg-black overflow-hidden border border-[#1C1C22] rounded-sm group">
            <img
              src={activeLoc.image}
              alt={activeLoc.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPanoramicZoom ? 'scale-125 contrast-140' : 'scale-100 contrast-125 group-hover:scale-105'
              }`}
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

            {/* Overlays */}
            <div className="absolute top-3 left-3 font-mono text-xs bg-black/80 px-2.5 py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1.5 backdrop-blur-sm">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{activeLoc.region}</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="font-editorial text-sm sm:text-base text-[#C5A880]">
                {activeLoc.japaneseName}
              </span>
              <button
                onClick={toggleZoom}
                className="px-3 py-1 bg-black/80 hover:bg-[#1A1A20] border border-[#444] text-xs font-mono text-[#E6E0D1] flex items-center gap-1.5 transition-all cursor-pointer shadow-md min-h-[34px]"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{isPanoramicZoom ? 'RESET VIEW' : 'EXPAND PANORAMA'}</span>
              </button>
            </div>
          </div>

          {/* Territory Intel Dossier */}
          <div className="lg:col-span-5 space-y-4">
            <div>
              <span className="font-mono text-xs text-[#8C897F] tracking-widest uppercase block">
                REGION INTEL REPORT • 0{activeLocationIndex + 1}
              </span>
              <h3 className="font-display font-black text-3xl sm:text-4xl text-[#E6E0D1] mt-0.5">
                {activeLoc.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
              {activeLoc.description}
            </p>

            {/* Historical Impact Callout */}
            <div className="p-3.5 bg-[#12100C] border border-[#30261A] space-y-1">
              <span className="font-mono text-[11px] text-[#C5A880] tracking-wider uppercase block flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-[#C5A880]" /> HISTORICAL IMPACT:
              </span>
              <p className="text-xs text-[#D8C9B5] font-sans">
                {activeLoc.significance}
              </p>
            </div>

            {/* Strategic Notes */}
            <div className="pt-2 border-t border-[#1C1C22] flex items-center justify-between font-mono text-xs text-[#8C897F]">
              <span>REGION: {activeLoc.region}</span>
              <span className="text-[#C5A880]">STATUS: DOCUMENTED</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
