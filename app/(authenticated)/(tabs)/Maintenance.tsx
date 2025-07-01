import React from 'react';
import { View } from 'react-native';

import { Text, useTheme } from '@rneui/themed';

const Maintenance = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <Text>Maintenance</Text>
    </View>
  );
};

export default Maintenance;
