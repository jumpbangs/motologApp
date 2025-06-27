import { useTheme } from '@rneui/themed';
import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuthStore } from 'store/authStore';

const AuthenticatedLayout = () => {
  const {theme} = useTheme()
  const authStore = useAuthStore(state => state.authStore);

  if (!authStore) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <Stack screenOptions={{ headerShown: false}} />
    </SafeAreaView>
  );
};

export default AuthenticatedLayout;