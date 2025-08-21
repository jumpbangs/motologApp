import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { router } from 'expo-router';

import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastInfo, ToastSuccess } from 'components/_Toast';
import ThemeSwitcher from 'components/ThemeSwitcher';
import { userStore } from 'store/userStore';
import { styles } from 'styles/profileStyles';
import { UpdateUserSchema } from 'utils/schema';

import { supabaseService } from '@/utils/supabase';

const UserDetailsScreen = () => {
  const theme = useTheme();
  const { user, updateUser } = userStore();
  const userMeta = user?.user_metadata;
  const userEmail = user?.email ?? 'A';
  const userPhone = user?.phone ?? 'XXX-XXXX-XXXX';
  const userFullName = userMeta?.fullName ?? '';
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: userEmail,
      phone: userPhone,
      fullName: userFullName,
    },
    resolver: zodResolver(UpdateUserSchema),
  });

  const [updateDetails, setUpdateDetails] = useState(false);

  useEffect(() => {
    if (user) {
      reset({
        email: user.email ?? 'A',
        phone: user.phone ?? 'XXX-XXXX-XXXX',
        fullName: user.user_metadata?.fullName ?? '',
      });
    }
  }, [user, reset]);

  const onBackHandler = () => {
    if (updateDetails) {
      ToastInfo({ msg1: 'Changes will not be saved' });
    }
    reset();
    router.back();
  };

  // TODO: UPDATE EMAIL AND PHONE REQUIRES ADDITIONAL STEPS
  const onHandleSubmit = async (userData: any) => {
    const { fullName } = userData;
    const { data, error } = await supabaseService.auth.updateUser({
      data: {
        fullName: fullName,
      },
    });

    if (error) {
      ToastError({ msg1: error.message });
    } else if (data.user) {
      updateUser(data.user);
      setValue('fullName', data.user.user_metadata?.fullName || '');
    }

    ToastSuccess({ msg1: 'Updated user details' });
    setUpdateDetails(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.theme.colors.background }}>
      <View style={styles.section}>
        <YStack style={{ gap: 10 }}>
          <Text h2>User Details</Text>
          <YStack style={{ gap: 2, marginTop: 10 }}>
            <XStack style={{ alignItems: 'baseline', width: '100%' }}>
              <Icon name="email" type="material" />
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}
                      disabled={!updateDetails}
                      placeholder="Email"
                      errorMessage={errors.email?.message}
                    />
                  )}
                  name="email"
                />
              </View>
            </XStack>

            <XStack style={{ alignItems: 'baseline', width: '100%' }}>
              <Icon name="phone" type="material" />
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      disabled={!updateDetails}
                      placeholder="Phone Number"
                      errorMessage={errors.phone?.message}
                    />
                  )}
                  name="phone"
                />
              </View>
            </XStack>
            <XStack style={{ alignItems: 'baseline', width: '100%' }}>
              <Icon name="person" type="material" />
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      disabled={!updateDetails}
                      placeholder="Full Name"
                      errorMessage={
                        typeof errors.fullName?.message === 'string'
                          ? errors.fullName.message
                          : undefined
                      }
                    />
                  )}
                  name="fullName"
                />
              </View>
            </XStack>

            <XStack
              style={{ justifyContent: 'space-between', marginHorizontal: 10, marginVertical: 10 }}
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
            if (updateDetails) {
              handleSubmit(onHandleSubmit)();
            } else {
              setUpdateDetails(true);
            }
          }}
        >
          {updateDetails ? 'Save' : 'Update'}
        </Button>
        <Button onPress={() => onBackHandler()}>Back</Button>
      </YStack>
    </View>
  );
};

export default UserDetailsScreen;
