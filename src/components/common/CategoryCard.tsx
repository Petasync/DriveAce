/**
 * CategoryCard Component - Zeigt eine Kategorie mit Progress an
 */

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { ProgressBar } from './ProgressBar';

interface CategoryCardProps {
  name: string;
  description?: string;
  icon?: string;
  totalQuestions?: number;
  answeredQuestions?: number;
  accuracy?: number;
  onPress: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  description,
  icon,
  totalQuestions = 0,
  answeredQuestions = 0,
  accuracy,
  onPress,
}) => {
  // Map icon names to Ionicons
  const iconMap: Record<string, any> = {
    'sign-caution': 'warning',
    'arrow-decision': 'git-branch',
    'speedometer': 'speedometer',
    'car-brake-alert': 'car',
    'car-multiple': 'car-sport',
    'leaf': 'leaf',
    'account-group': 'people',
  };

  const iconName = icon ? iconMap[icon] || 'help-circle' : 'help-circle';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name={iconName} size={28} color={Colors.primary} />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{name}</Text>
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
        <Ionicons name="chevron-forward" size={24} color={Colors.textDisabled} />
      </View>

      {totalQuestions > 0 && (
        <View style={styles.progressSection}>
          <ProgressBar
            current={answeredQuestions}
            total={totalQuestions}
            showLabel={false}
          />
          <View style={styles.stats}>
            <Text style={styles.statText}>
              {answeredQuestions} / {totalQuestions} Fragen
            </Text>
            {accuracy !== undefined && answeredQuestions > 0 && (
              <Text style={[styles.statText, styles.accuracy]}>
                {accuracy}% korrekt
              </Text>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  content: {
    flex: 1,
  },
  title: {
    ...Typography.h3,
    marginBottom: Spacing.xs / 2,
  },
  description: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  progressSection: {
    marginTop: Spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  statText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  accuracy: {
    color: Colors.primary,
    fontWeight: '600',
  },
});
