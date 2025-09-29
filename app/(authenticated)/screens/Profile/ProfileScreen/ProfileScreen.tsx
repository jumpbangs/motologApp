import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';

import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';

import { Avatar, Icon, ListItem, Text, useTheme } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import { userStore } from 'store/userStore';
import { styles } from 'styles/profileStyles';
import { supabaseService } from 'utils/supabase';

const PROFILE_ITEMS = [
  { icon: 'person', title: 'Update Details', path: '/screens/Profile/UserDetailScreen', key: 1 },
  { icon: 'lock', title: 'Password', path: '/', key: 2 },
] as const;

const ProfileScreen = () => {
  const { theme } = useTheme();
  const user = userStore.getState().user;
  const userMeta = user?.user_metadata;
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const userId = user?.id;
  const userEmail = user?.email ?? 'A';
  const userName = userMeta?.username ?? userEmail.split('@')[0];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or data fetching
    setTimeout(() => {
      setRefreshing(false);
      // Update your data here
    }, 2000);
  }, []);

  const uploadAvatar = async (image: ImagePicker.ImagePickerResult) => {
    try {
      if (!('assets' in image) || !image.assets || image.assets.length === 0) {
        ToastError({ msg1: 'No Image selected' });
        throw new Error('No image selected');
      }

      const asset = image.assets[0];
      const fileUri = asset.uri;

      const fileName = `${userId}-avatar.jpg`;
      const mimeType = asset.type ?? 'image/jpeg';

      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const fileBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));

      const { data, error: uploadError } = await supabaseService.storage
        .from('avatars')
        .upload(fileName, fileBytes, {
          contentType: mimeType,
          upsert: true,
        });

      if (uploadError) {
        ToastError({ msg1: uploadError.message });
        throw uploadError;
      }

      if (data) {
        ToastSuccess({ msg1: 'Image uploaded !' });
      }
    } catch (error: any) {
      ToastError({ msg1: error.message ?? String(error) });
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      const { data, error } = await supabaseService.storage.from('avatars').list('', {
        search: `${userId}-avatar`,
      });

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error listing avatars:', error.message);
        return;
      }

      // eslint-disable-next-line no-console
      console.log('Avatar files:', data);
    };

    fetchAvatars();
  }, [setRefreshing]);

  const imagePickerHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      uploadAvatar(result);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.section}>
        <YStack style={{ gap: 10 }}>
          <XStack style={{ gap: 4 }} key="user-info">
            <Avatar
              size={64}
              rounded
              title={userEmail.charAt(0).toUpperCase()}
              containerStyle={{ backgroundColor: theme.colors.primary }}
            >
              <Avatar.Accessory size={22} onPress={imagePickerHandler} />
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
    </ScrollView>
  );
};

export default ProfileScreen;
