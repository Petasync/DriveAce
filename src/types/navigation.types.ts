/**
 * Navigation Types für React Navigation
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { Question } from './database.types';

// Root Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  Onboarding: undefined;
};

// Auth Navigator
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  Learn: NavigatorScreenParams<LearnStackParamList>;
  Exam: NavigatorScreenParams<ExamStackParamList>;
  Stats: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// Learn Stack
export type LearnStackParamList = {
  CategoryList: undefined;
  QuestionList: {
    categoryId: number;
    categoryName: string;
  };
  QuestionDetail: {
    questionId: number;
    questions: Question[];
    currentIndex: number;
  };
};

// Exam Stack
export type ExamStackParamList = {
  ExamStart: undefined;
  ExamQuestion: {
    questions: Question[];
    currentIndex: number;
  };
  ExamResult: {
    examSessionId: number;
  };
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileHome: undefined;
  Settings: undefined;
  Premium: undefined;
  Statistics: undefined;
};

// Screen Props Helpers
export type RootStackScreenProps<T extends keyof RootStackParamList> = {
  navigation: any;
  route: { params: RootStackParamList[T] };
};

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: any;
  route: { params: AuthStackParamList[T] };
};

export type MainTabScreenProps<T extends keyof MainTabParamList> = {
  navigation: any;
  route: { params: MainTabParamList[T] };
};
