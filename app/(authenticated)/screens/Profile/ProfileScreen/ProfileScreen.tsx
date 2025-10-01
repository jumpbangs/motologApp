import React, { useState } from 'react';
import { Pressable, RefreshControl, ScrollView, View } from 'react-native';

import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Avatar, Icon, Text, useTheme } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { userStore } from 'store/userStore';
import { profileStyle } from 'styles/profileStyles';

const PROFILE_ITEMS = [
  { icon: 'person', title: 'Update Details', path: '/screens/Profile/UserDetailScreen', key: 1 },
  { icon: 'lock', title: 'Password', path: '/screens/Profile/UpdatePassword', key: 2 },
] as const;

const ProfileScreen = () => {
  const { theme } = useTheme();
  const user = userStore.getState().user;
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const userEmail = user?.email ?? 'A';
  const userName = user?.displayName ?? userEmail.split('@')[0];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or data fetching
    setTimeout(() => {
      setRefreshing(false);
      // Update your data here
    }, 2000);
  }, []);

  return (
    <ScrollView
      style={profileStyle.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={profileStyle.section}>
        <YStack style={{ gap: 10 }}>
          <XStack style={{ gap: 4 }} key="user-info">
            <Avatar
              size={64}
              rounded
              title={userEmail.charAt(0).toUpperCase()}
              containerStyle={{ backgroundColor: theme.colors.primary }}
            />
            <Text h4>{userName}</Text>
          </XStack>
          <View key="profile-info" style={[profileStyle.column, { gap: 4 }]}>
            {PROFILE_ITEMS.map(item => (
              <Pressable
                key={item.key}
                onPress={() => router.push(item.path)}
                style={{
                  padding: 12,
                  flexDirection: 'row',
                  alignContent: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={[profileStyle.row, { gap: 8 }]}>
                  <Icon name={item.icon} type="material" color="grey" size={28} />
                  <Text h4>{item.title}</Text>
                </View>
                <MaterialIcons size={28} name="chevron-right" color={theme.colors.grey0} />
              </Pressable>
            ))}
          </View>
        </YStack>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
