/**
 * CategoryScreen - Zeigt alle Fragenkategorien an
 * User kann Kategorie auswählen um Fragen zu lernen
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { useCategories } from '../../hooks/useDatabase';
import { useProgress } from '../../hooks/useProgress';
import { CategoryCard } from '../../components/common/CategoryCard';
import { CategoryProgress } from '../../types/database.types';

interface CategoryScreenProps {
  navigation: any;
}

export default function CategoryScreen({ navigation }: CategoryScreenProps) {
  const { categories, loading, refresh } = useCategories();
  const { getCategoryProgress } = useProgress();
  const [categoryProgress, setCategoryProgress] = useState<Map<number, CategoryProgress>>(new Map());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProgress();
  }, [categories]);

  const loadProgress = async () => {
    const progressMap = new Map<number, CategoryProgress>();

    for (const category of categories) {
      const progress = await getCategoryProgress(category.id);
      if (progress) {
        progressMap.set(category.id, progress);
      }
    }

    setCategoryProgress(progressMap);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refresh();
    await loadProgress();
    setRefreshing(false);
  };

  const handleCategoryPress = (categoryId: number, categoryName: string) => {
    navigation.navigate('QuestionList', {
      categoryId,
      categoryName,
    });
  };

  if (loading && categories.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Lade Kategorien...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Wähle eine Kategorie</Text>
        <Text style={styles.subtitle}>
          Lerne gezielt nach Themengebieten
        </Text>
      </View>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => {
          const progress = categoryProgress.get(category.id);

          return (
            <CategoryCard
              key={category.id}
              name={category.name}
              description={category.description}
              icon={category.icon}
              totalQuestions={progress?.total_questions || 0}
              answeredQuestions={progress?.answered_questions || 0}
              accuracy={progress?.accuracy_percentage}
              onPress={() => handleCategoryPress(category.id, category.name)}
            />
          );
        })}
      </View>

      {categories.length === 0 && !loading && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Keine Kategorien verfügbar</Text>
          <Text style={styles.emptySubtext}>
            Bitte warten Sie, während die Daten geladen werden
          </Text>
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
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  categoriesContainer: {
    paddingVertical: Spacing.md,
  },
  emptyContainer: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...Typography.h3,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    ...Typography.body,
    color: Colors.textDisabled,
    textAlign: 'center',
  },
});
