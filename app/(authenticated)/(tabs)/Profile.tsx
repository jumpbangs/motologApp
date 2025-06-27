import { Button, Text, useTheme } from '@rneui/themed';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { useAuthStore } from 'store/authStore';
import { zustandStorage } from 'utils/crossPlatformStorage';

const Profile = () => {
  const { logout } = useAuthStore();
    const { theme } = useTheme();

  const logoutHandler = () => {
    logout();
    zustandStorage.clear();
    router.replace('/');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background
      }}>
      <Text>Profile</Text>

      <Button onPress={logoutHandler}>Logout</Button>
    </View>
  );
};

export default Profile;
