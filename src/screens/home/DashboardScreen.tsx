/**
 * DashboardScreen - Hauptbildschirm mit Überblick und Quick Actions
 * Zeigt Live-Daten aus der Datenbank
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import DatabaseService from '../../services/database/DatabaseService';
import { calculatePercentage } from '../../utils/helpers';

interface DashboardScreenProps {
  navigation: any;
}

interface CategoryProgress {
  id: number;
  name: string;
  icon: string;
  total_questions: number;
  answered_questions: number;
  correct_answers: number;
}

interface DashboardStats {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  currentStreak: number;
  longestStreak: number;
  todayAnswered: number;
}

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { userId, isPremium } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({
    totalQuestions: 0,
    answeredQuestions: 0,
    correctAnswers: 0,
    currentStreak: 0,
    longestStreak: 0,
    todayAnswered: 0,
  });
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgress[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadDashboardData = useCallback(async () => {
    try {
      // Load overall stats
      const allCategories = await DatabaseService.getAllCategories();
      const userProgress = await DatabaseService.getUserProgress(userId);
      const streak = await DatabaseService.getStreak(userId);

      // Calculate today's answered questions
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayProgress = userProgress.filter(p => {
        const progressDate = new Date(p.answered_at);
        progressDate.setHours(0, 0, 0, 0);
        return progressDate.getTime() === today.getTime();
      });

      // Load category-specific progress
      const categoryData: CategoryProgress[] = [];
      let totalQuestionsCount = 0;

      for (const category of allCategories) {
        const questions = await DatabaseService.getQuestionsByCategory(category.id);
        const categoryProgressData = userProgress.filter(p =>
          questions.some(q => q.id === p.question_id)
        );
        const correctInCategory = categoryProgressData.filter(p => p.is_correct).length;

        categoryData.push({
          id: category.id,
          name: category.name,
          icon: category.icon,
          total_questions: questions.length,
          answered_questions: categoryProgressData.length,
          correct_answers: correctInCategory,
        });

        totalQuestionsCount += questions.length;
      }

      setStats({
        totalQuestions: totalQuestionsCount,
        answeredQuestions: userProgress.length,
        correctAnswers: userProgress.filter(p => p.is_correct).length,
        currentStreak: streak?.current_streak || 0,
        longestStreak: streak?.longest_streak || 0,
        todayAnswered: todayProgress.length,
      });

      setCategoryProgress(categoryData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      Alert.alert('Fehler', 'Dashboard-Daten konnten nicht geladen werden.');
    }
  }, [userId]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  }, [loadDashboardData]);

  const accuracy = stats.answeredQuestions > 0
    ? calculatePercentage(stats.correctAnswers, stats.answeredQuestions)
    : 0;

  const overallProgress = stats.totalQuestions > 0
    ? calculatePercentage(stats.answeredQuestions, stats.totalQuestions)
    : 0;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hallo! 👋</Text>
          <Text style={styles.subtitle}>Bereit für deine Fahrprüfung?</Text>
        </View>
        {isPremium && (
          <View style={styles.premiumBadge}>
            <Ionicons name="star" size={16} color={Colors.premium} />
            <Text style={styles.premiumText}>Premium</Text>
          </View>
        )}
      </View>

      {/* Today's Progress */}
      <View style={styles.todayCard}>
        <View style={styles.todayHeader}>
          <Ionicons name="today" size={24} color={Colors.primary} />
          <Text style={styles.todayTitle}>Heute</Text>
        </View>
        <Text style={styles.todayNumber}>{stats.todayAnswered}</Text>
        <Text style={styles.todayLabel}>Fragen beantwortet</Text>
      </View>

      {/* Overall Progress */}
      <View style={styles.progressCard}>
        <Text style={styles.cardTitle}>Gesamtfortschritt</Text>
        <View style={styles.progressRow}>
          <View style={styles.progressInfo}>
            <Text style={styles.progressNumber}>{overallProgress}%</Text>
            <Text style={styles.progressLabel}>
              {stats.answeredQuestions} / {stats.totalQuestions} Fragen
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${overallProgress}%` }]} />
          </View>
        </View>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={32} color={Colors.success} />
          <Text style={styles.statNumber}>{accuracy}%</Text>
          <Text style={styles.statLabel}>Genauigkeit</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="flame" size={32} color={Colors.warning} />
          <Text style={styles.statNumber}>{stats.currentStreak}</Text>
          <Text style={styles.statLabel}>Streak (Tage)</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="trophy" size={32} color={Colors.premium} />
          <Text style={styles.statNumber}>{stats.longestStreak}</Text>
          <Text style={styles.statLabel}>Rekord</Text>
        </View>
      </View>

      {/* Category Progress */}
      <View style={styles.categorySection}>
        <Text style={styles.sectionTitle}>Fortschritt nach Kategorie</Text>
        {categoryProgress.map((cat) => {
          const catProgress = cat.total_questions > 0
            ? calculatePercentage(cat.answered_questions, cat.total_questions)
            : 0;
          const catAccuracy = cat.answered_questions > 0
            ? calculatePercentage(cat.correct_answers, cat.answered_questions)
            : 0;

          return (
            <View key={cat.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <Ionicons name={cat.icon as any} size={24} color={Colors.primary} />
                <Text style={styles.categoryName}>{cat.name}</Text>
              </View>
              <View style={styles.categoryStats}>
                <Text style={styles.categoryProgress}>{catProgress}% bearbeitet</Text>
                {cat.answered_questions > 0 && (
                  <Text style={styles.categoryAccuracy}>
                    {catAccuracy}% richtig ({cat.correct_answers}/{cat.answered_questions})
                  </Text>
                )}
              </View>
              <View style={styles.categoryBar}>
                <View style={[styles.categoryBarFill, { width: `${catProgress}%` }]} />
              </View>
            </View>
          );
        })}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Schnellzugriff</Text>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionPrimary]}
          onPress={() => navigation.navigate('Learn')}
        >
          <Ionicons name="book" size={24} color="#FFFFFF" />
          <Text style={styles.actionPrimaryText}>Weiterlernen</Text>
        </TouchableOpacity>

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.actionSecondary}
            onPress={() => navigation.navigate('Exam')}
          >
            <Ionicons name="clipboard" size={24} color={Colors.primary} />
            <Text style={styles.actionSecondaryText}>Prüfung</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionSecondary}
            onPress={() => navigation.navigate('Stats')}
          >
            <Ionicons name="stats-chart" size={24} color={Colors.primary} />
            <Text style={styles.actionSecondaryText}>Statistik</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Premium Teaser (nur für Free User) */}
      {!isPremium && (
        <TouchableOpacity
          style={styles.premiumCard}
          onPress={() => navigation.navigate('Profile', { screen: 'Premium' })}
        >
          <View style={styles.premiumContent}>
            <Ionicons name="star" size={48} color={Colors.premium} />
            <View style={styles.premiumText}>
              <Text style={styles.premiumTitle}>Upgrade auf Premium</Text>
              <Text style={styles.premiumDescription}>
                Werbefrei • Prüfungssimulation • Cloud-Sync • Erweiterte Statistiken
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.premium} />
        </TouchableOpacity>
      )}

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  greeting: {
    ...Typography.h2,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.premium + '20',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  premiumText: {
    ...Typography.bodyBold,
    color: Colors.premiumDark,
    marginLeft: Spacing.xs,
  },
  todayCard: {
    backgroundColor: Colors.primaryLight + '20',
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  todayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  todayTitle: {
    ...Typography.h3,
    marginLeft: Spacing.sm,
  },
  todayNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  todayLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  progressCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
  },
  cardTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressInfo: {
    flex: 1,
  },
  progressNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  progressLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  progressBar: {
    height: 80,
    width: 80,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.xs,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    ...Shadows.small,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: Spacing.sm,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
  categorySection: {
    padding: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  categoryCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryName: {
    ...Typography.bodyBold,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  categoryStats: {
    marginBottom: Spacing.sm,
  },
  categoryProgress: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  categoryAccuracy: {
    ...Typography.small,
    color: Colors.success,
    marginTop: Spacing.xs,
  },
  categoryBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  actionsSection: {
    padding: Spacing.md,
  },
  actionButton: {
    marginBottom: Spacing.md,
  },
  actionPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.large,
  },
  actionPrimaryText: {
    ...Typography.h3,
    color: '#FFFFFF',
    marginLeft: Spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionSecondary: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    marginHorizontal: Spacing.xs,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
    ...Shadows.small,
  },
  actionSecondaryText: {
    ...Typography.bodyBold,
    color: Colors.primary,
    marginTop: Spacing.sm,
  },
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.premium + '10',
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.premium,
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  premiumTitle: {
    ...Typography.h3,
    color: Colors.premiumDark,
  },
  premiumDescription: {
    ...Typography.small,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  footer: {
    height: Spacing.xl,
  },
});
