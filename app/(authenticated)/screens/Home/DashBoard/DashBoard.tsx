import React from 'react';
import { ScrollView, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { Picker } from '@react-native-picker/picker';

import { Text, useTheme } from '@rneui/themed';

import { dashboardStyle } from 'styles/dashboardStyles';

import fuelData from './fuelLog.json';

interface FuelEntry {
  date_filled: string;
  fuel_cost: number;
  fuel_per_km: number;
  total_kms_covered: number;
}

const dataItems = [
  { label: 'Efficiency', value: 'efficiency' },
  { label: 'Rate Over Time', value: 'rateOverTime' },
  { label: 'Distance Per Fill', value: 'distancePerFill' },
];

const Dashboard = () => {
  const { theme } = useTheme();
  const [selectedValue, setSelectedValue] = React.useState<string>('efficiency');

  const formatFuelData = (
    fuelData: Record<string, any>,
    valueKey: keyof Omit<FuelEntry, 'date_filled'>
  ) => {
    return Object.values(fuelData)
      .sort((a, b) => new Date(b.date_filled).valueOf() - new Date(a.date_filled).valueOf())
      .map(item => ({
        value: Number(item[valueKey]),
        label: new Date(item.date_filled).toLocaleDateString('en-US', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
      }));
  };

  const efficiency = formatFuelData(fuelData, 'fuel_per_km');
  const rateOverTime = formatFuelData(fuelData, 'fuel_cost');
  const distancePerFill = formatFuelData(fuelData, 'total_kms_covered');
  const metricDataMap: any = {
    efficiency,
    rateOverTime,
    distancePerFill,
  };

  const selectedLabel = dataItems.find(item => item.value === selectedValue)?.label;

  return (
    <ScrollView style={{ marginVertical: 15 }}>
      <View style={dashboardStyle.container}>
        <Text h4 style={{ padding: 8, textAlign: 'center' }}>
          {selectedLabel}
        </Text>
        <LineChart
          curved
          spacing={80}
          height={250}
          thickness={5}
          curveType={1}
          initialSpacing={30}
          hideDataPoints={false}
          color={theme.colors.primary}
          data={metricDataMap[selectedValue]}
          dataPointsColor={theme.colors.error}
          // X-axis settings
          xAxisThickness={1}
          xAxisColor={theme.colors.foreground}
          xAxisLabelTextStyle={{ color: theme.colors.foreground, fontSize: 12 }}
          // Y-axis settings
          yAxisThickness={1}
          yAxisColor={theme.colors.foreground}
          yAxisTextStyle={{ color: theme.colors.foreground, fontSize: 12 }}
          // Optional
          rulesType="dashed"
          hideRules={false}
          yAxisLabelWidth={30}
          showVerticalLines={true}
          showValuesAsDataPointsText
          verticalLinesUptoDataPoint={true}
          rulesColor={theme.colors.foreground}
          verticalLinesColor={theme.colors.foreground}
        />
        <View style={{ ...dashboardStyle.pickerContainer, borderColor: theme.colors.primary }}>
          <Picker
            selectedValue={selectedValue}
            mode="dropdown"
            onValueChange={itemValue => setSelectedValue(itemValue)}>
            {dataItems.map(item => {
              return <Picker.Item label={item.label} value={item.value} key={item.label} />;
            })}
          </Picker>
        </View>
      </View>
      <View style={dashboardStyle.infoContainer}>
        {/* Avg Fuel and KM */}
        <View style={dashboardStyle.infoRowContainer}>
          <View
            style={{ ...dashboardStyle.infoTileContainer, borderColor: theme.colors.foreground }}>
            <Text h4 style={dashboardStyle.infoTitleTitle}>
              Avg Fuel
            </Text>
            <Text style={dashboardStyle.infoTileData}>4.1 Liters</Text>
          </View>
          <View
            style={{ ...dashboardStyle.infoTileContainer, borderColor: theme.colors.foreground }}>
            <Text h4 style={dashboardStyle.infoTitleTitle}>
              Avg KMs
            </Text>
            <Text style={dashboardStyle.infoTileData}>340 KM</Text>
          </View>
        </View>
        {/*  */}
        <View style={dashboardStyle.infoRowContainer}>
          <View
            style={{ ...dashboardStyle.infoTileContainer, borderColor: theme.colors.foreground }}>
            <Text h4 style={dashboardStyle.infoTitleTitle}>
              Avg Rate
            </Text>
            <Text style={{ ...dashboardStyle.infoTileData, color: theme.colors.primary }}>
              4.1 Liters
            </Text>
          </View>
          <View
            style={{ ...dashboardStyle.infoTileContainer, borderColor: theme.colors.foreground }}>
            <Text h4 style={dashboardStyle.infoTitleTitle}>
              Total Distance
            </Text>
            <Text style={{ ...dashboardStyle.infoTileData, color: theme.colors.primary }}>
              340 KM
            </Text>
          </View>
        </View>
      </View>
      {/* <View style={dashboardStyle.addBtn}>
        <Button onPress={addNewLog}>
          <Text h4>Add new</Text>
        </Button>
      </View> */}
    </ScrollView>
  );
};

export default Dashboard;
