/**
 * Learn Navigator - Stack Navigator für Learning Flow
 * LearnScreen → CategoryScreen → QuestionListScreen → QuestionScreen
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/theme';

// Screens
import LearnScreen from '../screens/learning/LearnScreen';
import CategoryScreen from '../screens/learning/CategoryScreen';
import QuestionListScreen from '../screens/learning/QuestionListScreen';
import QuestionScreen from '../screens/learning/QuestionScreen';

const Stack = createNativeStackNavigator();

export default function LearnNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="LearnHome"
        component={LearnScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoryList"
        component={CategoryScreen}
        options={{ title: 'Kategorien' }}
      />
      <Stack.Screen
        name="QuestionList"
        component={QuestionListScreen}
        options={({ route }) => ({
          title: (route.params as any)?.categoryName || 'Fragen',
        })}
      />
      <Stack.Screen
        name="QuestionDetail"
        component={QuestionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
