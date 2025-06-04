import React from 'react';
import { router } from 'expo-router';

import { Button, H2, useTheme, View } from 'tamagui';

import { useAuthStore } from 'store/authStore';
import { zustandStorage } from 'utils/crossPlatformStorage';

const Profile = () => {
  const theme = useTheme();

  const { logout } = useAuthStore();

  const logoutHandler = () => {
    logout();
    zustandStorage.clear();
    router.replace('/');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color2?.val, // ✅ inside style
      }}>
      <H2>Profile</H2>

      <Button onPress={logoutHandler}>Logout</Button>
    </View>
  );
};

export default Profile;
