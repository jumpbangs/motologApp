import React from 'react';
import { View } from 'react-native';

import { Text, useTheme } from '@rneui/themed';

const UpdatePasswordScreen = () => {
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
      <View
        style={{
          padding: 4,
          marginTop: 4,
        }}
      >
        <Text h1>LOL</Text>
      </View>
    </View>
  );
};

export default UpdatePasswordScreen;
