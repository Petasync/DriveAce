/**
 * AnswerButton Component - Button für Antwortoptionen
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';

interface AnswerButtonProps {
  text: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult: boolean;
  onPress: () => void;
  disabled?: boolean;
  index?: number;
}

export const AnswerButton: React.FC<AnswerButtonProps> = ({
  text,
  isSelected,
  isCorrect,
  showResult,
  onPress,
  disabled = false,
  index,
}) => {
  // Bestimme den Stil basierend auf State
  const getButtonStyle = () => {
    if (!showResult) {
      // Vor dem Antworten
      return isSelected ? styles.buttonSelected : styles.button;
    }

    // Nach dem Antworten
    if (isCorrect) {
      return styles.buttonCorrect;
    } else if (isSelected && !isCorrect) {
      return styles.buttonWrong;
    }

    return styles.button;
  };

  const getIcon = () => {
    if (!showResult) return null;

    if (isCorrect) {
      return <Ionicons name="checkmark-circle" size={24} color={Colors.success} />;
    } else if (isSelected && !isCorrect) {
      return <Ionicons name="close-circle" size={24} color={Colors.error} />;
    }

    return null;
  };

  const letters = ['A', 'B', 'C', 'D'];
  const letter = index !== undefined && index < letters.length ? letters[index] : '';

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {letter && (
          <View style={styles.letterContainer}>
            <Text style={styles.letterText}>{letter}</Text>
          </View>
        )}
        <Text style={styles.text}>{text}</Text>
        <View style={styles.iconContainer}>{getIcon()}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.border,
    ...Shadows.small,
  },
  buttonSelected: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.primary,
    ...Shadows.medium,
  },
  buttonCorrect: {
    backgroundColor: '#E8F5E9',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.success,
    ...Shadows.medium,
  },
  buttonWrong: {
    backgroundColor: '#FFEBEE',
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.error,
    ...Shadows.medium,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letterContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  letterText: {
    ...Typography.bodyBold,
    color: Colors.primary,
  },
  text: {
    ...Typography.body,
    flex: 1,
  },
  iconContainer: {
    width: 24,
    marginLeft: Spacing.sm,
  },
});
