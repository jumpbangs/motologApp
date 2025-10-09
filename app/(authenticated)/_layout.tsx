import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from '@rneui/themed';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDoc } from 'firebase/firestore';

import { MAIN } from 'utils/router';

import { useAuthStore } from '@/store/authStore';
import { userStore } from '@/store/userStore';
import { userDocRef } from '@/utils/firebaseService';

const AuthenticatedLayout = () => {
  const theme = useTheme();
  const authStore = useAuthStore.getState().authStore;

  const statusBarStyle = theme.theme.mode === 'dark' ? 'light' : 'dark';

  React.useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (firebaseUser) {
        const docUserRef = userDocRef(firebaseUser.uid);
        const docSnap = await getDoc(docUserRef);

        let userData: any = firebaseUser;
        if (docSnap.exists()) {
          userData = { ...firebaseUser, metadata: docSnap.data() };
        }
        userStore.getState().setUser(userData);
      } else {
        userStore.getState().deleteUser();
      }
    });

    return () => unsubscribe();
  }, []);

  if (!authStore) {
    return <Redirect href={MAIN} />;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.theme.colors.background }}
      edges={['top', 'left', 'right']}>
      <StatusBar style={statusBarStyle} translucent />
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
};

export default AuthenticatedLayout;
