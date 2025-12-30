/**
 * Database Types und Interfaces für DriveAce
 */

// Kategorien
export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  type: 'grundstoff' | 'klassenspezifisch';
  order_index: number;
  created_at: string;
}

// Fragen
export interface Question {
  id: number;
  category_id: number;
  question_text: string;
  points: 2 | 3 | 4 | 5;
  image_url?: string;
  video_url?: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  created_at: string;
  answers?: Answer[];
}

// Antworten
export interface Answer {
  id: number;
  question_id: number;
  answer_text: string;
  is_correct: boolean;
  order_index: number;
}

// User Progress
export interface UserProgress {
  id: number;
  user_id: string;
  question_id: number;
  is_correct: boolean;
  attempts: number;
  last_answered: string;
}

// Prüfungssimulation
export interface ExamSession {
  id?: number;
  user_id: string;
  total_questions: number;
  correct_answers: number;
  total_points: number;
  error_points: number;
  passed: boolean;
  duration_seconds: number;
  completed_at?: string;
}

// Favoriten
export interface Favorite {
  id: number;
  user_id: string;
  question_id: number;
  created_at: string;
}

// Lernstreak
export interface Streak {
  id: number;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  updated_at: string;
}

// Einstellungen
export interface Settings {
  id: number;
  user_id: string;
  dark_mode: boolean;
  notifications_enabled: boolean;
  sound_enabled: boolean;
  updated_at: string;
}

// Erweiterte Question mit Category Info
export interface QuestionWithCategory extends Question {
  category_name: string;
  category_type: 'grundstoff' | 'klassenspezifisch';
}

// User Statistics
export interface UserStatistics {
  total_questions: number;
  answered_questions: number;
  correct_answers: number;
  accuracy_percentage: number;
  current_streak: number;
  longest_streak: number;
  total_study_time_minutes: number;
  exams_taken: number;
  exams_passed: number;
}

// Learning Progress per Category
export interface CategoryProgress {
  category_id: number;
  category_name: string;
  total_questions: number;
  answered_questions: number;
  correct_answers: number;
  accuracy_percentage: number;
}
