import React from 'react';

import { Stack } from 'expo-router';

import { useTheme } from '@rneui/themed';

export default function UnauthenticatedLayout() {
  const { theme } = useTheme();
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      />
    </>
  );
}
