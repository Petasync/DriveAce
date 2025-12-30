/**
 * DriveAce - Main Entry Point
 * Fahrschul-Lern-App für Führerschein Klasse B
 */

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import DatabaseService from './src/services/database/DatabaseService';
import { LogBox } from 'react-native';

// Ignore specific warnings in development
if (__DEV__) {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
}

export default function App() {
  useEffect(() => {
    // Initialize Database on App Start
    const initializeApp = async () => {
      try {
        console.log('🚀 Initializing DriveAce...');
        await DatabaseService.init();
        console.log('✅ App initialized successfully');
      } catch (error) {
        console.error('❌ App initialization error:', error);
      }
    };

    initializeApp();
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
