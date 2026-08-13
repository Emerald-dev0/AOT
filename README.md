# Attack on Titan — Cinematic Interactive Experience
> *An image-first, motion-driven interactive visual exploration of scale, terror, human resilience, and freedom in the universe of Hajime Isayama’s Attack on Titan (進撃の巨人).*

---

## 1. Project Overview & Concept

This project is a bespoke web experience engineered to test the limits of modern web animation, responsive art direction, and cinematic storytelling. Rather than building a traditional anime wiki or a generic SaaS-like landing page with rigid card grids and promotional buttons, this project is built from the ground up as a **continuous, living digital cinema piece that happens to run in a browser**.

The visual philosophy places **imagery as the primary content**, **motion as the connective language**, and the **camera as the primary navigation system**.

---

## 2. Design Philosophy: The "Anti-Slop" Standard

Traditional web templates rely on predictable clichés: 3-column identical card grids, glowing purple-to-blue neon gradients, oversized generic "Get Started" buttons, and text-heavy wiki sidebars. 

This project strictly rejects those patterns in favor of:
- **Image Dominance**: Every visual frame carries emotional narrative weight. Typography exists to frame and support the visuals rather than crowd them out.
- **Continuous Motion Hierarchy**: Motion is always alive, divided into distinct speed bands:
  - *Background*: Subdued parallax and slow atmospheric breathing.
  - *Atmosphere*: Dynamic canvas particles rendering floating ash, rising embers, and steam wisps.
  - *Primary Visual Stage*: Scroll-controlled camera tracking, focal-length zooms, and perspective shifts.
  - *Typography & Data*: Minimal timecodes, architectural radii, and Japanese editorial subtitles.
  - *Transitions*: Match cuts, blade-slash wipes, and X-Ray metamorphism.
- **Subtle, Non-Intrusive HUD**: The interface chrome is virtually invisible. Navigation is contextual, driven by scroll position, chapter timecodes, and subtle audio cues.

---

## 3. Cinematic Scene Architecture

The experience progresses as an unbroken visual sequence across 8 dedicated scenes:

1. **Scene 01 // The Breach (Paradis Era 845)**:
   - Full-bleed panoramic opening featuring the Colossal Titan breaching Wall Maria.
   - Interactive camera director allowing users to switch between *Wide Rampart*, *Focal Eye / Steam*, and *Scout 50m Vertical* perspectives.
   - Multi-layered heat haze, floating ash particles, and live Web Audio steam roar acoustics.

2. **Scene 02 // The 50M Concentric Walls (Defensive Architecture)**:
   - High-contrast architectural breakdown of Wall Maria, Wall Rose, and Wall Sina.
   - Interactive *Unseal Wall Core (Classified)* mechanism executing an instant X-Ray metamorphosis revealing millions of dormant Colossal Titans crystallized within the mortar.

3. **Scene 03 // The Nine Titans Metamorphosis**:
   - Continuous visual film scrubber tracking all 9 Titan shifters: Attack, Armored, Colossal, Female, Beast, Founding, Jaw, Cart, and War Hammer.
   - Multi-state optical views: Full-frame stance, focal facial crop, and hardened crystal mode with biological stats and synthesized roar frequencies.

4. **Scene 04 // The Scale of Terror (1.7m → 200m+)**:
   - Dimension comparator visually dolly-panning from the 1.7m human frame of an ODM Scout, past the 15m Attack Titan, 50m Wall Maria parapet, 60m Colossal Titan, and the 200m+ ribcage of the Founding Titan.

5. **Scene 05 // Wings of Freedom (The Soldiers Dossier)**:
   - Large-format portrait spreads of Levi Ackerman, Mikasa Ackerman, Eren Yeager, Erwin Smith, Armin Arlert, and Hange Zoe.
   - Dynamic *Blade-Slash* transition animation with ultra-hard steel metallic whoosh cues and battle quotes.

6. **Scene 06 // 3D Maneuver Arsenal (Tactical Schematics)**:
   - Interactive breakdown of the Survey Corps' combat apparatus: Spatial ODM Turbines, Snap-Off Ultrahard Steel Blades, Thunder Spear Rockets, and Anti-Personnel Gear.
   - Interactive *Test Mechanism* triggering realistic gas expulsion and explosive rumble audio.

7. **Scene 07 // Territories & The Horizon (World Journey)**:
   - Cinematic territorial expansion from Shiganshina, Utgard Castle, and the Giant Forest to the Marley coastline and the infinite coordinate tree of *The Paths*.

8. **Scene 08 // Chronology of Tragedy (Timeline 845 – 854+)**:
   - Historical chronicle equipped with an active *Spoiler Filter* that blurs classified end-game records until explicitly unmasked.

9. **Scene 09 // The Final Horizon (Freedom)**:
   - Sunset epilogue anchored by the lone tree on the grassy hill at dusk, with monumental "FREEDOM" typography interacting directly with the horizon line.

---

## 4. The Camera & Motion System

### Scroll as Time
Rather than simply revealing static DOM containers, scroll input is treated as time along a camera track. As the visitor scrolls:
- Camera focal length scales smoothly (`1.0x` to `1.65x`).
- Parallax offsets interpolate along X and Y axes according to cursor position (`useCinematicCamera` hook).
- Transform matrices utilize hardware-accelerated GPU layers (`translate3d`, `scale3d`, `will-change: transform`).

