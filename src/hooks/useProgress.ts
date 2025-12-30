/**
 * useProgress Hook - Verwalte Lernfortschritt
 */

import { useState, useCallback } from 'react';
import DatabaseService from '../services/database/DatabaseService';
import { useAuthStore } from '../store/authStore';

export const useProgress = () => {
  const { userId } = useAuthStore();
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Speichere Antwort für eine Frage
   */
  const saveAnswer = useCallback(async (questionId: number, isCorrect: boolean) => {
    try {
      setIsSaving(true);
      await DatabaseService.init();
      await DatabaseService.saveProgress(userId, questionId, isCorrect);
      return true;
    } catch (error) {
      console.error('Error saving progress:', error);
      return false;
    } finally {
      setIsSaving(false);
    }
  }, [userId]);

  /**
   * Lade gesamten Progress für User
   */
  const getUserProgress = useCallback(async () => {
    try {
      await DatabaseService.init();
      return await DatabaseService.getUserProgress(userId);
    } catch (error) {
      console.error('Error loading user progress:', error);
      return [];
    }
  }, [userId]);

  /**
   * Lade Progress für eine bestimmte Kategorie
   */
  const getCategoryProgress = useCallback(async (categoryId: number) => {
    try {
      await DatabaseService.init();
      return await DatabaseService.getCategoryProgress(userId, categoryId);
    } catch (error) {
      console.error('Error loading category progress:', error);
      return null;
    }
  }, [userId]);

  return {
    saveAnswer,
    getUserProgress,
    getCategoryProgress,
    isSaving,
  };
};

/**
 * useFavorites Hook - Verwalte Favoriten
 */
export const useFavorites = () => {
  const { userId } = useAuthStore();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Lade alle Favoriten
   */
  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);
      await DatabaseService.init();
      const favoriteQuestions = await DatabaseService.getFavorites(userId);
      setFavorites(favoriteQuestions.map(q => q.id));
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  /**
   * Toggle Favorite für eine Frage
   */
  const toggleFavorite = useCallback(async (questionId: number) => {
    try {
      await DatabaseService.init();
      const isFavorite = await DatabaseService.toggleFavorite(userId, questionId);

      // Update local state
      setFavorites(prev =>
        isFavorite
          ? [...prev, questionId]
          : prev.filter(id => id !== questionId)
      );

      return isFavorite;
    } catch (error) {
      console.error('Error toggling favorite:', error);
      return false;
    }
  }, [userId]);

  /**
   * Prüfe ob Frage favorisiert ist
   */
  const isFavorite = useCallback((questionId: number) => {
    return favorites.includes(questionId);
  }, [favorites]);

  return {
    favorites,
    loading,
    loadFavorites,
    toggleFavorite,
    isFavorite,
  };
};

/**
 * useStreak Hook - Verwalte Lernstreak
 */
export const useStreak = () => {
  const { userId } = useAuthStore();

  const getStreak = useCallback(async () => {
    try {
      await DatabaseService.init();
      return await DatabaseService.getStreak(userId);
    } catch (error) {
      console.error('Error loading streak:', error);
      return null;
    }
  }, [userId]);

  const updateStreak = useCallback(async () => {
    try {
      await DatabaseService.init();
      await DatabaseService.updateStreak(userId);
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  }, [userId]);

  return {
    getStreak,
    updateStreak,
  };
};
