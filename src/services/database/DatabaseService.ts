/**
 * DatabaseService - Zentrale Datenbank-Verwaltung für DriveAce
 * Verwendet SQLite für offline-first Funktionalität
 */

import * as SQLite from 'expo-sqlite';
import {
  Category,
  Question,
  Answer,
  UserProgress,
  ExamSession,
  Favorite,
  Streak,
  Settings,
  CategoryProgress,
} from '../../types/database.types';

class DatabaseService {
  private db: SQLite.SQLiteDatabase | null = null;
  private isInitialized = false;

  /**
   * Initialisiert die Datenbank und führt Migrations aus
   */
  async init(): Promise<void> {
    if (this.isInitialized) {
      console.log('✅ Database already initialized');
      return;
    }

    try {
      this.db = await SQLite.openDatabaseAsync('driveace.db');
      await this.createTables();
      await this.seedData();
      this.isInitialized = true;
      console.log('✅ Database initialized successfully');
    } catch (error) {
      console.error('❌ Database initialization error:', error);
      throw error;
    }
  }

  /**
   * Erstellt alle Tabellen aus schema.sql
   */
  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const schema = `
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        type TEXT CHECK(type IN ('grundstoff', 'klassenspezifisch')) NOT NULL,
        order_index INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

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

      CREATE TABLE IF NOT EXISTS answers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_id INTEGER NOT NULL,
        answer_text TEXT NOT NULL,
        is_correct BOOLEAN DEFAULT 0,
        order_index INTEGER DEFAULT 0,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS user_progress (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL DEFAULT 'local_user',
        question_id INTEGER NOT NULL,
        is_correct BOOLEAN NOT NULL,
        attempts INTEGER DEFAULT 1,
        last_answered DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
      );

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

      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL DEFAULT 'local_user',
        question_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
        UNIQUE(user_id, question_id)
      );

      CREATE TABLE IF NOT EXISTS streaks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL DEFAULT 'local_user',
        current_streak INTEGER DEFAULT 0,
        longest_streak INTEGER DEFAULT 0,
        last_activity_date DATE,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT UNIQUE NOT NULL DEFAULT 'local_user',
        dark_mode BOOLEAN DEFAULT 0,
        notifications_enabled BOOLEAN DEFAULT 1,
        sound_enabled BOOLEAN DEFAULT 1,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
      CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);
      CREATE INDEX IF NOT EXISTS idx_progress_user ON user_progress(user_id);
      CREATE INDEX IF NOT EXISTS idx_progress_question ON user_progress(question_id);
      CREATE INDEX IF NOT EXISTS idx_exams_user ON exam_sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
    `;

