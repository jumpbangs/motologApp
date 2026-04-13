import React from 'react';
import { View } from 'react-native';

import { useTheme } from '@rneui/themed';

import LogScreen from 'screens/LogScreen';

const Logs = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <LogScreen />
    </View>
  );
};

export default Logs;
