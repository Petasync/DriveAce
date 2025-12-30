/**
 * Main Navigator - Bottom Tab Navigation für eingeloggte User
 * Home, Learn, Exam, Stats, Profile
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types/navigation.types';
import { Colors } from '../constants/theme';

// Screens
import DashboardScreen from '../screens/home/DashboardScreen';
import LearnNavigator from './LearnNavigator';
import ExamNavigator from './ExamNavigator';
import StatsScreen from '../screens/stats/StatsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Learn':
              iconName = focused ? 'book' : 'book-outline';
              break;
            case 'Exam':
              iconName = focused ? 'clipboard' : 'clipboard-outline';
              break;
            case 'Stats':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{ title: 'Übersicht', headerTitle: 'DriveAce' }}
      />
      <Tab.Screen
        name="Learn"
        component={LearnNavigator}
        options={{ title: 'Lernen', headerShown: false }}
      />
      <Tab.Screen
        name="Exam"
        component={ExamNavigator}
        options={{ title: 'Prüfung', headerShown: false }}
      />
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ title: 'Statistik', headerTitle: 'Meine Statistik' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profil', headerTitle: 'Mein Profil' }}
      />
    </Tab.Navigator>
  );
}
