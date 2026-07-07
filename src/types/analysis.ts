export interface AnalysisResult {
  atsScore: number;
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  weaknesses: string[];
  summary: string;
  suggestions: string[];
}

export type AppState = 'upload' | 'loading' | 'results' | 'error';
