import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useFocusEffect, useLocalSearchParams } from 'expo-router';

import { Button, Input, Text } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError } from 'components/_Toast';
import { supabaseService } from 'utils/supabase';

const UpdatePassword = () => {
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: '',
      confirmPass: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const { access_token, type } = useLocalSearchParams();

  useEffect(() => {
    if (type === 'recovery' && access_token) {
      supabaseService.auth.exchangeCodeForSession(access_token as string).then(({ error }) => {
        if (error) {
          ToastError(error.message);
        }
      });
    }
  }, [access_token, type]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <YStack style={{ gap: 10 }}>
        <XStack style={{ justifyContent: 'center' }}>
          <Text h1>Update Password</Text>
        </XStack>
        <XStack style={{ justifyContent: 'center' }}>
          <View style={{ gap: 4, minWidth: 300 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="New Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.newPassword?.message}
                />
              )}
              name="newPassword"
            />
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="Confirm Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.newPassword?.message}
                />
              )}
              name="confirmPass"
            />
            <Button size="md" onPress={handleSubmit(onSubmit)} loading={loading}>
              Reset Password
            </Button>
          </View>
        </XStack>
      </YStack>
    </View>
  );
};

export default UpdatePassword;
