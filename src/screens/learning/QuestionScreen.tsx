/**
 * QuestionScreen - Hauptfeature der App
 * Zeigt Fragen an und verwaltet Antworten
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { useQuestionStore } from '../../store/questionStore';
import { useProgress, useFavorites } from '../../hooks/useProgress';
import { AnswerButton } from '../../components/questions/AnswerButton';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Question, Answer } from '../../types/database.types';

interface QuestionScreenProps {
  route: any;
  navigation: any;
}

export default function QuestionScreen({ route, navigation }: QuestionScreenProps) {
  const { questions: routeQuestions, currentIndex: routeIndex } = route.params || {};

  const {
    questions,
    currentQuestion,
    currentIndex,
    setQuestions,
    setCurrentIndex,
    nextQuestion,
    previousQuestion,
    answerQuestion,
    isFirstQuestion,
    isLastQuestion,
  } = useQuestionStore();

  const { saveAnswer } = useProgress();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Initialize questions from route params
  useEffect(() => {
    if (routeQuestions && routeQuestions.length > 0) {
      setQuestions(routeQuestions);
      if (routeIndex !== undefined) {
        setCurrentIndex(routeIndex);
      }
    }
  }, []);

  if (!currentQuestion) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Keine Frage verfügbar</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Zurück</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAnswerSelect = async (answer: Answer) => {
    if (showExplanation) return; // Bereits beantwortet

    setSelectedAnswerId(answer.id);
    setIsAnswerCorrect(answer.is_correct);
    setShowExplanation(true);

    // Speichere Progress
    await saveAnswer(currentQuestion.id, answer.is_correct);
    answerQuestion(currentQuestion.id, answer.is_correct);
  };

  const handleNext = () => {
    if (isLastQuestion()) {
      Alert.alert(
        'Glückwunsch!',
        'Du hast alle Fragen beantwortet!',
        [
          { text: 'Zurück', onPress: () => navigation.goBack() },
          { text: 'Nochmal', onPress: resetAndRestart },
        ]
      );
      return;
    }

    nextQuestion();
    resetQuestionState();
  };

  const handlePrevious = () => {
    if (!isFirstQuestion()) {
      previousQuestion();
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswerId(null);
    setShowExplanation(false);
    setIsAnswerCorrect(null);
  };

  const resetAndRestart = () => {
    setCurrentIndex(0);
    resetQuestionState();
  };

  const handleToggleFavorite = async () => {
    await toggleFavorite(currentQuestion.id);
  };

  const isQuestionFavorite = isFavorite(currentQuestion.id);

  return (
    <View style={styles.container}>
      {/* Header with Progress */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.questionInfo}>
            <Text style={styles.questionNumber}>
              Frage {currentIndex + 1} von {questions.length}
            </Text>
            <View style={styles.pointsBadge}>
              <Text style={styles.pointsText}>{currentQuestion.points} Punkte</Text>
            </View>
          </View>
          <TouchableOpacity onPress={handleToggleFavorite}>
            <Ionicons
              name={isQuestionFavorite ? 'star' : 'star-outline'}
              size={28}
              color={isQuestionFavorite ? Colors.warning : Colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        <ProgressBar
          current={currentIndex + 1}
          total={questions.length}
          showLabel={false}
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{currentQuestion.question_text}</Text>

          {currentQuestion.image_url && (
            <Image
              source={{ uri: currentQuestion.image_url }}
              style={styles.questionImage}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Answers */}
        <View style={styles.answersContainer}>
          {currentQuestion.answers?.map((answer, index) => (
            <AnswerButton
              key={answer.id}
              text={answer.answer_text}
              isSelected={selectedAnswerId === answer.id}
              isCorrect={answer.is_correct}
              showResult={showExplanation}
              onPress={() => handleAnswerSelect(answer)}
              disabled={showExplanation}
              index={index}
            />
          ))}
        </View>

        {/* Explanation */}
        {showExplanation && currentQuestion.explanation && (
          <View style={styles.explanationContainer}>
            <View style={styles.explanationHeader}>
              <Ionicons
                name={isAnswerCorrect ? 'checkmark-circle' : 'close-circle'}
                size={32}
                color={isAnswerCorrect ? Colors.success : Colors.error}
              />
              <Text style={[
                styles.explanationTitle,
                { color: isAnswerCorrect ? Colors.success : Colors.error }
              ]}>
                {isAnswerCorrect ? 'Richtig!' : 'Falsch!'}
              </Text>
            </View>
            <Text style={styles.explanationText}>
              {currentQuestion.explanation}
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, isFirstQuestion() && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={isFirstQuestion()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={isFirstQuestion() ? Colors.textDisabled : Colors.primary}
          />
          <Text
            style={[
              styles.navButtonText,
              isFirstQuestion() && styles.navButtonTextDisabled,
            ]}
          >
            Zurück
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.navButtonPrimary,
            !showExplanation && styles.navButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={!showExplanation}
        >
          <Text style={styles.navButtonTextPrimary}>
            {isLastQuestion() ? 'Fertig' : 'Weiter'}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
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
    paddingTop: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.small,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  questionInfo: {
    flex: 1,
    alignItems: 'center',
  },
  questionNumber: {
    ...Typography.bodyBold,
    marginBottom: Spacing.xs / 2,
  },
  pointsBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  pointsText: {
    ...Typography.small,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  questionContainer: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
  },
  questionText: {
    ...Typography.h3,
    lineHeight: 28,
    marginBottom: Spacing.md,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  answersContainer: {
    paddingHorizontal: Spacing.md,
  },
  explanationContainer: {
    backgroundColor: Colors.surface,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    ...Shadows.medium,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  explanationTitle: {
    ...Typography.h3,
    marginLeft: Spacing.sm,
  },
  explanationText: {
    ...Typography.body,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.small,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    flex: 1,
    marginHorizontal: Spacing.xs,
    justifyContent: 'center',
  },
  navButtonPrimary: {
    backgroundColor: Colors.primary,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    ...Typography.bodyBold,
    color: Colors.primary,
    marginLeft: Spacing.xs,
  },
  navButtonTextDisabled: {
    color: Colors.textDisabled,
  },
  navButtonTextPrimary: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
    marginRight: Spacing.xs,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  errorText: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginBottom: Spacing.lg,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
  },
  buttonText: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
  },
});
