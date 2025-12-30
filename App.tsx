/**
 * DriveAce - Main Entry Point
 * Fahrschul-Lern-App für Führerschein Klasse B
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import DatabaseService from './src/services/database/DatabaseService';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { ErrorBoundary } from './src/components/common/ErrorBoundary';
import { useSettingsStore } from './src/store/settingsStore';
import { LogBox } from 'react-native';

// Ignore specific warnings in development
if (__DEV__) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
}

export default function App() {
  const loadSettings = useSettingsStore(state => state.loadSettings);

  useEffect(() => {
    // Initialize Database and Settings on App Start
    const initializeApp = async () => {
      try {
        console.log('🚀 Initializing DriveAce...');

        // Load Database
        await DatabaseService.init();

        // Load Settings from AsyncStorage
        await loadSettings();

        console.log('✅ App initialized successfully');
      } catch (error) {
        console.error('❌ App initialization error:', error);
      }
    };

    initializeApp();
  }, [loadSettings]);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppNavigator />
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
