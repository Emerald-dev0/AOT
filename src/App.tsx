import React, { useState } from 'react';
import { FilmHUD } from './components/FilmHUD';
import { AtmosphericCanvas } from './components/AtmosphericCanvas';
import { HeroSection } from './components/HeroSection';
import { WallSection } from './components/WallSection';
import { TitanSection } from './components/TitanSection';
import { TitanScaleSection } from './components/TitanScaleSection';
import { CharacterArchive } from './components/CharacterArchive';
import { SurveyCorpsArchive } from './components/SurveyCorpsArchive';
import { WorldJourney } from './components/WorldJourney';
import { StoryTimeline } from './components/StoryTimeline';
import { FreedomSection } from './components/FreedomSection';
import { Footer } from './components/Footer';

export default function App() {
  const [isSpoilerSafe, setIsSpoilerSafe] = useState(true);

  return (
    <div className="min-h-screen bg-[#050507] text-[#E6E0D1] selection:bg-[#7A1E1E] selection:text-white relative">
      {/* Living Atmospheric Particles (Embers, Ash, Fog) */}
      <AtmosphericCanvas />

      {/* Navigation HUD */}
      <FilmHUD />

      {/* Main Experience Stream */}
      <main className="w-full relative z-10">
        {/* Chapter 01: The Breach */}
        <HeroSection />

        {/* Chapter 02: The 50M Walls (Concentric Penetration Runway) */}
        <WallSection />

        {/* Chapter 03: The Nine Titans (3D Isometric Parallax Ribbon) */}
        <TitanSection isSpoilerSafe={isSpoilerSafe} />

        {/* Chapter 04: Size Comparison (Stepped Ascending Scale Continuum) */}
        <TitanScaleSection />

        {/* Chapter 05: The Soldiers (Dual-Track Scout Dossiers) */}
        <CharacterArchive />

        {/* Chapter 06: 3D Maneuver Gear (Exploded Blueprint Runway) */}
        <SurveyCorpsArchive />

        {/* Chapter 07: World Territories (Expedition Cartography Panorama) */}
        <WorldJourney />

        {/* Chapter 08: Story Timeline (Historical Chronology) */}
        <StoryTimeline
          isSpoilerSafe={isSpoilerSafe}
          setIsSpoilerSafe={setIsSpoilerSafe}
        />

        {/* Chapter 09: The Final Horizon (Epilogue) */}
        <FreedomSection />
      </main>

      {/* Footer Archive */}
      <Footer />
    </div>
  );
}
