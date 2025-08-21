import React from 'react';
import { View } from 'react-native';

import { router } from 'expo-router';

import { Avatar, Icon, ListItem, Text, useTheme } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { userStore } from 'store/userStore';
import { styles } from 'styles/profileStyles';

const PROFILE_ITEMS = [
  { icon: 'person', title: 'Update Details', path: '/screens/Profile/UserDetailScreen', key: 1 },
  { icon: 'lock', title: 'Password', path: '/', key: 2 },
] as const;

const ProfileScreen = () => {
  const { theme } = useTheme();
  const user = userStore.getState().user;
  const userMeta = user?.user_metadata;

  const userEmail = user?.email ?? 'A';
  const userName = userMeta?.username ?? userEmail.split('@')[0];

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <YStack style={{ gap: 10 }}>
          <XStack style={{ gap: 4 }} key="user-info">
            <Avatar
              size={64}
              rounded
              title={userEmail.charAt(0).toUpperCase()}
              containerStyle={{ backgroundColor: theme.colors.primary }}
            >
              <Avatar.Accessory size={22} />
            </Avatar>
            <Text h4>{userName}</Text>
          </XStack>
          <View key="profile-info">
            {PROFILE_ITEMS.map(item => (
              <ListItem key={item.key} onPress={() => router.push(item.path)}>
                <Icon name={item.icon} type="material" color="grey" />
                <ListItem.Content>
                  <ListItem.Title>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))}
          </View>
        </YStack>
      </View>
    </View>
  );
};

export default ProfileScreen;
