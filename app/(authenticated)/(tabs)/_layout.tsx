import React from 'react';

import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useTheme } from '@rneui/themed';

const AuthenticatedLayout = () => {
  const { theme } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarActiveTintColor: theme.colors.primary,
      }}>
      <Tabs.Screen
        name="Home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Logs"
        options={{
          title: 'Logs',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="edit-note" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Maintenance"
        options={{
          title: 'Maintenance',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="car-repair" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default AuthenticatedLayout;
