import React from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';

import { Slot } from 'expo-router';

import AppLayout from 'components/AppLayout';

const RootLayout = () => {
  return (
    <AppLayout>
      <KeyboardProvider>
        <Slot />
      </KeyboardProvider>
      <Toast />
    </AppLayout>
  );
};

export default RootLayout;
