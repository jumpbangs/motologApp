import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from 'utils/crossPlatformStorage';

export const useAuthStore = create<any>()(
  persist(
    set => ({
      authStore: null,
      login: (user: any) => set(() => ({ authStore: user })),
      logout: () => set(() => ({ authStore: null })),
    }),
    {
      name: 'authStore',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
