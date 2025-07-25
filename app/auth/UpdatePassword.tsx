import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import * as Linking from 'expo-linking';
import { router, useFocusEffect } from 'expo-router';

import { Button, Icon, Input, Text } from '@rneui/themed';

import { XStack, YStack } from 'components/_Stacks';
import { ToastError } from 'components/_Toast';
import { useAuthStore } from 'store/authStore';
import { supabaseService } from 'utils/supabase';

const UpdatePassword = () => {
  const [showPass, setShowPass] = useState({ pass: false, confirm: false });
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
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const url = Linking.useURL();

  useEffect(() => {
    if (!url) return;

    const [, hash] = url.split('#');
    if (hash) {
      const params = new URLSearchParams(hash);
      const token = params.get('access_token');
      const typeParam = params.get('type');

      if (typeParam === 'recovery' && token) {
        supabaseService.auth.exchangeCodeForSession(token as string).then(({ error }) => {
          if (error) {
            ToastError(error.message);
          }
        });
      }

      if (typeParam === 'signup' && token) {
        login(token);
        router.push('/Home');
      }
    }
  }, [url]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        reset();
      };
    }, [reset])
  );

  const onSubmit = async (data: any) => {
    setLoading(true);

    const { newPassword, confirmPass } = data;

    if (newPassword !== confirmPass) {
      ToastError('Passwords do not match.');
      setLoading(false);
      return;
    }

    const { error } = await supabaseService.auth.updateUser({ password: newPassword });

    setLoading(false);

    if (error) {
      ToastError(error.message);
    } else {
      ToastError('Password updated successfully!');
      router.push('/');
      // Optionally navigate away or sign out the user
    }
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
                  secureTextEntry={!showPass.pass}
                  errorMessage={errors.newPassword?.message}
                  rightIcon={
                    <Icon
                      name={showPass.pass ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(prev => ({ ...prev, pass: !prev.pass }))}
                    />
                  }
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
                  secureTextEntry={!showPass.confirm}
                  errorMessage={errors.newPassword?.message}
                  rightIcon={
                    <Icon
                      name={showPass.confirm ? 'visibility' : 'visibility-off'}
                      type="material"
                      onPress={() => setShowPass(prev => ({ ...prev, confirm: !prev.confirm }))}
                    />
                  }
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
