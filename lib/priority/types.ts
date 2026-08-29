export type PriorityLevel = 'low' | 'moderate' | 'high' | 'urgent';

export interface PriorityFactor {
  name: string;
  points: number;
}

export interface PriorityResult {
  score: number;
  level: PriorityLevel;
  factors: PriorityFactor[];
}
