import React, { useState } from 'react';
import { ASSETS } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Crosshair, Zap, Shield, Flame, Activity, Disc } from 'lucide-react';

const GEAR_MODULES = [
  {
    id: 'gas-unit',
    name: 'ICEBURST GAS PROPULSION CANISTERS',
    category: 'PROPULSION DYNAMICS',
    japaneseName: '氷爆ガス高圧ボンベ',
    description: 'Dual compressed gas cylinders forged from rare Iceburst stone extracted from the deep Paradis caverns. Emits directional bursts through dual-thrust nozzles to slingshot soldiers across 3D vector axes.',
    tacticalRole: 'High-speed acceleration, mid-air vector reorientation, and gravitational inertia counteraction.',
    specs: { pressure: '240 BAR', capacity: '18 BURSTS', weight: '8.4 KG' },
  },
  {
    id: 'blades',
    name: 'HIGH-CARBON ULTIMATE STEEL BLADES',
    category: 'MELEE SEVERING',
    japaneseName: '超硬質ブレード',
    description: 'Segmented snap-on sword blades forged from high-carbon ultimate steel. Elastic yet razor-sharp, engineered specifically to slice through the rubbery, regenerative flesh of Titan napes (1m wide by 10cm deep).',
    tacticalRole: 'Severing cervical nerves at the nape of humanoid and abnormal Titans before flesh heals.',
    specs: { alloy: 'ULTIMATE STEEL', length: '88 CM', edgeLife: '3-4 KILLS' },
  },
  {
    id: 'grapple-winch',
    name: 'PNEUMATIC WIRE WINCH & HARPOONS',
    category: 'KINETIC TRAVERSAL',
    japaneseName: '射出装置・ワイヤー巻取機',
    description: 'Twin high-tensile wire spools connected to steel-tipped anchor pitons. Fired using pneumatic pressure into brick facades, tree barks, or Titan musculature, with internal high-torque turbine recoil.',
    tacticalRole: 'Anchoring and swinging around giant tree trunks and titan limbs at speeds exceeding 70 km/h.',
    specs: { wireLength: '65 METERS', tensileStrength: '1,200 KG', motorSpeed: '4,500 RPM' },
  },
  {
    id: 'thunder-spears',
    name: 'ANTI-ARMOR THUNDER SPEARS',
    category: 'EXPLOSIVE ORDNANCE',
    japaneseName: '雷槍 (RAISOU)',
    description: 'Rocket-propelled explosive spears mounted on forearm braces. Designed specifically to puncture and shatter the hardened crystalline armor of the Armored Titan before detonating internally via fuze wire.',
    tacticalRole: 'Penetrating hardened crystal armor plate and destroying fortified defense structures.',
    specs: { explosiveYield: 'HIGH TNT EQUIVALENT', range: '35 METERS', trigger: 'FUZE PIN' },
  },
];

