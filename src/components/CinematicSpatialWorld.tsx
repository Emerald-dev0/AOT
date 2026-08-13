import React, { useRef, useState, useEffect } from 'react';
import { ASSETS, TITANS_DATA, CHARACTERS_DATA, LOCATIONS_DATA, TIMELINE_DATA } from '../data/aotData';
import { soundEngine } from '../utils/soundEngine';
import { Eye, Shield, Compass, ChevronRight, Maximize2 } from 'lucide-react';

interface CinematicSpatialWorldProps {
  isSpoilerSafe: boolean;
  setIsSpoilerSafe: (val: boolean) => void;
}

export const CinematicSpatialWorld: React.FC<CinematicSpatialWorldProps> = ({
  isSpoilerSafe,
  setIsSpoilerSafe,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeZone, setActiveZone] = useState('walls');
  const [unsealWall, setUnsealWall] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.scrollHeight - window.innerHeight;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      targetProgress = rawProgress;
    };

    const updateLoop = () => {
      // Smooth lerp for physical camera inertia
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0001) {
        currentProgress += diff * 0.12;
        setProgress(currentProgress);

        // Update active zone based on progress ranges
        if (currentProgress < 0.2) setActiveZone('walls');
        else if (currentProgress < 0.42) setActiveZone('titans');
        else if (currentProgress < 0.6) setActiveZone('scale');
        else if (currentProgress < 0.78) setActiveZone('vanguard');
        else if (currentProgress < 0.92) setActiveZone('paths');
        else setActiveZone('chronicles');
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute camera translation along a non-linear spatial path
  // World width is 600vw. Camera traverses X from 0vw to -500vw.
  const cameraX = -progress * 500; // in vw

  // Vertical camera bob and zoom curves creating rhythm (acceleration, focal pauses, dives)
  const getCameraTransform = () => {
    let zoom = 1.0;
    let translateY = 0;
    let rotateZ = 0;

    // Zone 1: Wall Maria - dramatic push into the monolith crack
    if (progress > 0.08 && progress < 0.18) {
      const p = (progress - 0.08) / 0.1;
      const arc = Math.sin(p * Math.PI);
      zoom = 1.0 + arc * 0.25;
      translateY = arc * -30;
      rotateZ = (p - 0.5) * 1.5;
    }
    // Zone 2: Titan Metamorphosis - dynamic swoops between shifters
    else if (progress >= 0.18 && progress < 0.42) {
      const p = (progress - 0.18) / 0.24;
      const arc = Math.sin(p * Math.PI * 2);
      zoom = 1.05 + Math.sin(p * Math.PI) * 0.3;
      translateY = arc * 25;
      rotateZ = Math.cos(p * Math.PI * 2) * -1.8;
    }
    // Zone 3: Exponential Scale - upward camera tilt and pull back
    else if (progress >= 0.42 && progress < 0.6) {
      const p = (progress - 0.42) / 0.18;
      zoom = 1.25 - p * 0.35;
      translateY = p * -45;
      rotateZ = 0;
    }
    // Zone 4: Scout Aerial Airspace - high-speed dive and tilt
    else if (progress >= 0.6 && progress < 0.78) {
      const p = (progress - 0.6) / 0.18;
      zoom = 1.0 + Math.sin(p * Math.PI) * 0.2;
      translateY = Math.cos(p * Math.PI * 3) * 20;
      rotateZ = Math.sin(p * Math.PI * 2) * 2.2;
    }
    // Zone 5: The Coordinate Realm - deep plunge into glowing paths
    else if (progress >= 0.78 && progress < 0.92) {
      const p = (progress - 0.78) / 0.14;
      zoom = 1.1 + Math.sin(p * Math.PI) * 0.3;
      translateY = (p - 0.5) * 35;
      rotateZ = (p - 0.5) * -1.5;
    }
    // Zone 6: Chronicles - smooth glide
    else if (progress >= 0.92) {
      zoom = 1.0;
      translateY = 0;
      rotateZ = 0;
    }

    return {
      transform: `scale3d(${zoom}, ${zoom}, 1) translate3d(0px, ${translateY}px, 0px) rotate3d(0, 0, 1, ${rotateZ}deg)`,
      transformOrigin: 'center center',
    };
  };

  const toggleWallUnseal = () => {
    setUnsealWall(!unsealWall);
    soundEngine.triggerThump(40, 0.15, 0.4);
    soundEngine.triggerSteamHiss();
  };

  return (
    <div
      ref={containerRef}
      id="cinematic-world-stage"
      className="relative h-[650vh] w-full bg-[#050507]"
    >
      {/* Sticky Cinematic Viewport — The Virtual Camera Window */}
      <div className="sticky top-0 h-screen w-full overflow-hidden select-none">
        
        {/* Layer 0: Deep Far Background (Parallax Speed 0.25x) */}
        <div
          className="absolute inset-0 w-[600vw] h-full pointer-events-none will-change-transform"
          style={{
            transform: `translate3d(${cameraX * 0.25}vw, 0px, 0px)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#0D0B0E] via-[#0E0B09] via-[#090D10] to-[#08080A]" />
          {/* Subtle starfield / ambient mist bands */}
          <div className="absolute top-1/4 left-[380vw] w-[180vw] h-[60vh] bg-cyan-950/20 blur-3xl rounded-full" />
          <div className="absolute top-1/3 left-[80vw] w-[140vw] h-[50vh] bg-red-950/25 blur-3xl rounded-full" />
        </div>

        {/* Dynamic Camera Rig Frame */}
        <div
          className="relative w-full h-full will-change-transform transition-transform duration-75 ease-out"
          style={getCameraTransform()}
        >
          {/* Layer 1: Midground Continuous Spatial World Canvas (Speed 1.0x) */}
          <div
            className="absolute top-0 left-0 w-[600vw] h-full will-change-transform flex items-center"
            style={{
              transform: `translate3d(${cameraX}vw, 0px, 0px)`,
            }}
          >
            {/* ========================================================================= */}
            {/* SCENE 01 SPATIAL ANCHOR: THE 50M WALLS & MONOLITHIC MORTAR (0vw -> 90vw) */}
            {/* ========================================================================= */}
            <div className="relative w-[100vw] h-full shrink-0 flex items-center px-12">
              {/* Asymmetric Monolith Wall Image with X-Ray Metamorphosis */}
              <div
                className="relative w-[65vw] max-w-[950px] aspect-[16/9] bg-black border border-[#222226] overflow-hidden shadow-2xl transition-all duration-700"
                style={{
                  transform: `translate3d(0, ${Math.sin(progress * 10) * 15}px, 0) rotate(-1deg)`,
                }}
              >
                <img
                  src={unsealWall ? ASSETS.colossalTitan : ASSETS.wallsMonolith}
                  alt="Concentric 50-meter Wall Rampart"
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    unsealWall
                      ? 'contrast-150 brightness-90 saturate-150 scale-105'
                      : 'contrast-125 brightness-85 scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* In-Frame Spatial Marker */}
                <div className="absolute top-5 left-5 font-mono text-xs bg-[#070709]/90 px-3.5 py-1.5 border border-[#333] text-[#E6E0D1] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7A1E1E] animate-ping" />
                  <span>WALL MARIA • 50M REVEAL</span>
                </div>

                <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="font-editorial text-sm text-[#C5A880] tracking-widest block">
                      三重の城壁 • MARIA • ROSE • SINA
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-5xl text-[#E6E0D1]">
                      {unsealWall ? 'TITAN CORE UNSEALED' : 'CONCENTRIC RAMPARTS'}
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#8C897F]">
                    {unsealWall ? 'MILLIONS SLEEPING WITHIN' : 'STONE MORTAR BARRIER'}
                  </span>
                </div>
              </div>

              {/* Architectural Spatial Text Panel sitting at an offset coordinate */}
              <div className="ml-12 max-w-md space-y-4">
                <span className="font-mono text-xs text-[#8C897F] tracking-[0.3em] uppercase block">
                  SCENE 02 • DEFENSIVE ARCHITECTURE
                </span>
                <h2 className="font-display text-4xl sm:text-6xl text-[#E6E0D1] leading-none">
                  THE 50M CAGES
                </h2>
                <p className="text-xs sm:text-sm text-[#B5B0A4] font-light leading-relaxed font-sans">
                  Three concentric stone walls erected over a century ago to insulate mankind from the predatory Titans. A fragile peace bought with ignorance of what is hidden inside the masonry.
                </p>

                <button
                  onClick={toggleWallUnseal}
                  className={`px-4 py-2 font-mono text-xs border transition-all cursor-pointer flex items-center gap-2 ${
                    unsealWall
                      ? 'border-[#7A1E1E] bg-[#2A0E0E] text-[#FF9E9E]'
                      : 'border-[#333] bg-[#101012] text-[#A6A295] hover:border-[#6B7C6B] hover:text-[#E6E0D1]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#E65C5C]" />
                  <span>{unsealWall ? 'SEAL MASONRY CORE' : 'UNSEAL WALL MORTAR'}</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SCENE 02 SPATIAL ANCHOR: THE 9 TITANS METAMORPHOSIS (100vw -> 210vw)      */}
            {/* ========================================================================= */}
            <div className="relative w-[120vw] h-full shrink-0 flex items-center px-8">
              {/* Asymmetric Floating Titan Frames placed at different depths & coordinates */}

              {/* 1. Attack Titan (Large Foreground-Midground Shift) */}
              <div
                className="relative w-[48vw] max-w-[700px] aspect-[16/10] bg-black border border-[#222226] overflow-hidden shadow-2xl group shrink-0"
                style={{
                  transform: 'translate3d(0, -30px, 0) rotate(1.5deg)',
                }}
              >
                <img
                  src={ASSETS.attackTitanRoar}
                  alt="Attack Titan Roar"
                  className="w-full h-full object-cover filter contrast-130 brightness-95 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end pointer-events-none">
                  <div>
                    <span className="font-mono text-[11px] text-[#C5A880] tracking-widest block">
                      SHIFTER 01 • 15M CLASS
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E6E0D1]">
                      ATTACK TITAN
                    </h3>
                  </div>
                  <span className="font-editorial text-sm text-[#A6A295]">進撃の巨人</span>
                </div>
              </div>

              {/* 2. Colossal Titan (Higher Elevation, Shifted Right, Deep Scale) */}
              <div
                className="relative w-[42vw] max-w-[620px] aspect-[16/9] bg-black border border-[#331515] overflow-hidden shadow-2xl ml-8 shrink-0"
                style={{
                  transform: 'translate3d(0, 45px, 0) rotate(-2deg)',
                }}
              >
                <img
                  src={ASSETS.colossalTitan}
                  alt="Colossal Titan"
                  className="w-full h-full object-cover filter contrast-140 brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end pointer-events-none">
                  <div>
                    <span className="font-mono text-[11px] text-[#E65C5C] tracking-widest block">
                      SHIFTER 02 • 60M MONOLITH
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E6E0D1]">
                      COLOSSAL TITAN
                    </h3>
                  </div>
                  <span className="font-editorial text-sm text-[#A6A295]">超大型巨人</span>
                </div>
              </div>

              {/* Spatial Narrative Annotation */}
              <div className="ml-8 max-w-xs space-y-2 shrink-0">
                <span className="font-mono text-xs text-[#E65C5C] tracking-[0.3em] uppercase block">
                  SCENE 03 • THE NINE TITANS
                </span>
                <h3 className="font-display text-3xl text-[#E6E0D1]">
                  NINE SOULS OF YMIR
                </h3>
                <p className="text-xs text-[#A6A295] font-light leading-relaxed font-sans">
                  The genetic inheritance split across 2,000 years. Each bearer cursed to live only thirteen years after inheriting the power of the Titans.
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SCENE 03 SPATIAL ANCHOR: THE EXPONENTIAL SCALE CONTINUUM (220vw -> 320vw) */}
            {/* ========================================================================= */}
            <div className="relative w-[110vw] h-full shrink-0 flex items-center px-10">
              {/* Founding Titan & Rumbling Monolith Scale Comparison */}
              <div
                className="relative w-[65vw] max-w-[960px] aspect-[21/9] bg-black border border-[#222226] overflow-hidden shadow-2xl shrink-0"
                style={{
                  transform: 'translate3d(0, -20px, 0)',
                }}
              >
                <img
                  src={ASSETS.rumblingFounding}
                  alt="Founding Titan and The Rumbling"
                  className="w-full h-full object-cover filter contrast-140 brightness-85 saturate-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 pointer-events-none" />

                {/* Scale Comparison Overlay in 3D Space */}
                <div className="absolute top-4 left-5 font-mono text-xs bg-[#070709]/85 px-3 py-1.5 border border-[#333] text-[#E6E0D1] flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>SCALE CONTINUUM • 1.7M HUMAN → 200M+ GOD FRAME</span>
                </div>

                <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end pointer-events-none">
                  <div>
                    <span className="font-mono text-xs text-[#C5A880] tracking-widest uppercase block">
                      SCENE 04 • DIMENSIONAL SCALE
                    </span>
                    <h3 className="font-display font-black text-3xl sm:text-5xl text-[#E6E0D1]">
                      THE RUMBLING FOUNDING TITAN
                    </h3>
                  </div>
                  <span className="font-display font-black text-4xl sm:text-6xl text-[#6B7C6B]">
                    200M+
                  </span>
                </div>
              </div>

              {/* Dimensional Reference Box */}
              <div className="ml-10 max-w-sm space-y-3 font-mono text-xs shrink-0">
                <span className="text-[#8C897F] tracking-[0.2em] uppercase block">
                  PHYSICAL SCALE METRICS
                </span>
                <div className="space-y-2 border-t border-[#1C1C20] pt-3">
                  <div className="flex justify-between py-1 border-b border-[#141418]">
                    <span className="text-[#888]">SCOUT HUMAN FRAME</span>
                    <span className="text-[#E6E0D1]">1.70 M</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#141418]">
                    <span className="text-[#888]">ATTACK TITAN</span>
                    <span className="text-[#C5A880]">15.0 M</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#141418]">
                    <span className="text-[#888]">WALL MARIA PARAPET</span>
                    <span className="text-[#E6E0D1]">50.0 M</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[#141418]">
                    <span className="text-[#888]">COLOSSAL TITAN</span>
                    <span className="text-[#E65C5C]">60.0 M</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-[#888]">FOUNDING RUMBLING</span>
                    <span className="text-[#6B7C6B] font-bold">200M+ SKELETAL</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SCENE 04 SPATIAL ANCHOR: SURVEY CORPS 3D AIRSPACE (330vw -> 430vw)        */}
            {/* ========================================================================= */}
            <div className="relative w-[110vw] h-full shrink-0 flex items-center px-10">
              {/* Scout ODM Combat Aerial Action Shot */}
              <div
                className="relative w-[55vw] max-w-[800px] aspect-[16/10] bg-black border border-[#222226] overflow-hidden shadow-2xl shrink-0"
                style={{
                  transform: 'translate3d(0, 30px, 0) rotate(1deg)',
                }}
              >
                <img
                  src={ASSETS.scoutOdmAction}
                  alt="Survey Corps 3D Aerial Maneuver"
                  className="w-full h-full object-cover filter contrast-130 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

                <div className="absolute bottom-5 left-6 right-6 flex justify-between items-end pointer-events-none">
                  <div>
                    <span className="font-editorial text-sm text-[#C5A880] tracking-widest block">
                      自由の翼 • WINGS OF FREEDOM
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E6E0D1]">
                      SURVEY CORPS VANGUARD
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-[#6B7C6B]">
                    3D OMNI-DIRECTIONAL COMBAT
                  </span>
                </div>
              </div>

              {/* Character Spreads sitting beside in spatial rhythm */}
              <div className="ml-10 max-w-sm space-y-4 shrink-0">
                <span className="font-mono text-xs text-[#6B7C6B] tracking-[0.3em] uppercase block">
                  SCENE 05 • THE SOLDIERS
                </span>
                <blockquote className="border-l-2 border-[#6B7C6B] pl-4 font-editorial italic text-base text-[#E6E0D1]">
                  “If you don't fight, you can't win. Fight. Fight.”
                </blockquote>
                <p className="text-xs text-[#A6A295] font-light leading-relaxed font-sans">
                  Equipped with compressed gas propulsion harnesses and disposable ultrahard steel blades, the Survey Corps ventured into uncharted wilderness to discover the truth of this world.
                </p>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* SCENE 05 SPATIAL ANCHOR: THE PATHS & THE BOUNDLESS SEA (440vw -> 540vw)   */}
            {/* ========================================================================= */}
            <div className="relative w-[120vw] h-full shrink-0 flex items-center px-10">
              {/* 1. The Paths Infinite Coordinate Tree */}
              <div
                className="relative w-[50vw] max-w-[720px] aspect-[16/10] bg-black border border-[#162230] overflow-hidden shadow-2xl shrink-0"
                style={{
                  transform: 'translate3d(0, -35px, 0) rotate(-1.5deg)',
                }}
              >
                <img
                  src={ASSETS.pathsCoordinateTree}
                  alt="The Paths Infinite Coordinate Tree"
                  className="w-full h-full object-cover filter contrast-140 brightness-95"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end pointer-events-none">
                  <div>
                    <span className="font-mono text-[11px] text-[#6B9EBD] tracking-widest uppercase block">
                      SCENE 06 • METAPHYSICAL REALM
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E6E0D1]">
                      THE PATHS
                    </h3>
                  </div>
                  <span className="font-editorial text-sm text-[#8FB5CD]">道 • COORDINATE</span>
                </div>
              </div>

              {/* 2. The Endless Sea Shoreline (Match Cut adjacent) */}
              <div
                className="relative w-[48vw] max-w-[680px] aspect-[16/9] bg-black border border-[#202026] overflow-hidden shadow-2xl ml-8 shrink-0"
                style={{
                  transform: 'translate3d(0, 35px, 0) rotate(1deg)',
                }}
              >
                <img
                  src={ASSETS.theSeaShoreline}
                  alt="The Endless Sea Shoreline"
                  className="w-full h-full object-cover filter contrast-125 brightness-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 pointer-events-none" />

                <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end pointer-events-none">
                  <div>
                    <span className="font-mono text-[11px] text-[#C5A880] tracking-widest uppercase block">
                      SCENE 07 • THE OCEAN HORIZON
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-4xl text-[#E6E0D1]">
                      THE ENDLESS SEA
                    </h3>
                  </div>
                  <span className="font-editorial text-sm text-[#A6A295]">海 • FREEDOM'S REACH</span>
                </div>
              </div>

              {/* Shoreline Narrative Prompt */}
              <div className="ml-8 max-w-xs space-y-2 shrink-0">
                <span className="font-mono text-xs text-[#C5A880] tracking-[0.3em] uppercase block">
                  THE DISCOVERY
                </span>
                <p className="text-xs text-[#B5B0A4] font-light leading-relaxed font-sans">
                  “Hey... if we kill all our enemies over there... will we finally be free?”
                </p>
              </div>
            </div>

            {/* Buffer padding at the end of the canvas */}
            <div className="w-[20vw] shrink-0" />
          </div>

          {/* Layer 2: Fast Foreground Atmosphere Particles & Steel Glints (Speed 2.2x) */}
          <div
            className="absolute inset-0 w-[600vw] h-full pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(${cameraX * 2.2}vw, 0px, 0px)`,
            }}
          >
            {/* Flying masonry dust & steam ribbons crossing the lens */}
            <div className="absolute top-[20%] left-[45vw] w-[35vw] h-[40vh] bg-stone-500/10 blur-2xl rounded-full" />
            <div className="absolute top-[55%] left-[160vw] w-[45vw] h-[35vh] bg-red-600/10 blur-3xl rounded-full" />
            <div className="absolute top-[30%] left-[340vw] w-[40vw] h-[40vh] bg-emerald-500/10 blur-2xl rounded-full" />
            <div className="absolute top-[40%] left-[490vw] w-[50vw] h-[40vh] bg-cyan-400/10 blur-3xl rounded-full" />
          </div>
        </div>

        {/* Dynamic Film Lens HUD / Scene Coordinates */}
        <div className="absolute bottom-6 right-8 z-30 font-mono text-xs text-[#8C897F] flex items-center gap-4 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C6B] animate-ping" />
            <span className="text-[#E6E0D1] uppercase tracking-widest font-bold">
              CAMERA TRACK: {activeZone.toUpperCase()}
            </span>
          </div>
          <span className="text-[#555]">•</span>
          <span>POSITION {Math.round(progress * 100)}%</span>
        </div>
      </div>
    </div>
  );
};
