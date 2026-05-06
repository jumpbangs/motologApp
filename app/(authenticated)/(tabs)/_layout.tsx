import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

import { useTheme } from '@rneui/themed';

const AuthenticatedTabLayout = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.background, height: 70 + insets.bottom },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarActiveBackgroundColor: '#FBBF2426',
        tabBarIconStyle: {
          marginTop: 12,
        },
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Logs"
        options={{
          title: 'Logs',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Maintenance"
        options={{
          title: 'Maintenance',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="tool" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default AuthenticatedTabLayout;
