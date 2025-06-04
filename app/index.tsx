// app/index.tsx
import React from 'react';
import { useEffect } from 'react';
import { Redirect, router } from 'expo-router';

import { zustandStorage } from '@/app/utils/crossPlatformStorage';

const Index = () => {
  useEffect(() => {
    (async () => {
      const keys = await zustandStorage.getItem('authStore');
      if (keys) {
        const userAuth = JSON.parse(keys);

        if (userAuth?.state.authStore) {
          router.replace('/Home');
        }
      }
    })();
  }, []);

  return <Redirect href={'/auth/Login'} />;
};

export default Index;
