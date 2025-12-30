/**
 * Settings Store - Zustand State Management für App-Einstellungen
 * Mit AsyncStorage Persistence
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeMode } from '../types/models';

const SETTINGS_STORAGE_KEY = '@driveace_settings';

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
    if (mode === 'dark') {
      set({ isDarkMode: true });
    } else if (mode === 'light') {
      set({ isDarkMode: false });
    }
    get().saveSettings();
  },

  setDarkMode: (enabled) => {
    set({ isDarkMode: enabled });
    get().saveSettings();
  },

  toggleDarkMode: () => {
    const { isDarkMode } = get();
    set({
      isDarkMode: !isDarkMode,
      themeMode: !isDarkMode ? 'dark' : 'light',
    });
    get().saveSettings();
  },

  setNotifications: (enabled) => {
    set({ notificationsEnabled: enabled });
    get().saveSettings();
  },

  toggleNotifications: () => {
    const { notificationsEnabled } = get();
    set({ notificationsEnabled: !notificationsEnabled });
    get().saveSettings();
  },

  setSound: (enabled) => {
    set({ soundEnabled: enabled });
    get().saveSettings();
  },

  toggleSound: () => {
    const { soundEnabled } = get();
    set({ soundEnabled: !soundEnabled });
    get().saveSettings();
  },

  setDailyGoal: (goal) => {
    set({ dailyGoal: goal });
    get().saveSettings();
  },

  setShowExplanationsImmediately: (show) => {
    set({ showExplanationsImmediately: show });
    get().saveSettings();
  },

  loadSettings: async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        set({
          themeMode: settings.themeMode || 'auto',
          isDarkMode: settings.isDarkMode || false,
          notificationsEnabled: settings.notificationsEnabled ?? true,
          soundEnabled: settings.soundEnabled ?? true,
          dailyGoal: settings.dailyGoal || 30,
          showExplanationsImmediately: settings.showExplanationsImmediately || false,
        });
        console.log('⚙️ Settings loaded successfully');
      }
    } catch (error) {
      console.error('❌ Error loading settings:', error);
    }
  },

  saveSettings: async () => {
    try {
      const { themeMode, isDarkMode, notificationsEnabled, soundEnabled, dailyGoal, showExplanationsImmediately } = get();
      const settings = {
        themeMode,
        isDarkMode,
        notificationsEnabled,
        soundEnabled,
        dailyGoal,
        showExplanationsImmediately,
      };
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      console.log('💾 Settings saved successfully');
    } catch (error) {
      console.error('❌ Error saving settings:', error);
    }
  },
}));
