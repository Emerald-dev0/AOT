import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEngine';

const CHAPTERS = [
  { id: 'hero', title: 'THE BREACH', label: '01' },
  { id: 'walls', title: 'THE 50M WALLS', label: '02' },
  { id: 'titans', title: 'THE NINE TITANS', label: '03' },
  { id: 'scale', title: 'SIZE COMPARISON', label: '04' },
  { id: 'soldiers', title: 'THE SOLDIERS', label: '05' },
  { id: 'arsenal', title: 'MANEUVER GEAR', label: '06' },
  { id: 'world', title: 'WORLD TERRITORIES', label: '07' },
  { id: 'timeline', title: 'STORY TIMELINE', label: '08' },
  { id: 'freedom', title: 'FINAL HORIZON', label: '09' },
];

export const FilmHUD: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress(totalScroll > 0 ? currentScroll / totalScroll : 0);

      const sectionEls = CHAPTERS.map((c) => ({
        id: c.id,
        el: document.getElementById(c.id),
      }));

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const item = sectionEls[i];
        if (item.el && item.el.offsetTop <= scrollPos) {
          setActiveChapter(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      soundEngine.triggerThump(55, 0.08, 0.2);
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const currentChapterObj = CHAPTERS.find((c) => c.id === activeChapter) || CHAPTERS[0];

  return (
    <>
      {/* Top minimal progress bar line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-black/40 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#6B7C6B] via-[#C5A880] to-[#7A1E1E] transition-all duration-150"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
        />
      </div>

      {/* Floating ultra-minimal HUD at bottom-left */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-4 font-mono text-[10px] sm:text-[11px] select-none">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="group flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1.5 bg-[#0A0A0C]/90 hover:bg-[#141418] border border-[#222]/80 hover:border-[#444] backdrop-blur-md text-[#E6E0D1] transition-all cursor-pointer shadow-lg"
          title="Chapters Index"
        >
          <span className="text-[#6B7C6B] font-bold">{currentChapterObj.label}</span>
          <span className="text-[#555]">•</span>
          <span className="tracking-widest uppercase text-[#B5B0A4] group-hover:text-white transition-colors max-w-[130px] sm:max-w-none truncate">
            {currentChapterObj.title}
          </span>
          <span className="text-[9px] text-[#666] ml-0.5 sm:ml-1 opacity-60 group-hover:opacity-100">
            {isMenuOpen ? '▲' : '▼'}
          </span>
        </button>
      </div>

      {/* Contextual Chapter Drawer */}
      {isMenuOpen && (
        <div
          className="fixed bottom-14 sm:bottom-18 left-4 sm:left-6 z-40 bg-[#08080A]/95 border border-[#252528] backdrop-blur-xl p-3 sm:p-4 min-w-[240px] sm:min-w-[260px] font-mono text-xs shadow-2xl space-y-1 sm:space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-200 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto"
          id="film-scene-drawer"
        >
          <div className="text-[10px] text-[#666] tracking-[0.2em] uppercase pb-2 mb-2 border-b border-[#1A1A1D] flex justify-between">
            <span>CHAPTER DIRECTORY</span>
            <span>09 CHAPTERS</span>
          </div>
          {CHAPTERS.map((chapter) => {
            const isActive = activeChapter === chapter.id;
            return (
              <button
                key={chapter.id}
                onClick={() => jumpTo(chapter.id)}
                className={`w-full text-left px-2.5 py-1.5 flex items-center justify-between transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#18181C] text-[#E6E0D1] border-l-2 border-[#6B7C6B]'
                    : 'text-[#888] hover:text-[#D0CBC0] hover:bg-[#101012]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={isActive ? 'text-[#6B7C6B] font-bold' : 'text-[#555]'}>
                    {chapter.label}
                  </span>
                  <span className="tracking-wider">{chapter.title}</span>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#6B7C6B]" />}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};
