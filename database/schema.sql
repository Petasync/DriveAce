-- DriveAce Database Schema (SQLite)
-- Erstellt für offline-first Fahrschul-Lern-App

-- Kategorien für Fragen
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  type TEXT CHECK(type IN ('grundstoff', 'klassenspezifisch')) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Fragen
CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  points INTEGER CHECK(points IN (2,3,4,5)) NOT NULL,
  image_url TEXT,
  video_url TEXT,
  explanation TEXT,
  difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard')) DEFAULT 'medium',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Antworten
CREATE TABLE IF NOT EXISTS answers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_id INTEGER NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT 0,
  order_index INTEGER DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- User Progress (lokal)
CREATE TABLE IF NOT EXISTS user_progress (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL DEFAULT 'local_user',
  question_id INTEGER NOT NULL,
  is_correct BOOLEAN NOT NULL,
  attempts INTEGER DEFAULT 1,
  last_answered DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

-- Prüfungssimulationen
CREATE TABLE IF NOT EXISTS exam_sessions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL DEFAULT 'local_user',
  total_questions INTEGER DEFAULT 30,
  correct_answers INTEGER DEFAULT 0,
  total_points INTEGER DEFAULT 0,
  error_points INTEGER DEFAULT 0,
  passed BOOLEAN DEFAULT 0,
  duration_seconds INTEGER,
  completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Favoriten/Markierte Fragen
CREATE TABLE IF NOT EXISTS favorites (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL DEFAULT 'local_user',
  question_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  UNIQUE(user_id, question_id)
);

-- Lernstreak
CREATE TABLE IF NOT EXISTS streaks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT UNIQUE NOT NULL DEFAULT 'local_user',
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Settings (lokal)
CREATE TABLE IF NOT EXISTS settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT UNIQUE NOT NULL DEFAULT 'local_user',
  dark_mode BOOLEAN DEFAULT 0,
  notifications_enabled BOOLEAN DEFAULT 1,
  sound_enabled BOOLEAN DEFAULT 1,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indizes für Performance
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_question ON user_progress(question_id);
CREATE INDEX IF NOT EXISTS idx_exams_user ON exam_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
