import React from 'react';
import { ThemeProvider } from '@rneui/themed';

import { gruvboxTheme } from 'theme/theme';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={gruvboxTheme}>{children}</ThemeProvider>;
};

export default AppLayout;
