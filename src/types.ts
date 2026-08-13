export interface Titan {
  id: string;
  number: string;
  name: string;
  japaneseName: string;
  height: string;
  heightValue: number; // in meters
  classification: string;
  description: string;
  abilities: string[];
  currentShifter: string;
  previousShifter?: string;
  allegiance: string;
  quote?: string;
  image: string;
  accentColor: string;
  spoilerWarning?: boolean;
}

export interface Wall {
  id: string;
  name: string;
  japaneseName: string;
  radiusKm: number;
  heightM: number;
  circumferenceKm: number;
  areaKm2: string;
  breachStatus: string;
  breachYear?: number;
  districts: {
    north: string;
    south: string;
    east: string;
    west: string;
  };
  description: string;
  secret: string;
}

export interface Character {
  id: string;
  name: string;
  japaneseName: string;
  rank: string;
  branch: string;
  alias?: string;
  description: string;
  quote?: string;
  status: 'Alive' | 'Deceased' | 'Active' | 'Unknown';
  titanForm?: string;
  image: string;
}

export interface Location {
  id: string;
  name: string;
  japaneseName: string;
  region: string;
  coordinates?: string;
  description: string;
  significance: string;
  image?: string;
}

export interface StoryTimelineItem {
  id: string;
  year: string;
  title: string;
  japaneseTitle: string;
  phase: string;
  summary: string;
  isSpoiler: boolean;
  image?: string;
}

export interface TacticalGear {
  id: string;
  name: string;
  category: string;
  description: string;
}

