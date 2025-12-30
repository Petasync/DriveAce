/**
 * Exam Navigator - Stack Navigation für Prüfungssimulation
 * ExamScreen -> ExamQuestionScreen -> ExamResultScreen
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants/theme';
import ExamScreen from '../screens/exam/ExamScreen';
import ExamQuestionScreen from '../screens/exam/ExamQuestionScreen';
import ExamResultScreen from '../screens/exam/ExamResultScreen';

const Stack = createNativeStackNavigator();

export default function ExamNavigator() {
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
        name="ExamHome"
        component={ExamScreen}
        options={{
          title: 'Prüfungssimulation',
        }}
      />
      <Stack.Screen
        name="ExamQuestion"
        component={ExamQuestionScreen}
        options={{
          title: 'Prüfung läuft',
          headerLeft: () => null, // Prevent going back during exam
          gestureEnabled: false, // Disable swipe back
        }}
      />
      <Stack.Screen
        name="ExamResult"
        component={ExamResultScreen}
        options={{
          title: 'Prüfungsergebnis',
          headerLeft: () => null, // Prevent going back
          gestureEnabled: false, // Disable swipe back
        }}
      />
    </Stack.Navigator>
  );
}
