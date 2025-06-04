import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TamaguiProvider } from '@tamagui/core';
import { PortalProvider } from '@tamagui/portal';
import { ToastProvider, ToastViewport } from '@tamagui/toast';

import { config } from 'theme/tamagui.config';

import ToastView from '../Toast';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { left, top, right } = useSafeAreaInsets();
  return (
    <TamaguiProvider config={config} defaultTheme="dark">
      <PortalProvider>
        <ToastProvider>
          {children}
          <ToastView />
          <ToastViewport flexDirection="column-reverse" top={top} left={left} right={right} />
        </ToastProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
};

export default AppLayout;
