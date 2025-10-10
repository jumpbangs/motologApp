import React from 'react';
import { ScrollView, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import { Picker } from '@react-native-picker/picker';

import { Text, useTheme } from '@rneui/themed';

import { dashboardStyle } from 'styles/dashboardStyles';
import { FuelEntry } from 'types/logsTypes';

import DashBoardInfoTile from '../components/DashBoardInfoTile';

type BarDataItem = {
  value: number;
  label: string;
};

type MetricKey = 'efficiency' | 'rateOverTime' | 'distancePerFill';

const dataItems: { label: string; value: MetricKey }[] = [
  { label: 'Efficiency', value: 'efficiency' },
  { label: 'Rate Over Time', value: 'rateOverTime' },
  { label: 'Distance Per Fill', value: 'distancePerFill' },
];

const Dashboard = () => {
  const { theme } = useTheme();
  const [selectedValue, setSelectedValue] = React.useState<MetricKey>('efficiency');
  const fuelLogs: Record<string, FuelEntry> = {};

  const sortedLogs = React.useMemo(() => {
    return Object.values(fuelLogs).sort(
      (logA, logB) => new Date(logB.date_filled).valueOf() - new Date(logA.date_filled).valueOf()
    );
  }, [fuelLogs]);

  const formatFuelData = (logs: FuelEntry[], valueKey: keyof Omit<FuelEntry, 'date_filled'>) => {
    return logs.map(item => ({
      value: Number(item[valueKey]),
      label: new Date(item.date_filled).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
    }));
  };

  const tallyBrandCount = (): BarDataItem[] => {
    if (fuelLogs) {
      const brands = Object.values(fuelLogs).map((entry: FuelEntry) => entry?.brand);

      const countMap = brands.reduce((count: Record<string, number>, brand) => {
        count[brand] = (count[brand] || 0) + 1;
        return count;
      }, {});

      return Object.entries(countMap).map(([brand, count]) => ({
        value: count,
        label: brand,
      }));
    } else {
      return [];
    }
  };

  const metricDataMap: Record<MetricKey, { value: number; label: string }[]> = React.useMemo(
    () => ({
      efficiency: formatFuelData(sortedLogs, 'fuel_per_km'),
      rateOverTime: formatFuelData(sortedLogs, 'fuel_cost'),
      distancePerFill: formatFuelData(sortedLogs, 'total_kms_covered'),
    }),
    [sortedLogs]
  );

  const selectedLabel = dataItems.find(item => item.value === selectedValue)?.label;
  return (
    <ScrollView style={{ marginVertical: 15 }}>
      <View style={dashboardStyle.container}>
        <Text h4 style={{ padding: 8, textAlign: 'center' }}>
          {selectedLabel}
        </Text>
        {Object.values(fuelLogs).length > 0 ? (
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
        ) : (
          <View>
            <Text h2 style={{ textAlign: 'center', marginVertical: 50 }}>
              No data available to display
            </Text>
          </View>
        )}

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
        <DashBoardInfoTile
          infoTitle1="Avg Fuel"
          infoValue1="8.2 Liters"
          infoTitle2="Avg KMs"
          infoValue2="340 KMs"
        />
        {/*  */}
        <DashBoardInfoTile
          infoTitle1="Avg Rate"
          infoValue1="8.2 Liters"
          infoTitle2="Total KMs"
          infoValue2="340 KMs"
        />
      </View>
      <View style={dashboardStyle.container}>
        <Text h4 style={{ padding: 8, textAlign: 'center' }}>
          Most Used Petrol Brand
        </Text>
        {Object.values(fuelLogs).length > 0 ? (
          <BarChart
            data={tallyBrandCount()}
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
            rulesColor={theme.colors.foreground}
            verticalLinesColor={theme.colors.foreground}
            showGradient
            frontColor={theme.colors.primary}
            gradientColor={theme.colors.foreground}
          />
        ) : (
          <View>
            <Text h2 style={{ textAlign: 'center', marginVertical: 50 }}>
              No data available to display
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
