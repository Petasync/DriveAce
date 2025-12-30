/**
 * Question Store - Zustand State Management für Fragen und Lernmodus
 */

import { create } from 'zustand';
import { Question } from '../types/database.types';
import { LearningMode } from '../types/models';

interface QuestionState {
  // Current Question Session
  questions: Question[];
  currentQuestion: Question | null;
  currentIndex: number;
  learningMode: LearningMode;

  // Progress Tracking
  answeredQuestions: Map<number, boolean>; // questionId -> isCorrect
  sessionStartTime: Date | null;

  // Actions
  setQuestions: (questions: Question[]) => void;
  setCurrentQuestion: (question: Question) => void;
  setCurrentIndex: (index: number) => void;
  setLearningMode: (mode: LearningMode) => void;

  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;

  answerQuestion: (questionId: number, isCorrect: boolean) => void;

  startSession: () => void;
  endSession: () => void;
  resetSession: () => void;

  // Getters
  getTotalQuestions: () => number;
  getAnsweredCount: () => number;
  getCorrectCount: () => number;
  getAccuracy: () => number;
  isLastQuestion: () => boolean;
  isFirstQuestion: () => boolean;
}

export const useQuestionStore = create<QuestionState>((set, get) => ({
  questions: [],
  currentQuestion: null,
  currentIndex: 0,
  learningMode: 'all',
  answeredQuestions: new Map(),
  sessionStartTime: null,

  setQuestions: (questions) =>
    set({
      questions,
      currentQuestion: questions.length > 0 ? questions[0] : null,
      currentIndex: 0,
    }),

  setCurrentQuestion: (question) => set({ currentQuestion: question }),

  setCurrentIndex: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({
        currentIndex: index,
        currentQuestion: questions[index],
      });
    }
  },

  setLearningMode: (mode) => set({ learningMode: mode }),

  nextQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex < questions.length - 1) {
      const newIndex = currentIndex + 1;
      set({
        currentIndex: newIndex,
        currentQuestion: questions[newIndex],
      });
    }
  },

  previousQuestion: () => {
    const { currentIndex, questions } = get();
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      set({
        currentIndex: newIndex,
        currentQuestion: questions[newIndex],
      });
    }
  },

  goToQuestion: (index) => {
    const { questions } = get();
    if (index >= 0 && index < questions.length) {
      set({
        currentIndex: index,
        currentQuestion: questions[index],
      });
    }
  },

  answerQuestion: (questionId, isCorrect) => {
    const { answeredQuestions } = get();
    const updated = new Map(answeredQuestions);
    updated.set(questionId, isCorrect);
    set({ answeredQuestions: updated });
  },

  startSession: () => set({ sessionStartTime: new Date() }),

  endSession: () => set({ sessionStartTime: null }),

  resetSession: () =>
    set({
      currentIndex: 0,
      currentQuestion: null,
      answeredQuestions: new Map(),
      sessionStartTime: null,
    }),

  // Getters
  getTotalQuestions: () => get().questions.length,

  getAnsweredCount: () => get().answeredQuestions.size,

  getCorrectCount: () => {
    const { answeredQuestions } = get();
    let correct = 0;
    answeredQuestions.forEach((isCorrect) => {
      if (isCorrect) correct++;
    });
    return correct;
  },

  getAccuracy: () => {
    const answered = get().getAnsweredCount();
    if (answered === 0) return 0;
    const correct = get().getCorrectCount();
    return Math.round((correct / answered) * 100);
  },

  isLastQuestion: () => {
    const { currentIndex, questions } = get();
    return currentIndex === questions.length - 1;
  },

  isFirstQuestion: () => get().currentIndex === 0,
}));
