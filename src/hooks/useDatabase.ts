/**
 * useDatabase Hook - Vereinfacht Zugriff auf DatabaseService
 */

import { useState, useEffect } from 'react';
import DatabaseService from '../services/database/DatabaseService';
import { Category, Question } from '../types/database.types';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    initDatabase();
  }, []);

  const initDatabase = async () => {
    try {
      await DatabaseService.init();
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Database initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isInitialized,
    isLoading,
    error,
    db: DatabaseService,
  };
};

/**
 * useCategories Hook - Lade alle Kategorien
 */
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      await DatabaseService.init();
      const data = await DatabaseService.getAllCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    categories,
    loading,
    error,
    refresh: loadCategories,
  };
};

/**
 * useQuestions Hook - Lade Fragen (optional nach Kategorie)
 */
export const useQuestions = (categoryId?: number) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadQuestions();
  }, [categoryId]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      await DatabaseService.init();

      const data = categoryId
        ? await DatabaseService.getQuestionsByCategory(categoryId)
        : await DatabaseService.getAllQuestions();

      setQuestions(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error loading questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRandomQuestions = async (limit: number = 30) => {
    try {
      setLoading(true);
      await DatabaseService.init();
      const data = await DatabaseService.getRandomQuestions(limit);
      setQuestions(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error loading random questions:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    loading,
    error,
    refresh: loadQuestions,
    loadRandom: loadRandomQuestions,
  };
};
