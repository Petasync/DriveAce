/**
 * Settings Store - Zustand State Management für App-Einstellungen
 */

import { create } from 'zustand';
import { ThemeMode } from '../types/models';

interface SettingsState {
  // Display Settings
  themeMode: ThemeMode;
  isDarkMode: boolean;

  // App Settings
  notificationsEnabled: boolean;
  soundEnabled: boolean;

  // Learning Settings
  dailyGoal: number;
  showExplanationsImmediately: boolean;

  // Actions
  setThemeMode: (mode: ThemeMode) => void;
  setDarkMode: (enabled: boolean) => void;
  toggleDarkMode: () => void;

  setNotifications: (enabled: boolean) => void;
  toggleNotifications: () => void;

  setSound: (enabled: boolean) => void;
  toggleSound: () => void;

  setDailyGoal: (goal: number) => void;
  setShowExplanationsImmediately: (show: boolean) => void;

  loadSettings: () => Promise<void>;
  saveSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  themeMode: 'auto',
  isDarkMode: false,
  notificationsEnabled: true,
  soundEnabled: true,
  dailyGoal: 30,
  showExplanationsImmediately: false,

  setThemeMode: (mode) => {
    set({ themeMode: mode });
    // Hier würde man auch System Theme Detection durchführen
    if (mode === 'dark') {
      set({ isDarkMode: true });
    } else if (mode === 'light') {
      set({ isDarkMode: false });
    }
  },

  setDarkMode: (enabled) => set({ isDarkMode: enabled }),

  toggleDarkMode: () => {
    const { isDarkMode } = get();
    set({
      isDarkMode: !isDarkMode,
      themeMode: !isDarkMode ? 'dark' : 'light',
    });
  },

  setNotifications: (enabled) => set({ notificationsEnabled: enabled }),

  toggleNotifications: () => {
    const { notificationsEnabled } = get();
    set({ notificationsEnabled: !notificationsEnabled });
  },

  setSound: (enabled) => set({ soundEnabled: enabled }),

  toggleSound: () => {
    const { soundEnabled } = get();
    set({ soundEnabled: !soundEnabled });
  },

  setDailyGoal: (goal) => set({ dailyGoal: goal }),

  setShowExplanationsImmediately: (show) => set({ showExplanationsImmediately: show }),

  loadSettings: async () => {
    // Hier würde man Settings aus AsyncStorage oder Database laden
    try {
      // TODO: Implement loading from AsyncStorage
      console.log('⚙️ Loading settings...');
    } catch (error) {
      console.error('❌ Error loading settings:', error);
    }
  },

  saveSettings: async () => {
    // Hier würde man Settings in AsyncStorage oder Database speichern
    try {
      // TODO: Implement saving to AsyncStorage
      console.log('💾 Saving settings...');
    } catch (error) {
      console.error('❌ Error saving settings:', error);
    }
  },
}));
