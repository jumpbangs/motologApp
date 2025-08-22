import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { router } from 'expo-router';

import { Button, Text, useTheme } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastInfo, ToastSuccess } from 'components/_Toast';
import LeftIconInput from 'components/LeftIconInput';
import ThemeSwitcher from 'components/ThemeSwitcher';
import { userStore } from 'store/userStore';
import { styles } from 'styles/profileStyles';
import { UpdateUserSchema } from 'utils/schema';

import { supabaseService } from '@/utils/supabase';

const UserDetailsScreen = () => {
  const theme = useTheme();
  const { user, updateUser } = userStore();
  const userMeta = user?.user_metadata;
  const fullName = userMeta?.fullName ?? '';
  const street = userMeta?.street ?? '';
  const city = userMeta?.city ?? '';
  const postCode = userMeta?.postCode ?? '';
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      fullName: fullName,
      street: street,
      city: city,
      postCode: postCode,
    },
    resolver: zodResolver(UpdateUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: userMeta?.fullName ?? '',
        street: userMeta?.street ?? '',
        city: userMeta?.firstName ?? '',
        postCode: userMeta?.postCode ?? '',
      });
    }
  }, [user, reset]);

  const onBackHandler = () => {
    if (isDirty) {
      ToastInfo({ msg1: 'Changes will not be saved' });
    }
    reset();
    router.back();
  };

  // TODO: UPDATE EMAIL AND PHONE REQUIRES ADDITIONAL STEPS
  const onHandleSubmit = async (userData: any) => {
    const { fullName, street, city, postCode } = userData;
    const { data, error } = await supabaseService.auth.updateUser({
      data: {
        fullName: fullName,
        street: street,
        city: city,
        postCode: postCode,
      },
    });

    if (error) {
      ToastError({ msg1: error.message });
    } else if (data.user) {
      updateUser(data.user);
    }

    ToastSuccess({ msg1: 'Updated user details' });
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
      <View style={styles.section}>
        <YStack style={{ gap: 10 }}>
          <Text h2>User Details</Text>
          <YStack style={{ gap: 2, marginTop: 10 }}>
            <LeftIconInput
              name="fullName"
              control={control}
              errors={errors}
              placeholder="Full Name"
              icon={{ name: 'person', type: 'material' }}
            />

            <LeftIconInput
              name="street"
              control={control}
              errors={errors}
              placeholder="street"
              icon={{ name: 'route', type: 'material' }}
            />

            <LeftIconInput
              name="city"
              control={control}
              errors={errors}
              placeholder="city"
              icon={{ name: 'apartment', type: 'material' }}
            />

            <LeftIconInput
              name="postCode"
              control={control}
              errors={errors}
              placeholder="post code"
              icon={{ name: 'location-pin', type: 'material' }}
            />

            <XStack
              style={{ justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 20 }}
            >
              <Text h4>UI Theme</Text>
              <ThemeSwitcher />
            </XStack>
          </YStack>
        </YStack>
      </View>
      <YStack style={{ gap: 12 }}>
        <Button
          onPress={() => {
            handleSubmit(onHandleSubmit)();
          }}
        >
          Save
        </Button>
        <Button onPress={() => onBackHandler()}>Back</Button>
      </YStack>
    </View>
  );
};

export default UserDetailsScreen;
