export type TraitId =
  | 'dominant'
  | 'submissive'
  | 'sadist'
  | 'masochist'
  | 'hunter'
  | 'prey'
  | 'caregiver'
  | 'little'
  | 'rigger'
  | 'rope_bottom'
  | 'degrader'
  | 'degradee'
  | 'switch'
  | 'master'
  | 'slave'
  | 'brat'
  | 'brat_tamer'
  | 'spanker';

export interface TraitInfo {
  id: TraitId;
  nameKo: string;
  nameEn: string;
  shortName: string;
  animal: string;
  emoji: string;
  title: string;
  subtitle: string;
  badgeColor: string;
  bgGradient: string;
  textColor: string;
  description: string;
  loveStyle: string; // 연애 스타일 & 심리
  heartFlutter: string[]; // 심쿵 포인트
  redFlags: string[]; // 지뢰 포인트
  aftercare: string; // 애프터케어 가이드
  strengths: string[];
  tips: string[];
  bestMatches: TraitId[];
  worstMatches: TraitId[];
  challengeMatches: TraitId[];
}

export interface Question {
  id: number;
  text: string;
  categoryHint?: string;
  weights: Partial<Record<TraitId, number>>;
}

export interface TestResultData {
  scores: Record<TraitId, number>; // 0~100 percentage
  primaryTrait: TraitId;
  secondaryTrait?: TraitId;
  rawAnswers?: number[];
  timestamp: number;
  nickname?: string;
}

export interface RoomMember {
  id: string;
  nickname: string;
  primaryTrait: TraitId;
  scores: Record<TraitId, number>;
  createdAt: number;
}

export interface RoomData {
  id: string;
  name: string;
  createdAt: number;
  members: RoomMember[];
}
