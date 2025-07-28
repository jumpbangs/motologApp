import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import * as Linking from 'expo-linking';
import { router, useFocusEffect } from 'expo-router';

import { Button, Icon, Input, Text } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError, ToastSuccess } from 'components/_Toast';
import { useAuthStore } from 'store/authStore';
import { SignInTypes } from 'types/AuthTypes';
import { FORGET_PASSWORD, HOME, SIGN_UP } from 'utils/router';
import { LoginInSchema } from 'utils/schema';
import { supabaseService } from 'utils/supabase';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

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

  useEffect(() => {
    const handleDeepLink = async ({ url }: { url: string }) => {
      if (!url) return;

      const [, hash] = url.split('#');
      if (!hash) return;

      const params = new URLSearchParams(hash);
      const token = await params.get('access_token');
      const refreshToken = await params.get('refresh_token');
      const typeParam = await params.get('type');

      if (typeParam === 'signup' && token && refreshToken) {
        const { data, error } = await supabaseService.auth.setSession({
          access_token: token,
          refresh_token: refreshToken,
        });

        if (error) {
          ToastError(error.message);
          return;
        }

        login(data.session);
        ToastSuccess('Welcome back !!');
        router.push(HOME);
      }

      if (typeParam === 'recovery' && token) {
        // Usually token alone is enough here
        router.push(`/auth/UpdatePassword#access_token=${token}&type=recovery`);
      }
    };

    // Listen for incoming deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Check if app opened with a URL initially (cold start)
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink({ url: initialUrl });
      }
    })();

    return () => {
      subscription.remove();
    };
  }, []);

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
      router.push(HOME);
    }
    setLoading(false);
  };

  const signUpHandler = () => {
    router.push(SIGN_UP);
  };

  const forgetPassHandler = () => {
    router.push(FORGET_PASSWORD);
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
      }}
    >
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
                  secureTextEntry={!showPass}
                  placeholder="Password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorMessage={errors.password?.message}
                  rightIcon={
                    <Icon
                      name={showPass ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(!showPass)}
                    />
                  }
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
