/**
 * Business Logic Models und zusätzliche Types
 */

import { Question, Answer } from './database.types';

// Learning Mode
export type LearningMode = 'all' | 'category' | 'favorites' | 'mistakes' | 'unanswered';

// Question Status beim Beantworten
export interface QuestionAnswerState {
  questionId: number;
  selectedAnswerId: number | null;
  isCorrect: boolean | null;
  showExplanation: boolean;
  timeSpentSeconds: number;
}

// Exam Configuration
export interface ExamConfiguration {
  totalQuestions: number;
  timeLimitMinutes: number;
  maxErrorPoints: number;
  includeCategories: number[];
}

// Exam State
export interface ExamState {
  sessionId?: number;
  questions: Question[];
  currentQuestionIndex: number;
  answers: Map<number, number>; // questionId -> answerId
  startTime: Date;
  endTime?: Date;
  isPaused: boolean;
}

// Subscription Status
export interface SubscriptionStatus {
  isPremium: boolean;
  expiresAt?: Date;
  productId?: string;
  platform?: 'ios' | 'android';
}

// Ad Configuration
export interface AdConfig {
  bannerAdUnitId: string;
  interstitialAdUnitId?: string;
  rewardedAdUnitId?: string;
  showAdsOnQuestions: boolean;
  adsFrequency: number; // zeige Ad alle X Fragen
}

// Notification Settings
export interface NotificationSettings {
  enabled: boolean;
  dailyReminder: boolean;
  reminderTime: string; // "HH:MM" Format
  streakReminder: boolean;
  examReminder: boolean;
}

// App Theme
export type ThemeMode = 'light' | 'dark' | 'auto';

// Progress Filter
export interface ProgressFilter {
  categoryId?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Achievement (für zukünftige Features)
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}
