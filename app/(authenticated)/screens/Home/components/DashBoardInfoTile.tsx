import React, { View } from 'react-native';

import { BlurView } from 'expo-blur';

import { Text, useTheme } from '@rneui/themed';

import { useDashboardStyle } from 'styles/dashboardStyles';

interface DashBoardInfoTitleProps {
  infoTitle: string;
  infoValue?: string;
}

const DashBoardInfoTile = ({ infoTitle, infoValue }: DashBoardInfoTitleProps) => {
  const { theme } = useTheme();
  const dashboardStyle = useDashboardStyle();

  return (
    <View
      style={{
        width: '48%',
        borderRadius: 12,
        flexDirection: 'row',
      }}>
      <View style={{ width: 5, backgroundColor: theme.colors.primary, borderRadius: 12 }} />
      <BlurView
        style={{
          ...dashboardStyle.infoTileContainer,
        }}
        intensity={20}
        tint={theme.mode === 'dark' ? 'light' : 'dark'}>
        <Text h4 style={dashboardStyle.infoTitleTitle}>
          {infoTitle}
        </Text>
        <Text style={dashboardStyle.infoTileData}>{infoValue}</Text>
      </BlurView>
    </View>
  );
};

export default DashBoardInfoTile;
