import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Button } from '@rneui/themed';

interface ButtonProps {
  handleSubmit: () => void;
  loading?: boolean;
  btnTitle: string;
  btnSize?: 'sm' | 'md' | 'lg';
}

const LinearGradientBtn = ({ handleSubmit, loading, btnTitle, btnSize = 'md' }: ButtonProps) => {
  return (
    <Button
      size={btnSize}
      ViewComponent={LinearGradient as unknown as typeof React.Component}
      linearGradientProps={{
        colors: ['#FFD79B', '#FFB300'],
        start: { x: 1, y: 0.5 },
        end: { x: 0, y: 0.5 },
      }}
      onPress={handleSubmit}
      loading={loading}
      titleStyle={{ color: '#000' }}
      containerStyle={{ borderRadius: 12 }}>
      {btnTitle}
    </Button>
  );
};

export default LinearGradientBtn;
