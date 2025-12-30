/**
 * Dashboard Screen - Hauptübersicht der App
 * Zeigt Progress, Streak, Quick Actions
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Spacing, Typography, Shadows } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import DatabaseService from '../../services/database/DatabaseService';
import { Streak } from '../../types/database.types';

export default function DashboardScreen() {
  const { userId } = useAuthStore();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      await DatabaseService.init();
      const userStreak = await DatabaseService.getStreak(userId);
      setStreak(userStreak);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Header */}
      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Willkommen zurück! 👋</Text>
        <Text style={styles.welcomeSubtitle}>Bereit für deine Lerneinheit?</Text>
      </View>

      {/* Streak Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>🔥</Text>
          <Text style={styles.cardTitle}>Lernstreak</Text>
        </View>
        <Text style={styles.streakNumber}>{streak?.current_streak || 0} Tage</Text>
        <Text style={styles.cardSubtext}>
          Längster Streak: {streak?.longest_streak || 0} Tage
        </Text>
      </View>

      {/* Progress Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>📊</Text>
          <Text style={styles.cardTitle}>Gesamtfortschritt</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '0%' }]} />
        </View>
        <Text style={styles.cardSubtext}>0 von 50 Fragen beantwortet</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schnellstart</Text>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Text style={styles.actionIcon}>📚</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Weiterlernen</Text>
            <Text style={styles.actionSubtext}>Setze dein Lernen fort</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Text style={styles.actionIcon}>📝</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Zufällige Fragen</Text>
            <Text style={styles.actionSubtext}>Teste dein Wissen</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIconContainer}>
            <Text style={styles.actionIcon}>⭐</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Favoriten</Text>
            <Text style={styles.actionSubtext}>Markierte Fragen wiederholen</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Stats Preview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Deine Statistik</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Fragen</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0%</Text>
            <Text style={styles.statLabel}>Korrekt</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Prüfungen</Text>
          </View>
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
  welcomeCard: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  welcomeTitle: {
    ...Typography.h2,
    color: '#FFFFFF',
    marginBottom: Spacing.xs,
  },
  welcomeSubtitle: {
    ...Typography.body,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  card: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: 12,
    ...Shadows.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: Spacing.sm,
  },
  cardTitle: {
    ...Typography.h3,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.warning,
    marginVertical: Spacing.sm,
  },
  cardSubtext: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.divider,
    borderRadius: 6,
    overflow: 'hidden',
    marginVertical: Spacing.md,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  section: {
    padding: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primaryLight + '20',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    ...Typography.bodyBold,
    marginBottom: Spacing.xs / 2,
  },
  actionSubtext: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  actionArrow: {
    fontSize: 32,
    color: Colors.textDisabled,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: Spacing.xs,
    ...Shadows.small,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
