import React from 'react';
import { Slot } from 'expo-router';

import AppLayout from 'components/AppLayout';

const RootLayout = () => {
  return (
    <AppLayout>
      <Slot />
    </AppLayout>
  );
};

export default RootLayout;
