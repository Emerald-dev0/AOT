import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#050505] text-[#8C897F] border-t border-[#18181A] py-12 sm:py-16 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-[#141416]">
          <div>
            <div className="flex items-center gap-2 text-[#E6E0D1] font-display text-lg tracking-widest mb-1">
              ATTACK ON TITAN
            </div>
            <p className="text-[#666] text-xs font-sans">
              進撃の巨人 • HAJIME ISAYAMA TRIBUTE ARCHIVE
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Designed by Emerald Link with high contrast */}
            <a
              href="https://emerald.pxxl.click"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#021f14] hover:bg-[#053322] border border-[#10b981] hover:border-[#34d399] text-[#e6fbf3] hover:text-white rounded-sm transition-all duration-200 shadow-md group cursor-pointer"
              id="designed-by-emerald"
            >
              <span className="tracking-wider font-semibold text-xs">
                Designed by <span className="text-[#34d399] group-hover:text-[#6ee7b7] font-bold underline underline-offset-2 decoration-[#10b981]">Emerald</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#34d399] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0E0E10] hover:bg-[#161619] border border-[#222] hover:border-[#444] text-[#E6E0D1] transition-colors cursor-pointer"
            >
              <span>RETURN TO CREST</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#8C897F]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#555] font-sans">
          <p className="max-w-2xl leading-relaxed">
            An unofficial, non-profit artistic tribute and interactive exhibition. All Attack on Titan (進撃の巨人) concepts, characters, and imagery belong to Hajime Isayama, Kodansha, Wit Studio, and MAPPA.
          </p>
          <div className="font-mono text-[#444] text-[10px] whitespace-nowrap">
            PARADIS ARCHIVE • 845-854
          </div>
        </div>
      </div>
    </footer>
  );
};