export const SurveyCorpsArchive: React.FC = () => {
  const [activeGearIndex, setActiveGearIndex] = useState(0);
  const [isFiring, setIsFiring] = useState(false);

  const activeGear = GEAR_MODULES[activeGearIndex];

  const handleTestTrigger = () => {
    setIsFiring(true);
    soundEngine.triggerThump(30, 0.2, 0.5);
    soundEngine.triggerSteamHiss();
    soundEngine.triggerBladeWhoosh();

    setTimeout(() => {
      setIsFiring(false);
    }, 500);
  };

  const handleSelectModule = (index: number) => {
    setActiveGearIndex(index);
    soundEngine.triggerBladeWhoosh();
  };

  return (
    <section id="arsenal" className="relative w-full bg-[#060608] py-16 sm:py-24 px-4 sm:px-6 md:px-10 select-none border-t border-[#1C1C20]">
      {/* Blueprint Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#141418_1px,transparent_1px),linear-gradient(to_bottom,#141418_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#1E1E22] pb-6 gap-4">
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6B7C6B] shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs text-[#8C897F] tracking-[0.25em] uppercase">
                COMBAT ARSENAL • TACTICAL BLUEPRINTS & SCHEMATICS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#E6E0D1]">
              3D MANEUVER GEAR
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#C5A880] shrink-0">
            <Crosshair className="w-4 h-4 text-[#6B7C6B]" />
            <span>SCOUT CORPS COMBAT PROTOCOLS</span>
          </div>
        </div>

        {/* Blueprint Module Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {GEAR_MODULES.map((gear, idx) => {
            const isSelected = idx === activeGearIndex;
            return (
              <button
                key={gear.id}
                onClick={() => handleSelectModule(idx)}
                className={`p-4 text-left border transition-all duration-300 cursor-pointer rounded-sm flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#101612] border-[#10b981] shadow-xl ring-1 ring-[#10b981]/40'
                    : 'bg-[#09090C] border-[#1C1C22] hover:border-[#333] hover:bg-[#0E0E12] opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1A1A20] font-mono text-[10px]">
                  <span className="text-[#8C897F]">MODULE 0{idx + 1}</span>
                  <span className={isSelected ? 'text-[#34d399] font-bold' : 'text-[#666]'}>
                    {gear.category.split(' ')[0]}
                  </span>
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-[#E6E0D1] leading-tight">
                  {gear.name}
                </h3>
                <span className="font-editorial text-xs text-[#C5A880] mt-1">
                  {gear.japaneseName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Technical Schematic Drafting Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#08080C] border border-[#222228] p-5 sm:p-8 rounded-sm shadow-2xl">
          
          {/* Visual Artwork & Test Trigger Frame */}
          <div className="lg:col-span-6 relative aspect-[16/10] bg-black overflow-hidden border border-[#1C1C22] rounded-sm group">
            <img
              src={ASSETS.scoutOdmAction}
              alt={activeGear.name}
              className="w-full h-full object-cover filter contrast-125 brightness-95 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

            {/* Test Trigger Blast Overlay */}
            {isFiring && (
              <div className="absolute inset-0 bg-red-900/40 animate-pulse pointer-events-none" />
            )}

            <div className="absolute top-3 left-3 font-mono text-xs bg-black/80 px-2.5 py-1 border border-[#333] text-[#E6E0D1] backdrop-blur-sm">
              {activeGear.category}
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
              <span className="font-editorial text-sm sm:text-base text-[#C5A880]">
                {activeGear.japaneseName}
              </span>
              <button
                onClick={handleTestTrigger}
                className="px-3.5 py-1.5 bg-[#7A1E1E] hover:bg-[#962525] border border-[#A83232] text-xs font-mono text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-lg min-h-[36px]"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>TEST FIRING TRIGGER</span>
              </button>
            </div>
          </div>

          {/* Technical Specs & Blueprint Description */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="font-mono text-xs text-[#8C897F] tracking-widest uppercase block">
                SCHEMATIC BREAKDOWN • MODULE 0{activeGearIndex + 1}
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#E6E0D1] mt-0.5">
                {activeGear.name}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
              {activeGear.description}
            </p>

            {/* Tactical Role */}
            <div className="p-3.5 bg-[#101014] border border-[#222228] space-y-1">
              <span className="font-mono text-[11px] text-[#C5A880] tracking-wider uppercase block flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#10b981]" /> COMBAT ROLE:
              </span>
              <p className="text-xs text-[#D0CBC0] font-sans">
                {activeGear.tacticalRole}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1C1C22] font-mono text-xs">
              {Object.entries(activeGear.specs).map(([key, val]) => (
                <div key={key} className="p-2.5 bg-[#0E0E12] border border-[#1C1C22]">
                  <span className="text-[#666] block text-[10px] uppercase">{key}</span>
                  <span className="text-[#E6E0D1] font-bold text-xs">{val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
