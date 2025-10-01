import React, { useEffect } from 'react';
import { View } from 'react-native';

import { Text, useTheme } from '@rneui/themed';

import { doc, getDoc } from 'firebase/firestore';

import { userStore } from 'store/userStore';
import { firebaseAuth, firebaseDb } from 'utils/firebaseService';

const Home = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const fetchUser = async () => {
      if (firebaseAuth && firebaseAuth.currentUser) {
        let userData = firebaseAuth.currentUser;
        const docUserRef = doc(firebaseDb, 'users', firebaseAuth.currentUser?.uid);
        const docSnap = await getDoc(docUserRef);
        if (docSnap.exists()) {
          userData = { ...userData, metadata: docSnap.data() };
        }

        userStore.getState().setUser(userData);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
      </View>
    </>
  );
};

export default Home;
