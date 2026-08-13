import { Titan, Wall, Character, Location, StoryTimelineItem, TacticalGear } from '../types';

// Asset references
import heroWallImg from '../assets/images/aot_hero_wall_1786653897114.jpg';
import colossalImg from '../assets/images/aot_colossal_titan_1786653906069.jpg';
import freedomImg from '../assets/images/aot_freedom_tree_1786653914587.jpg';
import wallsImg from '../assets/images/aot_walls_monolith_1786653927355.jpg';
import erenImg from '../assets/images/aot_eren_portrait_1786653936529.jpg';
import armoredImg from '../assets/images/aot_armored_titan_1786653968289.jpg';
import leviImg from '../assets/images/aot_levi_portrait_1786653978367.jpg';

// Newly generated cinematic assets
import titanScaleCinematicImg from '../assets/images/titan_scale_cinematic_1786654361686.jpg';
import rumblingFoundingImg from '../assets/images/rumbling_founding_titan_1786654376285.jpg';
import attackTitanRoarImg from '../assets/images/attack_titan_roar_1786654388936.jpg';
import pathsCoordinateTreeImg from '../assets/images/paths_coordinate_tree_1786654403839.jpg';
import beastTitanForestImg from '../assets/images/beast_titan_forest_1786654415688.jpg';
import scoutOdmActionImg from '../assets/images/scout_odm_aerial_action_1786654427712.jpg';
import theSeaShorelineImg from '../assets/images/the_sea_shoreline_1786654440847.jpg';
import colossalBreachImg from '../assets/images/colossal_wall_breach_1786654453011.jpg';
import femaleTitanImg from '../assets/images/female_titan_crystal_1786654775995.jpg';
import warHammerTitanImg from '../assets/images/war_hammer_titan_1786654786007.jpg';
import jawTitanImg from '../assets/images/jaw_titan_porco_1786654796519.jpg';
import cartTitanImg from '../assets/images/cart_titan_pieck_1786654806276.jpg';
import humanScoutOdmImg from '../assets/images/human_scout_odm_1786654820298.jpg';
import pureTitanSmilingImg from '../assets/images/pure_titan_smiling_1786654829263.jpg';
import mikasaImg from '../assets/images/mikasa_ackerman_blade_1786656542227.jpg';
import erwinImg from '../assets/images/erwin_smith_charge_1786656553925.jpg';

export const ASSETS = {
  heroWall: colossalBreachImg,
  colossalTitan: colossalImg,
  colossalBreach: colossalBreachImg,
  freedomTree: freedomImg,
  wallsMonolith: wallsImg,
  erenPortrait: erenImg,
  mikasaPortrait: mikasaImg,
  leviPortrait: leviImg,
  erwinCharge: erwinImg,
  armoredTitan: armoredImg,
  titanScaleCinematic: titanScaleCinematicImg,
  titanScaleComparison: titanScaleCinematicImg,
  rumblingFounding: rumblingFoundingImg,
  attackTitanRoar: attackTitanRoarImg,
  pathsCoordinateTree: pathsCoordinateTreeImg,
  beastTitanForest: beastTitanForestImg,
  scoutOdmAction: scoutOdmActionImg,
  theSeaShoreline: theSeaShorelineImg,
  femaleTitan: femaleTitanImg,
  warHammerTitan: warHammerTitanImg,
  jawTitan: jawTitanImg,
  cartTitan: cartTitanImg,
  humanScoutOdm: humanScoutOdmImg,
  pureTitanSmiling: pureTitanSmilingImg,
};

