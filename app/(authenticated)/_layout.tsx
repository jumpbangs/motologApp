import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '@rneui/themed';

import { MAIN } from 'utils/router';

import { useAuthStore } from '@/store/authStore';

const AuthenticatedLayout = () => {
  const theme = useTheme();
  const authStore = useAuthStore.getState().authStore;

  const statusBarStyle = theme.theme.mode === 'dark' ? 'light' : 'dark';

  if (!authStore) {
    return <Redirect href={MAIN} />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.theme.colors.background }}
      edges={['top', 'left', 'right']}
    >
      <StatusBar style={statusBarStyle} translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default AuthenticatedLayout;
