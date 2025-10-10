import React, { View } from 'react-native';

import { Text, useTheme } from '@rneui/themed';

import { dashboardStyle } from 'styles/dashboardStyles';

interface DashBoardInfoTitleProps {
  infoTitle1: string;
  infoValue1?: string;
  infoTitle2: string;
  infoValue2?: string;
}

const DashBoardInfoTile = ({
  infoTitle1,
  infoValue1,
  infoTitle2,
  infoValue2,
}: DashBoardInfoTitleProps) => {
  const { theme } = useTheme();

  return (
    <>
      <View style={dashboardStyle.infoRowContainer}>
        <View style={{ ...dashboardStyle.infoTileContainer, borderColor: theme.colors.foreground }}>
          <Text h4 style={dashboardStyle.infoTitleTitle}>
            {infoTitle1}
          </Text>
          <Text style={dashboardStyle.infoTileData}>{infoValue1}</Text>
        </View>
        <View style={{ ...dashboardStyle.infoTileContainer, borderColor: theme.colors.foreground }}>
          <Text h4 style={dashboardStyle.infoTitleTitle}>
            {infoTitle2}
          </Text>
          <Text style={dashboardStyle.infoTileData}>{infoValue2}</Text>
        </View>
      </View>
    </>
  );
};

export default DashBoardInfoTile;
