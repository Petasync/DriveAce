/**
 * ProgressBar Component - Zeigt Fortschritt visuell an
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../constants/theme';

interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  total,
  showLabel = true,
  color = Colors.primary,
  height = 12,
}) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  const displayPercentage = Math.round(percentage);

  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { height }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${percentage}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text style={styles.label}>
          {current} / {total} ({displayPercentage}%)
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  progressBar: {
    width: '100%',
    backgroundColor: Colors.divider,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
    transition: 'width 0.3s ease',
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'right',
  },
});
