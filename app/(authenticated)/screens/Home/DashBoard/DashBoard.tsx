import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-gifted-charts';
import fuelLog from 'test-data/fuelLog.json';

import { Text, useTheme } from '@rneui/themed';

import { userStore } from 'store/userStore';
import { useDashboardStyle } from 'styles/dashboardStyles';
import { FuelEntry } from 'types/logsTypes';
import { getDashboardDate } from 'utils/date';

import DashBoardInfoTile from '../components/DashBoardInfoTile';

type BarDataItem = {
  value: number;
  label: string;
};

// type MetricKey = 'Efficiency' | 'Rate Over Time' | 'Distance Per Fill';

// const dataItems: { label: string; value: MetricKey }[] = [
//   { label: 'Efficiency', value: 'efficiency' },
//   { label: 'Rate Over Time', value: 'rateOverTime' },
//   { label: 'Distance Per Fill', value: 'distancePerFill' },
// ];

const metricTab = ['Efficiency', 'Cost', 'Distance'];

const Dashboard = () => {
  const { theme } = useTheme();
  const dashboardStyle = useDashboardStyle();

  const user = userStore.getState().user;
  const [selectedValue, setSelectedValue] = React.useState<number>(0);
  const fuelLogs: Record<string, FuelEntry> = fuelLog;

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

  const metricDataMap: Record<number, { value: number; label: string }[]> = React.useMemo(
    () => ({
      0: formatFuelData(sortedLogs, 'fuel_per_km'),
      1: formatFuelData(sortedLogs, 'fuel_cost'),
      2: formatFuelData(sortedLogs, 'total_kms_covered'),
    }),
    [sortedLogs]
  );

  const username = user?.displayName || '';
  const selectedLabel = metricTab[selectedValue];
  return (
    <ScrollView style={{ marginVertical: 15 }}>
      <View style={dashboardStyle.container}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={{ color: theme.colors.grey5 }}>{getDashboardDate()}</Text>
          <Text h2>Hi {username} 👋</Text>
        </View>

        <View style={dashboardStyle.card}>
          <Text style={dashboardStyle.cardLabel}>AVG {selectedLabel}</Text>
          <View style={dashboardStyle.cardRow}>
            <Text style={dashboardStyle.cardValue}>
              42.8 <Text style={dashboardStyle.cardUnit}>km/L</Text>
            </Text>
            <View style={dashboardStyle.cardBadge}>
              <Text style={dashboardStyle.cardBadgeText}>✦ Tuned up</Text>
            </View>
          </View>
          <Text style={dashboardStyle.cardChange}>↗ +6.2% vs. last month</Text>
          {Object.values(fuelLogs).length > 0 ? (
            <LineChart
              curved
              areaChart
              hideYAxisText
              hideAxesAndRules
              width={350}
              height={120}
              thickness={2}
              curveType={1}
              initialSpacing={30}
              hideDataPoints={false}
              color={theme.colors.primary}
              data={metricDataMap[selectedValue]}
              dataPointsColor={theme.colors.primary}
              // Color theme
              startFillColor={theme.colors.primary}
              endFillColor={'#1a1a1a'}
              startOpacity={0.3}
              endOpacity={0.0}
              xAxisLabelTextStyle={{ height: 0, opacity: 0 }}
            />
          ) : (
            <View>
              <Text h2 style={{ textAlign: 'center', marginVertical: 50 }}>
                No data available to display
              </Text>
            </View>
          )}
        </View>

        {/* Filters */}
        <View style={dashboardStyle.filterRow}>
          <Text style={dashboardStyle.filterTitle}>OVERVIEW</Text>

          <View style={dashboardStyle.filterBody}>
            {metricTab.map((item, index) => {
              const isActive = selectedValue === index;
              return (
                <Pressable
                  key={item}
                  onPress={() => setSelectedValue(index)}
                  style={{
                    borderRadius: 8,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    backgroundColor: isActive ? theme.colors.grey3 : 'transparent',
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? theme.colors.black : theme.colors.grey5,
                    }}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <View style={dashboardStyle.infoColContainer}>
        <View style={dashboardStyle.infoRowContainer}>
          <DashBoardInfoTile infoTitle="Avg Fuel" infoValue="8.2 Liters" />
          <DashBoardInfoTile infoTitle="Avg KMs" infoValue="340 KMs" />
        </View>
        <View style={dashboardStyle.infoRowContainer}>
          <DashBoardInfoTile infoTitle="Avg Rate" infoValue="8.2 Liters" />
          <DashBoardInfoTile infoTitle="Total KMs" infoValue="340 KMs" />
        </View>
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
