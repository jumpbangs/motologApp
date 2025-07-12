import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { router, useFocusEffect } from 'expo-router';

import { Button, Input, Text } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import { useAuthStore } from 'store/authStore';
import { SignInTypes } from 'types/AuthTypes';
import { LoginInSchema } from 'utils/schema';
import { supabaseService } from 'utils/supabase';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginInSchema),
  });

  const { login } = useAuthStore();
  const onSubmit = async (data: SignInTypes) => {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabaseService.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      ToastError(error.message);
    }

    if (session) {
      login(session);
      ToastSuccess('Welcome back !!');
      router.push('/Home');
    }
    setLoading(false);
  };

  const signUpHandler = () => {
    router.push('/auth/SignUp');
  };

  const forgetPassHandler = () => {
    router.push('/auth/ForgetPassword');
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <YStack style={{ gap: 10 }}>
        <XStack style={{ justifyContent: 'center' }}>
          <Text h1>MotoLog App</Text>
        </XStack>
        <XStack style={{ justifyContent: 'center' }}>
          <View style={{ gap: 4, width: 300 }}>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 4 }}
                  placeholder="Email"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
              name="email"
            />

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  style={{ flex: 1, minHeight: 4 }}
                  secureTextEntry
                  placeholder="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
              name="password"
            />
            <Button size="md" onPress={handleSubmit(onSubmit)} loading={loading}>
              Sign In
            </Button>
          </View>
        </XStack>
        <XStack style={{ justifyContent: 'space-evenly', gap: 8 }}>
          <Text onPress={signUpHandler}>Sign Up</Text>
          <Text onPress={forgetPassHandler}>Forget password</Text>
        </XStack>
      </YStack>
    </View>
  );
};

export default LoginScreen;
