import React, { useState } from 'react';
import { ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { ArrowUp, Maximize2, Shield, Flame, Activity } from 'lucide-react';

interface ScaleStage {
  id: string;
  name: string;
  height: string;
  meters: number;
  multiplier: number;
  image: string;
  description: string;
  threatLevel: string;
  tagColor: string;
}

const SCALE_STAGES: ScaleStage[] = [
  {
    id: 'human',
    name: 'HUMAN SCOUT',
    height: '1.7M',
    meters: 1.7,
    multiplier: 1,
    image: ASSETS.humanScoutOdm,
    description: 'Fragile biological frame reliant on compressed gas propulsion, high-carbon steel blades, and rapid aerial maneuvers.',
    threatLevel: 'BASE PREY',
    tagColor: 'text-[#6B7C6B] border-[#6B7C6B]/40 bg-[#6B7C6B]/10',
  },
  {
    id: 'attack',
    name: 'ATTACK TITAN',
    height: '15M',
    meters: 15,
    multiplier: 8.8,
    image: ASSETS.attackTitanRoar,
    description: 'Nearly 9 times human stature. Highly agile combat titan capable of demolishing stone masonry with bare hands and martial combat.',
    threatLevel: 'HIGH DISASTER',
    tagColor: 'text-[#C5A880] border-[#C5A880]/40 bg-[#C5A880]/10',
  },
  {
    id: 'wall',
    name: 'WALL MARIA PARAPET',
    height: '50M',
    meters: 50,
    multiplier: 29.4,
    image: ASSETS.wallsMonolith,
    description: 'Almost 30 times human height. Monolithic vertical barrier containing millions of hardened Colossal Titans within its mortar.',
    threatLevel: 'TITAN BASTION',
    tagColor: 'text-[#8C897F] border-[#8C897F]/40 bg-[#8C897F]/10',
  },
  {
    id: 'colossal',
    name: 'COLOSSAL TITAN',
    height: '60M',
    meters: 60,
    multiplier: 35.3,
    image: ASSETS.colossalTitan,
    description: 'Over 35 times human height. Peeks over the 50-meter walls, generating nuclear-level transformation blasts and superheated steam.',
    threatLevel: 'TACTICAL CATACLYSM',
    tagColor: 'text-[#E65C5C] border-[#E65C5C]/40 bg-[#E65C5C]/10',
  },
  {
    id: 'founding',
    name: 'FOUNDING TITAN (RUMBLING)',
    height: '200M+',
    meters: 200,
    multiplier: 117.6,
    image: ASSETS.rumblingFounding,
    description: 'Over 117 times the human body. A skeletal titan stretching hundreds of meters into the stratosphere leading the world-ending Rumbling.',
    threatLevel: 'GLOBAL EXTINCTION',
    tagColor: 'text-[#FF3333] border-[#FF3333]/50 bg-[#FF3333]/15',
  },
];

export const TitanScaleSection: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('founding');

  const activeStage = SCALE_STAGES.find((s) => s.id === selectedStageId) || SCALE_STAGES[0];

  const handleSelectStage = (stage: ScaleStage) => {
    setSelectedStageId(stage.id);
    if (stage.meters >= 60) {
      soundEngine.triggerSteamHiss();
      soundEngine.triggerThump(35, 0.2, 0.5);
    } else {
      soundEngine.triggerBladeWhoosh();
    }
  };

  return (
    <section id="scale" className="relative w-full bg-[#070709] py-16 sm:py-24 px-4 sm:px-6 md:px-10 select-none border-t border-[#1C1C20]">
      {/* Background Subtle Grid & Elevation Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(255,255,255,0.02)_100%)] bg-[length:100%_40px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E1E22] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C5A880] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.25em] uppercase">
                VERTICAL ELEVATION ARCHITECTURE • COMPARATIVE MASS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#E6E0D1]">
              THE SCALE OF TERROR
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#C5A880]">
            <ArrowUp className="w-4 h-4 text-[#6B7C6B]" />
            <span>VERTICAL ASCENT: 1.7M → 200M+</span>
          </div>
        </div>

        {/* Dynamic Dual-Column Vertical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Towering Vertical Elevation Monolith Visualizer */}
          <div className="lg:col-span-7 bg-[#0A0A0E] border border-[#222228] p-4 sm:p-6 rounded-sm relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#181820] font-mono text-[11px] text-[#8C897F]">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#C5A880]" /> ELEVATION MONOLITH CHART
              </span>
              <span>TRUE PROPORTIONAL SCALE</span>
            </div>

            {/* Vertical Ascending Stack */}
            <div className="relative space-y-3 sm:space-y-4">
              {SCALE_STAGES.map((stage, idx) => {
                const isSelected = stage.id === selectedStageId;
                const heightPercentage = Math.max(12, Math.min(100, (stage.meters / 200) * 100));

                return (
                  <div
                    key={stage.id}
                    onClick={() => handleSelectStage(stage)}
                    className={`group relative p-3 sm:p-4 border transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#14141C] border-[#C5A880] shadow-lg shadow-[#C5A880]/5 ring-1 ring-[#C5A880]/40'
                        : 'bg-[#0E0E12] border-[#1C1C22] hover:border-[#333] hover:bg-[#121218] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      
                      {/* Height Metric & Name */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`font-mono text-xs sm:text-sm font-black w-14 sm:w-16 py-1 text-center border ${
                          isSelected ? 'border-[#C5A880] text-[#E6E0D1] bg-[#221D14]' : 'border-[#2A2A30] text-[#888] bg-[#0A0A0C]'
                        }`}>
                          {stage.height}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-display font-bold text-sm sm:text-base text-[#E6E0D1]">
                              {stage.name}
                            </h4>
                            <span className={`hidden sm:inline-block font-mono text-[9px] px-1.5 py-0.5 border ${stage.tagColor}`}>
                              {stage.threatLevel}
                            </span>
                          </div>
                          <p className="font-mono text-[10px] text-[#777]">
                            {stage.multiplier}x Human Height ({stage.meters}m elevation)
                          </p>
                        </div>
                      </div>

                      {/* Select Indicator */}
                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`font-mono text-[10px] px-2 py-0.5 border transition-all ${
                          isSelected
                            ? 'border-[#C5A880] text-[#C5A880] bg-[#C5A880]/10'
                            : 'border-[#2A2A30] text-[#555] group-hover:text-[#AAA]'
                        }`}>
                          {isSelected ? 'INSPECTING' : 'VIEW'}
                        </span>
                      </div>
                    </div>

                    {/* Proportional Scale Bar */}
                    <div className="mt-3 w-full h-1.5 bg-[#08080A] rounded-full overflow-hidden border border-[#1A1A20]">
                      <div
                        className={`h-full transition-all duration-500 ${
                          isSelected ? 'bg-gradient-to-r from-[#6B7C6B] via-[#C5A880] to-[#E65C5C]' : 'bg-[#333] group-hover:bg-[#555]'
                        }`}
                        style={{ width: `${heightPercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scale Baseline Info */}
            <div className="mt-4 pt-3 border-t border-[#181820] flex items-center justify-between font-mono text-[10px] text-[#666]">
              <span>ELEVATION DATUM: 0.0M SEA LEVEL</span>
              <span className="text-[#C5A880]">MAX ELEVATION: 200M+ STRATOSPHERE</span>
            </div>
          </div>

          {/* Right Column: Detailed Selected Entity Dossier & Artwork */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0A0A0E] border border-[#222228] p-5 sm:p-6 rounded-sm relative overflow-hidden shadow-2xl space-y-4">
              
              {/* Artwork Box with Dynamic Atmospheric Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/11] bg-black overflow-hidden border border-[#1C1C22] group rounded-sm">
                <img
                  src={activeStage.image}
                  alt={activeStage.name}
                  className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 font-mono text-xs bg-black/80 px-2.5 py-1 border border-[#333] text-[#E6E0D1] flex items-center gap-1.5 backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{activeStage.height} ELEVATION</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <span className={`font-mono text-[10px] px-2 py-0.5 border backdrop-blur-md uppercase ${activeStage.tagColor}`}>
                    {activeStage.threatLevel}
                  </span>
                  <span className="font-display font-black text-3xl sm:text-4xl text-[#E6E0D1] drop-shadow-md">
                    {activeStage.height}
                  </span>
                </div>
              </div>

              {/* Entity Information */}
              <div className="space-y-3 pt-1">
                <div>
                  <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-widest uppercase block">
                    CLASSIFICATION REPORT
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-[#E6E0D1]">
                    {activeStage.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
                  {activeStage.description}
                </p>

                {/* Detailed Metric Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1C1C22] font-mono text-xs">
                  <div className="p-2.5 bg-[#101014] border border-[#1C1C22]">
                    <span className="text-[#666] block text-[10px]">SCALE MULTIPLIER</span>
                    <span className="text-[#C5A880] font-bold text-sm">{activeStage.multiplier}x Human</span>
                  </div>
                  <div className="p-2.5 bg-[#101014] border border-[#1C1C22]">
                    <span className="text-[#666] block text-[10px]">TOTAL HEIGHT</span>
                    <span className="text-[#E6E0D1] font-bold text-sm">{activeStage.height}</span>
                  </div>
                </div>

                {/* Tactical Comparison Warning */}
                <div className="p-3 bg-[#120F0D] border border-[#3A2814] flex items-start gap-2.5 font-mono text-[11px] text-[#D8C2A0]">
                  <Flame className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                  <p className="leading-tight">
                    {activeStage.meters >= 50
                      ? 'Requires specialized anti-titan artillery or Thunder Spear volley to pierce defenses.'
                      : 'Standard vertical maneuvering equipment with high-carbon steel blades is effective.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
