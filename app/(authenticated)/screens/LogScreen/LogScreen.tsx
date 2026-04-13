import React from 'react';
import { RefreshControl, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LegendList } from '@legendapp/list';

import { router } from 'expo-router';

import { Button, Icon, Text } from '@rneui/themed';

import TextIcon from 'components/TextIcon';
import { fetchUserLogs, subscribeToUserLogs } from 'services/logServices';
import { userStore } from 'store/userStore';
import { FuelEntry } from 'types/logsTypes';
import { convertDateToFmt, DAY_MONTH_YEAR_FMT } from 'utils/date';

import DeleteModal from './components/DeleteModal';
import DetailModal from './components/DetailModal';

const LogScreen = () => {
  const user = userStore.getState().user;
  const [refreshing, setRefreshing] = React.useState(false);
  const [userLogs, setUserLogs] = React.useState<FuelEntry[] | []>([]);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<FuelEntry | null>(null);

  React.useEffect(() => {
    const getUserLogs = async () => {
      if (user != null) {
        const logs: FuelEntry[] = await fetchUserLogs(user.uid);
        setUserLogs(logs);
      }
    };

    getUserLogs();
  }, []);

  React.useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeToUserLogs(user.uid, setUserLogs);

    return () => unsubscribe();
  }, [user]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      if (user != null) {
        const logs: FuelEntry[] = await fetchUserLogs(user.uid);
        setUserLogs(logs);
      }
    } finally {
      setRefreshing(false);
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderItem = (logData: FuelEntry) => {
    return (
      <TouchableOpacity
        style={{ height: 80, width: '100%' }}
        onLongPress={() => {
          setDeleteModalVisible(!deleteModalVisible);
          setSelectedItem(logData);
        }}
        onPress={() => {
          setModalVisible(!modalVisible);
          setSelectedItem(logData);
        }}>
        <View
          style={{
            flex: 1,
            gap: 10,
            padding: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
            alignContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'column' }}>
            <TextIcon text={logData.brand} icon={{ name: 'local-gas-station', type: 'material' }} />
            <TextIcon text={logData.location} icon={{ name: 'location-pin', type: 'material' }} />
          </View>
          <TextIcon
            text={convertDateToFmt(logData.date_filled, DAY_MONTH_YEAR_FMT)}
            icon={{ name: 'event-available', type: 'material' }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginVertical: 20, flexDirection: 'column' }}>
          <View
            style={{
              height: 100,
              padding: 20,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text h2>Fuel Logs</Text>
            <Button
              icon={<Icon name="add" type="material" />}
              onPress={() => router.push('/screens/LogScreen/components/AddLogPage')}
              buttonStyle={{
                width: 44,
                height: 44,
                borderRadius: 22,
              }}
              containerStyle={{
                borderRadius: 22,
              }}
              type="solid"
            />
          </View>
          <DetailModal
            modalVisible={modalVisible}
            modalDetails={selectedItem}
            modalHandler={() => setModalVisible(!modalVisible)}
          />
          <DeleteModal
            modalVisible={deleteModalVisible}
            modalDetails={selectedItem}
            modalHandler={() => setDeleteModalVisible(!deleteModalVisible)}
          />
          {Array.isArray(userLogs) && userLogs.length === 0 ? (
            <View>
              <Text>No data</Text>
            </View>
          ) : (
            <LegendList
              data={userLogs}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor={item => item.id.toString()}
              recycleItems
              drawDistance={100}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default LogScreen;
