import React from 'react';

import { H2, useTheme, View } from 'tamagui';

const Maintenance = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.color2?.val, // ✅ inside style
      }}>
      <H2>Maintenance</H2>
    </View>
  );
};

export default Maintenance;
