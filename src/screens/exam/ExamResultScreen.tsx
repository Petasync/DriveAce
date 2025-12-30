/**
 * ExamResultScreen - Zeigt Prüfungsergebnis
 * Passed/Failed, Fehleranalyse, Statistiken
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { EXAM_CONFIG } from '../../constants/config';
import { formatTime, calculatePercentage } from '../../utils/helpers';

interface ExamResultScreenProps {
  route: any;
  navigation: any;
}

export default function ExamResultScreen({ route, navigation }: ExamResultScreenProps) {
  const {
    passed,
    errorPoints,
    correctCount,
    wrongCount,
    unanswered,
    totalQuestions,
    timeUsed,
  } = route.params;

  const accuracy = calculatePercentage(correctCount, totalQuestions - unanswered);

  const handleBackToExam = () => {
    navigation.navigate('Exam');
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Result Header */}
      <View style={[
        styles.resultHeader,
        passed ? styles.resultHeaderPassed : styles.resultHeaderFailed
      ]}>
        <Ionicons
          name={passed ? 'checkmark-circle' : 'close-circle'}
          size={80}
          color={passed ? Colors.success : Colors.error}
        />
        <Text style={styles.resultTitle}>
          {passed ? 'Bestanden!' : 'Nicht bestanden'}
        </Text>
        <Text style={styles.resultSubtitle}>
          {passed
            ? 'Glückwunsch! Du hast die Prüfung bestanden.'
            : 'Leider hast du die Prüfung nicht bestanden. Übe weiter!'}
        </Text>
      </View>

      {/* Error Points */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fehlerpunkte</Text>
        <View style={styles.errorPointsContainer}>
          <Text style={[
            styles.errorPointsNumber,
            errorPoints <= EXAM_CONFIG.MAX_ERROR_POINTS ? styles.errorPointsGood : styles.errorPointsBad
          ]}>
            {errorPoints}
          </Text>
          <Text style={styles.errorPointsMax}>von {EXAM_CONFIG.MAX_ERROR_POINTS}</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[
              styles.progressBarFill,
              {
                width: `${Math.min((errorPoints / EXAM_CONFIG.MAX_ERROR_POINTS) * 100, 100)}%`,
                backgroundColor: errorPoints <= EXAM_CONFIG.MAX_ERROR_POINTS ? Colors.success : Colors.error,
              }
            ]} />
          </View>
        </View>
      </View>

      {/* Statistics */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Statistik</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={32} color={Colors.success} />
            <Text style={styles.statNumber}>{correctCount}</Text>
            <Text style={styles.statLabel}>Richtig</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="close-circle" size={32} color={Colors.error} />
            <Text style={styles.statNumber}>{wrongCount}</Text>
            <Text style={styles.statLabel}>Falsch</Text>
          </View>

          <View style={styles.statItem}>
            <Ionicons name="help-circle" size={32} color={Colors.textDisabled} />
            <Text style={styles.statNumber}>{unanswered}</Text>
            <Text style={styles.statLabel}>Unbeantwortet</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Genauigkeit</Text>
            <Text style={styles.detailValue}>{accuracy}%</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Zeit verwendet</Text>
            <Text style={styles.detailValue}>{formatTime(timeUsed)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Zeit übrig</Text>
            <Text style={styles.detailValue}>
              {formatTime(EXAM_CONFIG.TIME_LIMIT_MINUTES * 60 - timeUsed)}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Gesamtfragen</Text>
            <Text style={styles.detailValue}>{totalQuestions}</Text>
          </View>
        </View>
      </View>

      {/* Feedback */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {passed ? '🎉 Hervorragend!' : '💪 Weiter üben!'}
        </Text>
        <Text style={styles.feedbackText}>
          {passed
            ? 'Du hast die Prüfung mit Bravour bestanden! Du bist bereit für die echte Führerscheinprüfung. Weiter so!'
            : wrongCount > 15
            ? 'Du solltest noch mehr üben. Konzentriere dich auf deine schwachen Kategorien und wiederhole die Fragen regelmäßig.'
            : errorPoints > EXAM_CONFIG.MAX_ERROR_POINTS
            ? 'Du warst nah dran! Achte besonders auf Fragen mit hoher Punktzahl und übe die schwierigen Kategorien.'
            : 'Gute Leistung! Mit etwas mehr Übung schaffst du die Prüfung beim nächsten Mal.'}
        </Text>
      </View>

      {/* Tips */}
      {!passed && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tipps zum Verbessern</Text>
          <View style={styles.tipsList}>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color={Colors.warning} />
              <Text style={styles.tipText}>
                Übe täglich mindestens 30 Minuten mit verschiedenen Fragen
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color={Colors.warning} />
              <Text style={styles.tipText}>
                Konzentriere dich auf Kategorien mit vielen Fehlern
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color={Colors.warning} />
              <Text style={styles.tipText}>
                Lies die Erklärungen sorgfältig durch
              </Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="bulb" size={20} color={Colors.warning} />
              <Text style={styles.tipText}>
                Wiederhole schwierige Fragen regelmäßig
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleBackToExam}
        >
          <Ionicons name="refresh" size={20} color="#FFFFFF" />
          <Text style={styles.primaryButtonText}>Neue Prüfung</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleBackToHome}
        >
          <Ionicons name="home" size={20} color={Colors.primary} />
          <Text style={styles.secondaryButtonText}>Zur Startseite</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  resultHeader: {
    alignItems: 'center',
    padding: Spacing.xl,
    paddingVertical: Spacing.xl * 2,
  },
  resultHeaderPassed: {
    backgroundColor: Colors.success + '20',
  },
  resultHeaderFailed: {
    backgroundColor: Colors.error + '20',
  },
  resultTitle: {
    ...Typography.h1,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  resultSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  card: {
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
  errorPointsContainer: {
    alignItems: 'center',
    marginVertical: Spacing.md,
  },
  errorPointsNumber: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  errorPointsGood: {
    color: Colors.success,
  },
  errorPointsBad: {
    color: Colors.error,
  },
  errorPointsMax: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  progressBarContainer: {
    marginTop: Spacing.md,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  detailsContainer: {
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  detailLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  detailValue: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  feedbackText: {
    ...Typography.body,
    lineHeight: 24,
  },
  tipsList: {
    gap: Spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    ...Typography.body,
    flex: 1,
    marginLeft: Spacing.sm,
  },
  actionsContainer: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    ...Shadows.large,
  },
  primaryButtonText: {
    ...Typography.h3,
    color: '#FFFFFF',
    marginLeft: Spacing.sm,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  secondaryButtonText: {
    ...Typography.bodyBold,
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
  footer: {
    height: Spacing.xl,
  },
});
