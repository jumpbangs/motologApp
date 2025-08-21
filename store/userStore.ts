/* eslint-disable no-unused-vars */
import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface UserState {
  user: User | null;
  setUser: (data: User) => void;
  updateUser: (data: User) => void;
  deleteUser: () => void;
  userTheme: 'light' | 'dark';
  updateUserTheme: (mode: 'light' | 'dark') => void;
}

export const userStore = create<UserState>()(set => ({
  user: null,
  userTheme: 'dark',
  setUser: data => set(() => ({ user: data })),
  updateUser: data =>
    set(state => ({
      user: {
        ...state.user,
        ...data,
      },
    })),
  deleteUser: () => set(() => ({ user: null })),
  updateUserTheme: mode => set(() => ({ userTheme: mode })),
}));
