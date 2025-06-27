import { useTheme } from '@rneui/themed';
import { Stack } from 'expo-router';
import React from 'react';

export default function UnauthenticatedLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
      }}
    />
  );
}
