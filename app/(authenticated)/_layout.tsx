import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Redirect, Stack } from 'expo-router';

import { useAuthStore } from '@/store/authStore';

const AuthenticatedLayout = () => {
  const authStore = useAuthStore(state => state.authStore);

  if (!authStore) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default AuthenticatedLayout;
