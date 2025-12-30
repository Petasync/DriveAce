/**
 * StatsScreen - Detaillierte Statistiken
 * Zeigt Lernfortschritt, Accuracy, Streaks, etc.
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import { useProgress, useStreak } from '../../hooks/useProgress';
import DatabaseService from '../../services/database/DatabaseService';

interface StatCardProps {
  icon: any;
  label: string;
  value: string | number;
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color = Colors.primary }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={32} color={color} />
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function StatsScreen() {
  const { userId } = useAuthStore();
  const { getUserProgress } = useProgress();
  const { getStreak } = useStreak();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalQuestions: 50,
    answeredQuestions: 0,
    correctAnswers: 0,
    accuracy: 0,
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      await DatabaseService.init();

      // Lade User Progress
      const progress = await getUserProgress();
      const correctCount = progress.filter(p => p.is_correct).length;
      const accuracy = progress.length > 0 ? Math.round((correctCount / progress.length) * 100) : 0;

      // Lade Streak
      const streak = await getStreak();

      setStats({
        totalQuestions: 50,
        answeredQuestions: progress.length,
        correctAnswers: correctCount,
        accuracy,
        currentStreak: streak?.current_streak || 0,
        longestStreak: streak?.longest_streak || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Lade Statistiken...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Overview Cards */}
      <View style={styles.overviewContainer}>
        <StatCard
          icon="book"
          label="Fragen beantwortet"
          value={`${stats.answeredQuestions}/${stats.totalQuestions}`}
          color={Colors.primary}
        />
        <StatCard
          icon="checkmark-circle"
          label="Genauigkeit"
          value={`${stats.accuracy}%`}
          color={Colors.success}
        />
      </View>

      {/* Streak Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lernstreak 🔥</Text>
        <View style={styles.streakContainer}>
          <View style={styles.streakCard}>
            <Text style={styles.streakNumber}>{stats.currentStreak}</Text>
            <Text style={styles.streakLabel}>Aktuell</Text>
          </View>
          <View style={styles.streakDivider} />
          <View style={styles.streakCard}>
            <Text style={styles.streakNumber}>{stats.longestStreak}</Text>
            <Text style={styles.streakLabel}>Rekord</Text>
          </View>
        </View>
      </View>

      {/* Progress Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dein Fortschritt</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={styles.progressIcon}>
              <Ionicons name="checkmark" size={24} color={Colors.success} />
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressLabel}>Richtig beantwortet</Text>
              <Text style={styles.progressValue}>{stats.correctAnswers} Fragen</Text>
            </View>
          </View>

          <View style={styles.progressItem}>
            <View style={[styles.progressIcon, { backgroundColor: Colors.error + '20' }]}>
              <Ionicons name="close" size={24} color={Colors.error} />
            </View>
            <View style={styles.progressContent}>
              <Text style={styles.progressLabel}>Falsch beantwortet</Text>
              <Text style={styles.progressValue}>
                {stats.answeredQuestions - stats.correctAnswers} Fragen
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Achievement Placeholder */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Erfolge</Text>
        <View style={styles.emptyState}>
          <Ionicons name="trophy-outline" size={48} color={Colors.textDisabled} />
          <Text style={styles.emptyText}>Noch keine Erfolge freigeschaltet</Text>
          <Text style={styles.emptySubtext}>
            Beantworte mehr Fragen, um Erfolge zu sammeln!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  overviewContainer: {
    flexDirection: 'row',
    padding: Spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    ...Shadows.medium,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    margin: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  streakContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  streakCard: {
    flex: 1,
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.warning,
  },
  streakLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  streakDivider: {
    width: 1,
    backgroundColor: Colors.divider,
    marginHorizontal: Spacing.lg,
  },
  progressContainer: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    ...Shadows.small,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  progressContent: {
    flex: 1,
  },
  progressLabel: {
    ...Typography.body,
    marginBottom: Spacing.xs / 2,
  },
  progressValue: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  emptyState: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.small,
  },
  emptyText: {
    ...Typography.bodyBold,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
