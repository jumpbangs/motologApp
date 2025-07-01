import React from 'react';
import { View } from 'react-native';

import { Text, useTheme } from '@rneui/themed';

const Logs = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <Text>Logs</Text>
    </View>
  );
};

export default Logs;
