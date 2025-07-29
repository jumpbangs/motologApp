import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { router } from 'expo-router';

import { zustandStorage } from 'utils/crossPlatformStorage';
import { HOME, LOGIN } from 'utils/router';

const Index = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      const keys = await zustandStorage.getItem('authStore');
      if (keys) {
        const userAuth = JSON.parse(keys);
        if (userAuth?.state?.authStore) {
          router.replace(HOME);
        } else {
          router.replace(LOGIN);
        }
      } else {
        router.replace(LOGIN);
      }
      setIsCheckingAuth(false);
    })();
  }, []);

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
};

export default Index;