export const WALLS_DATA: Wall[] = [
  {
    id: 'wall-maria',
    name: 'WALL MARIA',
    japaneseName: 'ウォール・マリア',
    radiusKm: 250,
    heightM: 50,
    circumferenceKm: 1570,
    areaKm2: '490,000 km²',
    breachStatus: 'BREACHED & RECLAIMED',
    breachYear: 845,
    districts: {
      south: 'Shiganshina District (Outer Breach Point)',
      north: 'Deep Northern Garrison Outpost',
      east: 'Eastern Agricultural Sentry District',
      west: 'Western River Supply District'
    },
    description: 'The outermost defensive ring protecting humanity. Composed of approximately 50-meter-tall monolithic stone ramparts enclosing vast agricultural territories and river arteries. Breached in 845 by the Colossal and Armored Titans, forcing humanity to retreat behind Wall Rose.',
    secret: 'The stone contains millions of hardened Colossal Titans embedded shoulder-to-shoulder, placed in 743 by the 145th King Karl Fritz to form the threat of the Rumbling.'
  },
  {
    id: 'wall-rose',
    name: 'WALL ROSE',
    japaneseName: 'ウォール・ローゼ',
    radiusKm: 130,
    heightM: 50,
    circumferenceKm: 816,
    areaKm2: '132,700 km²',
    breachStatus: 'BREACHED & SEALED',
    breachYear: 850,
    districts: {
      south: 'Trost District (Sealed by Eren Yeager with Boulder)',
      north: 'Utopia District',
      east: 'Karanes District (Expedition Deployment Base)',
      west: 'Krolva District'
    },
    description: 'The middle wall, protecting commercial trade routes, urban centers, and military garrison depots. In 850, the Colossal Titan breached the south gate of Trost, leading to humanity’s first counteroffensive and successful gate closure using Eren Yeager’s Attack Titan.',
    secret: 'Contains intact crystalline hardening foundations. Minister Nick and the Order of the Walls took strict blood oaths never to let sunlight penetrate damaged mortar.'
  },
  {
    id: 'wall-sina',
    name: 'WALL SINA',
    japaneseName: 'ウォール・シーナ',
    radiusKm: 100,
    heightM: 50,
    circumferenceKm: 628,
    areaKm2: '31,400 km²',
    breachStatus: 'INTACT',
    districts: {
      south: 'Ehrmich District',
      north: 'Orvud District (Target of Rod Reiss Titan)',
      east: 'Stohess District (Female Titan Capture Zone)',
      west: 'Yarckel District'
    },
    description: 'The innermost sanctuary protecting the royal monarchy, aristocratic elite, and Military Police headquarters. Houses the royal capital Mitras and extensive subterranean crystal caverns.',
    secret: 'The seat of the true Royal Bloodline (Reiss Family) and the Reiss Chapel underground caverns of luminous crystal pillars where the Founding Titan was passed down through generations.'
  }
];

