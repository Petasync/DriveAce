/**
 * ProfileScreen - Benutzer Profil & Einstellungen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, Shadows, BorderRadius } from '../../constants/theme';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import AuthService from '../../services/auth/AuthService';
import DatabaseService from '../../services/database/DatabaseService';

interface MenuItemProps {
  icon: any;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  showArrow = true,
  rightComponent,
}) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    disabled={!onPress}
    activeOpacity={onPress ? 0.7 : 1}
  >
    <View style={styles.menuIconContainer}>
      <Ionicons name={icon} size={24} color={Colors.primary} />
    </View>
    <View style={styles.menuContent}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    {rightComponent || (showArrow && onPress && (
      <Ionicons name="chevron-forward" size={24} color={Colors.textDisabled} />
    ))}
  </TouchableOpacity>
);

interface ProfileScreenProps {
  navigation: any;
}

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const { user, isPremium, setPremium, logout } = useAuthStore();
  const { isDarkMode, toggleDarkMode, soundEnabled, toggleSound } = useSettingsStore();

  const handleLogout = () => {
    Alert.alert(
      'Abmelden',
      'Möchtest du dich wirklich abmelden?',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Abmelden',
          style: 'destructive',
          onPress: async () => {
            await AuthService.signOut();
            logout();
          },
        },
      ]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Daten löschen',
      'Möchtest du wirklich alle lokalen Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
      [
        { text: 'Abbrechen', style: 'cancel' },
        {
          text: 'Löschen',
          style: 'destructive',
          onPress: async () => {
            await DatabaseService.clearUserData('local_user');
            Alert.alert('Erfolg', 'Alle Daten wurden gelöscht.');
          },
        },
      ]
    );
  };

  const handleTogglePremium = () => {
    // Für Development: Premium toggeln
    setPremium(!isPremium);
    Alert.alert(
      isPremium ? 'Premium deaktiviert' : 'Premium aktiviert',
      isPremium
        ? 'Du nutzt jetzt die kostenlose Version'
        : 'Du hast jetzt Zugriff auf alle Premium-Features!'
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.headerContainer}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={48} color={Colors.primary} />
        </View>
        <Text style={styles.userName}>{user?.email || 'Gast'}</Text>
        <Text style={styles.userEmail}>
          {isPremium ? '🌟 Premium Mitglied' : '💎 Free Version'}
        </Text>
      </View>

      {/* Premium Card */}
      {!isPremium && (
        <TouchableOpacity
          style={styles.premiumCard}
          onPress={() => navigation.navigate('Premium')}
        >
          <Ionicons name="star" size={32} color={Colors.premium} />
          <View style={styles.premiumContent}>
            <Text style={styles.premiumTitle}>Upgrade auf Premium</Text>
            <Text style={styles.premiumSubtitle}>
              Alle Features freischalten
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Colors.premium} />
        </TouchableOpacity>
      )}

      {/* Dev: Premium Toggle (nur für Development) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Development</Text>
        <MenuItem
          icon="star"
          title="Premium Status (Dev Only)"
          subtitle={isPremium ? 'Aktiv' : 'Inaktiv'}
          onPress={handleTogglePremium}
        />
      </View>

      {/* Einstellungen */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Einstellungen</Text>

        <MenuItem
          icon="moon"
          title="Dark Mode"
          subtitle="Dunkles Farbschema"
          showArrow={false}
          rightComponent={
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={isDarkMode ? Colors.primaryLight : Colors.surface}
            />
          }
        />

        <MenuItem
          icon="volume-high"
          title="Soundeffekte"
          subtitle="Töne bei Interaktionen"
          showArrow={false}
          rightComponent={
            <Switch
              value={soundEnabled}
              onValueChange={toggleSound}
              trackColor={{ false: Colors.border, true: Colors.primary }}
              thumbColor={soundEnabled ? Colors.primaryLight : Colors.surface}
            />
          }
        />
      </View>

      {/* Allgemein */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Allgemein</Text>

        <MenuItem
          icon="help-circle"
          title="Hilfe & Support"
          onPress={() => Alert.alert('Hilfe', 'Kontakt: support@driveace.app')}
        />

        <MenuItem
          icon="document-text"
          title="Datenschutz"
          onPress={() => Alert.alert('Datenschutz', 'Datenschutzerklärung hier')}
        />

        <MenuItem
          icon="information-circle"
          title="Über DriveAce"
          subtitle="Version 1.0.0"
          onPress={() => Alert.alert('DriveAce', 'Fahrschul-Lern-App v1.0.0\n© 2024 PetaSync')}
        />
      </View>

      {/* Daten & Konto */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daten & Konto</Text>

        <MenuItem
          icon="trash"
          title="Daten löschen"
          subtitle="Alle lokalen Daten entfernen"
          onPress={handleClearData}
        />

        {user && (
          <MenuItem
            icon="log-out"
            title="Abmelden"
            onPress={handleLogout}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerContainer: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  userName: {
    ...Typography.h2,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  premiumCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.premium + '10',
    borderWidth: 2,
    borderColor: Colors.premium,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    margin: Spacing.md,
    ...Shadows.medium,
  },
  premiumContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  premiumTitle: {
    ...Typography.bodyBold,
    color: Colors.premiumDark,
  },
  premiumSubtitle: {
    ...Typography.caption,
    color: Colors.premiumDark,
  },
  section: {
    marginTop: Spacing.md,
  },
  sectionTitle: {
    ...Typography.h3,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    color: Colors.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    ...Typography.body,
    marginBottom: Spacing.xs / 4,
  },
  menuSubtitle: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
