/**
 * AuthService - Authentifizierung über Supabase
 * Handles User Registration, Login, Logout und Session Management
 */

import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase Client mit AsyncStorage
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

class AuthService {
  private client: SupabaseClient;

  constructor() {
    this.client = supabase;
  }

  /**
   * Registriere neuen User
   */
  async signUp(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    try {
      const { data, error } = await this.client.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('❌ Sign up error:', error.message);
        return { user: null, error };
      }

      console.log('✅ User signed up:', data.user?.email);
      return { user: data.user, error: null };
    } catch (error) {
      console.error('❌ Sign up exception:', error);
      return { user: null, error: error as Error };
    }
  }

  /**
   * Login mit Email & Password
   */
  async signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    try {
      const { data, error } = await this.client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('❌ Sign in error:', error.message);
        return { user: null, error };
      }

      console.log('✅ User signed in:', data.user?.email);
      return { user: data.user, error: null };
    } catch (error) {
      console.error('❌ Sign in exception:', error);
      return { user: null, error: error as Error };
    }
  }

  /**
   * Logout
   */
  async signOut(): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.client.auth.signOut();

      if (error) {
        console.error('❌ Sign out error:', error.message);
        return { error };
      }

      console.log('✅ User signed out');
      return { error: null };
    } catch (error) {
      console.error('❌ Sign out exception:', error);
      return { error: error as Error };
    }
  }

  /**
   * Hole aktuellen User
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user }, error } = await this.client.auth.getUser();

      if (error) {
        console.error('❌ Get user error:', error.message);
        return null;
      }

      return user;
    } catch (error) {
      console.error('❌ Get user exception:', error);
      return null;
    }
  }

  /**
   * Hole aktuelle Session
   */
  async getSession(): Promise<Session | null> {
    try {
      const { data: { session }, error } = await this.client.auth.getSession();

      if (error) {
        console.error('❌ Get session error:', error.message);
        return null;
      }

      return session;
    } catch (error) {
      console.error('❌ Get session exception:', error);
      return null;
    }
  }

  /**
   * Password Reset Request
   */
  async resetPassword(email: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.client.auth.resetPasswordForEmail(email, {
        redirectTo: 'driveace://reset-password',
      });

      if (error) {
        console.error('❌ Reset password error:', error.message);
        return { error };
      }

      console.log('✅ Password reset email sent to:', email);
      return { error: null };
    } catch (error) {
      console.error('❌ Reset password exception:', error);
      return { error: error as Error };
    }
  }

  /**
   * Update Password
   */
  async updatePassword(newPassword: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.client.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        console.error('❌ Update password error:', error.message);
        return { error };
      }

      console.log('✅ Password updated successfully');
      return { error: null };
    } catch (error) {
      console.error('❌ Update password exception:', error);
      return { error: error as Error };
    }
  }

  /**
   * Update User Email
   */
  async updateEmail(newEmail: string): Promise<{ error: Error | null }> {
    try {
      const { error } = await this.client.auth.updateUser({
        email: newEmail,
      });

      if (error) {
        console.error('❌ Update email error:', error.message);
        return { error };
      }

      console.log('✅ Email updated successfully');
      return { error: null };
    } catch (error) {
      console.error('❌ Update email exception:', error);
      return { error: error as Error };
    }
  }

  /**
   * Auth State Change Listener
   */
  onAuthStateChange(callback: (user: User | null) => void) {
    const { data: { subscription } } = this.client.auth.onAuthStateChange(
      (_event, session) => {
        callback(session?.user || null);
      }
    );

    return subscription;
  }

  /**
   * Prüfe ob User eingeloggt ist
   */
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session;
  }

  /**
   * Get User ID (für lokale Datenspeicherung)
   */
  async getUserId(): Promise<string> {
    const user = await this.getCurrentUser();
    return user?.id || 'local_user';
  }
}

export default new AuthService();
