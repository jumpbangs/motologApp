import React from 'react';
import { View } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { ToastError } from 'app/components/_Toast';

import { router } from 'expo-router';

import { Button, useTheme } from '@rneui/themed';

import { signOut } from 'firebase/auth';

import ProfileScreen from 'screens/Profile/ProfileScreen';
import { useAuthStore } from 'store/authStore';
import { zustandStorage } from 'utils/crossPlatformStorage';
import { firebaseAuth, getFirebaseErrorMessage } from 'utils/firebaseService';
import { MAIN } from 'utils/router';

const Profile = () => {
  const { logout } = useAuthStore();
  const { theme } = useTheme();

  const logoutHandler = async () => {
    try {
      signOut(firebaseAuth);
      logout();
      zustandStorage.clear();
      router.replace(MAIN);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        ToastError({ msg1: getFirebaseErrorMessage(error.code) });
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <ProfileScreen />
      <Button onPress={logoutHandler}>Logout</Button>
    </View>
  );
};

export default Profile;
