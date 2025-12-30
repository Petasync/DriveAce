/**
 * App Configuration & Constants
 */

// Exam Configuration
export const EXAM_CONFIG = {
  TOTAL_QUESTIONS: 30,
  TIME_LIMIT_MINUTES: 45,
  MAX_ERROR_POINTS: 10,
  PASS_THRESHOLD_POINTS: 10,
};

// Question Points
export const QUESTION_POINTS = {
  EASY: 2,
  MEDIUM: 3,
  HARD: 4,
  VERY_HARD: 5,
} as const;

// Learning Settings
export const LEARNING_SETTINGS = {
  QUESTIONS_PER_SESSION: 20,
  MIN_QUESTIONS_FOR_CATEGORY: 5,
  DAILY_GOAL_QUESTIONS: 30,
};

// Streak Settings
export const STREAK_SETTINGS = {
  MIN_QUESTIONS_FOR_STREAK: 5,
  HOURS_GRACE_PERIOD: 4, // Grace period für Streak
};

// Premium Features
export const PREMIUM_FEATURES = {
  EXAM_SIMULATION: true,
  CLOUD_SYNC: true,
  DETAILED_STATISTICS: true,
  NO_ADS: true,
  DARK_MODE: true,
  ERROR_TRAINING: true,
};

// Free Version Limits
export const FREE_VERSION_LIMITS = {
  DAILY_QUESTIONS_LIMIT: null, // unbegrenzt mit Werbung
  EXAMS_PER_WEEK: 0,
  BASIC_STATISTICS_ONLY: true,
};

// Ad Settings
export const AD_SETTINGS = {
  SHOW_ADS_EVERY_N_QUESTIONS: 5,
  BANNER_AD_FREQUENCY: 'always', // 'always' | 'sometimes' | 'never'
  INTERSTITIAL_AD_FREQUENCY: 5, // alle 5 Fragen
};

// App Info
export const APP_INFO = {
  VERSION: '1.0.0',
  BUILD_NUMBER: 1,
  APP_NAME: 'DriveAce',
  DEVELOPER: 'PetaSync',
  SUPPORT_EMAIL: 'support@driveace.app',
  PRIVACY_POLICY_URL: 'https://driveace.app/privacy',
  TERMS_URL: 'https://driveace.app/terms',
};

// Supabase Tables
export const SUPABASE_TABLES = {
  USER_PROGRESS: 'user_progress_cloud',
  USER_STATS: 'user_stats_cloud',
  USER_SETTINGS: 'user_settings_cloud',
  EXAM_SESSIONS: 'exam_sessions_cloud',
};

// Storage Keys (AsyncStorage)
export const STORAGE_KEYS = {
  USER_ID: '@driveace:userId',
  AUTH_TOKEN: '@driveace:authToken',
  THEME_MODE: '@driveace:themeMode',
  ONBOARDING_COMPLETED: '@driveace:onboardingCompleted',
  LAST_SYNC: '@driveace:lastSync',
  PREMIUM_STATUS: '@driveace:premiumStatus',
};

// Development
export const __DEV__ = process.env.NODE_ENV === 'development';
export const ENABLE_LOGGING = __DEV__;
