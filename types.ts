export interface Question {
  q: string;
  options: string[];
  correct: number;
}

export interface SubjectData {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  topics: string[];
  questions: Question[];
}

export type SubjectKey = 'physics' | 'chemistry' | 'mathematics';

export interface QuizResult {
  score: number;
  totalQuestions: number;
  subjectId: string;
}

export enum AppView {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  SUBSCRIBE="subscribe",
}