export const TITANS_DATA: Titan[] = [
  {
    id: 'colossal-titan',
    number: '01',
    name: 'COLOSSAL TITAN',
    japaneseName: '超大型巨人',
    height: '60M',
    heightValue: 60,
    classification: 'Class-60 Siege Shifter',
    description: 'A towering behemoth of exposed muscular tissue capable of generating intense heat explosions upon transformation and discharging pressurized steam to repel attackers.',
    abilities: [
      'Thermal Detonation',
      'Pressurized Steam Venting',
      'Massive Kinetic Reach'
    ],
    currentShifter: 'Armin Arlert',
    previousShifter: 'Bertholdt Hoover',
    allegiance: 'Paradis Island / Survey Corps',
    quote: '“At that moment, humanity received a grim reminder.”',
    image: ASSETS.colossalTitan,
    accentColor: '#7A1E1E'
  },
  {
    id: 'armored-titan',
    number: '02',
    name: 'ARMORED TITAN',
    japaneseName: '鎧の巨人',
    height: '15M',
    heightValue: 15,
    classification: 'Class-15 Heavy Juggernaut',
    description: 'Enclosed entirely in interlocking plates of hardened bone armor capable of shattering reinforced gates while withstanding conventional artillery fire.',
    abilities: [
      'Interlocking Plate Hardening',
      'Kinetic Ramming Force',
      'Selective Armor Shedding'
    ],
    currentShifter: 'Reiner Braun',
    allegiance: 'Marley Warrior Unit',
    quote: '“I will face the consequences of my actions to the bitter end.”',
    image: ASSETS.armoredTitan,
    accentColor: '#C5A880'
  },
  {
    id: 'attack-titan',
    number: '03',
    name: 'ATTACK TITAN',
    japaneseName: '進撃の巨人',
    height: '15M',
    heightValue: 15,
    classification: 'Class-15 Vanguard of Freedom',
    description: 'The Titan that has in every era relentlessly moved forward, fighting for freedom. Possesses the unique ability to perceive memories across past and future inheritors.',
    abilities: [
      'Memory Transference Across Time',
      'Concentrated Hardening',
      'Unstoppable Battle Drive'
    ],
    currentShifter: 'Eren Yeager',
    previousShifter: 'Grisha Yeager / Eren Kruger',
    allegiance: 'Paradis Island',
    quote: '“If we don’t fight, we can’t win. Fight. Fight.”',
    image: ASSETS.attackTitanRoar,
    accentColor: '#6B7C6B'
  },
  {
    id: 'female-titan',
    number: '04',
    name: 'FEMALE TITAN',
    japaneseName: '女型の巨人',
    height: '14M',
    heightValue: 14,
    classification: 'Class-14 High-Agility Striker',
    description: 'An all-purpose combatant featuring elite martial agility, selective diamond crystal hardening, and a sonic scream that summons Pure Titans.',
    abilities: [
      'Selective Diamond Crystal Hardening',
      'Pure Titan Attraction Scream',
      'Superior Martial Mobility'
    ],
    currentShifter: 'Annie Leonhart',
    allegiance: 'Marley Warrior Unit',
    quote: '“I just want the weak who get swept along in the flow to be considered human too.”',
    image: ASSETS.femaleTitan,
    accentColor: '#4A6B82'
  },
  {
    id: 'beast-titan',
    number: '05',
    name: 'BEAST TITAN',
    japaneseName: '獣の巨人',
    height: '17M',
    heightValue: 17,
    classification: 'Class-17 Long-Range Artillery',
    description: 'Resembling an ape with elongated arms, acting as heavy artillery by pitching crushed boulder projectile barrages across vast distances.',
    abilities: [
      'Long-Range Supersonic Projectiles',
      'Spinal Fluid Titan Transformation',
      'Vocal Command Over Pure Titans'
    ],
    currentShifter: 'Zeke Yeager',
    previousShifter: 'Tom Ksaver',
    allegiance: 'Marley Warrior Unit',
    quote: '“You’re throwing your lives away in service of a flawed world.”',
    image: ASSETS.beastTitanForest,
    accentColor: '#8C6239'
  },
  {
    id: 'founding-titan',
    number: '06',
    name: 'FOUNDING TITAN',
    japaneseName: '始祖の巨人',
    height: '200M+ (Skeletal Form)',
    heightValue: 200,
    classification: 'Class-Omega Sovereign Coordinate',
    description: 'The nexus of all Subjects of Ymir. Can command all Titans and awakens the millions of Colossal Titans resting within the Walls to enact the Rumbling.',
    abilities: [
      'The Coordinate (Absolute Titan Command)',
      'Memory & Biological Manipulation',
      'Command Over the Rumbling'
    ],
    currentShifter: 'Eren Yeager',
    previousShifter: 'Frieda Reiss / Karl Fritz',
    allegiance: 'Paradis Island',
    quote: '“I will keep moving forward until all my enemies are destroyed.”',
    image: ASSETS.rumblingFounding,
    accentColor: '#E6E0D1'
  },
  {
    id: 'jaw-titan',
    number: '07',
    name: 'JAW TITAN',
    japaneseName: '顎の巨人',
    height: '5M',
    heightValue: 5,
    classification: 'Class-5 Hyper-Speed Infiltrator',
    description: 'The fastest of the Nine Titans. Equipped with hardened razor-sharp jaws and talons capable of biting through crystalline armor and concrete bunkers.',
    abilities: [
      'Hardened Crushing Jaws',
      'High-Speed Agility',
      'Hardened Climbing Talons'
    ],
    currentShifter: 'Falco Grice / Porco Galliard',
    previousShifter: 'Ymir / Marcel Galliard',
    allegiance: 'Marley Warrior Unit',
    image: ASSETS.jawTitan,
    accentColor: '#9E8B65'
  },
  {
    id: 'cart-titan',
    number: '08',
    name: 'CART TITAN',
    japaneseName: '車力の巨人',
    height: '4M',
    heightValue: 4,
    classification: 'Class-4 Quadruped Logistics',
    description: 'A quadrupedal Titan with extreme endurance, allowing the shifter to stay transformed for months continuously with tactical equipment mounts.',
    abilities: [
      'Extreme Endurance & Stamina',
      'Mobile Artillery Mounts',
      'Sustained Ground Speed'
    ],
    currentShifter: 'Pieck Finger',
    allegiance: 'Marley Warrior Unit',
    image: ASSETS.cartTitan,
    accentColor: '#4A5B4C'
  },
  {
    id: 'war-hammer-titan',
    number: '09',
    name: 'WAR HAMMER TITAN',
    japaneseName: '戦鎚の巨人',
    height: '15M',
    heightValue: 15,
    classification: 'Class-15 Structural Constructor',
    description: 'Can manufacture weapons, ground spikes, and flexible armor out of hardened white crystalline substance, operated remotely via an underground cable.',
    abilities: [
      'White Crystal Weapon Synthesis',
      'Remote Cable Piloting',
      'Impenetrable Crystal Cocoon'
    ],
    currentShifter: 'Eren Yeager',
    previousShifter: 'Lara Tybur',
    allegiance: 'Tybur Family / Marley',
    image: ASSETS.warHammerTitan,
    accentColor: '#D8D4CA'
  }
];

