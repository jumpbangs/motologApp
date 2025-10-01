import { devtools } from '@csark0812/zustand-expo-devtools';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from 'utils/crossPlatformStorage';

export const useAuthStore = create<any>()(
  devtools(
    persist(
      set => ({
        authStore: null,
        login: (user: any) => set(() => ({ authStore: user })),
        logout: () => set(() => ({ authStore: null })),
        resetAuthStore: () => set(() => ({ authStore: null })),
      }),
      {
        name: 'authStore',
        storage: createJSONStorage(() => zustandStorage),
      }
    )
  )
);