    await this.db.execAsync(schema);
  }

  /**
   * Lädt initiale Seed-Daten, falls Datenbank leer ist
   */
  private async seedData(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Prüfe ob bereits Daten vorhanden sind
    const result = await this.db.getFirstAsync<{ count: number }>(
      'SELECT COUNT(*) as count FROM categories'
    );

    if (result && result.count > 0) {
      console.log('📊 Database already contains data, skipping seed');
      return;
    }

    console.log('🌱 Seeding database with initial data...');

    // Lade seed.sql aus dem database Verzeichnis
    // In Production würde man die Seed-Daten direkt hier einfügen
    // Für jetzt erstellen wir minimale Testdaten

    await this.db.execAsync(`
      INSERT INTO categories (name, description, icon, type, order_index) VALUES
      ('Verkehrszeichen', 'Alle Verkehrszeichen und ihre Bedeutung', 'sign-caution', 'grundstoff', 1),
      ('Vorfahrt & Vorrang', 'Vorfahrtsregeln im Straßenverkehr', 'arrow-decision', 'grundstoff', 2),
      ('Geschwindigkeit', 'Geschwindigkeitsbegrenzungen', 'speedometer', 'grundstoff', 3);

      INSERT INTO settings (user_id, dark_mode, notifications_enabled, sound_enabled) VALUES
      ('local_user', 0, 1, 1);

      INSERT INTO streaks (user_id, current_streak, longest_streak) VALUES
      ('local_user', 0, 0);
    `);

    console.log('✅ Database seeded successfully');
  }

  // ============================================
  // CATEGORIES
  // ============================================

  async getAllCategories(): Promise<Category[]> {
    if (!this.db) throw new Error('Database not initialized');

    const categories = await this.db.getAllAsync<Category>(
      'SELECT * FROM categories ORDER BY order_index ASC'
    );

    return categories;
  }

  async getCategoryById(id: number): Promise<Category | null> {
    if (!this.db) throw new Error('Database not initialized');

    const category = await this.db.getFirstAsync<Category>(
      'SELECT * FROM categories WHERE id = ?',
      [id]
    );

    return category || null;
  }

  // ============================================
  // QUESTIONS
  // ============================================

  async getAllQuestions(): Promise<Question[]> {
    if (!this.db) throw new Error('Database not initialized');

    const questions = await this.db.getAllAsync<Question>(
      'SELECT * FROM questions ORDER BY id ASC'
    );

    // Lade Antworten für jede Frage
    for (const question of questions) {
      question.answers = await this.getAnswersForQuestion(question.id);
    }

    return questions;
  }

  async getQuestionsByCategory(categoryId: number): Promise<Question[]> {
    if (!this.db) throw new Error('Database not initialized');

    const questions = await this.db.getAllAsync<Question>(
      'SELECT * FROM questions WHERE category_id = ? ORDER BY id ASC',
      [categoryId]
    );

    // Lade Antworten für jede Frage
    for (const question of questions) {
      question.answers = await this.getAnswersForQuestion(question.id);
    }

    return questions;
  }

  async getQuestionById(id: number): Promise<Question | null> {
    if (!this.db) throw new Error('Database not initialized');

    const question = await this.db.getFirstAsync<Question>(
      'SELECT * FROM questions WHERE id = ?',
      [id]
    );

    if (question) {
      question.answers = await this.getAnswersForQuestion(id);
    }

    return question || null;
  }

  async getRandomQuestions(limit: number = 30): Promise<Question[]> {
    if (!this.db) throw new Error('Database not initialized');

    const questions = await this.db.getAllAsync<Question>(
      'SELECT * FROM questions ORDER BY RANDOM() LIMIT ?',
      [limit]
    );

    for (const question of questions) {
      question.answers = await this.getAnswersForQuestion(question.id);
    }

    return questions;
  }

  // ============================================
  // ANSWERS
  // ============================================

  async getAnswersForQuestion(questionId: number): Promise<Answer[]> {
    if (!this.db) throw new Error('Database not initialized');

    const answers = await this.db.getAllAsync<Answer>(
      'SELECT * FROM answers WHERE question_id = ? ORDER BY order_index ASC',
      [questionId]
    );

    return answers;
  }

  // ============================================
  // USER PROGRESS
  // ============================================

  async saveProgress(
    userId: string,
    questionId: number,
    isCorrect: boolean
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Prüfe ob bereits Progress existiert
    const existing = await this.db.getFirstAsync<UserProgress>(
      'SELECT * FROM user_progress WHERE user_id = ? AND question_id = ?',
      [userId, questionId]
    );

    if (existing) {
      // Update existierenden Progress
      await this.db.runAsync(
        `UPDATE user_progress
         SET is_correct = ?, attempts = attempts + 1, last_answered = CURRENT_TIMESTAMP
         WHERE user_id = ? AND question_id = ?`,
        [isCorrect ? 1 : 0, userId, questionId]
      );
    } else {
      // Erstelle neuen Progress
      await this.db.runAsync(
        `INSERT INTO user_progress (user_id, question_id, is_correct, attempts)
         VALUES (?, ?, ?, 1)`,
        [userId, questionId, isCorrect ? 1 : 0]
      );
    }

    // Update Streak
    await this.updateStreak(userId);
  }

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    if (!this.db) throw new Error('Database not initialized');

    const progress = await this.db.getAllAsync<UserProgress>(
      'SELECT * FROM user_progress WHERE user_id = ? ORDER BY last_answered DESC',
      [userId]
    );

    return progress;
  }

  async getCategoryProgress(
    userId: string,
    categoryId: number
  ): Promise<CategoryProgress | null> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.getFirstAsync<any>(
      `SELECT
        c.id as category_id,
        c.name as category_name,
        COUNT(DISTINCT q.id) as total_questions,
        COUNT(DISTINCT up.question_id) as answered_questions,
        SUM(CASE WHEN up.is_correct = 1 THEN 1 ELSE 0 END) as correct_answers
      FROM categories c
      LEFT JOIN questions q ON c.id = q.category_id
      LEFT JOIN user_progress up ON q.id = up.question_id AND up.user_id = ?
      WHERE c.id = ?
      GROUP BY c.id`,
      [userId, categoryId]
    );

    if (!result) return null;

    const accuracy = result.answered_questions > 0
      ? (result.correct_answers / result.answered_questions) * 100
      : 0;

    return {
      category_id: result.category_id,
      category_name: result.category_name,
      total_questions: result.total_questions,
      answered_questions: result.answered_questions,
      correct_answers: result.correct_answers,
      accuracy_percentage: Math.round(accuracy),
    };
  }

  // ============================================
  // EXAM SESSIONS
  // ============================================

  async saveExamSession(session: ExamSession): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');

    const result = await this.db.runAsync(
      `INSERT INTO exam_sessions
       (user_id, total_questions, correct_answers, total_points, error_points, passed, duration_seconds)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        session.user_id,
        session.total_questions,
        session.correct_answers,
        session.total_points,
        session.error_points,
        session.passed ? 1 : 0,
        session.duration_seconds,
      ]
    );

    return result.lastInsertRowId;
  }

  async getExamHistory(userId: string, limit: number = 10): Promise<ExamSession[]> {
    if (!this.db) throw new Error('Database not initialized');

    const exams = await this.db.getAllAsync<ExamSession>(
      'SELECT * FROM exam_sessions WHERE user_id = ? ORDER BY completed_at DESC LIMIT ?',
      [userId, limit]
    );

    return exams;
  }

  // ============================================
  // FAVORITES
  // ============================================

  async toggleFavorite(userId: string, questionId: number): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    const existing = await this.db.getFirstAsync<Favorite>(
      'SELECT * FROM favorites WHERE user_id = ? AND question_id = ?',
      [userId, questionId]
    );

    if (existing) {
      // Entferne Favorit
      await this.db.runAsync(
        'DELETE FROM favorites WHERE user_id = ? AND question_id = ?',
        [userId, questionId]
      );
      return false;
    } else {
      // Füge Favorit hinzu
      await this.db.runAsync(
        'INSERT INTO favorites (user_id, question_id) VALUES (?, ?)',
        [userId, questionId]
      );
      return true;
    }
  }

  async getFavorites(userId: string): Promise<Question[]> {
    if (!this.db) throw new Error('Database not initialized');

    const questions = await this.db.getAllAsync<Question>(
      `SELECT q.* FROM questions q
       INNER JOIN favorites f ON q.id = f.question_id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId]
    );

    for (const question of questions) {
      question.answers = await this.getAnswersForQuestion(question.id);
    }

    return questions;
  }

  async isFavorite(userId: string, questionId: number): Promise<boolean> {
    if (!this.db) throw new Error('Database not initialized');

    const favorite = await this.db.getFirstAsync<Favorite>(
      'SELECT * FROM favorites WHERE user_id = ? AND question_id = ?',
      [userId, questionId]
    );

    return !!favorite;
  }

  // ============================================
  // STREAKS
  // ============================================

  async updateStreak(userId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const today = new Date().toISOString().split('T')[0];

    const streak = await this.db.getFirstAsync<Streak>(
      'SELECT * FROM streaks WHERE user_id = ?',
      [userId]
    );

    if (!streak) {
      // Erstelle neuen Streak
      await this.db.runAsync(
        `INSERT INTO streaks (user_id, current_streak, longest_streak, last_activity_date)
         VALUES (?, 1, 1, ?)`,
        [userId, today]
      );
      return;
    }

    const lastDate = streak.last_activity_date;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === today) {
      // Heute schon aktiv gewesen
      return;
    } else if (lastDate === yesterdayStr) {
      // Streak fortsetzen
      const newStreak = streak.current_streak + 1;
      const newLongest = Math.max(newStreak, streak.longest_streak);

      await this.db.runAsync(
        `UPDATE streaks
         SET current_streak = ?, longest_streak = ?, last_activity_date = ?, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ?`,
        [newStreak, newLongest, today, userId]
      );
    } else {
      // Streak unterbrochen
      await this.db.runAsync(
        `UPDATE streaks
         SET current_streak = 1, last_activity_date = ?, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = ?`,
        [today, userId]
      );
    }
  }

  async getStreak(userId: string): Promise<Streak | null> {
    if (!this.db) throw new Error('Database not initialized');

    const streak = await this.db.getFirstAsync<Streak>(
      'SELECT * FROM streaks WHERE user_id = ?',
      [userId]
    );

    return streak || null;
  }

  // ============================================
  // SETTINGS
  // ============================================

  async getSettings(userId: string): Promise<Settings | null> {
    if (!this.db) throw new Error('Database not initialized');

    const settings = await this.db.getFirstAsync<Settings>(
      'SELECT * FROM settings WHERE user_id = ?',
      [userId]
    );

    return settings || null;
  }

  async updateSettings(userId: string, updates: Partial<Settings>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields: string[] = [];
    const values: any[] = [];

    if (typeof updates.dark_mode !== 'undefined') {
      fields.push('dark_mode = ?');
      values.push(updates.dark_mode ? 1 : 0);
    }
    if (typeof updates.notifications_enabled !== 'undefined') {
      fields.push('notifications_enabled = ?');
      values.push(updates.notifications_enabled ? 1 : 0);
    }
    if (typeof updates.sound_enabled !== 'undefined') {
      fields.push('sound_enabled = ?');
      values.push(updates.sound_enabled ? 1 : 0);
    }

    if (fields.length === 0) return;

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(userId);

    await this.db.runAsync(
      `UPDATE settings SET ${fields.join(', ')} WHERE user_id = ?`,
      values
    );
  }

  // ============================================
  // UTILITY
  // ============================================

  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
      this.isInitialized = false;
      console.log('🔒 Database closed');
    }
  }

  /**
   * Löscht alle User-Daten (für Reset/Logout)
   */
  async clearUserData(userId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync('DELETE FROM user_progress WHERE user_id = ?', [userId]);
    await this.db.runAsync('DELETE FROM exam_sessions WHERE user_id = ?', [userId]);
    await this.db.runAsync('DELETE FROM favorites WHERE user_id = ?', [userId]);
    await this.db.runAsync('DELETE FROM streaks WHERE user_id = ?', [userId]);
    await this.db.runAsync('DELETE FROM settings WHERE user_id = ?', [userId]);

    console.log(`🗑️ User data cleared for ${userId}`);
  }
}

export default new DatabaseService();
