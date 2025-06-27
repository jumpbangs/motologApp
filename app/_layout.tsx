import React from 'react';
import Toast from 'react-native-toast-message';
import { Slot } from 'expo-router';

import AppLayout from 'components/AppLayout';

const RootLayout = () => {
  return (
    <AppLayout>
      <Slot />
      <Toast />
    </AppLayout>
  );
};

export default RootLayout;
