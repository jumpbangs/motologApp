import React from 'react';
import { View } from 'react-native';

import { Text, useTheme } from '@rneui/themed';

const Home = () => {
  const { theme } = useTheme();

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
      </View>
    </>
  );
};

export default Home;