export const CHARACTERS_DATA: Character[] = [
  {
    id: 'eren-yeager',
    name: 'EREN YEAGER',
    japaneseName: 'エレン・イェーガー',
    rank: 'Special Operations Squad',
    branch: 'Survey Corps',
    alias: 'The Attack Titan',
    description: 'A soldier driven by an unyielding, terrifying desire for personal and national freedom at any cost.',
    quote: '“I will keep moving forward until all my enemies are destroyed.”',
    status: 'Deceased',
    titanForm: 'Attack Titan / Founding Titan',
    image: ASSETS.erenPortrait
  },
  {
    id: 'levi-ackerman',
    name: 'LEVI ACKERMAN',
    japaneseName: 'リヴァイ・アッカーマン',
    rank: 'Captain / Humanity’s Strongest Soldier',
    branch: 'Survey Corps',
    alias: 'Captain Levi',
    description: 'Leader of the Special Operations Squad. Regarded as humanity’s greatest weapon against the Titans.',
    quote: '“The only thing we’re allowed to do is believe that we won’t regret the choice we made.”',
    status: 'Alive',
    image: ASSETS.leviPortrait
  },
  {
    id: 'mikasa-ackerman',
    name: 'MIKASA ACKERMAN',
    japaneseName: 'ミカサ・アッカーマン',
    rank: 'Survey Corps Vanguard',
    branch: 'Survey Corps',
    alias: 'Top Graduate of the 104th',
    description: 'An elite warrior bearing the awakened genetic prowess of the Ackerman clan.',
    quote: '“This world is cruel... but it is also very beautiful.”',
    status: 'Alive',
    image: ASSETS.mikasaPortrait
  },
  {
    id: 'armin-arlert',
    name: 'ARMIN ARLERT',
    japaneseName: 'アルミン・アルレルト',
    rank: '15th Commander of the Survey Corps',
    branch: 'Survey Corps',
    alias: 'Colossal Titan',
    description: 'A brilliant strategist whose analytical deductions repeatedly rescued humanity from extinction.',
    quote: '“Someone who cannot abandon anything can never change anything.”',
    status: 'Alive',
    titanForm: 'Colossal Titan',
    image: ASSETS.colossalTitan
  },
  {
    id: 'erwin-smith',
    name: 'ERWIN SMITH',
    japaneseName: 'エルヴィン・スミス',
    rank: '13th Commander of the Survey Corps',
    branch: 'Survey Corps',
    description: 'A visionary commander who transformed the Survey Corps into humanity’s spearhead.',
    quote: '“My soldiers, rage! My soldiers, scream! My soldiers, FIGHT!”',
    status: 'Deceased',
    image: ASSETS.erwinCharge
  },
  {
    id: 'hange-zoe',
    name: 'HANGE ZOË',
    japaneseName: 'ハンジ・ゾエ',
    rank: '14th Commander of the Survey Corps',
    branch: 'Survey Corps',
    description: 'A brilliant scientist whose investigations into Titan physiology revolutionized human combat.',
    status: 'Deceased',
    image: ASSETS.freedomTree
  }
];

export const LOCATIONS_DATA: Location[] = [
  {
    id: 'shiganshina',
    name: 'SHIGANSHINA DISTRICT',
    japaneseName: 'シガンシナ区',
    region: 'Paradis Island',
    description: 'The southernmost protruding district of Wall Maria. Ground zero of the Titan breach in 845.',
    significance: 'Birthplace of Eren, Mikasa, and Armin; location of the Yeager basement.',
    image: ASSETS.heroWall
  },
  {
    id: 'trost',
    name: 'TROST DISTRICT',
    japaneseName: 'トロスト区',
    region: 'Paradis Island',
    description: 'Fortified bastion of Wall Rose. Site of humanity’s first counteroffensive victory against the Titans.',
    significance: 'First sealed breach in recorded history using the Attack Titan.',
    image: ASSETS.wallsMonolith
  },
  {
    id: 'the-ocean',
    name: 'THE SEA / THE HORIZON',
    japaneseName: '海',
    region: 'The Continental Mainland',
    description: 'A vast expanse of saltwater. Armin and Eren’s childhood dream of absolute freedom.',
    significance: 'The border between the mystery of the Titans and human civilization across the sea.',
    image: ASSETS.theSeaShoreline
  },
  {
    id: 'marley-liberio',
    name: 'LIBERIO INTERNMENT ZONE',
    japaneseName: 'レベリオ収容区',
    region: 'The Continental Mainland',
    description: 'The walled ghetto within the Marleyan empire where Subjects of Ymir reside under military surveillance.',
    significance: 'Willy Tybur’s declaration of war and the Survey Corps surprise raid.',
    image: ASSETS.armoredTitan
  },
  {
    id: 'the-paths',
    name: 'THE PATHS (COORDINATE)',
    japaneseName: '道 (座標)',
    region: 'Metaphysical Realm',
    description: 'A luminous sand realm where a towering pillar of light connects all Subjects of Ymir across time.',
    significance: 'Where Founder Ymir sculpts Titans and where the Rumbling is initiated.',
    image: ASSETS.pathsCoordinateTree
  }
];

