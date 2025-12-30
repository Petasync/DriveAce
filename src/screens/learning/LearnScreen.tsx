/**
 * LearnScreen - Hauptübersicht für Lernmodi
 * Bietet verschiedene Optionen zum Lernen
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
import { useQuestions } from '../../hooks/useDatabase';

interface LearnScreenProps {
  navigation: any;
}

interface LearningModeCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  onPress: () => void;
  badge?: string;
}

const LearningModeCard: React.FC<LearningModeCardProps> = ({
  title,
  description,
  icon,
  color,
  onPress,
  badge,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={32} color={color} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{title}</Text>
          {badge && (
            <View style={[styles.badge, { backgroundColor: color }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={Colors.textDisabled} />
    </TouchableOpacity>
  );
};

export default function LearnScreen({ navigation }: LearnScreenProps) {
  const { loadRandom } = useQuestions();

  const handleLearnByCategory = () => {
    navigation.navigate('CategoryList');
  };

  const handleRandomQuestions = async () => {
    const randomQuestions = await new Promise<any[]>((resolve) => {
      loadRandom(20).then(() => resolve([])); // Simplified for now
    });

    // Lade zufällige Fragen und navigiere zum QuestionScreen
    navigation.navigate('QuestionStart', {
      mode: 'random',
      count: 20,
    });
  };

  const handleAllQuestions = () => {
    navigation.navigate('QuestionStart', {
      mode: 'all',
    });
  };

  const handleFavorites = () => {
    navigation.navigate('QuestionStart', {
      mode: 'favorites',
    });
  };

  const handleMistakes = () => {
    navigation.navigate('QuestionStart', {
      mode: 'mistakes',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lernmodi</Text>
        <Text style={styles.subtitle}>
          Wähle deinen bevorzugten Lernmodus
        </Text>
      </View>

      <View style={styles.modesContainer}>
        <LearningModeCard
          title="Nach Kategorie"
          description="Lerne gezielt einzelne Themengebiete"
          icon="list"
          color={Colors.primary}
          onPress={handleLearnByCategory}
        />

        <LearningModeCard
          title="Zufällige Fragen"
          description="20 zufällig ausgewählte Fragen"
          icon="shuffle"
          color={Colors.secondary}
          onPress={handleRandomQuestions}
          badge="Empfohlen"
        />

        <LearningModeCard
          title="Alle Fragen"
          description="Durcharbeite alle verfügbaren Fragen"
          icon="book"
          color="#9C27B0"
          onPress={handleAllQuestions}
        />

        <LearningModeCard
          title="Favoriten"
          description="Wiederhole deine markierten Fragen"
          icon="star"
          color={Colors.warning}
          onPress={handleFavorites}
        />

        <LearningModeCard
          title="Fehlertraining"
          description="Übe Fragen, die du falsch beantwortet hast"
          icon="alert-circle"
          color={Colors.error}
          onPress={handleMistakes}
          badge="Premium"
        />
      </View>

      <View style={styles.tipsContainer}>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color={Colors.warning} />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Tipp</Text>
            <Text style={styles.tipText}>
              Beantworte täglich mindestens 20 Fragen, um deinen Lernstreak aufrechtzuerhalten!
            </Text>
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
  modesContainer: {
    paddingVertical: Spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    ...Shadows.medium,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs / 2,
  },
  cardTitle: {
    ...Typography.h3,
    marginRight: Spacing.sm,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs / 2,
    borderRadius: BorderRadius.sm,
  },
  badgeText: {
    ...Typography.small,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  tipsContainer: {
    padding: Spacing.md,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: Colors.warning + '10',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.warning,
  },
  tipContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  tipTitle: {
    ...Typography.bodyBold,
    marginBottom: Spacing.xs / 2,
  },
  tipText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
