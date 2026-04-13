import React from 'react';
import { View } from 'react-native';

import { Icon, Text } from '@rneui/themed';

interface TextIconProps {
  text: string;
  isIconLeft?: boolean;
  icon: { name: string; type: string };
}

const TextIcon = ({ isIconLeft = false, text, icon }: TextIconProps) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {isIconLeft ? (
        <>
          <Text>{text}</Text>
          <Icon name={icon?.name} type={icon?.type} />
        </>
      ) : (
        <>
          <Icon name={icon.name} type={icon.type} />
          <Text>{text}</Text>
        </>
      )}
    </View>
  );
};

export default TextIcon;