export const TIMELINE_DATA: StoryTimelineItem[] = [
  {
    id: 'year-845',
    year: '845',
    title: 'THE FALL OF SHIGANSHINA',
    japaneseTitle: '845年 シガンシナ陥落',
    phase: 'The Beginning',
    summary: 'The Colossal Titan shatters the outer gate of Shiganshina. Humanity loses Wall Maria and retreats behind Wall Rose.',
    isSpoiler: false,
    image: ASSETS.heroWall
  },
  {
    id: 'year-847',
    year: '847',
    title: 'THE 104th CADET CORPS',
    japaneseTitle: '847年 第104期訓練兵団',
    phase: 'Training',
    summary: 'Eren, Mikasa, and Armin enlist in the military alongside top cadets to master the 3D Maneuver Gear.',
    isSpoiler: false,
    image: ASSETS.humanScoutOdm
  },
  {
    id: 'year-850-trost',
    year: '850',
    title: 'BATTLE OF TROST DISTRICT',
    japaneseTitle: '850年 トロスト区攻防戦',
    phase: 'First Counterattack',
    summary: 'The Colossal Titan breaches Trost. Eren manifests the Attack Titan and seals the fractured gate with a monolithic boulder.',
    isSpoiler: false,
    image: ASSETS.attackTitanRoar
  },
  {
    id: 'year-850-female',
    year: '850',
    title: 'THE 57th EXPEDITION',
    japaneseTitle: '850年 第57回壁外調査',
    phase: 'The Forest of Giant Trees',
    summary: 'The Survey Corps encounters an intelligent Female Titan outside the walls, exposing the existence of infiltrators within humanity.',
    isSpoiler: true,
    image: ASSETS.femaleTitan
  },
  {
    id: 'year-850-return',
    year: '850',
    title: 'RETURN TO SHIGANSHINA',
    japaneseTitle: '850年 ウォール・マリア奪還作戦',
    phase: 'The Basement',
    summary: 'The decisive operation to reclaim Wall Maria. Reaching the Yeager basement reveals the existence of human civilization across the ocean.',
    isSpoiler: true,
    image: ASSETS.theSeaShoreline
  },
  {
    id: 'year-854-marley',
    year: '854',
    title: 'RAID ON LIBERIO',
    japaneseTitle: '854年 レベリオ急襲',
    phase: 'Declaration of War',
    summary: 'Eren Yeager infiltrates Marley and launches a surprise assault on Liberio following Willy Tybur’s declaration of war.',
    isSpoiler: true,
    image: ASSETS.warHammerTitan
  },
  {
    id: 'year-854-rumbling',
    year: '854+',
    title: 'THE RUMBLING',
    japaneseTitle: '854年 地鳴らし',
    phase: 'The Final Horizon',
    summary: 'Eren Yeager unlocks the Founding Titan in The Paths, awakening millions of Colossal Titans to march across the world.',
    isSpoiler: true,
    image: ASSETS.rumblingFounding
  }
];

export const TACTICAL_GEAR: TacticalGear[] = [
  {
    id: 'odm-gear',
    name: 'OMNI-DIRECTIONAL MOBILITY GEAR',
    category: 'Aerial Combat Propulsion',
    description: 'A specialized gas-powered harness system granting soldiers three-dimensional movement through vertical terrain and urban fortress corridors.'
  },
  {
    id: 'ultrahard-steel',
    name: 'ULTRA-HARD STEEL BLADES',
    category: 'Close-Quarters Anti-Titan Weaponry',
    description: 'Forged from iron bamboo alloy steel to combine high surface hardness with flexible elasticity.'
  },
  {
    id: 'thunder-spears',
    name: 'THUNDER SPEARS',
    category: 'Armor-Piercing Explosive Rockets',
    description: 'High-explosive rocket charges engineered to penetrate and shatter hardened Titan armor.'
  }
];

