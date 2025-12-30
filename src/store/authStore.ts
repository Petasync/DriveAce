/**
 * Auth Store - Zustand State Management für Authentifizierung
 */

import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  userId: string;
  isLoading: boolean;
  isPremium: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setUserId: (userId: string) => void;
  setLoading: (loading: boolean) => void;
  setPremium: (premium: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userId: 'local_user',
  isLoading: true,
  isPremium: false,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      userId: user?.id || 'local_user',
      isAuthenticated: !!user,
    }),

  setUserId: (userId) => set({ userId }),

  setLoading: (isLoading) => set({ isLoading }),

  setPremium: (isPremium) => set({ isPremium }),

  logout: () =>
    set({
      user: null,
      userId: 'local_user',
      isPremium: false,
      isAuthenticated: false,
    }),
}));
