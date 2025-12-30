/**
 * Design System - Theme, Colors, Typography, Spacing
 */

export const Colors = {
  // Brand Colors
  primary: '#2E7D32',        // Grün (Fahrschule)
  primaryDark: '#1B5E20',
  primaryLight: '#4CAF50',

  secondary: '#1976D2',      // Blau
  secondaryDark: '#0D47A1',
  secondaryLight: '#42A5F5',

  // Status Colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',

  // Premium
  premium: '#FFD700',
  premiumDark: '#FFA000',

  // Neutrals (Light Mode)
  background: '#F5F5F5',
  surface: '#FFFFFF',
  surfaceVariant: '#FAFAFA',
  text: '#212121',
  textSecondary: '#757575',
  textDisabled: '#BDBDBD',
  border: '#E0E0E0',
  divider: '#EEEEEE',

  // Neutrals (Dark Mode)
  backgroundDark: '#121212',
  surfaceDark: '#1E1E1E',
  surfaceVariantDark: '#2C2C2C',
  textDark: '#FFFFFF',
  textSecondaryDark: '#B3B3B3',
  textDisabledDark: '#6B6B6B',
  borderDark: '#3A3A3A',
  dividerDark: '#2C2C2C',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyBold: {
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  small: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
  },
};

export const Shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Helper function to get theme colors based on mode
export const getThemeColors = (isDark: boolean) => ({
  background: isDark ? Colors.backgroundDark : Colors.background,
  surface: isDark ? Colors.surfaceDark : Colors.surface,
  surfaceVariant: isDark ? Colors.surfaceVariantDark : Colors.surfaceVariant,
  text: isDark ? Colors.textDark : Colors.text,
  textSecondary: isDark ? Colors.textSecondaryDark : Colors.textSecondary,
  textDisabled: isDark ? Colors.textDisabledDark : Colors.textDisabled,
  border: isDark ? Colors.borderDark : Colors.border,
  divider: isDark ? Colors.dividerDark : Colors.divider,

  // Brand colors bleiben gleich
  primary: Colors.primary,
  primaryDark: Colors.primaryDark,
  primaryLight: Colors.primaryLight,
  secondary: Colors.secondary,
  success: Colors.success,
  error: Colors.error,
  warning: Colors.warning,
  info: Colors.info,
  premium: Colors.premium,
});
