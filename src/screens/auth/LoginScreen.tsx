/**
 * Login Screen - Placeholder
 * TODO: Implement full login functionality
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';

export default function LoginScreen() {
  const { setUser } = useAuthStore();

  const handleGuestLogin = () => {
    // Für Development: Direkter Login als Guest
    setUser(null); // Triggers local_user mode
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>DriveAce</Text>
        <Text style={styles.subtitle}>Dein Weg zum Führerschein</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.info}>
          Login-Funktionalität wird in Phase 2 implementiert
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleGuestLogin}>
          <Text style={styles.buttonText}>Als Gast fortfahren</Text>
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
    backgroundColor: Colors.primary,
    paddingTop: 100,
    paddingBottom: 50,
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
    color: '#FFFFFF',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.body,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    ...Typography.body,
    textAlign: 'center',
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 8,
  },
  buttonText: {
    ...Typography.bodyBold,
    color: '#FFFFFF',
  },
});
