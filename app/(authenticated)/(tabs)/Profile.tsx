import React from 'react';
import { View } from 'react-native';

import { router } from 'expo-router';

import { Button, Text, useTheme } from '@rneui/themed';

import { useAuthStore } from 'store/authStore';
import { zustandStorage } from 'utils/crossPlatformStorage';
import { MAIN } from 'utils/router';

const Profile = () => {
  const { logout } = useAuthStore();
  const { theme } = useTheme();

  const logoutHandler = () => {
    logout();
    zustandStorage.clear();
    router.replace(MAIN);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text>Profile</Text>

      <Button onPress={logoutHandler}>Logout</Button>
    </View>
  );
};

export default Profile;
