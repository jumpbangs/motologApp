import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';

import { router, useFocusEffect } from 'expo-router';

import { Button, Input, Text } from '@rneui/themed';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import { getAuthErrorMessage } from 'utils/firebaseService';
import { ForgetPasswordSchema } from 'utils/schema';

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgetPasswordSchema),
  });

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );

  const onSubmit = async (data: any) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(getAuth(), data.email);
      ToastSuccess({ msg1: 'If you are registered, you should receive an reset-password email.' });
      setLoading(false);
      router.back();
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        ToastError({ msg1: getAuthErrorMessage(error.code) });
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <YStack style={{ gap: 10 }}>
        <XStack style={{ justifyContent: 'center' }}>
          <Text h1>Forget Password</Text>
        </XStack>
        <XStack style={{ justifyContent: 'center' }}>
          <View style={{ gap: 4, minWidth: 300 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="Email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
            />

            <Button size="md" onPress={handleSubmit(onSubmit)} loading={loading}>
              Reset Password
            </Button>
            <Button size="md" onPress={() => router.back()}>
              Go Back
            </Button>
          </View>
        </XStack>
      </YStack>
    </View>
  );
};

export default ForgetPassword;
