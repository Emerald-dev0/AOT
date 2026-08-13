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
      <AtmosphericCanvas />
      <FilmHUD />

      <main className="w-full relative z-10">
        <HeroSection />
        <WallSection />
        <TitanSection isSpoilerSafe={isSpoilerSafe} />
        <TitanScaleSection />
        <CharacterArchive />
        <SurveyCorpsArchive />
        <WorldJourney />
        <StoryTimeline
          isSpoilerSafe={isSpoilerSafe}
          setIsSpoilerSafe={setIsSpoilerSafe}
        />
        <FreedomSection />
      </main>

      <Footer />
    </div>
  );
}
