/**
 * ExamQuestionScreen - Prüfungssimulation mit Timer
 * 30 Fragen, 45 Minuten, max 10 Fehlerpunkte
 */

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { useQuestionsStore } from '../../store/questionsStore';
import { Answer } from '../../types/database.types';
import { EXAM_CONFIG } from '../../constants/config';
import { formatTime } from '../../utils/helpers';

interface ExamQuestionScreenProps {
  route: any;
  navigation: any;
}

interface ExamAnswer {
  questionId: number;
  selectedAnswerId: number | null;
  isCorrect: boolean | null;
  points: number;
}

export default function ExamQuestionScreen({ route, navigation }: ExamQuestionScreenProps) {
  const { questions } = useQuestionsStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [examAnswers, setExamAnswers] = useState<ExamAnswer[]>(
    questions.map(q => ({
      questionId: q.id,
      selectedAnswerId: null,
      isCorrect: null,
      points: q.points,
    }))
  );
  const [timeRemaining, setTimeRemaining] = useState(EXAM_CONFIG.TIME_LIMIT_MINUTES * 60);
  const [isPaused, setIsPaused] = useState(false);

  const currentQuestion = questions[currentIndex];
  const currentAnswer = examAnswers[currentIndex];

  // Timer
  useEffect(() => {
    if (isPaused || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, timeRemaining]);

  const handleTimeUp = () => {
    Alert.alert(
      'Zeit abgelaufen!',
      'Die Prüfungszeit von 45 Minuten ist vorbei. Die Prüfung wird jetzt ausgewertet.',
      [{ text: 'OK', onPress: handleSubmitExam }]
    );
  };

  const handleAnswerSelect = (answer: Answer) => {
    const newAnswers = [...examAnswers];
    newAnswers[currentIndex] = {
      ...newAnswers[currentIndex],
      selectedAnswerId: answer.id,
      isCorrect: answer.is_correct,
    };
    setExamAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleQuestionJump = (index: number) => {
    setCurrentIndex(index);
  };

  const calculateErrorPoints = useCallback(() => {
    return examAnswers.reduce((total, answer) => {
      if (answer.isCorrect === false) {
        return total + answer.points;
      }
      return total;
    }, 0);
  }, [examAnswers]);

  const handleSubmitExam = () => {
    const unanswered = examAnswers.filter(a => a.selectedAnswerId === null).length;

    if (unanswered > 0) {
      Alert.alert(
        'Prüfung abgeben?',
        `Du hast noch ${unanswered} unbeantwortete Fragen. Möchtest du die Prüfung trotzdem abgeben?`,
        [
          { text: 'Abbrechen', style: 'cancel' },
          { text: 'Abgeben', onPress: submitExam },
        ]
      );
    } else {
      Alert.alert(
        'Prüfung abgeben?',
        'Möchtest du die Prüfung jetzt abgeben und auswerten lassen?',
        [
          { text: 'Abbrechen', style: 'cancel' },
          { text: 'Abgeben', onPress: submitExam },
        ]
      );
    }
  };

  const submitExam = () => {
    const errorPoints = calculateErrorPoints();
    const correctCount = examAnswers.filter(a => a.isCorrect === true).length;
    const wrongCount = examAnswers.filter(a => a.isCorrect === false).length;
    const unanswered = examAnswers.filter(a => a.selectedAnswerId === null).length;
    const passed = errorPoints <= EXAM_CONFIG.MAX_ERROR_POINTS;

    navigation.replace('ExamResult', {
      passed,
      errorPoints,
      correctCount,
      wrongCount,
      unanswered,
      totalQuestions: EXAM_CONFIG.TOTAL_QUESTIONS,
      timeUsed: EXAM_CONFIG.TIME_LIMIT_MINUTES * 60 - timeRemaining,
    });
  };

  const answeredCount = examAnswers.filter(a => a.selectedAnswerId !== null).length;
  const errorPoints = calculateErrorPoints();
  const progress = (answeredCount / EXAM_CONFIG.TOTAL_QUESTIONS) * 100;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.timerContainer}>
          <Ionicons
            name="time"
            size={24}
            color={timeRemaining < 300 ? Colors.error : Colors.primary}
          />
          <Text style={[
            styles.timer,
            timeRemaining < 300 && styles.timerWarning
          ]}>
            {formatTime(timeRemaining)}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Frage</Text>
            <Text style={styles.statValue}>{currentIndex + 1}/{EXAM_CONFIG.TOTAL_QUESTIONS}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Fehler</Text>
            <Text style={[
              styles.statValue,
              errorPoints > EXAM_CONFIG.MAX_ERROR_POINTS && styles.statError
            ]}>
              {errorPoints}/{EXAM_CONFIG.MAX_ERROR_POINTS}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>

      {/* Question */}
      <ScrollView style={styles.content}>
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionNumber}>Frage {currentIndex + 1}</Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{currentQuestion.points} Punkte</Text>
            </View>
          </View>

          {currentQuestion.image_url && (
            <Image
              source={{ uri: currentQuestion.image_url }}
              style={styles.questionImage}
              resizeMode="contain"
            />
          )}

          <Text style={styles.questionText}>{currentQuestion.question_text}</Text>

          {/* Answers */}
          <View style={styles.answersContainer}>
            {currentQuestion.answers?.map((answer, index) => {
              const isSelected = currentAnswer.selectedAnswerId === answer.id;
              const answerLetter = String.fromCharCode(65 + index);

              return (
                <TouchableOpacity
                  key={answer.id}
                  style={[
                    styles.answerButton,
                    isSelected && styles.answerButtonSelected,
                  ]}
                  onPress={() => handleAnswerSelect(answer)}
                >
                  <View style={[
                    styles.answerLetter,
                    isSelected && styles.answerLetterSelected,
                  ]}>
                    <Text style={[
                      styles.answerLetterText,
                      isSelected && styles.answerLetterTextSelected,
                    ]}>
                      {answerLetter}
                    </Text>
                  </View>
                  <Text style={[
                    styles.answerText,
                    isSelected && styles.answerTextSelected,
                  ]}>
                    {answer.answer_text}
                  </Text>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={Colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Question Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Fragenübersicht</Text>
          <View style={styles.questionGrid}>
            {examAnswers.map((answer, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.questionBox,
                  answer.selectedAnswerId !== null && styles.questionBoxAnswered,
                  index === currentIndex && styles.questionBoxCurrent,
                ]}
                onPress={() => handleQuestionJump(index)}
              >
                <Text style={[
                  styles.questionBoxText,
                  answer.selectedAnswerId !== null && styles.questionBoxTextAnswered,
                  index === currentIndex && styles.questionBoxTextCurrent,
                ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Ionicons name="chevron-back" size={24} color={currentIndex === 0 ? Colors.textDisabled : Colors.primary} />
          <Text style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}>
            Zurück
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmitExam}
        >
          <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
          <Text style={styles.submitButtonText}>Prüfung abgeben</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, currentIndex === questions.length - 1 && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={currentIndex === questions.length - 1}
        >
          <Text style={[styles.navButtonText, currentIndex === questions.length - 1 && styles.navButtonTextDisabled]}>
            Weiter
          </Text>
          <Ionicons name="chevron-forward" size={24} color={currentIndex === questions.length - 1 ? Colors.textDisabled : Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  timer: {
    ...Typography.h2,
    color: Colors.primary,
    marginLeft: Spacing.sm,
  },
  timerWarning: {
    color: Colors.error,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  statValue: {
    ...Typography.bodyBold,
    color: Colors.text,
  },
  statError: {
    color: Colors.error,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  questionCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.medium,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  questionNumber: {
    ...Typography.h3,
  },
  pointsBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  pointsText: {
    ...Typography.small,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },
  questionText: {
    ...Typography.body,
    marginBottom: Spacing.lg,
  },
  answersContainer: {
    gap: Spacing.sm,
  },
  answerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  answerButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '10',
  },
  answerLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  answerLetterSelected: {
    backgroundColor: Colors.primary,
  },
  answerLetterText: {
    ...Typography.bodyBold,
    color: Colors.textSecondary,
  },
  answerLetterTextSelected: {
    color: '#FFFFFF',
  },
  answerText: {
    ...Typography.body,
    flex: 1,
  },
  answerTextSelected: {
    ...Typography.bodyBold,
  },
  overviewCard: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.small,
  },
  overviewTitle: {
    ...Typography.h3,
    marginBottom: Spacing.md,
  },
  questionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  questionBox: {
    width: 48,
    height: 48,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionBoxAnswered: {
    backgroundColor: Colors.success + '20',
    borderColor: Colors.success,
  },
  questionBoxCurrent: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  questionBoxText: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  questionBoxTextAnswered: {
    color: Colors.success,
    fontWeight: '600',
  },
  questionBoxTextCurrent: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  navButtonTextDisabled: {
    color: Colors.textDisabled,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    ...Shadows.medium,
  },
  submitButtonText: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
    marginLeft: Spacing.xs,
  },
});
