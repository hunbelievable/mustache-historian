export type MeleeRound = 'R16' | 'QF' | 'SF' | 'Final' | 'Champion';
export interface MeleeAppearance {
    year: number;
    deepestRound: MeleeRound;
    isChampion: boolean;
}
export interface MeleeMatch {
    p1: string;
    p2: string;
    p1Seed?: number;
    p2Seed?: number;
    winner: string;
}
export interface MeleeRegion {
    name: string | null;
    r16: MeleeMatch[];
    qf: MeleeMatch;
}
export interface MeleeSide {
    topRegion: MeleeRegion;
    bottomRegion: MeleeRegion;
    sf: MeleeMatch;
}
export interface MeleeBracket {
    left: MeleeSide;
    right: MeleeSide;
    final: MeleeMatch;
}
export interface MeleePlayInGroup {
    label: string;
    participants: string[];
    winner: string;
}
export interface MeleePlayIn {
    rookie: MeleePlayInGroup;
    experienced: MeleePlayInGroup;
}
export interface MeleeYearEntry {
    year: number;
    champion: string;
    notes?: string;
    sponsor?: string | null;
    bracket: MeleeBracket;
    playIn?: MeleePlayIn | null;
}
export interface MeleeData {
    years: MeleeYearEntry[];
}
//# sourceMappingURL=melee.d.ts.map