import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { FirebaseError } from '@firebase/util';
import { zodResolver } from '@hookform/resolvers/zod';

import { router, useFocusEffect } from 'expo-router';

import { Input, Text } from '@rneui/themed';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import LinearGradientBtn from 'components/LinearGradientBtn';
import { getFirebaseErrorMessage } from 'utils/firebaseService';
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
        ToastError({ msg1: getFirebaseErrorMessage(error.code) });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <YStack style={{ gap: 10 }}>
        <XStack style={{ justifyContent: 'center' }}>
          <Text h1>Forget Password</Text>
        </XStack>
        <XStack style={{ justifyContent: 'center' }}>
          <View style={{ gap: 4, minWidth: 330 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 16 }}
                  placeholder="Enter your email"
                  label="Email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
            />

            <View style={{ gap: 12 }}>
              <LinearGradientBtn
                btnTitle="Reset Password"
                handleSubmit={handleSubmit(onSubmit)}
                loading={loading}
              />
              <LinearGradientBtn btnTitle="Go Back" handleSubmit={() => router.back()} />
            </View>
          </View>
        </XStack>
      </YStack>
    </KeyboardAvoidingView>
  );
};

export default ForgetPassword;
