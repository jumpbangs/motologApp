import { devtools } from '@csark0812/zustand-expo-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from 'utils/crossPlatformStorage';

export const useAuthStore = create<any>()(
  devtools(
    persist(
      set => ({
        authStore: null,
        savedEmail: '',
        logout: () => set(() => ({ authStore: null })),
        login: (user: any) => set(() => ({ authStore: user })),
        resetAuthStore: () => set(() => ({ authStore: null })),
        saveEmail: (email: string) => set(() => ({ savedEmail: email })),
        removeSavedEmail: () => ({ savedEmail: '' }),
      }),
      {
        name: 'authStore',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
