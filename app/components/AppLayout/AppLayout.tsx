import React from 'react';

import { ThemeProvider } from '@rneui/themed';

import { userStore } from 'store/userStore';

import { getGruvboxTheme } from '@/theme/theme';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const themeMode = userStore(state => state.userTheme);

  return <ThemeProvider theme={getGruvboxTheme(themeMode)}>{children}</ThemeProvider>;
};

export default AppLayout;
