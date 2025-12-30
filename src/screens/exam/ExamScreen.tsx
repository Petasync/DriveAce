import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../constants/theme';

export default function ExamScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exam Screen</Text>
      <Text style={styles.subtitle}>Premium Feature - Coming Soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: Typography.h2,
  subtitle: { ...Typography.body, color: Colors.textSecondary },
});
