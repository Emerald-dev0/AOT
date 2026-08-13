import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#050507] text-[#7A776F] border-t border-[#18181C] py-10 sm:py-14 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-[#141418]">
          <div className="flex items-center gap-3">
            <span className="font-display tracking-[0.2em] text-[#E6E0D1] text-sm font-bold">
              ATTACK ON TITAN
            </span>
            <span className="text-[#444]">/</span>
            <span className="text-[#8C897F] text-[11px] tracking-wider uppercase">
              進撃の巨人
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://emerald.pxxl.click"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#999] hover:text-[#E6E0D1] transition-colors duration-200 tracking-wider text-[11px] group cursor-pointer"
              id="designed-by-emerald"
            >
              Designed by{' '}
              <span className="text-[#C5A880] group-hover:text-white underline underline-offset-4 decoration-[#C5A880]/50 transition-colors">
                Emerald
              </span>
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#888] hover:text-[#E6E0D1] transition-colors duration-200 text-[11px] tracking-wider uppercase cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 text-[#666] group-hover:text-[#E6E0D1]" />
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#555]">
          <p className="text-center sm:text-left">
            Unofficial tribute archive. All characters, mythology, and assets © Hajime Isayama / Kodansha / WIT Studio / MAPPA.
          </p>
          <div className="text-[#444] tracking-widest uppercase">
            PARADIS ARCHIVE
          </div>
        </div>
      </div>
    </footer>
  );
};
