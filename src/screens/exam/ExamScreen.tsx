/**
 * ExamScreen - Prüfungssimulation (Premium Feature)
 * 30 Fragen, 45 Minuten, max 10 Fehlerpunkte
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { useQuestions } from '../../hooks/useDatabase';
import { useAuthStore } from '../../store/authStore';
import { EXAM_CONFIG } from '../../constants/config';

interface ExamScreenProps {
  navigation: any;
}

export default function ExamScreen({ navigation }: ExamScreenProps) {
  const { isPremium } = useAuthStore();
  const { loadRandom } = useQuestions();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartExam = async () => {
    if (!isPremium) {
      Alert.alert(
        '🌟 Premium Feature',
        'Die Prüfungssimulation ist nur für Premium-Nutzer verfügbar.\n\nUpgrade jetzt und erhalte:\n• Unbegrenzte Prüfungssimulationen\n• Detaillierte Auswertungen\n• Werbefrei lernen\n• Cloud-Sync',
        [
          { text: 'Abbrechen', style: 'cancel' },
          {
            text: 'Upgrade auf Premium',
            onPress: () => navigation.navigate('Profile', { screen: 'Premium' }),
          },
        ]
      );
      return;
    }

    Alert.alert(
      'Prüfung starten?',
      `Du startest jetzt eine offizielle Prüfungssimulation.\n\n• ${EXAM_CONFIG.TOTAL_QUESTIONS} Fragen\n• ${EXAM_CONFIG.TIME_LIMIT_MINUTES} Minuten Zeit\n• Maximal ${EXAM_CONFIG.MAX_ERROR_POINTS} Fehlerpunkte\n\nViel Erfolg! 🍀`,
      [
        { text: 'Abbrechen', style: 'cancel' },
        { text: 'Jetzt starten', onPress: startExam },
      ]
    );
  };

  const startExam = async () => {
    setIsLoading(true);
    try {
      // Lade 30 zufällige Fragen
      await loadRandom(EXAM_CONFIG.TOTAL_QUESTIONS);

      // Navigiere zum ExamQuestion Screen
      navigation.navigate('ExamQuestion', {
        isExamMode: true,
        timeLimit: EXAM_CONFIG.TIME_LIMIT_MINUTES * 60, // in Sekunden
      });
    } catch (error) {
      console.error('Error starting exam:', error);
      Alert.alert('Fehler', 'Prüfung konnte nicht gestartet werden.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="clipboard" size={64} color={Colors.primary} />
        <Text style={styles.title}>Prüfungssimulation</Text>
        <Text style={styles.subtitle}>
          Teste dein Wissen unter echten Prüfungsbedingungen
        </Text>
      </View>

      {/* Premium Badge */}
      {!isPremium && (
        <View style={styles.premiumBanner}>
          <Ionicons name="star" size={24} color={Colors.premium} />
          <Text style={styles.premiumText}>Premium Feature</Text>
        </View>
      )}

      {/* Exam Info Cards */}
      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Ionicons name="document-text" size={32} color={Colors.primary} />
          <Text style={styles.infoNumber}>{EXAM_CONFIG.TOTAL_QUESTIONS}</Text>
          <Text style={styles.infoLabel}>Fragen</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="time" size={32} color={Colors.secondary} />
          <Text style={styles.infoNumber}>{EXAM_CONFIG.TIME_LIMIT_MINUTES}</Text>
          <Text style={styles.infoLabel}>Minuten</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="warning" size={32} color={Colors.error} />
          <Text style={styles.infoNumber}>{EXAM_CONFIG.MAX_ERROR_POINTS}</Text>
          <Text style={styles.infoLabel}>Max. Fehler</Text>
        </View>
      </View>

      {/* Prüfungsregeln */}
      <View style={styles.rulesContainer}>
        <Text style={styles.rulesTitle}>Prüfungsregeln</Text>

        <View style={styles.rule}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.ruleText}>
            Die Prüfung besteht aus {EXAM_CONFIG.TOTAL_QUESTIONS} zufällig ausgewählten Fragen
          </Text>
        </View>

        <View style={styles.rule}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.ruleText}>
            Du hast {EXAM_CONFIG.TIME_LIMIT_MINUTES} Minuten Zeit für alle Fragen
          </Text>
        </View>

        <View style={styles.rule}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.ruleText}>
            Du darfst maximal {EXAM_CONFIG.MAX_ERROR_POINTS} Fehlerpunkte sammeln
          </Text>
        </View>

        <View style={styles.rule}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.ruleText}>
            Jede Frage hat 2-5 Punkte je nach Schwierigkeit
          </Text>
        </View>

        <View style={styles.rule}>
          <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
          <Text style={styles.ruleText}>
            Die Prüfung kann nicht pausiert werden
          </Text>
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={[styles.startButton, isLoading && styles.startButtonDisabled]}
        onPress={handleStartExam}
        disabled={isLoading}
      >
        <Ionicons name="play-circle" size={24} color="#FFFFFF" />
        <Text style={styles.startButtonText}>
          {isLoading ? 'Wird geladen...' : 'Prüfung starten'}
        </Text>
      </TouchableOpacity>

      {/* Exam History */}
      {isPremium && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Letzte Prüfungen</Text>
          <View style={styles.emptyHistory}>
            <Ionicons name="time-outline" size={48} color={Colors.textDisabled} />
            <Text style={styles.emptyText}>Noch keine Prüfungen absolviert</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
  },
  title: {
    ...Typography.h2,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.premium + '20',
    padding: Spacing.md,
    margin: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.premium,
  },
  premiumText: {
    ...Typography.bodyBold,
    color: Colors.premiumDark,
    marginLeft: Spacing.sm,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Spacing.md,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: Spacing.xs,
    ...Shadows.medium,
  },
  infoNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
    marginVertical: Spacing.xs,
  },
  infoLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  rulesContainer: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  rulesTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  rule: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  ruleText: {
    ...Typography.body,
    flex: 1,
    marginLeft: Spacing.sm,
    color: Colors.textSecondary,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.large,
  },
  startButtonDisabled: {
    opacity: 0.6,
  },
  startButtonText: {
    ...Typography.h3,
    color: '#FFFFFF',
    marginLeft: Spacing.sm,
  },
  historyContainer: {
    margin: Spacing.md,
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
  },
  historyTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  emptyHistory: {
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textDisabled,
    marginTop: Spacing.sm,
  },
});
