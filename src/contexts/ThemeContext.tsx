/**
 * Theme Context - Provider für Dark Mode Support
 */

import React, { createContext, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { useSettingsStore } from '../store/settingsStore';
import { getThemeColors } from '../constants/theme';

interface ThemeContextType {
  isDark: boolean;
  colors: ReturnType<typeof getThemeColors>;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const { themeMode, isDarkMode, setDarkMode } = useSettingsStore();

  useEffect(() => {
    // Auto-detect system theme wenn "auto" gewählt
    if (themeMode === 'auto') {
      setDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, themeMode]);

  const colors = getThemeColors(isDarkMode);

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDark: isDarkMode, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
