/* eslint-disable no-unused-vars */
import { create } from 'zustand';

import { User, UserMetadata } from 'firebase/auth';

interface ExtendedUserMetadata extends UserMetadata {
  street?: string;
  city?: string;
  postCode?: string;
}

interface FirebaseUserWithExtraMetadata extends Omit<User, 'metadata'> {
  metadata: ExtendedUserMetadata;
}
interface UserState {
  user: FirebaseUserWithExtraMetadata | null;
  setUser: (data: FirebaseUserWithExtraMetadata) => void;
  updateUser: (data: FirebaseUserWithExtraMetadata) => void;
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