### Sound Engine (Zero-Latency Web Audio API)
No external MP3 files are downloaded. The custom `soundEngine.ts` uses procedural Web Audio oscillators, biquad filters, and white noise buffers to synthesize:
- Low-frequency seismic Titan footstep thumps (30Hz–60Hz sine sweep).
- Superheated steam hiss (filtered noise burst with high-pass resonance).
- Ultrahard steel blade unsheathing whoosh (exponential pitch ramp).
- Eerie deep Titan roar rumbles.

---

## 5. Asset Pipeline & Management

All media assets are cataloged in `src/data/assetManifest.ts` with explicit art-direction metadata:
```typescript
export interface AssetMetadata {
  id: string;
  name: string;
  source: string;
  type: 'image' | 'video' | 'texture' | 'audio';
  subject: 'titan' | 'wall' | 'character' | 'environment' | 'gear';
  orientation: 'horizontal' | 'vertical' | 'square';
  aspectRatio: string;
  visualRole: 'hero_background' | 'cinematic_stage' | 'portrait_focus' | 'atmospheric_overlay';
  mobileSafe: boolean;
  mobileCrop: string; // CSS object-position for mobile viewports
  transitionPotential: 'zoom_dissolve' | 'match_cut' | 'blade_slash' | 'steam_wipe' | 'xray_morph';
}
```

### Mobile Art Direction
Rather than blindly applying `object-fit: cover`, horizontal imagery is dynamically reframed on mobile devices using custom focal anchors (e.g. `center 25%` for Titans, `center 30%` for portraits) ensuring character faces and monumental elements are never awkwardly cropped.

---

## 6. Performance & Accessibility Strategy

- **GPU Offloading**: All transforms operate on `transform` and `opacity` properties to prevent layout thrashing and paint reflows.
- **Adaptive Canvas Particle Engine**: `AtmosphericCanvas.tsx` scales particle count dynamically based on viewport width (25 on mobile, 55 on desktop) and auto-pauses when the document tab is inactive.
- **Accessibility & Reduced Motion**: Automatically honors `prefers-reduced-motion: reduce` by disabling parallax camera pitch, reducing scale leaps, and disabling canvas particles.
- **Lazy Image Strategy**: Native `referrerPolicy="no-referrer"` and responsive image sizing minimize bandwidth.

---

## 7. Tech Stack

- **Framework**: React 19 + TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 + Custom Optical Grid Tokens
- **Audio Engine**: Native Browser Web Audio API Synthesizer
- **Icons**: Lucide React
- **Build System**: Vite 6 + ESBuild

---

## 8. Project Structure

```
├── index.html
├── metadata.json
├── package.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types.ts
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── AtmosphericCanvas.tsx    # Living ember & ash particle engine
│   │   ├── FilmHUD.tsx              # Minimalist film timecode & chapter navigation
│   │   ├── HeroSection.tsx          # Scene 01 // The Breach with multi-crop camera
│   │   ├── WallSection.tsx          # Scene 02 // 50M Concentric Walls + X-Ray core
│   │   ├── TitanSection.tsx         # Scene 03 // The Nine Titans Metamorphosis
│   │   ├── TitanScaleSection.tsx    # Scene 04 // 1.7M -> 200M+ Scale Comparison
│   │   ├── CharacterArchive.tsx     # Scene 05 // Wings of Freedom + Blade Slash
│   │   ├── SurveyCorpsArchive.tsx   # Scene 06 // 3D Maneuver Gear & Combat Arsenal
│   │   ├── WorldJourney.tsx         # Scene 07 // Territories, Ocean & The Paths
│   │   ├── StoryTimeline.tsx        # Scene 08 // Chronology with Spoiler Redaction
│   │   ├── FreedomSection.tsx       # Scene 09 // The Final Horizon Epilogue
│   │   └── Footer.tsx               # Minimal tribute footer
│   ├── data/
│   │   ├── aotData.ts               # Core lore, Titan stats, and wall records
│   │   └── assetManifest.ts         # Art-direction & mobile crop registry
│   ├── hooks/
│   │   └── useCinematicCamera.ts    # Mouse parallax & scroll velocity tracker
│   └── utils/
│       └── soundEngine.ts           # Zero-latency Web Audio API acoustic synthesizer
```

---

## 9. Local Development & Build Commands

### Prerequisites
Node.js 18+ and npm installed.

### Setup
```bash
# Install dependencies
npm install

# Start the local development server (binds to 0.0.0.0:3000)
npm run dev

# Run TypeScript typechecks and linting
npm run lint

# Build production bundle
npm run build
```

---

## 10. Copyright & Fan Tribute Disclaimer

*Attack on Titan* (*Shingeki no Kyojin* / 進撃の巨人) is created by **Hajime Isayama** and published by **Kodansha**. Animated adaptations produced by **Wit Studio** and **MAPPA**.

This project is an **unofficial, non-commercial educational concept and fan tribute** created exclusively for artistic study, front-end architecture demonstration, and creative interaction design. All character names, lore, and original universe elements remain the sole intellectual property of Hajime Isayama, Kodansha, and their respective production partners.
