/**
 * QuestionListScreen - Zeigt Liste der Fragen in einer Kategorie
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { useQuestions } from '../../hooks/useDatabase';
import { Question } from '../../types/database.types';

interface QuestionListScreenProps {
  route: any;
  navigation: any;
}

export default function QuestionListScreen({ route, navigation }: QuestionListScreenProps) {
  const { categoryId, categoryName } = route.params;
  const { questions, loading } = useQuestions(categoryId);

  const handleQuestionPress = (questionIndex: number) => {
    navigation.navigate('QuestionDetail', {
      questions,
      currentIndex: questionIndex,
    });
  };

  const handleStartAll = () => {
    if (questions.length > 0) {
      navigation.navigate('QuestionDetail', {
        questions,
        currentIndex: 0,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Lade Fragen...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={Colors.textDisabled} />
        <Text style={styles.emptyText}>Keine Fragen verfügbar</Text>
        <Text style={styles.emptySubtext}>
          Für diese Kategorie sind noch keine Fragen vorhanden.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, index }: { item: Question; index: number }) => (
    <TouchableOpacity
      style={styles.questionItem}
      onPress={() => handleQuestionPress(index)}
      activeOpacity={0.7}
    >
      <View style={styles.questionNumber}>
        <Text style={styles.questionNumberText}>{index + 1}</Text>
      </View>
      <View style={styles.questionContent}>
        <Text style={styles.questionText} numberOfLines={2}>
          {item.question_text}
        </Text>
        <View style={styles.questionMeta}>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{item.points} Pkt</Text>
          </View>
          <Text style={styles.difficultyText}>
            {item.difficulty === 'easy' ? '😊 Leicht' :
             item.difficulty === 'hard' ? '😰 Schwer' : '😐 Mittel'}
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color={Colors.textDisabled} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <Text style={styles.headerSubtitle}>
          {questions.length} {questions.length === 1 ? 'Frage' : 'Fragen'}
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStartAll}>
          <Ionicons name="play" size={20} color="#FFFFFF" />
          <Text style={styles.startButtonText}>Alle Fragen starten</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  emptyText: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textDisabled,
    textAlign: 'center',
  },
  header: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.md,
    ...Shadows.medium,
  },
  startButtonText: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
    marginLeft: Spacing.sm,
  },
  listContainer: {
    paddingVertical: Spacing.sm,
  },
  questionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    ...Shadows.small,
  },
  questionNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  questionNumberText: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  questionContent: {
    flex: 1,
  },
  questionText: {
    ...Typography.body,
    marginBottom: Spacing.xs,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.sm,
  },
  pointsText: {
    ...Typography.small,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  difficultyText: {
    ...Typography.small,
    color: Colors.textSecondary,
  },
});
